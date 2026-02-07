# Phase 5 — MASTER: Zero-to-Agent Website (Public UI + Motion + Apply + Admin + Speakers)

## Purpose
Consolidate Phase 3 (offer/specs + backend scaffold) and Phase 4 (speakers + robust motion + full ops admin) into a **single master phase** that, when executed, results in a **great website that is ready and built**.

## Context
- Phase 3 produced canonical specs and shipped a working backend scaffold:
  - Offer + IA/copy + motion tokens + funnel + ops + QA docs under `docs/phase-3/`
  - Next.js + Prisma + Stripe + admin auth + admin APIs scaffolded in `src/` and `prisma/`
- Phase 4 introduced new requirements:
  - Add `#speakers` section (after `#why`) with two speaker cards (Aadil + Abdur)
  - Stronger outcome proof line in `#why`
  - Most robust motion stack: **Lenis (desktop-only) + GSAP/ScrollTrigger + CSS/IntersectionObserver**
  - Full ops admin UI + referral code management with audit logs
- This Phase 5 is the **single source of truth** going forward and supersedes Phase 3/4 planning docs.

## Concurrent Phases
Phases 3 and 4 overlap entirely with this scope and are superseded by Phase 5.

| Phase | Status | Overlap | Coordination |
|-------|--------|---------|--------------|
| Phase 3 | Superseded by Phase 5 | Specs + backend scaffold | Use Phase 5 as master; Phase 3 is reference-only. |
| Phase 4 | Superseded by Phase 5 | Speakers + motion + admin UI deltas | Use Phase 5 as master; Phase 4 is reference-only. |

## Objectives
* [ ] Publish a single handoff-ready master doc for a UI agent to execute without chasing Phase 3/4.
* [ ] Implement the public website UI with high motion quality (TKS/Refunnel-inspired principles).
* [ ] Implement apply UX wired to the existing deposit checkout endpoint.
* [ ] Implement full ops admin UI and the supporting DB/API primitives (referral audit logs, internal notes, attendee status updates).
* [ ] Validate end-to-end with QA (lint/typecheck/build, Stripe CLI smoke, Playwright smoke, reduced-motion, perf).

## Constraints
- No pixel-perfect cloning of reference sites (principles only).
- Motion is progressive enhancement; site must function without JS motion.
- Must honor `prefers-reduced-motion`:
  - Lenis OFF
  - ScrollTrigger OFF
  - Marquee OFF/static
  - Reveals instant (or minimal opacity only)
- Locked offer mechanics remain unchanged:
  - Seat cap: 50
  - Deposit: $100 USD
  - Location copy: “Please register to see the exact location of this event.”
- Speaker claims:
  - Abdur is publicly described as: 20 years old, high school dropout, first AI startup at 16.
  - OpenAI award must be named by transcribing `docs/image2-2-1.jpeg` (no extra research required).

## Success Criteria
- Public:
  - `/` matches the canonical anchored IA including `#speakers`.
  - Motion system matches tokens/rules and is smooth on desktop, safe on mobile, and compliant with reduced-motion.
  - `/apply` posts to `POST /api/apply` and redirects to Stripe Checkout URL.
  - `/apply/success` is a clear confirmation.
- Admin:
  - `/admin` is usable for ops: attendee list + filters + status edits + internal notes + CSV export.
  - Referral code CRUD exists and every mutation is audit logged.
- Engineering:
  - `npm run lint`, `npm run typecheck`, `npm run build` pass.
  - Stripe webhook + idempotency works in test mode (Stripe CLI smoke).
  - Playwright smoke covers: landing anchors, reduced-motion, apply redirect (mock or test env), admin auth gate.

## Repo Reality Check (RED TEAM)

- What exists today:
  - Public site UI and motion stack are implemented under `src/components/` (Hero/Why/Speakers/Outcomes/HowItWorks/Agenda/Pricing/FAQ/CTAFooter).
  - Speakers are clickable with an accessible modal (`src/components/Dialog.tsx`).
  - Playwright CLI smoke tests exist under `z2a/*.spec.ts` and are wired via `npm run test:e2e`.
  - Stripe webhook route exists at `src/app/api/stripe/webhook/route.ts`.
