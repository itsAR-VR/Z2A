# Phase 6 — Launch Hardening + Full-Funnel Verification + TKS-Style Menu/Hero Polish

## Purpose
Verify the **complete customer + ops flow** end-to-end (landing → apply → Stripe deposit → webhook → confirmation → admin visibility), then push the UI closer to the **TKS-inspired structure + micro-interactions** while staying aligned with the current **light-first, premium, builder-first** Zero-to-Agent brand.

## Context
- Phase 5 shipped a solid baseline:
  - Public landing page with anchored IA and clickable speakers modal
  - Reduced-motion compliance
  - Playwright smoke suite (`z2a/*.spec.ts`)
  - Stripe webhook smoke via Stripe CLI forward + triggers (local)
- There is still “launch gap” risk if:
  - Production (`https://zerotoagent.com`) is not running the latest UI
  - Stripe integration is only “webhook-smoked” but not verified as a **complete flow** (checkout session creation, redirect URLs, metadata, DB record updates, admin visibility, refund paths)
- The user wants the site to feel closer to TKS:
  - A clearer “Menu” pattern (especially on mobile) and stronger structural hierarchy
  - Purposeful micro animations (hover, focus, open/close, progressive reveal)
  - A stronger hero moment, without drifting into hype or neon/dark “AI vibe”

## Concurrent Phases
No active concurrent phases detected. This phase builds directly on Phase 5 outputs.

| Phase | Status | Overlap | Coordination |
|-------|--------|---------|--------------|
| Phase 5 | Complete | Public UI, motion, Apply, Admin, Stripe, Playwright | Use as baseline; Phase 6 is incremental hardening + polish. |

## Objectives
* [x] Define what “complete flow works” means (acceptance criteria + checks).
* [x] Verify Stripe + funnel integrations end-to-end (not just webhook receipt).
* [x] Implement a TKS-inspired **Menu** structure and targeted micro-interactions (progressive enhancement, reduced-motion compliant).
* [x] Upgrade hero impact and overall cleanliness (typography, spacing, hierarchy, trust cues).
* [x] Close the loop for launch: production parity + production smoke + updated runbooks (deploy latest).

## Constraints
- **No pixel-perfect cloning** of TKS/refunnel. Borrow patterns/motifs only.
- Maintain current typography + tokenized OKLCH palette (see `src/app/globals.css`).
- Motion is progressive enhancement; everything must remain usable without JS motion.
- Must honor `prefers-reduced-motion` across:
  - hero/section reveals
  - marquee/ticker behavior
  - menu open/close transitions
  - any smooth scrolling behavior (if present)
- Avoid risky test setup:
  - Playwright webServer mode must remain localhost-only (guard already exists in `playwright.config.ts`).
  - Stripe secrets must not be committed; use `.env.local` + Stripe CLI output only.

## Success Criteria
- **Funnel**
  - A user can submit `/apply`, be redirected to Stripe Checkout, complete payment in test mode, and land on a clear confirmation page.
  - Stripe webhook updates the DB idempotently for the relevant attendee/payment state.
  - Admin can verify the new attendee and see payment status/notes needed for ops.
  - Refund events (at least one representative event) do not break the handler and are logged/handled safely.
- **UI**
  - Menu interaction is clean, keyboard accessible, and feels intentional.
  - Hero feels “premium + grounded” and communicates the offer in <60s.
  - Micro interactions are consistent and do not degrade performance; reduced-motion path is correct.
- **QA**
  - `npm run lint`, `npm run typecheck`, `npm run build` pass.
  - Playwright smoke passes locally and against production after deploy (appropriate baseURL; no webServer).
  - Stripe CLI “smoke runbook” is updated and includes an explicit complete-flow checklist.

## RED TEAM Status
Reviewed — see `docs/planning/phase-6/red-team.md` for full findings.

**Key findings incorporated into subphase plans:**
- F1: Phase 6c reframed as polish/refinement (menu already exists in `Nav.tsx`)
- F2: Webhook missing-metadata logging added to Phase 6b scope
- F3: `aria-controls` gap added to Phase 6c
- F4: Menu overlay refactor (conditional → always-mounted) added to Phase 6c
- F5: Phase 5 artifact validation added to Phase 6a
- F7: Production-safe Playwright subset defined for Phase 6b/6e
- F9: Scroll lock layout-shift fix added to Phase 6c

## Subphase Index
* a — Complete-flow spec + environment audit (Stripe + funnel + ops)
* b — Stripe end-to-end smokes (scripts/runbook + Playwright coverage where feasible)
* c — TKS-style Menu + navigation polish (accessibility-first)
* d — Hero upgrade + micro-interactions polish (reduced-motion compliant)
* e — Production parity + final QA (deploy + production smoke + screenshots)

## Phase Summary (running)
- 2026-02-08 — Defined “complete flow” acceptance criteria + checklist (files: `docs/planning/phase-6/complete-flow-checklist.md`, `docs/planning/phase-6/red-team.md`, `docs/planning/phase-6/a/plan.md`)
- 2026-02-08 — Hardened Stripe webhook reliability + added production-safe Playwright subset + Stripe runbook (files: `src/app/api/stripe/webhook/route.ts`, `z2a/*.spec.ts`, `scripts/create-test-checkout-url.mjs`, `docs/planning/phase-6/stripe-cli.md`, `docs/planning/phase-6/b/plan.md`)
- 2026-02-08 — Nav + hero polish (TKS-leaning), plus network-code deep-link and local screenshots (files: `src/components/Nav.tsx`, `src/components/sections/Hero.tsx`, `src/app/apply/page.tsx`, `docs/planning/phase-6/c/plan.md`, `docs/planning/phase-6/d/plan.md`, `docs/planning/phase-6/snapshots/local-after/`)
- 2026-02-08 — Local Stripe full-funnel verified (real checkout → webhook → admin `depositStatus: paid`) and production-safe smoke passed (files: `docs/planning/phase-6/e/plan.md`, `docs/planning/phase-6/stripe-cli.md`)
- 2026-02-08 — Production Stripe end-to-end verified (real test checkout → webhook → admin `depositStatus: paid`) and canonical `www` runbook notes added (files: `docs/planning/phase-6/e/plan.md`, `docs/planning/phase-6/stripe-cli.md`, `z2a/stripe-production.spec.ts`)

## Review Notes
- Review artifact: `docs/planning/phase-6/review.md`
- Canonical production domain: `https://www.zerotoagent.com`
