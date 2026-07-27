#!/bin/bash
set -euo pipefail

echo "=== coolify-proxy networks ==="
docker inspect coolify-proxy --format '{{range $k,$v := .NetworkSettings.Networks}}{{$k}}{{"\n"}}{{end}}'

echo "=== traefik static config ==="
ls -la /data/coolify/proxy/ || true
find /data/coolify/proxy -type f 2>/dev/null | head -40
echo "--- dynamic ---"
find /data/coolify/proxy -name '*.yml' -o -name '*.yaml' -o -name '*.toml' 2>/dev/null | while read -r f; do
  echo "FILE $f"
  head -80 "$f"
  echo
done

echo "=== msulemanhussain-web traefik labels ==="
docker inspect msulemanhussain-web --format '{{range $k,$v := .Config.Labels}}{{if eq (printf "%.7s" $k) "traefik"}}{{$k}}={{$v}}{{"\n"}}{{end}}{{end}}'

echo "=== ai-search-api traefik labels ==="
docker inspect ai-search-api --format '{{range $k,$v := .Config.Labels}}{{if eq (printf "%.7s" $k) "traefik"}}{{$k}}={{$v}}{{"\n"}}{{end}}{{end}}'

echo "=== coolify-proxy on g5 network? ==="
docker network inspect g5t1u52ej20yqweuarrspujb --format '{{range .Containers}}{{.Name}} {{end}}' | tr ' ' '\n' | grep -E 'coolify-proxy|ai-search|msuleman' || true

echo "=== try query traefik api ==="
docker exec coolify-proxy wget -qO- http://127.0.0.1:8080/api/http/routers 2>/dev/null | python3 -c '
import sys,json
try:
  d=json.load(sys.stdin)
except Exception as e:
  print("parse fail", e); sys.exit(0)
print("routers", len(d))
for r in d:
  name=r.get("name","")
  if "ai-" in name or "msuleman" in name.lower() or "ai_search" in name:
    print(name, r.get("rule"), r.get("priority"), r.get("status"))
' || echo "no traefik api"
