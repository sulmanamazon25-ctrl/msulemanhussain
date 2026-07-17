# Migration notes — WordPress → Founder OS

## Phase 0 backup (do in Coolify before DNS cutover)

1. Open Coolify → WordPress service for `msulemanhussain.com`.
2. Export / snapshot:
   - Database volume (or `mysqldump` from the DB container)
   - WordPress files / `wp-content` volume
3. Download copies locally (keep offline until cutover is stable).
4. Note current domain + SSL settings.

## Rollback

Redeploy the previous WordPress service from the snapshot and re-attach the domain.

## New stack

Next.js App Router app in this repo. Deploy as a Coolify application (Dockerfile or Nixpacks / Node build).
