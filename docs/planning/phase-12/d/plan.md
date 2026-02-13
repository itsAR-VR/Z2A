# Phase 12d — Admin Delivery Status + Retry Controls

## Focus
Give operators transparent delivery status per attendee/template and one-click retry for failed sends.

## Inputs
- Dispatch data model + helpers from 12a
- Automated send flows from 12b/12c
- Existing admin email surface: `src/components/admin/EmailSender.tsx`
- Existing admin route conventions: `/api/admin/*`

## Work
1. Add admin read API for dispatch records with filters (template, status, date window, failed-only).
2. Add admin retry API endpoint:
   - accepts dispatch id(s)
   - retries only allowed states (`failed`, optionally `pending` with stale attempt)
   - updates dispatch state atomically.
3. Extend email admin UI with a delivery log table:
   - recipient, template, status, attempt count, last error, last attempt time
   - retry action for failed rows.
4. Ensure retry action reuses same send primitives as automated pipelines.
5. Validate keyboard/accessibility parity with existing admin components.

## Output
- Admin dispatch visibility API available at `GET /api/admin/email/dispatches` with template/status/search/failed-only filters.
- Admin retry API available at `POST /api/admin/email/dispatches/retry`.
- `src/components/admin/EmailSender.tsx` now includes Delivery Status + Retry controls with row-level and failed-only retry actions.
- `src/app/api/admin/email/send-batch/route.ts` now routes sends through dispatch primitives and returns richer result categories (`alreadySent`, `skipped`, `inProgress`).

## Handoff
Subphase e finalizes production verification checklist and review artifact.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Added admin dispatch listing endpoint with attendee joins and normalized timestamps.
  - Added retry endpoint with request validation and summary reporting.
  - Integrated new delivery status UI into existing email admin surface without regressing settings/batch-send behavior.
  - Ensured retries and batch sends use the same idempotent dispatch path.
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
- Blockers:
  - None.
- Next concrete steps:
  - Finalize ops runbook and phase review evidence (12e).
