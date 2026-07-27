from __future__ import annotations

import re
from urllib.parse import urljoin, urlparse

import httpx
from bs4 import BeautifulSoup

from app.config import get_settings
from app.db import upsert_document
from app.rag.chunking import chunk_text
from app.rag.embed import embed_texts
from app.rag.store import upsert_chunks

USER_AGENT = "AISearchBot/1.0 (+https://msulemanhussain.com; portfolio indexer)"


def _allowed_host(url: str, allowed_hosts: list[str]) -> bool:
    host = urlparse(url).netloc.lower()
    return any(host == h or host.endswith("." + h) for h in allowed_hosts)


async def fetch_text(url: str) -> tuple[str, str]:
    async with httpx.AsyncClient(timeout=25, follow_redirects=True, headers={"User-Agent": USER_AGENT}) as client:
        resp = await client.get(url)
        resp.raise_for_status()
        ctype = resp.headers.get("content-type", "")
        if "html" not in ctype and "text" not in ctype and "xml" not in ctype:
            return url, ""
        html = resp.text
    soup = BeautifulSoup(html, "lxml")
    for tag in soup(["script", "style", "noscript", "nav", "footer", "header"]):
        tag.decompose()
    title = (soup.title.string or url).strip() if soup.title else url
    text = soup.get_text(" ", strip=True)
    return title, text


async def parse_sitemap(sitemap_url: str) -> list[str]:
    async with httpx.AsyncClient(timeout=30, follow_redirects=True, headers={"User-Agent": USER_AGENT}) as client:
        resp = await client.get(sitemap_url)
        resp.raise_for_status()
        xml = resp.text
    locs = re.findall(r"<loc>\s*([^<]+)\s*</loc>", xml)
    # Prefer EN pages first for bilingual site, then ES
    urls = []
    for loc in locs:
        loc = loc.strip()
        if "/en/" in loc or loc.endswith("/en"):
            urls.append(loc)
    for loc in locs:
        loc = loc.strip()
        if loc not in urls:
            urls.append(loc)
    return urls[:120]


async def ingest_url(tenant_id: str, url: str, allowed_hosts: list[str]) -> dict:
    if not _allowed_host(url, allowed_hosts):
        return {"url": url, "ok": False, "error": "host_not_allowed"}
    settings = get_settings()
    title, text = await fetch_text(url)
    if not text or len(text) < 40:
        return {"url": url, "ok": False, "error": "empty"}
    chunks = chunk_text(text, settings.chunk_size, settings.chunk_overlap)
    vectors = embed_texts([c.text for c in chunks])
    doc_id = upsert_chunks(
        tenant_id,
        source_uri=url,
        title=title,
        chunks=[c.text for c in chunks],
        vectors=vectors,
        source_type="web",
    )
    upsert_document(doc_id, tenant_id, "web", url, title)
    return {"url": url, "ok": True, "doc_id": doc_id, "chunks": len(chunks), "title": title}


async def crawl_sitemap(tenant_id: str, sitemap_url: str, allowed_hosts: list[str]) -> dict:
    urls = await parse_sitemap(sitemap_url)
    results = []
    ok = 0
    for url in urls:
        try:
            r = await ingest_url(tenant_id, url, allowed_hosts)
            results.append(r)
            if r.get("ok"):
                ok += 1
        except Exception as exc:  # noqa: BLE001
            results.append({"url": url, "ok": False, "error": str(exc)[:200]})
    return {"indexed": ok, "total": len(urls), "results": results[:30]}


def extract_pdf_text(data: bytes) -> str:
    from io import BytesIO

    from pypdf import PdfReader

    reader = PdfReader(BytesIO(data))
    parts = []
    for page in reader.pages[:50]:
        parts.append(page.extract_text() or "")
    return "\n".join(parts)


def extract_docx_text(data: bytes) -> str:
    from io import BytesIO

    from docx import Document

    doc = Document(BytesIO(data))
    return "\n".join(p.text for p in doc.paragraphs)


async def ingest_upload(
    tenant_id: str,
    *,
    filename: str,
    data: bytes,
    content_type: str,
) -> dict:
    settings = get_settings()
    name = filename.lower()
    if name.endswith(".pdf") or "pdf" in content_type:
        text = extract_pdf_text(data)
        source_type = "pdf"
    elif name.endswith(".docx") or "word" in content_type:
        text = extract_docx_text(data)
        source_type = "docx"
    elif name.endswith((".md", ".txt")) or "text" in content_type or "markdown" in content_type:
        text = data.decode("utf-8", errors="ignore")
        source_type = "markdown"
    else:
        return {"ok": False, "error": "unsupported_type"}

    if len(data) > 8_000_000:
        return {"ok": False, "error": "file_too_large"}
    if not text or len(text.strip()) < 20:
        return {"ok": False, "error": "empty"}

    uri = f"upload://{filename}"
    chunks = chunk_text(text, settings.chunk_size, settings.chunk_overlap)
    vectors = embed_texts([c.text for c in chunks])
    doc_id = upsert_chunks(
        tenant_id,
        source_uri=uri,
        title=filename,
        chunks=[c.text for c in chunks],
        vectors=vectors,
        source_type=source_type,
    )
    upsert_document(doc_id, tenant_id, source_type, uri, filename)
    return {"ok": True, "doc_id": doc_id, "chunks": len(chunks), "title": filename}
