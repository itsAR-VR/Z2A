# Phase 12e — Production Verification Runbook + Smoke Checklist

## Focus
Close the execution loop with a runbook that validates automated email operations and E2E smoke in an environment that supports DNS + browser launch.

## Inputs
- Outputs from 12a-12d
- Phase 11/12 known environment constraints (`npm run test:e2e` blocked in current sandbox)
- Existing docs and env examples (`README.md`, `.env.example`)

## Work
1. Update docs with production email setup checklist:
   - required env vars (`RESEND_API_KEY`, `RESEND_FROM_EMAIL`, cron secret)
   - verified-domain requirement and expected 403 behavior if misconfigured.
2. Add operator smoke procedures:
   - trigger synthetic paid attendee flow
   - verify automated welcome/prework dispatch status
   - trigger reminder run endpoint and verify summary.
3. Add Playwright execution guidance for capable host/CI and expected pass criteria.
4. Run local quality gates (`lint`, `typecheck`, `build`) and capture results in phase summary/review.
5. Create Phase 12 review artifact with criterion-to-evidence mapping.

## Output
- `docs/planning/phase-12/ops-runbook.md` documents env setup, cron auth, smoke flow, and failure triage.
- `README.md` updated with new automation endpoints and cron deployment notes.
- Validation evidence captured for local quality gates and known sandbox E2E limitations.
- Phase review artifact added at `docs/planning/phase-12/review.md`.

## Handoff
Phase 12 complete; next phase can focus on deliverability analytics, segmentation policy, and queue-based scaling if cohort size increases.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Finalized runbook for operators covering webhook, reminders, dispatch status, and retry flows.
  - Updated root planning docs with red-team findings, coordination notes, assumptions, and criterion status.
  - Ran full validation matrix and recorded local E2E blockers with exact error signatures.
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
  - `npm run test:e2e` — fail (environment: `ENOTFOUND zerotoagent.com`, Chromium `bootstrap_check_in ... Permission denied (1100)`)
- Blockers:
  - Sandbox host cannot run browser E2E reliably due DNS and Chromium process permission constraints.
- Next concrete steps:
  - Execute Playwright smoke suite from CI or production-capable host and attach results to deployment checklist.
