# Phase 11 — Admin Ops Hardening, Conversion Optimization & Email Sequences

## Purpose
Ship 6 high-leverage features before the Feb 28 event that maximize admin operational readiness, landing-page conversion, and attendee preparation. Derived from a 10x product analysis of current gaps (full analysis: `.claude/docs/ai/z2a/10x/session-1.md`).

## Context
The site is shipped and live (Phases 5-10 complete): landing page, apply form, Stripe two-step payment, admin dashboard, email confirmation, referral codes. With 17 days to event, the highest-impact gaps are:

1. **Admin flies blind** — no stats summary, no filters, no revenue visibility, no referral performance data.
2. **Landing page has no scarcity signal** — static "50 seats" text when a live counter would drive conversion.
3. **No waitlist** — visitors past seat 50 hit a dead end with no capture mechanism.
4. **Attendees get one email then silence** — no prework reminders, venue details, or Day 1 prep. Risk of underprepared attendees and no-shows.

Uncommitted changes exist on `src/app/api/stripe/webhook/route.ts`, `src/lib/env.ts`, `.env.example`, `README.md`, and `src/lib/email.ts` — these should be committed or stashed before starting work.

## Repo Reality Check (RED TEAM)

- What exists today:
  - `prisma/schema.prisma` currently has `Attendee`, `ReferralCode`, `ReferralCodeAuditLog`, `StripeEvent` only (no `Waitlist`, no `EmailSetting`).
  - `src/app/admin/page.tsx` currently has 2 tabs only: `attendees`, `referral-codes`.
  - `src/app/api/admin/attendees/route.ts` supports search (`q`) only; no status/referral filters.
  - `src/components/sections/Hero.tsx` and `src/components/StickyApplyBar.tsx` still hardcode `"50 seats"`.
  - `src/lib/email.ts` exists and currently supports deposit confirmation only; `sendTransactionalEmail` is internal (not exported).
  - `.claude/docs/ai/z2a/10x/session-1.md` exists (source analysis doc is present).
- What this phase assumes:
  - New admin/public APIs and components in subphases b-f are not yet present.
  - Basic Auth middleware continues to gate all `/api/admin/*` routes.
- Verified touch points:
  - Existing: `src/app/api/apply/route.ts`, `src/app/api/stripe/webhook/route.ts`, `src/lib/config.ts`, `src/middleware.ts`, `src/components/admin/AttendeeTable.tsx`, `src/components/admin/ReferralCodeTable.tsx`, `src/app/apply/page.tsx`.
  - Missing (planned creation): `src/app/api/seats/route.ts`, `src/app/api/waitlist/route.ts`, `src/app/api/admin/waitlist/route.ts`, `src/app/api/admin/stats/route.ts`, `src/components/admin/StatsBar.tsx`, `src/components/admin/WaitlistTable.tsx`, `src/components/admin/EmailSender.tsx`, `src/lib/email-templates.ts`, `src/components/SeatCounter.tsx`.

## Concurrent Phases

| Phase | Status | Overlap | Coordination |
|-------|--------|---------|--------------|
| Phase 10 | Complete | `src/app/admin/page.tsx`, `src/app/apply/page.tsx`, landing page copy | Build on Phase 10 remediation; do not revert copy changes. |
| Phase 9 | Complete | `Hero.tsx`, `StickyApplyBar.tsx` (seat counter touches these) | Preserve motion baseline; only replace static "50 seats" text. |
| Phase 8 | Complete | `src/lib/email.ts`, Stripe webhook, pricing | Build on single-plan pricing; extend email.ts pattern. |

## Coordination Notes (Multi-Agent)

- Last-10-phase overlap scan confirms direct file overlap with:
  - Phase 10/9 on `Hero.tsx`, `StickyApplyBar.tsx`, `apply/page.tsx`
  - Phase 8 on `src/lib/email.ts`, Stripe webhook/payment flows
  - Phase 7 on `src/app/admin/page.tsx`, admin tables
- Current working tree includes uncommitted edits in files that Phase 11 will touch (`src/lib/email.ts`, env files, webhook docs).
- Pre-flight before each subphase:
  - `git status --porcelain`
  - `git diff --name-only`
  - re-read target files immediately before editing (avoid stale assumptions)

