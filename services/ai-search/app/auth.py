from __future__ import annotations

from fastapi import Header, HTTPException

from app.config import get_settings

TENANTS = {
    "portfolio": {
        "name": "msulemanhussain.com",
        "allowed_hosts": ["msulemanhussain.com", "www.msulemanhussain.com"],
    },
}


def require_admin(authorization: str | None = Header(default=None)) -> None:
    settings = get_settings()
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing admin bearer token")
    token = authorization.removeprefix("Bearer ").strip()
    if token != settings.admin_api_key:
        raise HTTPException(status_code=403, detail="Invalid admin token")


def require_widget(
    x_tenant_id: str = Header(default="portfolio"),
    x_widget_key: str = Header(default=""),
) -> str:
    settings = get_settings()
    tenant = (x_tenant_id or settings.default_tenant).strip()
    keys = settings.widget_key_map()
    expected = keys.get(tenant)
    if not expected or x_widget_key != expected:
        raise HTTPException(status_code=401, detail="Invalid widget key / tenant")
    if tenant not in TENANTS:
        # allow unknown tenants structurally later; for now restrict
        raise HTTPException(status_code=404, detail="Unknown tenant")
    return tenant
