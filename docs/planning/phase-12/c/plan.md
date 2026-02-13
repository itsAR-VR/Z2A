# Phase 12c — Scheduled Reminder Pipeline (Venue + Day1)

## Focus
Move venue/day1 reminders from ad-hoc admin sends to schedule-driven jobs with safe re-run semantics.

## Inputs
- Phase 12a dispatch tracking
- Phase 12b send orchestration patterns
- Existing templates: `venue`, `day1_prep` in `src/lib/email-templates.ts`
- Existing admin settings storage: `EmailSetting`

## Work
1. Create server route(s) for internal scheduled dispatch (cron-invoked), e.g. `/api/internal/email/reminders/run`.
2. Implement auth guard for internal route (cron secret/token) distinct from public/admin routes.
3. Build reminder selection logic:
   - choose eligible paid attendees
   - compute due templates by event date/time windows
   - consult dispatch table to prevent duplicates.
4. Execute bounded send loop with timeout/error capture.
5. Return deterministic run summary (eligible/sent/failed/skipped) for logs/monitoring.
6. Document Vercel cron configuration entries and required env vars.

## Output
- Internal reminder runner implemented at `GET /api/internal/email/reminders/run`.
- Route enforces bearer auth with `CRON_SECRET` and returns deterministic summary payload per template.
- Reminder sends are idempotent via dispatch tracking and safe to rerun.
- Vercel cron schedule added in `vercel.json` with hourly trigger.

## Handoff
Subphase d exposes this dispatch data model in admin with filters/retry controls.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Added due-template resolver (`getDueReminderTemplates`) keyed to workshop timeline windows.
  - Added bounded attendee loop and truncation signaling for ops observability.
  - Added cron wiring and env contract updates (`CRON_SECRET` in env schema/examples).
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
- Blockers:
  - None.
- Next concrete steps:
  - Surface dispatch statuses and retries in admin (12d).
