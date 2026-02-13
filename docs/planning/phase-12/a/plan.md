# Phase 12a — Schema + Delivery-State Primitives

## Focus
Add minimal persistence required for deterministic automated sends: track each attendee/template dispatch state so cron/webhooks can be retried safely without duplicates.

## Inputs
- Existing schema: `prisma/schema.prisma`
- Existing email paths: `src/lib/email.ts`, `src/lib/email-templates.ts`
- Existing attendee lifecycle and webhook flow: `src/app/api/stripe/webhook/route.ts`

## Work
1. Extend Prisma schema with email delivery tracking model(s), e.g. `EmailDispatch` keyed by `(attendeeId, templateKey)` plus status/error timestamps.
2. Add enums for dispatch lifecycle states (`pending`, `sent`, `failed`, `skipped`) and channel/template identifiers.
3. Include metadata fields needed for idempotency and audit:
   - `lastAttemptAt`, `sentAt`, `errorMessage`, `providerMessageId`, `attemptCount`.
4. Generate Prisma client and verify no type regressions.
5. Define helper utilities in `src/lib/` for:
   - upsert/create dispatch record
   - atomic transition to sent/failed
   - query due dispatches.

## Output
- `prisma/schema.prisma` now contains:
  - `EmailDispatch` model
  - `EmailDispatchStatus` enum (`pending`, `sending`, `sent`, `failed`, `skipped`)
  - `EmailDispatchTemplate` enum (`deposit_confirmation`, `prework`, `venue`, `day1_prep`)
- Prisma client regenerated and schema pushed successfully.
- Shared dispatch helper layer implemented in `src/lib/email-dispatch.ts` for idempotent claim/send/fail/sent transitions.

## Handoff
Subphases b-d now consume `runDispatchForAttendee` and associated state transitions directly; no additional schema work needed.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Added dispatch schema model/enums and attendee relation in Prisma.
  - Added unique/index constraints for idempotency and list query performance.
  - Implemented dispatch primitives (`claimDispatchForSend`, `markDispatchSent`, `markDispatchFailed`, `runDispatchForAttendee`, `runDispatchById`).
- Commands run:
  - `npm run prisma:generate` — pass
  - `npm run db:push` — pass
- Blockers:
  - None.
- Next concrete steps:
  - Consume primitives from Stripe webhook automation (12b) and reminder cron path (12c).
