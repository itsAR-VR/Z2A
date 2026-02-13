# Phase 11g — Cross-Cutting Hardening (Idempotency, Timeouts, Integration QA)

## Focus
Close the highest-risk operational gaps that span subphases 11b-11f: shared-file merge safety, waitlist conversion idempotency, email batch timeout/error budgets, and final integration verification.

## Inputs
- Root plan red-team findings in `docs/planning/phase-11/plan.md`
- Subphase outputs from `11b`, `11c`, `11d`, `11e`, `11f`
- Shared files with collision risk:
  - `src/app/admin/page.tsx`
  - `src/app/apply/page.tsx`
  - `src/lib/email.ts`

## Work

### 1. Shared-file coordination (admin + apply)
- Consolidate `src/app/admin/page.tsx` edits in one integration pass after feature branches land.
- Confirm all intended tabs render and keyboard navigation still works.
- Confirm no tab/component import from earlier subphases is dropped in merge resolution.

### 2. Waitlist conversion idempotency + race safety
- Ensure convert endpoint uses transactional guard (`convertedAt` null check + seat availability recheck in-transaction).
- Reuse existing attendee-by-email update semantics from `/api/apply` to avoid unique-key collisions on email.
- Define conflict responses:
  - `409` if already converted
  - `409` if no seats available

### 3. Email batch reliability budget
- Add per-email timeout and continue-on-error semantics for batch sends.
- Return stable summary payload with sent count, failed count, and failure details.
- Guard against accidental oversized sends by enforcing a max recipients per request.

### 4. Sold-out race handling on apply
- If `/api/apply` returns sold-out (`409`) after form fill, present waitlist path immediately (no dead-end error state).
- Verify both initial sold-out render and post-submit sold-out fallback.

### 5. Validation (RED TEAM)
- Run gates:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
- Manual integration checks:
  - Admin tabs: attendees + referral codes + waitlist + emails all visible and operable.
  - Landing seat count and apply sold-out behavior are consistent with `/api/seats`.
  - Batch email returns deterministic summary for both success and partial-failure cases.

## Output
- Cross-feature hardening pass completed with no shared-file regressions.
- Deterministic error/status behavior documented and verified for waitlist convert, apply sold-out, and batch email.
- Final release readiness evidence captured in the phase review.

## Handoff
Proceed to phase review with explicit evidence for idempotency, timeout/error-budget behavior, and merged-tab integrity.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Implemented cross-cutting idempotency/reliability touchpoints:
    - waitlist setup completion handling in Stripe webhook
    - waitlist conversion state updates tied to checkout lifecycle
    - batch email timeout + partial failure reporting + failed-only retry mode
  - Implemented merged admin tab surface (`attendees`, `referral-codes`, `waitlist`, `emails`) in a single integration pass to reduce shared-file drift.
  - Updated apply/success flows for sold-out soft-cap handling with explicit terms and generic confirmation messaging.
  - Updated phase root with execution-time decision locks and validation evidence.
- Commands run:
  - `git status --porcelain` — pass (tracked overlap/uncommitted context each turn)
  - `ls -dt docs/planning/phase-* | head -10` — pass (confirmed overlap with phases 7-10)
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
  - `npm run test:e2e` — fail (environment constraints; not application compile failure)
- Blockers:
  - E2E browser + DNS limitations in this execution sandbox prevent full Playwright verification.
- Next concrete steps:
  - Run phase review in an environment where Playwright can launch Chromium and resolve `zerotoagent.com`.
  - If review passes, ship and monitor waitlist/seat metrics + email send outcomes.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Completed red-team hardening patch for waitlist conversion idempotency/race safety:
    - atomic pending→seat_offered claim in transaction
    - `409` in-progress guard to prevent duplicate checkout creation
    - explicit reuse response when checkout URL already exists
  - Added waitlist public endpoint conflict guard to prevent converted/offered record regression.
  - Executed schema-affected verification gate (`db:push`) after code updates.
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
  - `npm run db:push` — pass
  - `npm run test:e2e` — fail (sandbox DNS + Chromium launch permissions)
- Blockers:
  - Full E2E remains blocked by environment-level browser launch and DNS restrictions.
- Next concrete steps:
  - Publish `phase-11/review.md` with evidence mapping and mark Playwright as environment-blocked follow-up.
