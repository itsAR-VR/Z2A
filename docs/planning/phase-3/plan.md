# Phase 3 — Merged Master Plan (Offer + Site + Funnel + Ops)

> **STATUS: SUPERSEDED** — Consolidated into `docs/planning/phase-5/plan.md`. Use Phase 5 as the single source of truth.

## Purpose
Merge Phase 1 and Phase 2 into a single, decision-complete plan that covers **all aspects** of the Toronto pilot: offer definition, single-page site, design/motion, apply + payment funnel, referral mechanics, and the operational content assets needed to run and scale.

## Context
- Source of truth for the offer and messaging is `Plans/plan.md` (Context Brief + prompts + objections + referral details).
- Reference design/motion principles come from:
  - `https://www.tks.world/` (structure + micro-interactions + marquee)
  - `https://refunnel.com/` (polish + spacing + CTA patterns)
  - Captures stored under `/tmp/site-analysis/` (screenshots, JSON, videos, side-by-side motion board).
- The offer is explicitly:
  - **2‑day in-person weekend**, ~12 hours total (Sat/Sun)
  - **Hands‑on keyboard**, pods of **3–4**
  - Outcome promise: **working agent**, **basic deployment approach**, **evaluation/testing workflow**
  - Toronto pilot first; no paid ads; warm outreach + partner channels
  - Pricing direction: **$1,500 list** and **$500 network code** (= $1,000), currency TBD
  - Tone guardrails: premium, practical, no hype, no job/income guarantees

## Concurrent Phases
Phase 1 and Phase 2 cover overlapping scope. Phase 3 supersedes both and should be treated as the **single source of truth** for implementation.

| Phase | Status | Overlap | Coordination |
|-------|--------|---------|--------------|
| Phase 1 | **Superseded** | Site + motion + funnel | Do not execute; use Phase 3 |
| Phase 2 | **Superseded** | Offer + site + checkout | Do not execute; use Phase 3 |

## Objectives
* [x] Produce a canonical offer brief (name, persona, promise, guardrails)
* [x] Define the single-page IA and copy/asset requirements
* [x] Specify the design/motion system (TKS palette + Refunnel polish)
* [x] Define the apply + payment funnel (Stripe + DB + admin)
* [x] Define ops assets: agenda, prework, referral program, outreach, content capture, post-event loop
* [x] Produce QA + deployment checklist for a v1 launch

## Prerequisites (LOCKED — Resolved via RED TEAM)

| Item | Decision | Rationale |
|------|----------|-----------|
| Brand name | **Zero-to-Agent** | Confirmed; no rights concerns |
| Currency | **USD** | Standard for tech products |
| Deposit | **$100 USD** | Low-friction seat reservation |
| Remainder due | **At check-in** | Simplifies ops, confirms attendance |
| Refund policy | **Full refund if unsatisfied, no questions asked** | Maximum trust signal |
| Event dates | **Feb 28 - Mar 1, 2026** | Last weekend of February (confirmed) |
| Seat cap | **50** | Keeps pods effective and outcomes realistic |

### Pre-Execution Dependency
Reference captures at `/tmp/site-analysis/` must be regenerated before Phase 3c:
- TKS.world: structure, screenshots, motion recordings
- Refunnel.com: structure, screenshots, motion recordings

## Repo Reality Check (RED TEAM)

- What exists today:
  - `Plans/plan.md` (offer + objections + referral details)
  - `docs/planning/phase-3/*` (phase plans)
  - `docs/phase-3/offer-brief.md` (Phase 3a output)
  - `docs/phase-3/ia-copy-spec.md` (Phase 3b output)
  - `docs/phase-3/design-motion-spec.md` (Phase 3c output)
  - `docs/phase-3/funnel-spec.md` (Phase 3d output)
  - `docs/phase-3/ops-gtm-assets.md` (Phase 3e output)
  - `docs/phase-3/qa-deploy-checklist.md` (Phase 3f output)
  - `docs/phase-3/ui-motion-implementation-playbook.md` (UI/motion execution checklist for follow-on agent)
  - `/tmp/site-analysis/` (screenshots, data JSON, motion frames/videos)
  - Next.js + Prisma + Stripe/admin scaffold (no UI polish yet)
    - `package.json`, `src/`, `prisma/`, `prisma.config.ts`