## Objectives
* [x] Add admin stats summary bar with revenue, seat count, and status breakdowns
* [x] Add admin attendee filters (deposit, remainder, seat status, referral code)
* [x] Add waitlist schema, public seats API, waitlist form, and admin waitlist tab
* [x] Add live seat counter on Hero + StickyApplyBar
* [x] Add admin-editable email settings and 3 batch email templates (prework, venue, Day 1)
* [x] Add referral code performance view (registration counts per code)

## Dependency Order (RED TEAM)

- Hard dependencies:
  - `11a` must land before `11b`, `11c`, and `11e` (new Prisma models).
  - `11c` must land before `11d` (seat counter depends on `/api/seats`).
- Soft dependencies:
  - `11b` should land before `11f` if click-to-filter is implemented.
- Shared-file serialization (cannot run truly in parallel without merge planning):
  - `11b`, `11c`, `11e`, and `11f` all modify `src/app/admin/page.tsx`.
  - `11c` and `11d` both affect conversion/sold-out UX in apply/landing surfaces.

## Constraints
- Event is Feb 28 — all features must be production-ready before that date
- Solo developer — each subphase must be independently completable
- Preserve existing patterns: OKLCH palette, Space Grotesk/IBM Plex, Tailwind v4 `@theme`, Prisma 7, Basic Auth admin
- Schema changes for Waitlist + EmailSetting models combined into a single `prisma db push`
- Email templates use same IBM Plex Sans inline-style pattern as existing deposit confirmation
- All existing lint, typecheck, and build gates must continue to pass
- New write APIs must be idempotent on retries (especially waitlist convert + batch email send)
- Batch email flow must include explicit timeout/error-budget behavior; no route should hang indefinitely

## Success Criteria
- Admin dashboard shows real-time stats, supports filtering by all status types, shows referral performance
- Landing page displays dynamic seat count; switches to "Sold out" + waitlist messaging when cap reached
- Apply page gates to waitlist form when sold out
- Admin can configure email placeholders (venue, prework, etc.) and batch-send 3 email templates to all paid attendees
- Waitlist conversion is race-safe: two concurrent convert requests cannot create duplicate attendee records or duplicate checkout links
- `/api/waitlist` and `/api/admin/email/send-batch` return deterministic status codes for validation failures (400), conflicts (409), and partial send results (200 + structured failures)
- `npm run lint && npm run typecheck && npm run build` all pass
- Existing Playwright tests remain green

## Subphase Index
* a — Schema migration (Waitlist + EmailSetting models)
* b — Admin stats summary bar + attendee filters
* c — Waitlist APIs, admin tab, and apply page gate
* d — Live seat counter on landing page
* e — Email settings, templates, and batch send
* f — Referral code performance view
* g — Cross-cutting hardening: idempotency, timeout budgets, and integration QA

## RED TEAM Findings (Gaps / Weak Spots)

### Highest-risk failure modes
- `src/app/admin/page.tsx` merge collisions across 11b/11c/11e/11f can silently drop tabs or wiring.
  - Mitigation: serialize `admin/page.tsx` edits via a single owner branch or a dedicated integration subphase (11g).
- Waitlist convert can race and create duplicate downstream actions when triggered twice.
  - Mitigation: transactionally gate on `convertedAt IS NULL` and re-check seat availability inside the same transaction.
- Batch send to all paid attendees can exceed route runtime or fail mid-batch with poor operator visibility.
  - Mitigation: per-email timeout, continue-on-error policy, and explicit result summary with failed recipients.

### Missing or ambiguous requirements
- Referral performance denominator is ambiguous (all signups with code vs paid deposits only).
  - Plan fix: define a primary metric and include the secondary metric explicitly if needed.
- Waitlist conversion channel is ambiguous (admin manually shares checkout URL vs system emails it).
  - Plan fix: decide single v1 behavior and keep alternative as non-goal.
- Sold-out race UX is underdefined when `/apply` initially loads with seats available but API returns 409 later.
  - Plan fix: define 409 handling that pivots UI to waitlist CTA immediately.

### Repo mismatches (fix the plan)
- 11e currently references using `sendTransactionalEmail()` as existing infrastructure. In repo reality, it is internal to `src/lib/email.ts`.
  - Plan fix: expose a stable exported send helper (`sendTemplatedEmail`) and make batch routes consume only exported APIs.
