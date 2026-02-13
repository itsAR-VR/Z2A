# Phase 12 — Production Email Ops Automation + Launch Verification

## Purpose
Operationalize Phase 11’s waitlist/email foundation into a reliable production communication system: automatic welcome and reminder sequences, send-state observability, and release verification that can run outside the current sandbox constraints.

## Context
Phase 11 delivered the core mechanics: waitlist capture/conversion, admin email settings, three templates, and batch send controls. Remaining risk is operational, not UI: manual sends can be missed, delivery state is not persisted per attendee/template, and local Playwright remains blocked by host DNS/browser permissions.

The user has explicitly decided **not** to add public waitlist rate limiting in this phase transition.

## Repo Reality Check (RED TEAM)

- What exists today:
  - `prisma/schema.prisma` includes `EmailDispatch`, `EmailDispatchStatus`, and `EmailDispatchTemplate`.
  - Automated dispatch primitives exist in `src/lib/email-dispatch.ts`.
  - Stripe webhook automation is wired in `src/app/api/stripe/webhook/route.ts`.
  - Internal reminder runner exists at `src/app/api/internal/email/reminders/run/route.ts`.
  - Admin delivery status + retry APIs/UI exist under `src/app/api/admin/email/dispatches/route.ts`, `src/app/api/admin/email/dispatches/retry/route.ts`, and `src/components/admin/EmailSender.tsx`.
  - Cron schedule is declared in `vercel.json` and `CRON_SECRET` is present in `.env.example` / `src/lib/env.ts`.
- What this phase assumes:
  - Existing Phase 11 behavior remains source of truth for templates/settings (`EmailSetting` + `email-templates.ts`).
  - Dispatch status is the only dedupe source for post-deposit and reminder sends (no external queue in v1).
  - Playwright sandbox constraints remain unresolved locally; production-host verification is required for browser E2E.
- Verified touch points:
  - `prisma/schema.prisma`
  - `src/lib/email-dispatch.ts`
  - `src/app/api/stripe/webhook/route.ts`
  - `src/app/api/internal/email/reminders/run/route.ts`
  - `src/app/api/admin/email/dispatches/route.ts`
  - `src/app/api/admin/email/dispatches/retry/route.ts`
  - `src/app/api/admin/email/send-batch/route.ts`
  - `src/components/admin/EmailSender.tsx`
  - `src/lib/env.ts`
  - `README.md`
  - `vercel.json`

## Concurrent Phases

| Phase | Status | Overlap | Coordination |
|-------|--------|---------|--------------|
| Phase 11 | Complete (uncommitted working tree) | `src/lib/email.ts`, `src/lib/email-templates.ts`, admin email APIs/UI, webhook | Build directly on current Phase 11 state; do not revert existing email/waitlist behavior. |
| Phase 10 | Complete | shared apply/hero/admin surfaces | Treat as baseline UX; Phase 12 should avoid broad UI refactors. |

## Coordination Notes (Multi-Agent)

- Last-10-phase scan confirms overlap with Phase 11 on:
  - `prisma/schema.prisma`
  - `src/app/api/stripe/webhook/route.ts`
  - `src/app/api/admin/email/send-batch/route.ts`
  - `src/components/admin/EmailSender.tsx`
  - `README.md`, `.env.example`, `src/lib/env.ts`
- Resolution strategy used:
  - Re-read current file state before each edit.
  - Layer Phase 12 behavior on top of Phase 11 primitives; no reversions of waitlist/admin/email functionality.
  - Keep all new automation paths using shared template/config sources to avoid divergence.

## Objectives
* [x] Automate post-payment attendee communication (welcome/prework) without manual admin action
* [x] Automate time-based event reminders (venue + day1 prep) with idempotent delivery
* [x] Add delivery-state tracking so operators can see what sent, failed, and retried
* [x] Add production-grade verification/runbook steps for email + E2E smoke in a capable environment

## Constraints
- Keep current message content system (`EmailSetting`, `email-templates.ts`) as source of truth.
- Preserve existing admin auth model and route partitioning (`/api/admin/*` protected by middleware).
- All automated send paths must be idempotent and retry-safe.
- No public waitlist rate limiting work in this phase (explicitly deferred by user).
- Avoid introducing queue infrastructure unless unavoidable; prefer Vercel cron + deterministic DB tracking first.