- What the plan assumes:
  - `/tmp/site-analysis/` remains available for motion validation
  - Supabase Postgres + Prisma ORM is the funnel data store
- Verified touch points:
  - `Plans/plan.md`
  - `docs/phase-3/offer-brief.md`
  - `docs/phase-3/ia-copy-spec.md`
  - `docs/phase-3/design-motion-spec.md`
  - `docs/phase-3/funnel-spec.md`
  - `docs/phase-3/ops-gtm-assets.md`
  - `docs/phase-3/qa-deploy-checklist.md`

## RED TEAM Findings (Gaps / Weak Spots)

### Highest-risk failure modes
- Reference captures missing (`/tmp/site-analysis/`) → Phase 3c stalls → regenerate before motion validation (resolved).
- Manual remainder capture requires clear attendee communication → include explicit pricing/FAQ copy and admin checklist.

### Missing or ambiguous requirements
- Exact location is withheld until registration → ensure copy sets expectation without sounding evasive.

### Repo mismatches (fix the plan)
- `/tmp/site-analysis/` is not in repo; treat as external dependency and re-capture before Phase 3c.
- Prisma ORM v7 removes `url`/`directUrl` from `schema.prisma` → use `prisma.config.ts` + driver adapter (implemented in scaffold).

### Performance / timeouts
- Motion stack (GSAP/Lenis) must honor `prefers-reduced-motion` and avoid jank on long single-page scroll.
- Next.js 16 warns about deprecated `middleware.ts` convention → keep an eye on “middleware-to-proxy” migration before hardening admin auth.

### Security / permissions
- Admin access to attendee/referral data requires explicit gating (basic auth vs allowlist).

### Testing / validation
- Stripe webhook/idempotency must be validated with Stripe CLI before go-live.

## Assumptions (Agent)

- USD pricing and Feb 28 - Mar 1, 2026 dates remain locked. (confidence >=95%)
  - Mitigation check: if updated, re-issue offer brief + pricing copy.
- GSAP/Lenis usage is acceptable for motion polish. (confidence ~90%)
  - Mitigation check: if not, replace with CSS-only transitions and reduce JS animation scope.

## Resolved Decisions (Post-Input)
- Backend: Supabase Postgres with Prisma ORM.
- Admin gating: basic auth; server uses server-only DB credentials (Prisma).
- Remainder payment: authorize at check-in; capture after event for Day 1 attendees.
- Referral payouts: none for pilot (discount only via network code).

## Open Questions (Need Human Input)
None currently.

## Constraints
- **No pixel-perfect cloning**: reuse principles, keep **original layout composition, copy, and visuals**.
- Single-page scroll site with anchor navigation; primary CTA is **Apply / Reserve seat**.
- **TKS palette**: black/near-black, white/off-white, green accent.
- **No paid ads** for pilot; site must support warm sharing.
- Must honor `prefers-reduced-motion`.
- Today is **February 3, 2026**; **Pilot event: Feb 28 - Mar 1, 2026**; Toronto Tech Week is **late May 2026**.

## Success Criteria
- [x] All major deliverables listed in `Plans/plan.md` are represented in subphases.
- [x] Funnel decisions are explicit (apply vs pay-first; deposit vs pay-in-full; refund policy stance).
- [x] Stripe + DB + admin are defined with idempotent webhook handling.
- [x] Motion + design spec is implementable without further subjective decisions (pending capture validation).
- [x] QA + deployment checklist is runnable.
- [x] Implementation foundations exist in-repo (Next.js scaffold + Prisma + Stripe routes + admin APIs).
- [x] `npm run lint`, `npm run typecheck`, and `npm run build` pass on the scaffolded codebase.
- [ ] Stripe test-mode deposit flow works end-to-end (apply → checkout → webhook → attendee record updated) with idempotent webhook handling.

