# Migration notes — WordPress → Founder World (Coolify)

## Live cutover (done)

- **DNS:** `msulemanhussain.com` → `46.62.226.89` (Coolify host)
- **App:** Next.js container `msulemanhussain-web` on network `g5t1u52ej20yqweuarrspujb`
- **Compose:** `/opt/msulemanhussain/docker-compose.coolify.yml`
- **Image:** `msulemanhussain:latest` built from GitHub `main`
- **WordPress:** `wordpress-g5t1u52ej20yqweuarrspujb` stopped (volumes kept for rollback); restart policy set to `no`

## Redeploy

```bash
ssh root@46.62.226.89
cd /opt/msulemanhussain
git pull origin main
docker build -t msulemanhussain:latest .
docker compose -f docker-compose.coolify.yml up -d
```

## Rollback to WordPress

```bash
docker compose -f /opt/msulemanhussain/docker-compose.coolify.yml down
docker start wordpress-g5t1u52ej20yqweuarrspujb
docker update --restart=unless-stopped wordpress-g5t1u52ej20yqweuarrspujb
```

## Note on Vercel

An earlier preview was deployed to `msulemanhussain.vercel.app`. Production traffic for the custom domain is on **Coolify**, not Vercel.
