# Zero-to-Agent (Toronto Pilot)

Scaffolding repo for the Zero-to-Agent weekend event funnel (apply → $100 deposit → webhook → admin ops).

Planning specs live in `docs/phase-3/` and `docs/planning/phase-3/`.

## What Exists

- Next.js App Router project (TypeScript)
- Prisma schema + client setup (`prisma/schema.prisma`, `src/lib/db.ts`)
- Stripe integration:
  - `POST /api/apply` creates/updates an attendee record and returns a Stripe Checkout URL for the $100 deposit
  - `POST /api/stripe/webhook` verifies Stripe signatures and updates attendee payment state idempotently
- Admin foundation:
  - Basic auth middleware for `/admin/*` and `/api/admin/*`
  - `GET /api/admin/attendees` (JSON list)
  - `GET /api/admin/attendees/export` (CSV download)

The public landing page UI and motion system are intentionally deferred to a follow-on agent.

## Local Setup

1. Install deps:

```bash
npm install
```

2. Configure env:

```bash
cp .env.example .env.local
```

3. Prisma (requires DB connectivity):

```bash
npm run prisma:generate
npm run db:push
```

4. Run:

```bash
npm run dev
```

## Stripe Local Webhook

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

