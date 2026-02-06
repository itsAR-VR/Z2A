# Phase 4b — Admin Data + API Deltas (Internal Notes + Referral Audit Logs)

## Focus
Specify the minimum database and API additions required to support a full ops admin UI, including referral code CRUD with audit logs.

## Inputs
- Existing Prisma schema: `/Users/AR180/Desktop/Codespace/Z2A/prisma/schema.prisma`
- Existing admin APIs:
  - `/Users/AR180/Desktop/Codespace/Z2A/src/app/api/admin/attendees/route.ts`
  - `/Users/AR180/Desktop/Codespace/Z2A/src/app/api/admin/attendees/export/route.ts`
- Existing auth middleware: `/Users/AR180/Desktop/Codespace/Z2A/src/middleware.ts`
- Phase 4a output: admin UI requirements + field needs

## Work
1. DB model deltas (Prisma):
   - Add `Attendee.internalNotes` (nullable text).
   - Add a new `ReferralCodeAuditLog` model:
     - referralCodeId (FK)
     - action enum: created/updated/deactivated/reactivated
     - actor (basic auth username)
     - reason (required for deactivate/reactivate)
     - metadata JSON (optional)
     - createdAt timestamp
2. Admin API deltas (all basic-auth protected):
   - Attendee updates:
     - `PATCH /api/admin/attendees/{id}` for whitelisted fields:
       - `seatStatus`, `applicationStatus`, `internalNotes`
   - Referral code CRUD:
     - `GET /api/admin/referral-codes`
     - `POST /api/admin/referral-codes`
     - `PATCH /api/admin/referral-codes/{id}` (active toggle + reason)
     - `GET /api/admin/referral-codes/{id}/audit`
3. Audit behavior:
   - Every referral code mutation writes an audit log row.
   - Actor is derived from the authenticated username (basic auth).
4. API contract documentation:
   - Request/response JSON examples for each route.
   - Validation rules (Zod schemas).
   - Error codes for common failures (duplicate code, missing reason, etc.).

## Output
- A decision-complete admin API + data spec that a follow-on implementer can apply directly.
- Clear list of files that will be modified/added when implementing Phase 4b.

## Handoff
Phase 4e (Admin UI checklist) depends on these API shapes and field names.