## Success Criteria
- [x] Deposit completion triggers exactly-once automated welcome/prework send per attendee.
- [x] Reminder jobs can be triggered on schedule and are safe to rerun without duplicate sends.
- [x] Admin can view per-template send status (sent/failed/pending) and retry failures.
- [x] Delivery failures are captured with actionable error messages (not swallowed logs only).
- [x] `npm run lint`, `npm run typecheck`, `npm run build` pass after Phase 12 changes.
- [x] A production-host verification checklist exists and is executable (including Playwright smoke path outside sandbox).

## Subphase Index
* a — Schema + delivery-state primitives
* b — Automated post-deposit welcome/prework send
* c — Scheduled reminder pipeline (venue/day1)
* d — Admin delivery-status + retry controls
* e — Production verification runbook + smoke checklist

## RED TEAM Findings (Gaps / Weak Spots)

### Highest-risk failure modes
- Missing template settings can cause reminder/send churn with repeated failures.
  - Mitigation: `runDispatchForAttendee` validates template requirements and persists failure state with explicit error message.
- Duplicate webhook or repeated cron invocations could re-send messages.
  - Mitigation: `EmailDispatch` unique key on `(attendeeId, template)` + claim transition (`pending/failed -> sending`) prevents duplicates.

### Performance / timeouts
- Batch/admin send loops could exceed safe request budgets.
  - Mitigation: recipient cap (`MAX_RECIPIENTS=200`) and per-send timeout (`SEND_TIMEOUT_MS=15000`) in `send-batch` route.
- Cron runs over large attendee sets can grow unbounded.
  - Mitigation: reminder runner uses `MAX_ATTENDEES_PER_RUN=200` and returns `truncated=true` signal.

### Security / permissions
- Internal reminder route exposure risk.
  - Mitigation: strict bearer-token guard on `CRON_SECRET` in `/api/internal/email/reminders/run`.
- Admin dispatch controls must stay admin-only.
  - Mitigation: routes remain under `/api/admin/*` with existing middleware auth.

### Testing / validation
- Local Playwright failures are environment-level, not logic regressions.
  - Mitigation: keep local compile/type/lint gates green and route browser verification to production-capable runner per runbook.

## Assumptions (Agent)

- `depositStatus = paid` continues to define the recipient pool for reminder and batch messaging (confidence ~95%).
  - Mitigation check: if ops wants attendance-based segmentation, add a new dispatch filter layer in next phase.
- Hourly cron frequency (`0 * * * *`) is sufficient for venue/day1 reminders (confidence ~92%).
  - Mitigation check: if send windows need tighter SLAs, move to 15-minute cadence and keep idempotent dedupe.
- No external queue is needed at current seat cap scale (confidence ~91%).
  - Mitigation check: if cohorts exceed current cap materially, switch from in-request sends to queue workers.

## Phase Summary (running)

- 2026-02-11 05:27 UTC — Implemented Phase 12 automation stack: dispatch schema/primitives, webhook-triggered sends, cron reminder route, admin dispatch visibility/retry, and runbook docs (files: `prisma/schema.prisma`, `src/lib/email-dispatch.ts`, `src/app/api/stripe/webhook/route.ts`, `src/app/api/internal/email/reminders/run/route.ts`, `src/app/api/admin/email/dispatches/route.ts`, `src/app/api/admin/email/dispatches/retry/route.ts`, `src/app/api/admin/email/send-batch/route.ts`, `src/components/admin/EmailSender.tsx`, `src/lib/env.ts`, `.env.example`, `README.md`, `docs/planning/phase-12/ops-runbook.md`, `vercel.json`).
- 2026-02-11 05:31 UTC — Validation snapshot: `npm run lint` pass, `npm run typecheck` pass, `npm run build` pass. `npm run test:e2e` failed in sandbox due DNS resolution (`ENOTFOUND zerotoagent.com`) and Chromium launch permission error (`bootstrap_check_in ... Permission denied (1100)`).
