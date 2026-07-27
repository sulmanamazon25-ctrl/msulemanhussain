from __future__ import annotations

import re
from collections import defaultdict

from rank_bm25 import BM25Okapi

from app.config import get_settings
from app.models import Source
from app.rag.embed import embed_query
from app.rag.store import all_payloads_for_bm25, vector_search


def _tokenize(text: str) -> list[str]:
    return re.findall(r"[a-zA-ZáéíóúñüÁÉÍÓÚÑÜ0-9]+", (text or "").lower())


def hybrid_retrieve(tenant_id: str, query: str, locale: str = "en") -> list[Source]:
    settings = get_settings()
    qvec = embed_query(query)
    vector_hits = vector_search(tenant_id, qvec, limit=settings.top_k * 2)

    corpus = all_payloads_for_bm25(tenant_id)
    bm25_hits: list[dict] = []
    if corpus:
        tokenized = [_tokenize(c["text"]) for c in corpus]
        bm25 = BM25Okapi(tokenized)
        scores = bm25.get_scores(_tokenize(query))
        ranked = sorted(enumerate(scores), key=lambda x: x[1], reverse=True)[: settings.top_k * 2]
        for idx, score in ranked:
            if score <= 0:
                continue
            row = corpus[idx]
            bm25_hits.append({**row, "score": float(score)})

    merged: dict[str, dict] = {}
    for hit in vector_hits:
        key = f"{hit.get('url')}|{hit.get('text')[:80]}"
        merged[key] = {**hit, "score": hit["score"] * 1.0}
    for hit in bm25_hits:
        key = f"{hit.get('url')}|{hit.get('text')[:80]}"
        if key in merged:
            merged[key]["score"] = merged[key]["score"] + min(hit["score"] / 10.0, 0.35)
        else:
            merged[key] = {**hit, "score": min(hit["score"] / 10.0, 0.5)}

    ranked_rows = sorted(merged.values(), key=lambda r: r["score"], reverse=True)[: settings.top_k]
    sources: list[Source] = []
    for row in ranked_rows:
        snippet = (row.get("text") or "")[:280]
        sources.append(
            Source(
                title=row.get("title") or row.get("url") or "Source",
                url=row.get("url") or "",
                snippet=snippet,
                score=float(row.get("score") or 0),
            )
        )
    return sources


def low_confidence(sources: list[Source]) -> bool:
    if not sources:
        return True
    return sources[0].score < 0.22