- Parallelization note is overstated; multiple subphases share `src/app/admin/page.tsx`.
  - Plan fix: enforce explicit merge order for shared files in 11g.

### Performance / timeouts
- `/api/admin/email/send-batch` currently has no explicit timeout budget in plan.
  - Plan fix: set per-send timeout and total recipient cap per request.

### Security / permissions
- Public waitlist endpoint can be spammed.
  - Plan fix: add rate-limit-ready hook/guard (or minimal anti-abuse logging + IP-based throttling follow-up ticket if no infra yet).

### Testing / validation
- Plan lacks an explicit integration pass across all six features after merge.
  - Plan fix: add 11g validation matrix covering schema, admin tabs, sold-out gating, and batch email outcomes.

## Assumptions (Agent)

- `depositStatus = paid` remains the source of truth for seat occupancy and sold-out checks (confidence ~95%).
  - Mitigation check: if ops wants to count authorized remainder or attended statuses differently, update `/api/seats` and stats definitions together.
- Existing Basic Auth middleware (`/admin/*`, `/api/admin/*`) is sufficient for all new admin endpoints (confidence ~96%).
  - Mitigation check: verify no new privileged route is created outside `/api/admin/*`.
- The likely paid-recipient count for batch sends is <= seat cap, so synchronous send-with-summary is acceptable for v1 if timeout-bounded (confidence ~91%).
  - Mitigation check: if recipient count grows beyond cap in future cohorts, move to queued/background sends.

## Decisions Locked During Execution

- Capacity policy: **soft cap** (applications continue after capacity; over-cap enters waitlist flow).
- Over-cap payment behavior: **card-on-file setup** via Stripe setup-mode checkout (no immediate charge).
- Referral reporting: show both **Registered** and **Paid** per code.
- Waitlist conversion delivery: send email and also return checkout URL for manual fallback.
- Sold-out UX: keep full apply form visible with explicit sold-out/waitlist terms.
- Seat counter sold-out behavior: show sold-out state and waitlist-size signal.
- Waitlist rate limiting: explicitly deferred for Phase 11 (per product decision); keep current validation/conflict guards only.

## Phase Summary (running)

- 2026-02-11 — Implemented Phase 11 end-to-end across schema, APIs, admin UI tabs, waitlist conversion flow, seat counter, and email tooling (files: `prisma/schema.prisma`, `src/app/api/seats/route.ts`, `src/app/api/waitlist/route.ts`, `src/app/api/apply/route.ts`, `src/app/api/stripe/webhook/route.ts`, `src/app/api/admin/stats/route.ts`, `src/app/api/admin/waitlist/route.ts`, `src/app/api/admin/waitlist/[id]/convert/route.ts`, `src/app/api/admin/email-settings/route.ts`, `src/app/api/admin/email/send-batch/route.ts`, `src/app/api/admin/referral-codes/route.ts`, `src/app/api/admin/attendees/route.ts`, `src/components/admin/StatsBar.tsx`, `src/components/admin/WaitlistTable.tsx`, `src/components/admin/EmailSender.tsx`, `src/components/admin/AttendeeTable.tsx`, `src/components/admin/ReferralCodeTable.tsx`, `src/app/admin/page.tsx`, `src/components/SeatCounter.tsx`, `src/components/sections/Hero.tsx`, `src/components/StickyApplyBar.tsx`, `src/lib/email.ts`, `src/lib/email-templates.ts`, `src/app/apply/page.tsx`, `src/app/apply/success/page.tsx`).
- 2026-02-11 — Validation snapshot: `npm run lint` pass, `npm run typecheck` pass, `npm run build` pass. `npm run test:e2e` failed due environment/browser constraints (DNS resolution to `zerotoagent.com` and Chromium launch `bootstrap_check_in ... Permission denied (1100)`), not due compile/type issues.
- 2026-02-11 10:08 UTC — Closed red-team race/idempotency gaps in waitlist conversion and duplicate waitlist submission handling (files: `src/app/api/admin/waitlist/[id]/convert/route.ts`, `src/app/api/waitlist/route.ts`). Verification: `npm run lint` pass, `npm run typecheck` pass, `npm run build` pass, `npm run db:push` pass; `npm run test:e2e` still blocked by sandbox DNS/browser launch permissions.
