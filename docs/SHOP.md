# Self-hosted shop (Stripe + Postgres)

## Routes

- `/en/shop` — digital products
- `/en/book` — personal assistance / live call packages
- `/admin` — password-protected admin (listings, sessions, orders)
- `/api/stripe/webhook` — Stripe webhooks

## Coolify / server setup

1. Set strong secrets (see [env.shop.example](env.shop.example)):
   - `POSTGRES_PASSWORD`
   - `DATABASE_URL=postgres://shop:<POSTGRES_PASSWORD>@postgres:5432/msulemanhussain_shop`
   - `ADMIN_PASSWORD`, `SESSION_SECRET`
   - `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - SMTP vars for receipts (optional but recommended)
2. Deploy with `docker-compose.coolify.yml` (adds `postgres` + upload volume).
3. In Stripe Dashboard → Developers → Webhooks:
   - Endpoint: `https://msulemanhussain.com/api/stripe/webhook`
   - Event: `checkout.session.completed`
4. Open `/admin`, publish digital products and confirm seeded session packages (Quick Assist / Working Session / Deep Dive).

Migrations and default session packages run automatically on app boot when `DATABASE_URL` is set.
