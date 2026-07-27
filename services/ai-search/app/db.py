from __future__ import annotations

import json
import sqlite3
from contextlib import contextmanager
from pathlib import Path

from app.config import get_settings


SCHEMA = """
CREATE TABLE IF NOT EXISTS documents (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  source_type TEXT NOT NULL,
  source_uri TEXT NOT NULL,
  title TEXT,
  created_at REAL NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_documents_tenant ON documents(tenant_id);

CREATE TABLE IF NOT EXISTS analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id TEXT NOT NULL,
  query TEXT NOT NULL,
  locale TEXT,
  hit INTEGER NOT NULL,
  latency_ms INTEGER,
  created_at REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS failed_searches (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tenant_id TEXT NOT NULL,
  query TEXT NOT NULL,
  reason TEXT,
  created_at REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  tenant_id TEXT NOT NULL,
  kind TEXT NOT NULL,
  status TEXT NOT NULL,
  detail TEXT,
  created_at REAL NOT NULL,
  updated_at REAL NOT NULL
);
"""


def _connect() -> sqlite3.Connection:
    settings = get_settings()
    Path(settings.data_dir).mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(settings.sqlite_path, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with _connect() as conn:
        conn.executescript(SCHEMA)
        conn.commit()


@contextmanager
def db():
    conn = _connect()
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def record_analytics(tenant_id: str, query: str, locale: str, hit: bool, latency_ms: int) -> None:
    import time

    with db() as conn:
        conn.execute(
            "INSERT INTO analytics(tenant_id, query, locale, hit, latency_ms, created_at) VALUES (?,?,?,?,?,?)",
            (tenant_id, query, locale, 1 if hit else 0, latency_ms, time.time()),
        )


def record_failed(tenant_id: str, query: str, reason: str) -> None:
    import time

    with db() as conn:
        conn.execute(
            "INSERT INTO failed_searches(tenant_id, query, reason, created_at) VALUES (?,?,?,?)",
            (tenant_id, query, reason, time.time()),
        )


def upsert_document(doc_id: str, tenant_id: str, source_type: str, source_uri: str, title: str) -> None:
    import time

    with db() as conn:
        conn.execute(
            """
            INSERT INTO documents(id, tenant_id, source_type, source_uri, title, created_at)
            VALUES (?,?,?,?,?,?)
            ON CONFLICT(id) DO UPDATE SET title=excluded.title, source_uri=excluded.source_uri
            """,
            (doc_id, tenant_id, source_type, source_uri, title, time.time()),
        )


def list_documents(tenant_id: str) -> list[dict]:
    with db() as conn:
        rows = conn.execute(
            "SELECT id, source_type, source_uri, title, created_at FROM documents WHERE tenant_id=? ORDER BY created_at DESC",
            (tenant_id,),
        ).fetchall()
        return [dict(r) for r in rows]


def delete_document(tenant_id: str, doc_id: str) -> bool:
    with db() as conn:
        cur = conn.execute("DELETE FROM documents WHERE tenant_id=? AND id=?", (tenant_id, doc_id))
        return cur.rowcount > 0


def analytics_summary(tenant_id: str) -> dict:
    with db() as conn:
        total = conn.execute(
            "SELECT COUNT(*) AS c FROM analytics WHERE tenant_id=?", (tenant_id,)
        ).fetchone()["c"]
        hits = conn.execute(
            "SELECT COUNT(*) AS c FROM analytics WHERE tenant_id=? AND hit=1", (tenant_id,)
        ).fetchone()["c"]
        failed = conn.execute(
            "SELECT COUNT(*) AS c FROM failed_searches WHERE tenant_id=?", (tenant_id,)
        ).fetchone()["c"]
        recent_failed = conn.execute(
            "SELECT query, reason, created_at FROM failed_searches WHERE tenant_id=? ORDER BY id DESC LIMIT 20",
            (tenant_id,),
        ).fetchall()
        return {
            "total_queries": total,
            "hits": hits,
            "failed": failed,
            "recent_failed": [dict(r) for r in recent_failed],
        }


def create_job(job_id: str, tenant_id: str, kind: str, status: str = "queued", detail: str = "") -> None:
    import time

    now = time.time()
    with db() as conn:
        conn.execute(
            "INSERT INTO jobs(id, tenant_id, kind, status, detail, created_at, updated_at) VALUES (?,?,?,?,?,?,?)",
            (job_id, tenant_id, kind, status, detail, now, now),
        )


def update_job(job_id: str, status: str, detail: str = "") -> None:
    import time

    with db() as conn:
        conn.execute(
            "UPDATE jobs SET status=?, detail=?, updated_at=? WHERE id=?",
            (status, detail, time.time(), job_id),
        )


def get_job(job_id: str) -> dict | None:
    with db() as conn:
        row = conn.execute("SELECT * FROM jobs WHERE id=?", (job_id,)).fetchone()
        return dict(row) if row else None
