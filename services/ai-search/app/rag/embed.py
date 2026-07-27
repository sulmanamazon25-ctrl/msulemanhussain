from __future__ import annotations

from functools import lru_cache

from app.config import get_settings


@lru_cache
def _model():
    from fastembed import TextEmbedding

    settings = get_settings()
    return TextEmbedding(model_name=settings.embed_model)


def embed_texts(texts: list[str]) -> list[list[float]]:
    if not texts:
        return []
    model = _model()
    return [vec.tolist() for vec in model.embed(texts)]


def embed_query(text: str) -> list[float]:
    return embed_texts([text])[0]
