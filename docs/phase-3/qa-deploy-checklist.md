# Zero-to-Agent — QA + Deployment Checklist (Phase 3f)

## 1) Playwright QA (Critical)
- Page loads without console errors (desktop + mobile)
- Anchor navigation jumps to each section
- Reduced-motion enabled: animations disabled or reduced
- CTA → Apply/Reserve flow works (form + Stripe checkout)
- Stripe test checkout completes and redirects to success screen

## 2) Visual QA
- Capture screenshots:
  - 375×667 (mobile)
  - 768×1024 (tablet)
  - 1440×900 (desktop)
- Record 20–30s scroll video for motion review

## 3) Perf + Accessibility
- No CLS on hero section
- Keyboard navigation works (focus visible, logical order)
- Color contrast meets WCAG AA on text + buttons

## 4) Stripe + Webhook Smoke Tests
- Configure Stripe CLI and trigger test events:
  - `checkout.session.completed`
  - `charge.refunded`
- Verify attendee record updates, deposit status set, and refunds handled
- Confirm idempotency using duplicate webhook events

## 5) Remainder Authorization Flow (Manual Capture)
- Create remainder PaymentIntent at check-in
- Capture after event for Day 1 attendees
- Cancel authorization for no-shows

## 6) Deployment Checklist
- Vercel env vars set:
  - `APP_URL` (canonical public base URL, used for Stripe return URLs)
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `STRIPE_DEPOSIT_PRICE_ID`
  - `DATABASE_URL` (Prisma pooled/primary connection string)
  - `DIRECT_URL` (Prisma direct connection string)
  - `ADMIN_BASIC_AUTH_USER`
  - `ADMIN_BASIC_AUTH_PASS`
- Supabase Postgres reachable; Prisma connection validated
- Webhook endpoint configured in Stripe
- Basic auth protecting `/admin`

## 7) Go/No-Go Criteria
- No critical QA failures
- Stripe checkout + webhook pipeline verified
- Admin can authorize + capture remainder without errors
- Reduced-motion experience confirmed
