# Phase 1g — Prisma + Stripe Spec (Supabase, Apply, Admin, Capacity)

## Focus
Make the Apply + payment flow **implementation-safe**: define the data model, Stripe integration, webhook behavior, admin auth, and capacity/waitlist behavior.

This subphase exists because earlier subphases assume a Supabase-first API/RLS approach and do not cover Prisma + Stripe.

## Inputs
- Offer constraints + pricing direction: `Plans/plan.md`
- Tech constraints: Next.js App Router + Vercel, Supabase Postgres, Prisma ORM, Stripe
- Existing Phase 1 root constraints (accessibility, motion, “no pixel-perfect clone”)

## Work
1. Lock the canonical funnel (RED TEAM: clarify “Apply”):
   - **Default assumption (unless overridden):** Apply form submits → immediately starts Stripe Checkout for **deposit** (seat reserved on successful payment).
   - If you choose “approval gate” later: Apply → admin approves → applicant gets Stripe link (this requires email automation; treat as Phase 2+ unless explicitly required).
2. Define data model (Prisma) — minimum viable tables:
   - `Event`
     - `id`, `slug`, `city`, `timezone`, `startAt`, `endAt`, `capacity`
     - `currency`, `listPriceCents`, `networkPriceCents`, `depositCents`
     - `isLive`, `isSoldOut` (derived or stored)
   - `Application`
     - `id`, `eventId`, `createdAt`, `updatedAt`
     - applicant: `firstName`, `lastName`, `email` (required), optional `linkedinUrl`, `company`, `role`
     - intent: `goal`/`useCase`/`experienceNotes` (keep minimal; avoid collecting unnecessary PII)
     - attribution: `utmSource`, `utmMedium`, `utmCampaign`, `utmTerm`, `utmContent`, `referrer`, `referralCodeUsed`
     - status: `status` enum (recommended: `submitted`, `payment_pending`, `paid`, `waitlisted`, `cancelled`, `refunded`)
     - admin: `adminNotes` (text), optional `reviewStatus` (`unreviewed`, `approved`, `rejected`)
   - `Payment`
     - `id`, `applicationId`, `createdAt`
     - Stripe ids: `stripeCheckoutSessionId` (unique), optional `stripePaymentIntentId`
     - amounts: `amountCents`, `currency`, `kind` (`deposit`/`full`)
     - status: `status` (`created`, `paid`, `failed`, `refunded`)
   - `StripeWebhookEvent` (idempotency)
     - `id` (Stripe event id), `createdAt`, `type`, `processedAt`
3. Stripe Checkout strategy (v1):
   - Use **Stripe Checkout Sessions** created server-side.
   - Attach `metadata: { applicationId, eventId, pricingTier }`.
   - Network code handling:
     - UI collects optional “network code”
     - server verifies against `NETWORK_CODE` env var and applies a configured Stripe **Coupon/Promotion** (store its id in env, e.g. `STRIPE_NETWORK_COUPON_ID`)
4. Webhooks (required, no “we’ll do later”):
   - Endpoint: `POST /api/stripe/webhook`
   - Verify signature with `STRIPE_WEBHOOK_SECRET` and raw request body.
   - Handle events (minimum):
     - `checkout.session.completed` → upsert `Payment` as `paid`; set `Application.status=paid`
     - `charge.refunded` (or `checkout.session.async_payment_failed` if you support async methods) → set `Payment.status=refunded`; set `Application.status=refunded`
   - Idempotency:
     - first write `StripeWebhookEvent` if not exists, then process; skip if already processed
5. Capacity + waitlist behavior:
   - Before creating a Stripe Checkout Session, check capacity for the `Event`.
   - If at capacity:
     - set `Application.status=waitlisted`
     - **do not** create Stripe session; show waitlist confirmation UX
6. Admin surface (minimum):
   - `/admin` list view: filter by `status`, search by email/name, show payment status
   - detail view: full application + internal notes + status transitions
   - CSV export (server-side; never expose DB url)
7. Admin auth (recommended v1):
   - Basic Auth via `middleware.ts` with env vars (e.g., `ADMIN_BASIC_AUTH_USER`, `ADMIN_BASIC_AUTH_PASS`)
   - Upgrade path: Auth.js allowlist or Supabase Auth + role table
8. Security + privacy (RED TEAM):
   - Never expose Supabase DB credentials or Prisma client in the browser
   - Treat all inbound webhooks and form posts as untrusted; validate with Zod
   - Minimize PII; document retention expectations for the pilot cohort
9. Validation plan (implementation-facing):
   - Stripe test mode + webhook forwarding via Stripe CLI (`stripe listen --forward-to ...`)
   - E2E: Apply form → redirect to Stripe Checkout (test key) → webhook updates application to `paid`

## Output
- Decision-complete funnel + data model spec (tables/enums, env vars, endpoints, webhook events).
- Capacity/waitlist behavior spec.
- Admin auth recommendation and upgrade path.

## Handoff
Hand off the spec to the implementation phase(s) so Apply + Stripe + admin can be built without revisiting product/security decisions.
