# Zero-to-Agent — Apply + Payment Funnel Spec (Phase 3d)

## Decisions (Locked)
- Funnel: Apply → $500 deposit → remainder authorized at check-in → capture after event for Day 1 attendees.
- Backend: Supabase Postgres with Prisma ORM.
- Admin gating: basic auth (server-only DB access).
- Referral payouts: none for pilot (discount only via network code).
- Refund policy: full refund if unsatisfied by end of Day 2.

## Env Vars (Required)
- `APP_URL` (canonical public base URL, used for Stripe return URLs)
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_DEPOSIT_PRICE_ID`
- `DATABASE_URL` (Prisma pooled/primary connection string)
- `DIRECT_URL` (Prisma direct connection string)
- `ADMIN_BASIC_AUTH_USER`
- `ADMIN_BASIC_AUTH_PASS`

## User Flow (Happy Path)
1) Visitor reads landing page and clicks **Apply / Reserve Seat**.
2) Application form collects basic info + use case intent.
3) After form submission, user proceeds to Stripe Checkout to pay the $500 deposit.
4) On successful checkout, user lands on confirmation screen and receives email receipt.
5) On Day 1 check-in, staff creates/initiates a remainder PaymentIntent (manual capture) for the remaining balance.
6) After the event, remainder is captured for Day 1 attendees.

## Application Form (Minimum Fields)
- First name
- Last name
- Email
- Role / title
- Company (optional)
- LinkedIn (optional)
- Use-case description (short free text)
- Do you have a network code? (string)

## Pricing Rules
- List price: $1,500 USD
- Network code price: $1,000 USD
- Deposit: $500 USD
- Remainder: $1,000 (list) or $500 (network)
- Deposit is always $500 USD (no discount applied to deposit)
- Network code applies only to the remainder

## Stripe Setup
- Product: `Zero-to-Agent Toronto Pilot`
- Price (deposit): $500 USD
- Checkout mode: `payment`
- Success URL: `/apply/success`
- Cancel URL: `/apply`
- Metadata: `attendee_id`, `network_code`, `persona=PM_ADVANCED`

### Remainder Authorization + Capture
- On Day 1 check-in, create a PaymentIntent with `capture_method=manual` for remainder amount.
- Store `remainder_payment_intent_id` and mark status as `authorized`.
- After event completion, capture the PaymentIntent for attendees who checked in Day 1.
- For no-shows, cancel the PaymentIntent authorization.

## Webhooks (Idempotent)
- `checkout.session.completed`
  - Create/confirm attendee record
  - Mark deposit paid
  - Store `stripe_checkout_session_id` + `stripe_payment_intent_id`
- `charge.refunded` (or `payment_intent.refunded`)
  - Mark refund status; set `deposit_status=refunded`
  - Disqualify referral attribution

**Idempotency:**
- Store `stripe_event_id` in `stripe_events` table to prevent double-processing.

## Data Model (Prisma + Supabase Postgres)

### Table: `attendees`
- `id` (uuid, pk)
- `created_at`, `updated_at`
- `first_name`, `last_name`, `email`
- `role_title`, `company`, `linkedin_url`
- `use_case` (text)
- `persona` (enum: `PM_ADVANCED`)
- `network_code` (nullable)
- `application_status` (enum: `submitted`, `approved`, `declined`) — default `approved` for pilot
- `seat_status` (enum: `reserved`, `attended_day1`, `attended_day2`, `no_show`)
- `deposit_amount`, `deposit_currency`, `deposit_status` (enum: `unpaid`, `paid`, `refunded`)
- `deposit_payment_intent_id`, `checkout_session_id`
- `remainder_amount`, `remainder_currency`, `remainder_status` (enum: `none`, `authorized`, `captured`, `canceled`, `refunded`)
- `remainder_payment_intent_id`, `remainder_authorized_at`, `remainder_captured_at`
- `referral_attribution` (nullable string)

### Table: `referral_codes`
- `id` (uuid, pk)
- `code` (string, unique)
- `type` (enum: `network`)
- `active` (boolean)
- `created_at`

### Table: `stripe_events`
- `id` (uuid, pk)
- `stripe_event_id` (string, unique)
- `event_type` (string)
- `received_at`

## Admin (Basic Auth)
- `/admin/attendees`
  - List, search, filter by payment status, export CSV
- `/admin/check-in`
  - Mark Day 1 attendance
  - Create remainder PaymentIntent (manual capture)
- `/admin/payments`
  - Capture or cancel remainder PaymentIntents
  - Issue refunds
- `/admin/referrals`
  - View code usage and attribution

## Error Handling
- Webhook failures are logged and retried (Stripe default + internal error log).
- Manual override capability in admin for edge cases.

## Validation Checklist
- Stripe CLI webhook simulation updates attendee status correctly.
- Duplicate `checkout.session.completed` events do not create duplicate attendee records.
- Remainder capture flow works end-to-end with manual capture.
- Refund event updates status and removes referral attribution.
