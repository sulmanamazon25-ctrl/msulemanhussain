from __future__ import annotations

import json
from typing import Any

import redis

from app.config import get_settings

_redis: redis.Redis | None = None


def get_redis() -> redis.Redis:
    global _redis
    if _redis is None:
        _redis = redis.Redis.from_url(get_settings().redis_url, decode_responses=True)
    return _redis


def rate_limit(key: str, limit: int, window_sec: int = 60) -> bool:
    """Return True if allowed."""
    r = get_redis()
    pipe = r.pipeline()
    k = f"rl:{key}"
    pipe.incr(k)
    pipe.expire(k, window_sec)
    count, _ = pipe.execute()
    return int(count) <= limit


def cache_get(key: str) -> dict[str, Any] | None:
    raw = get_redis().get(key)
    if not raw:
        return None
    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        return None


def cache_set(key: str, value: dict[str, Any], ttl: int = 3600) -> None:
    get_redis().setex(key, ttl, json.dumps(value))
