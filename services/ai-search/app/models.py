from __future__ import annotations

import hashlib
import re
import time
import uuid
from typing import Any

from pydantic import BaseModel, Field


def sanitize_user_text(text: str, max_len: int = 2000) -> str:
    cleaned = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", text or "")
    cleaned = cleaned.strip()
    if len(cleaned) > max_len:
        cleaned = cleaned[:max_len]
    return cleaned


def session_id_or_new(raw: str | None) -> str:
    if raw and re.fullmatch(r"[a-zA-Z0-9_-]{8,64}", raw):
        return raw
    return uuid.uuid4().hex


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    session_id: str | None = None
    locale: str = "en"
    history: list[dict[str, str]] = Field(default_factory=list)


class Source(BaseModel):
    title: str
    url: str
    snippet: str
    score: float


class ChatResponse(BaseModel):
    answer: str
    sources: list[Source]
    follow_ups: list[str]
    session_id: str
    cached: bool = False
    mode: str = "extractive"


class IngestUrlRequest(BaseModel):
    urls: list[str] = Field(default_factory=list)
    sitemap_url: str | None = None


class TenantInfo(BaseModel):
    tenant_id: str
    name: str
    allowed_hosts: list[str]


def cache_key(tenant: str, locale: str, message: str) -> str:
    digest = hashlib.sha256(f"{tenant}|{locale}|{message.lower().strip()}".encode()).hexdigest()
    return f"ai:chat:{digest}"


def now_ts() -> float:
    return time.time()


def jsonable(obj: Any) -> Any:
    if hasattr(obj, "model_dump"):
        return obj.model_dump()
    return obj
