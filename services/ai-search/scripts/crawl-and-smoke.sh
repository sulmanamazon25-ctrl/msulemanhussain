#!/bin/bash
set -euo pipefail
cd /opt/msulemanhussain/services/ai-search
ADMIN_KEY=$(grep '^ADMIN_API_KEY=' .env | cut -d= -f2-)

echo "=== health ==="
curl -fsS http://127.0.0.1:8090/health
echo
curl -fsS https://msulemanhussain.com/ai-api/health
echo

echo "=== crawl ==="
RESP=$(curl -fsS -X POST 'http://127.0.0.1:8090/v1/admin/crawl?tenant_id=portfolio' \
  -H "Authorization: Bearer ${ADMIN_KEY}")
echo "$RESP"
JOB_ID=$(python3 -c 'import json,sys; print(json.loads(sys.argv[1])["job_id"])' "$RESP")

for i in $(seq 1 120); do
  STATUS_JSON=$(curl -fsS "http://127.0.0.1:8090/v1/admin/jobs/${JOB_ID}" \
    -H "Authorization: Bearer ${ADMIN_KEY}")
  STATE=$(python3 -c 'import json,sys; print(json.loads(sys.argv[1]).get("status",""))' "$STATUS_JSON")
  echo "[$i] $STATE mem=$(free -m | awk '/Mem:/{print $7}')MB avail"
  if [ "$STATE" = "done" ] || [ "$STATE" = "completed" ] || [ "$STATE" = "failed" ] || [ "$STATE" = "error" ]; then
    echo "$STATUS_JSON"
    break
  fi
  # If API died (OOM), stop
  if ! curl -fsS http://127.0.0.1:8090/health >/dev/null 2>&1; then
    echo "API unhealthy — check logs"
    docker compose logs --tail=50 api
    exit 1
  fi
  sleep 5
done

echo "=== documents ==="
curl -fsS 'http://127.0.0.1:8090/v1/admin/documents?tenant_id=portfolio' \
  -H "Authorization: Bearer ${ADMIN_KEY}" | python3 -c 'import sys,json; d=json.load(sys.stdin); print(type(d).__name__, len(d) if isinstance(d,list) else d)'

echo "=== sample chat ==="
curl -fsS -X POST 'http://127.0.0.1:8090/v1/chat' \
  -H 'Content-Type: application/json' \
  -H 'X-Tenant-Id: portfolio' \
  -H 'X-Widget-Key: portfolio-public-key' \
  -d '{"message":"What products does Suleman build?","locale":"en"}' | python3 -m json.tool | head -40
