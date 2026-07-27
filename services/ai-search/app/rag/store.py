from __future__ import annotations

import hashlib
import uuid
from typing import Any

from qdrant_client import QdrantClient
from qdrant_client.http import models as qm

from app.config import get_settings

_client: QdrantClient | None = None


def get_qdrant() -> QdrantClient:
    global _client
    if _client is None:
        settings = get_settings()
        _client = QdrantClient(url=settings.qdrant_url, prefer_grpc=False, timeout=30)
    return _client


def collection_name(tenant_id: str) -> str:
    safe = "".join(c if c.isalnum() or c in "-_" else "_" for c in tenant_id)[:48]
    return f"tenant_{safe}"


def ensure_collection(tenant_id: str, vector_size: int = 384) -> str:
    client = get_qdrant()
    name = collection_name(tenant_id)
    existing = {c.name for c in client.get_collections().collections}
    if name not in existing:
        client.create_collection(
            collection_name=name,
            vectors_config=qm.VectorParams(size=vector_size, distance=qm.Distance.COSINE),
        )
    return name


def doc_id_for(uri: str) -> str:
    return hashlib.sha256(uri.encode()).hexdigest()[:24]


def upsert_chunks(
    tenant_id: str,
    *,
    source_uri: str,
    title: str,
    chunks: list[str],
    vectors: list[list[float]],
    source_type: str = "web",
) -> str:
    if not chunks:
        return doc_id_for(source_uri)
    name = ensure_collection(tenant_id, vector_size=len(vectors[0]))
    client = get_qdrant()
    doc_id = doc_id_for(source_uri)
    # delete previous points for this doc
    client.delete(
        collection_name=name,
        points_selector=qm.FilterSelector(
            filter=qm.Filter(
                must=[qm.FieldCondition(key="doc_id", match=qm.MatchValue(value=doc_id))]
            )
        ),
    )
    points = []
    for i, (text, vec) in enumerate(zip(chunks, vectors)):
        points.append(
            qm.PointStruct(
                id=str(uuid.uuid5(uuid.NAMESPACE_URL, f"{doc_id}:{i}")),
                vector=vec,
                payload={
                    "tenant_id": tenant_id,
                    "doc_id": doc_id,
                    "source_uri": source_uri,
                    "title": title,
                    "text": text,
                    "chunk_index": i,
                    "source_type": source_type,
                },
            )
        )
    client.upsert(collection_name=name, points=points)
    return doc_id


def delete_doc_points(tenant_id: str, doc_id: str) -> None:
    name = collection_name(tenant_id)
    client = get_qdrant()
    existing = {c.name for c in client.get_collections().collections}
    if name not in existing:
        return
    client.delete(
        collection_name=name,
        points_selector=qm.FilterSelector(
            filter=qm.Filter(
                must=[qm.FieldCondition(key="doc_id", match=qm.MatchValue(value=doc_id))]
            )
        ),
    )


def wipe_tenant(tenant_id: str) -> None:
    name = collection_name(tenant_id)
    client = get_qdrant()
    existing = {c.name for c in client.get_collections().collections}
    if name in existing:
        client.delete_collection(name)


def vector_search(tenant_id: str, query_vector: list[float], limit: int = 8) -> list[dict[str, Any]]:
    name = collection_name(tenant_id)
    client = get_qdrant()
    existing = {c.name for c in client.get_collections().collections}
    if name not in existing:
        return []
    hits = client.search(collection_name=name, query_vector=query_vector, limit=limit, with_payload=True)
    out = []
    for h in hits:
        payload = h.payload or {}
        out.append(
            {
                "score": float(h.score or 0),
                "text": payload.get("text", ""),
                "title": payload.get("title", ""),
                "url": payload.get("source_uri", ""),
                "doc_id": payload.get("doc_id", ""),
            }
        )
    return out


def all_payloads_for_bm25(tenant_id: str, limit: int = 2000) -> list[dict[str, Any]]:
    """Scroll a sample of points for BM25 hybrid (bounded for low RAM)."""
    name = collection_name(tenant_id)
    client = get_qdrant()
    existing = {c.name for c in client.get_collections().collections}
    if name not in existing:
        return []
    points, _ = client.scroll(collection_name=name, limit=limit, with_payload=True, with_vectors=False)
    out = []
    for p in points:
        payload = p.payload or {}
        out.append(
            {
                "text": payload.get("text", ""),
                "title": payload.get("title", ""),
                "url": payload.get("source_uri", ""),
                "doc_id": payload.get("doc_id", ""),
            }
        )
    return out
