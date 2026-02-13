# Phase 12 Ops Runbook — Email Automation + Reminder Smoke

## Required Environment

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (verified domain)
- `CRON_SECRET`
- Existing Stripe + DB + admin auth envs from `.env.example`

## Deploy/Cron Configuration

- `vercel.json` defines cron for:
  - `GET /api/internal/email/reminders/run`
  - schedule: `0 * * * *` (hourly, UTC)
- Vercel sends the `Authorization` header with `Bearer $CRON_SECRET` when configured.

## Smoke Checklist

## 1) Post-Deposit Automation (welcome/prework)

1. Complete a deposit checkout for a test attendee.
2. Ensure Stripe webhook is delivered to `POST /api/stripe/webhook`.
3. Open admin Email tab and verify dispatch entries exist for:
   - `deposit_confirmation`
   - `prework`
4. Confirm dispatch status transitions to `sent` (or `failed` with error details).

## 2) Reminder Pipeline (venue/day1)

1. Trigger the reminder route manually:

```bash
curl -i \
  -H "Authorization: Bearer $CRON_SECRET" \
  https://<your-domain>/api/internal/email/reminders/run
```

2. Confirm response includes:
   - `ok: true`
   - `dueTemplates` list
   - `summary` object per template with `sent/failed/alreadySent/inProgress`
3. Verify dispatch records update in admin Email tab.

## 3) Retry Failed Dispatches

1. In admin Email tab, filter `failed`.
2. Use `Retry failed dispatches` or row-level `Retry`.
3. Verify statuses update and errors clear on success.

## 4) Production Quality Gates

Run in CI or a host with browser permissions:

```bash
npm run lint
npm run typecheck
npm run build
npm run db:push
npm run test:e2e
```

If `test:e2e` fails in restricted environments, rerun in CI/host with:
- DNS access to configured base URL
- Chromium launch permissions

## Failure Triage

- `401 Unauthorized` from reminders route:
  - verify `CRON_SECRET` and Authorization header.
- `403` from Resend:
  - verify `RESEND_FROM_EMAIL` domain is verified in Resend.
- Dispatch stuck in `failed`:
  - inspect `errorMessage` in admin dispatch table, then retry after config fix.