## Subphase Index
* a — Canonical offer brief (name, persona, promises, guardrails)
* b — Single-page IA + copy/asset spec (anchored)
* c — Design + motion system spec (TKS palette, GSAP/Lenis)
* d — Apply + payment funnel spec (Stripe + DB + admin)
* e — Ops + GTM assets (agenda, prework, referrals, outreach, content capture, post-event)
* f — QA + deployment checklist (Playwright + Vercel)
* g — App scaffold (Next.js + Tailwind + Prisma + Stripe + env plumbing)
* h — Landing page implementation (`/`) matching Phase 3b/3c specs (copy + tokens + motion)
* i — Apply + deposit checkout implementation (`/apply` + create checkout session)
* j — Stripe webhook + idempotency implementation (deposit paid + refund handling)
* k — Admin implementation (basic auth + attendees list/export + check-in scaffolding)
* l — QA + deploy verification (Playwright smoke, Stripe CLI, lint/build scripts)

## Phase Summary (running)
- 2026-02-04 — Drafted canonical offer brief for Phase 3a (files: docs/phase-3/offer-brief.md, docs/planning/phase-3/a/plan.md)
- 2026-02-04 — RED TEAM refinements added to Phase 3 plan + subphase scaffolds (files: docs/planning/phase-3/plan.md, docs/planning/phase-3/b/plan.md, docs/planning/phase-3/c/plan.md, docs/planning/phase-3/d/plan.md, docs/planning/phase-3/e/plan.md, docs/planning/phase-3/f/plan.md)
- 2026-02-04 — Completed IA + copy spec for Phase 3b (files: docs/phase-3/ia-copy-spec.md, docs/planning/phase-3/b/plan.md, docs/planning/phase-3/plan.md)
- 2026-02-04 — Completed design + motion spec for Phase 3c (files: docs/phase-3/design-motion-spec.md, docs/planning/phase-3/c/plan.md, docs/planning/phase-3/plan.md)
- 2026-02-04 — Completed funnel spec for Phase 3d (files: docs/phase-3/funnel-spec.md, docs/planning/phase-3/d/plan.md, docs/planning/phase-3/plan.md)
- 2026-02-04 — Completed ops + GTM assets for Phase 3e (files: docs/phase-3/ops-gtm-assets.md, docs/planning/phase-3/e/plan.md, docs/planning/phase-3/plan.md)
- 2026-02-04 — Completed QA + deploy checklist for Phase 3f (files: docs/phase-3/qa-deploy-checklist.md, docs/planning/phase-3/f/plan.md, docs/planning/phase-3/plan.md)
- 2026-02-04 — Regenerated `/tmp/site-analysis/` captures (screenshots, JSON, webm motion boards)
- 2026-02-05 — Locked seat cap (50), added instructor bio quote + location visibility copy (files: docs/phase-3/offer-brief.md, docs/phase-3/ia-copy-spec.md, docs/planning/phase-3/plan.md)
- 2026-02-05 — Updated deposit to $100 and adjusted remainder amounts (files: docs/phase-3/offer-brief.md, docs/phase-3/ia-copy-spec.md, docs/phase-3/funnel-spec.md, docs/phase-3/ops-gtm-assets.md, docs/planning/phase-3/d/plan.md, docs/planning/phase-3/plan.md)
- 2026-02-06 — App implementation subphases appended (g–l) now that env vars + Vercel project linkage exist (files: docs/planning/phase-3/plan.md)
- 2026-02-06 — Added Next.js + Prisma v7 + Stripe/admin scaffolding and UI/motion playbook (files: package.json, prisma/schema.prisma, prisma.config.ts, src/*, docs/phase-3/ui-motion-implementation-playbook.md, docs/planning/phase-3/g/plan.md, docs/planning/phase-3/h/plan.md)

## Phase Summary

- Shipped:
  - `docs/phase-3/offer-brief.md`
  - `docs/phase-3/ia-copy-spec.md`
  - `docs/phase-3/design-motion-spec.md`
  - `docs/phase-3/funnel-spec.md`
  - `docs/phase-3/ops-gtm-assets.md`
  - `docs/phase-3/qa-deploy-checklist.md`
- Verified:
  - `npm run lint`: fail (missing script)
  - `npm run build`: fail (missing script)
  - `npm run db:push`: skip (no Prisma schema changes)
- Notes:
  - `/tmp/site-analysis/` captures regenerated for final design/motion validation.
