# Zero-to-Agent (Toronto Pilot)

Scaffolding repo for the Zero-to-Agent weekend event funnel (apply → $100 deposit → webhook → admin ops).

Planning specs live in `docs/planning/`.

## What Exists

- Next.js App Router project (TypeScript)
- Prisma schema + client setup (`prisma/schema.prisma`, `src/lib/db.ts`)
- Stripe integration:
  - `POST /api/apply` creates/updates an attendee record and returns a Stripe Checkout URL for the $100 deposit
  - `POST /api/stripe/webhook` verifies Stripe signatures and updates attendee payment state idempotently
- Waitlist + seat management:
  - `GET /api/seats` (remaining seats + sold-out status)
  - `POST /api/waitlist` (public waitlist capture)
  - `GET /api/admin/waitlist`, `POST /api/admin/waitlist/:id/convert` (admin waitlist ops)
- Admin email operations:
  - `GET/PUT /api/admin/email-settings`
  - `POST /api/admin/email/send-batch`
  - `GET /api/admin/email/dispatches`
  - `POST /api/admin/email/dispatches/retry`
- Scheduled reminder pipeline:
  - `GET /api/internal/email/reminders/run` (cron-triggered, `Authorization: Bearer $CRON_SECRET`)
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

## Resend Email Setup

After a successful deposit payment webhook, the app can send automated attendee emails.

1. Verify your sender domain in Resend.
2. Add these env vars:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL` (must match your verified domain, or sends fail with 403)
   - `RESEND_REPLY_TO_EMAIL` (optional)
3. Keep Stripe webhook forwarding enabled so `checkout.session.completed` is delivered to:
   - `POST /api/stripe/webhook`

If `RESEND_API_KEY` is not configured, payment processing still works and email sending is skipped.

## Cron Reminder Setup (Vercel)

This repo includes `vercel.json` with a cron entry for:

- `/api/internal/email/reminders/run` (hourly)

Required env:

- `CRON_SECRET`

The route verifies:

- `Authorization: Bearer $CRON_SECRET`

See `docs/planning/phase-12/ops-runbook.md` for operator smoke checks.
