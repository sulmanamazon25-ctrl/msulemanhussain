from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "ai-search"
    environment: str = "production"
    host: str = "0.0.0.0"
    port: int = 8080

    # Multi-tenant defaults
    default_tenant: str = "portfolio"
    allowed_origins: str = "https://msulemanhussain.com,https://www.msulemanhussain.com,http://localhost:3000"

    # Security
    admin_api_key: str = "change-me-admin"
    public_widget_keys: str = "portfolio:dev-widget-key"
    rate_limit_per_minute: int = 20

    # Infra
    redis_url: str = "redis://redis:6379/0"
    qdrant_url: str = "http://qdrant:6333"
    data_dir: str = "/data"
    sqlite_path: str = "/data/ai_search.db"

    # Embeddings (local ONNX via fastembed — no Ollama required)
    embed_model: str = "BAAI/bge-small-en-v1.5"
    chunk_size: int = 700
    chunk_overlap: int = 120
    top_k: int = 6

    # Optional OpenAI-compatible LLM (remote Ollama / OpenRouter / Groq)
    # Leave empty for grounded extractive answers (safest on low-RAM host).
    llm_base_url: str = ""
    llm_api_key: str = ""
    llm_model: str = "llama3.2:3b"
    llm_timeout_seconds: float = 45.0

    # Crawl seeds
    portfolio_sitemap: str = "https://msulemanhussain.com/sitemap.xml"
    portfolio_base: str = "https://msulemanhussain.com"

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]

    def widget_key_map(self) -> dict[str, str]:
        out: dict[str, str] = {}
        for part in self.public_widget_keys.split(","):
            part = part.strip()
            if ":" in part:
                tenant, key = part.split(":", 1)
                out[tenant.strip()] = key.strip()
        return out


@lru_cache
def get_settings() -> Settings:
    return Settings()
