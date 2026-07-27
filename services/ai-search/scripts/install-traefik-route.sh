#!/bin/bash
# Install Traefik file route for /ai-api (Coolify-compatible; same pattern as trendpilot.yaml)
set -euo pipefail

cat > /data/coolify/proxy/dynamic/ai-search.yaml <<'EOF'
# AI Search API — path-prefix on portfolio domain.
# Routes to host-published port 8090 so Coolify apps stay untouched.
http:
  middlewares:
    ai-search-strip:
      stripPrefix:
        prefixes:
          - /ai-api
    ai-search-redirect:
      redirectScheme:
        scheme: https
        permanent: true
  routers:
    ai-search-http:
      rule: "Host(`msulemanhussain.com`) && PathPrefix(`/ai-api`)"
      entryPoints:
        - http
      middlewares:
        - ai-search-redirect
      service: ai-search
      priority: 1000
    ai-search-http-www:
      rule: "Host(`www.msulemanhussain.com`) && PathPrefix(`/ai-api`)"
      entryPoints:
        - http
      middlewares:
        - ai-search-redirect
      service: ai-search
      priority: 1000
    ai-search:
      rule: "Host(`msulemanhussain.com`) && PathPrefix(`/ai-api`)"
      entryPoints:
        - https
      middlewares:
        - ai-search-strip
      service: ai-search
      priority: 1000
      tls:
        certResolver: letsencrypt
    ai-search-www:
      rule: "Host(`www.msulemanhussain.com`) && PathPrefix(`/ai-api`)"
      entryPoints:
        - https
      middlewares:
        - ai-search-strip
      service: ai-search
      priority: 1000
      tls:
        certResolver: letsencrypt
  services:
    ai-search:
      loadBalancer:
        servers:
          - url: "http://host.docker.internal:8090"
EOF

chmod 600 /data/coolify/proxy/dynamic/ai-search.yaml
echo "wrote ai-search.yaml"
sleep 2
curl -fsS https://msulemanhussain.com/ai-api/health
echo
curl -fsSI https://msulemanhussain.com/ai-api/health | head -15
