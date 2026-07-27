from __future__ import annotations

import asyncio
import logging
import time
import uuid
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, File, Header, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, ORJSONResponse
from sse_starlette.sse import EventSourceResponse

from app.auth import TENANTS, require_admin, require_widget
from app.cache import cache_get, cache_set, rate_limit
from app.config import get_settings
from app.db import (
    analytics_summary,
    create_job,
    delete_document,
    get_job,
    init_db,
    list_documents,
    record_analytics,
    record_failed,
    update_job,
)
from app.ingest import crawl_sitemap, ingest_upload, ingest_url
from app.models import ChatRequest, IngestUrlRequest, sanitize_user_text, session_id_or_new, cache_key
from app.rag.generate import extractive_answer, follow_ups, stream_llm_answer
from app.rag.retrieve import hybrid_retrieve, low_confidence
from app.rag.store import delete_doc_points, wipe_tenant

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s %(message)s")
logger = logging.getLogger("ai-search")


@asynccontextmanager
async def lifespan(_: FastAPI):
    init_db()
    logger.info("AI Search API ready")
    yield


app = FastAPI(
    title="AI Search Platform",
    version="1.0.0",
    default_response_class=ORJSONResponse,
    lifespan=lifespan,
)

settings = get_settings()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok", "service": settings.app_name}


@app.get("/v1/tenants")
def tenants_public():
    return {
        "tenants": [
            {"id": tid, "name": meta["name"]} for tid, meta in TENANTS.items()
        ]
    }


@app.post("/v1/chat")
async def chat(
    body: ChatRequest,
    tenant_id: str = Depends(require_widget),
    x_forwarded_for: str | None = Header(default=None),
):
    started = time.time()
    message = sanitize_user_text(body.message)
    if not message:
        raise HTTPException(400, "Empty message")
    locale = "es" if body.locale.startswith("es") else "en"
    session_id = session_id_or_new(body.session_id)

    ip = (x_forwarded_for or "anon").split(",")[0].strip()
    if not rate_limit(f"{tenant_id}:{ip}", settings.rate_limit_per_minute):
        raise HTTPException(429, "Rate limit exceeded")

    ck = cache_key(tenant_id, locale, message)
    cached = cache_get(ck)
    if cached:
        cached["session_id"] = session_id
        cached["cached"] = True
        return cached

    try:
        sources = hybrid_retrieve(tenant_id, message, locale)
    except Exception as exc:  # noqa: BLE001
        logger.exception("retrieve failed")
        record_failed(tenant_id, message, str(exc)[:200])
        raise HTTPException(500, "Retrieval failed") from exc

    if low_confidence(sources):
        answer = extractive_answer(message, [], locale)
        record_failed(tenant_id, message, "low_confidence")
        payload = {
            "answer": answer,
            "sources": [],
            "follow_ups": follow_ups(locale, []),
            "session_id": session_id,
            "cached": False,
            "mode": "unavailable",
        }
        record_analytics(tenant_id, message, locale, False, int((time.time() - started) * 1000))
        return payload

    # Non-stream JSON path (widget can use stream endpoint)
    answer = extractive_answer(message, sources, locale)
    if settings.llm_base_url:
        chunks = []
        async for part in stream_llm_answer(message, sources, locale):
            chunks.append(part)
        if chunks:
            answer = "".join(chunks)

    mode = "llm" if settings.llm_base_url else "extractive"
    payload = {
        "answer": answer,
        "sources": [s.model_dump() for s in sources],
        "follow_ups": follow_ups(locale, sources),
        "session_id": session_id,
        "cached": False,
        "mode": mode,
    }
    cache_set(ck, payload, ttl=1800)
    record_analytics(tenant_id, message, locale, True, int((time.time() - started) * 1000))
    return payload


