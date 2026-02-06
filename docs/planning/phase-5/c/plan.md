# Phase 5c — Admin Foundations (DB + APIs)

## Focus
Define and implement the minimum DB schema and admin API surface needed for a full ops admin UI, including referral code CRUD with audit logs.

## Inputs
- Prisma schema: `/Users/AR180/Desktop/Codespace/Z2A/prisma/schema.prisma`
- Existing admin endpoints and auth:
  - `/Users/AR180/Desktop/Codespace/Z2A/src/middleware.ts`
  - `/Users/AR180/Desktop/Codespace/Z2A/src/app/api/admin/attendees/route.ts`
  - `/Users/AR180/Desktop/Codespace/Z2A/src/app/api/admin/attendees/export/route.ts`

## Work
1. DB additions:
   - Add `Attendee.internalNotes` (nullable text).
   - Add `ReferralCodeAuditLog` model with:
     - referralCodeId, action, actor, reason, metadata, createdAt
2. Admin APIs:
   - `PATCH /api/admin/attendees/{id}` (seatStatus, applicationStatus, internalNotes)
   - Referral codes:
     - `GET /api/admin/referral-codes`
     - `POST /api/admin/referral-codes`
     - `PATCH /api/admin/referral-codes/{id}` (active toggle + required reason)
     - `GET /api/admin/referral-codes/{id}/audit`
3. Audit logging rules:
   - Every referral code mutation writes an audit entry.
   - Actor derived from basic auth username.

## Output
- Implemented DB schema + API routes to support Phase 5 admin UI.

## Handoff
Phase 5e uses these endpoints to build the admin UI.

