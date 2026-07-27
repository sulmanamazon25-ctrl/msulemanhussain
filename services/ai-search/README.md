# AI Search Platform

Multi-tenant RAG search API for msulemanhussain.com (and later Wasup / DownitX / PinQuill).

## Why separate stack
Runs as its own Docker Compose project with **memory/CPU limits**, so indexing and chat do not redeploy or starve your existing Coolify SaaS containers.

## Stack
- FastAPI (`/v1/chat`, `/v1/chat/stream`, admin ingest/crawl)
- Qdrant (vectors)
- Redis (rate limit + answer cache)
- SQLite (documents + analytics)
- **fastembed** local embeddings (no Ollama required on this host)

Optional: set `LLM_BASE_URL` to a remote OpenAI-compatible endpoint for generative answers. Without it, responses are grounded extractive summaries with citations.

## Public API (widget)
```
POST /ai-api/v1/chat
Headers:
  X-Tenant-Id: portfolio
  X-Widget-Key: <PUBLIC_WIDGET_KEYS value>
Body: { "message": "...", "locale": "en", "session_id": "optional" }
```

Streaming: `POST /ai-api/v1/chat/stream` (SSE)

Health: `GET /ai-api/health`

## Admin API
```
Authorization: Bearer <ADMIN_API_KEY>

POST /ai-api/v1/admin/crawl
POST /ai-api/v1/admin/ingest/urls
POST /ai-api/v1/admin/ingest/upload
POST /ai-api/v1/admin/reindex
GET  /ai-api/v1/admin/documents
GET  /ai-api/v1/admin/analytics
DELETE /ai-api/v1/admin/documents/{doc_id}
```

## Deploy on Hetzner / Coolify host
```bash
cd /opt/msulemanhussain/services/ai-search
# create .env with strong ADMIN_API_KEY + PUBLIC_WIDGET_KEYS
docker compose up -d --build
curl -fsS http://127.0.0.1:8090/health

# Coolify Traefik file route (Docker labels alone may lose to PathPrefix(`/`))
bash scripts/install-traefik-route.sh

# Index portfolio sitemap
bash scripts/crawl-and-smoke.sh
```

Public path: `https://msulemanhussain.com/ai-api/...` (Traefik file provider → host `:8090`)

## Tests
```bash
pip install -r requirements.txt
pytest -q
```

## Resource budget (approx)
- api ≤ 900MB
- qdrant ≤ 512MB
- redis ≤ 96MB