@app.post("/v1/chat/stream")
async def chat_stream(
    body: ChatRequest,
    tenant_id: str = Depends(require_widget),
    x_forwarded_for: str | None = Header(default=None),
):
    message = sanitize_user_text(body.message)
    if not message:
        raise HTTPException(400, "Empty message")
    locale = "es" if body.locale.startswith("es") else "en"
    session_id = session_id_or_new(body.session_id)
    ip = (x_forwarded_for or "anon").split(",")[0].strip()
    if not rate_limit(f"{tenant_id}:{ip}", settings.rate_limit_per_minute):
        raise HTTPException(429, "Rate limit exceeded")

    started = time.time()
    sources = hybrid_retrieve(tenant_id, message, locale)
    unavailable = low_confidence(sources)

    async def event_gen():
        import json as _json

        yield {
            "event": "meta",
            "data": _json.dumps(
                {"session_id": session_id, "sources": [s.model_dump() for s in ([] if unavailable else sources)]}
            ),
        }
        if unavailable:
            text = extractive_answer(message, [], locale)
            yield {"event": "token", "data": text}
            record_failed(tenant_id, message, "low_confidence")
            record_analytics(tenant_id, message, locale, False, int((time.time() - started) * 1000))
        else:
            async for token in stream_llm_answer(message, sources, locale):
                yield {"event": "token", "data": token}
            record_analytics(tenant_id, message, locale, True, int((time.time() - started) * 1000))
        yield {
            "event": "done",
            "data": _json.dumps(
                {
                    "follow_ups": follow_ups(locale, [] if unavailable else sources),
                    "mode": "unavailable"
                    if unavailable
                    else ("llm" if settings.llm_base_url else "extractive"),
                }
            ),
        }

    return EventSourceResponse(event_gen())


@app.get("/v1/admin/analytics")
def admin_analytics(tenant_id: str = "portfolio", _: None = Depends(require_admin)):
    return analytics_summary(tenant_id)


@app.get("/v1/admin/documents")
def admin_docs(tenant_id: str = "portfolio", _: None = Depends(require_admin)):
    return {"documents": list_documents(tenant_id)}


@app.delete("/v1/admin/documents/{doc_id}")
def admin_delete_doc(doc_id: str, tenant_id: str = "portfolio", _: None = Depends(require_admin)):
    delete_doc_points(tenant_id, doc_id)
    ok = delete_document(tenant_id, doc_id)
    if not ok:
        raise HTTPException(404, "Document not found")
    return {"ok": True}


@app.post("/v1/admin/ingest/urls")
async def admin_ingest_urls(
    body: IngestUrlRequest,
    tenant_id: str = "portfolio",
    _: None = Depends(require_admin),
):
    hosts = TENANTS[tenant_id]["allowed_hosts"]
    results = []
    for url in body.urls[:30]:
        results.append(await ingest_url(tenant_id, url, hosts))
    return {"results": results}


@app.post("/v1/admin/ingest/upload")
async def admin_upload(
    file: UploadFile = File(...),
    tenant_id: str = "portfolio",
    _: None = Depends(require_admin),
):
    data = await file.read()
    result = await ingest_upload(
        tenant_id,
        filename=file.filename or "upload.bin",
        data=data,
        content_type=file.content_type or "",
    )
    if not result.get("ok"):
        raise HTTPException(400, result.get("error", "upload_failed"))
    return result


@app.post("/v1/admin/crawl")
async def admin_crawl(tenant_id: str = "portfolio", _: None = Depends(require_admin)):
    job_id = uuid.uuid4().hex
    create_job(job_id, tenant_id, "crawl", "running")
    sitemap = settings.portfolio_sitemap if tenant_id == "portfolio" else settings.portfolio_sitemap
    hosts = TENANTS[tenant_id]["allowed_hosts"]

    async def _run():
        try:
            result = await crawl_sitemap(tenant_id, sitemap, hosts)
            update_job(job_id, "done", f"indexed={result['indexed']}/{result['total']}")
        except Exception as exc:  # noqa: BLE001
            update_job(job_id, "failed", str(exc)[:300])

    asyncio.create_task(_run())
    return {"job_id": job_id, "status": "running"}


@app.get("/v1/admin/jobs/{job_id}")
def admin_job(job_id: str, _: None = Depends(require_admin)):
    job = get_job(job_id)
    if not job:
        raise HTTPException(404, "Job not found")
    return job


@app.post("/v1/admin/reindex")
async def admin_reindex(tenant_id: str = "portfolio", _: None = Depends(require_admin)):
    wipe_tenant(tenant_id)
    # clear document table rows for tenant
    from app.db import db

    with db() as conn:
        conn.execute("DELETE FROM documents WHERE tenant_id=?", (tenant_id,))
    return await admin_crawl(tenant_id=tenant_id)


@app.get("/")
def root():
    return {
        "service": "ai-search",
        "docs": "/docs",
        "health": "/health",
        "chat": "/v1/chat",
    }
