from __future__ import annotations

import re
from dataclasses import dataclass


@dataclass
class Chunk:
    text: str
    index: int


def chunk_text(text: str, chunk_size: int = 700, overlap: int = 120) -> list[Chunk]:
    cleaned = re.sub(r"\s+", " ", (text or "")).strip()
    if not cleaned:
        return []
    chunks: list[Chunk] = []
    start = 0
    idx = 0
    n = len(cleaned)
    while start < n:
        end = min(start + chunk_size, n)
        piece = cleaned[start:end].strip()
        if piece:
            chunks.append(Chunk(text=piece, index=idx))
            idx += 1
        if end >= n:
            break
        start = max(0, end - overlap)
    return chunks