- What the plan assumes:
  - Local QA can run Playwright + Stripe CLI against a locally running server.
  - Speaker bios are conservative unless the team provides final copy.
- Verified touch points:
  - `docs/planning/phase-5/handoff.md`
  - `src/components/sections/Speakers.tsx`
  - `src/components/StickyApplyBar.tsx`
  - `playwright.config.ts`
  - `z2a/*.spec.ts`

## RED TEAM Findings (Gaps / Weak Spots)

### Highest-risk failure modes
- Playwright MCP is blocked in this environment by a Chrome profile lock (“Opening in existing browser session”). → Mitigation: use Playwright CLI (`npm run test:e2e`) in a normal environment.
- Stripe CLI webhook smoke is blocked in this environment (port binding + outbound network). → Mitigation: run `docs/planning/phase-5/stripe-cli.md` locally/CI.

### Missing or ambiguous requirements
- Speaker bios: LinkedIn blocks automated retrieval; only Aadil has non-LinkedIn public sources that are easy to cite. → Mitigation: keep claims conservative unless the team provides final bios.

### Testing / validation
- In some restricted environments, local QA can be blocked by:
  - dev server port binding (`EPERM`)
  - DNS/network access (`ENOTFOUND`)
  - missing Playwright browsers (requires `npx playwright install`)
  → Mitigation: run `npm run test:e2e` + Stripe CLI smoke on a normal local machine or in CI, using `docs/planning/phase-5/playwright-cli.md` and `docs/planning/phase-5/stripe-cli.md`.

## Open Questions (Need Human Input)

- None (currently closed).

## Subphase Index
* a — Master handoff doc (single doc consolidating Phase 3 + 4 into execution plan)
* b — Spec deltas (IA/copy + motion playbook updates: `#speakers`, proof line, admin motion)
* c — Admin foundations (DB + admin APIs: attendee updates, referral codes + audit logs)
* d — Motion system implementation spec (Lenis + GSAP/ScrollTrigger + CSS/IO + reduced-motion)
* e — UI implementation checklist (public + admin: file-level tasks and component inventory)
* f — QA + launch readiness (Stripe CLI + Playwright smoke + perf/a11y gates)

## Phase Summary (running)
- 2026-02-06 — QA gates passing (`npm run lint`, `npm run typecheck`, `npm run build`), speakers are now clickable with an accessible modal, and referral code toggle semantics were aligned (files: `src/components/sections/Speakers.tsx`, `src/components/Dialog.tsx`, `src/components/SpeakerAvatar.tsx`, `src/app/api/admin/referral-codes/[id]/route.ts`, `src/components/admin/ReferralCodeTable.tsx`, `docs/planning/phase-5/review.md`).
- 2026-02-07 — Added a TKS-inspired sticky “Admissions open” apply bar, fixed the How-it-Works “vertical line on empty section” artifact, added speaker headshots and Abdur’s award plaque, and documented Playwright/Stripe CLI smoke steps (files: `src/components/StickyApplyBar.tsx`, `src/components/sections/HowItWorks.tsx`, `src/components/sections/Speakers.tsx`, `public/speakers/*`, `next.config.ts`, `docs/planning/phase-5/review.md`).
- 2026-02-07 — Closed the QA loop: Playwright smoke now runs deterministically against localhost (webpack webServer + localhost guard) and reduced-motion marquee assertion is stable; Stripe webhook smoke passes via Stripe CLI forward+triggers; review/runbooks updated (files: `playwright.config.ts`, `src/components/sections/Hero.tsx`, `z2a/reduced-motion.spec.ts`, `docs/planning/phase-5/review.md`, `docs/planning/phase-5/playwright-cli.md`, `docs/planning/phase-5/stripe-cli.md`).
