# Phase 1 — Marketing Site Architecture + Motion Spec (TKS × Refunnel) — Zero-to-Agent

> **STATUS: SUPERSEDED** — This phase has been superseded by **Phase 3**. Do not execute. Use `docs/planning/phase-3/plan.md` as the source of truth.

## Purpose
Plan and implement a high-fidelity **TKS.world-structure + Refunnel-polish** marketing site for **Zero-to-Agent**: a premium, in-person, hands-on **2-day AI Agent Build Weekend** (Toronto pilot), including an **Apply + Stripe payment** flow and an **admin review** surface.

## Context
- We used Playwright to capture structure + motion references from:
  - `https://www.tks.world/`
  - `https://refunnel.com/`
- Captures/artifacts exist locally (outside repo) under `/tmp/site-analysis/` including screenshots, JSON structure, and recordings.
- Both reference sites appear to be **Webflow** and use **GSAP**; TKS also uses **Lenis** smooth scrolling (per captured script sources).
- Desired blend:
  - **TKS**: single-page scroll structure, bold hierarchy, marquee/ticker motifs, micro-interactions
  - **Refunnel**: modern, polished UI (pill nav, depth, spacing), smooth section motion, high-quality scroll interactions
- Visual direction: **TKS color scheme** (black/near-black, white/off-white, green accent) and overall “premium” finish.
- **Source of truth for the offer + copy direction:** `Plans/plan.md` (Toronto pilot details, persona, pricing model, landing page wireframe/copy, FAQ/objections, referral logic).

## Concurrent Phases
None detected (only `docs/planning/phase-1/` exists). Repo currently has untracked items: `.DS_Store`, `Plans/`, `docs/`.

| Phase | Status | Overlap | Coordination |
|-------|--------|---------|--------------|
| — | — | — | — |

## Repo Reality Check (RED TEAM)

- What exists today:
  - Planning docs: `docs/planning/phase-1/plan.md` + subphases `a/`…`e/`
  - Offer/copy brief: `Plans/plan.md` (now populated; previously referenced as empty in older subphases)
  - Reference artifacts: `/tmp/site-analysis/` (`data/*.json`, `screenshots/*`, `videos/*`)
  - No Next.js app code exists yet in this repo
- Verified touch points:
  - `/tmp/site-analysis/data/tks.json`, `/tmp/site-analysis/data/refunnel.json`, `/tmp/site-analysis/data/summary.json`
  - `Plans/plan.md`
- Tooling notes (for implementation phases):
  - Node `v22.x`, `npm`, `pnpm` are available
  - `rg` is not available; prefer `grep`/`find` for searches

## Objectives
* [ ] Convert reference analysis into a decision-complete IA + motion spec
* [ ] Build a single-page Next.js marketing site matching the agreed direction and the `Plans/plan.md` landing-page structure
* [ ] Ship a working Apply + Stripe payment flow backed by Supabase Postgres **via Prisma**, plus an admin review surface
* [ ] Verify UX with automated checks and captured artifacts

## Constraints
- **IP / cloning guardrail:** Do not implement a pixel-perfect clone. Reuse *principles* (pacing, interaction motifs, section intent) while keeping **original layout composition, copy, and visuals**.
- **Single-page** scroll site with anchor navigation and one primary CTA: **Apply / Reserve seat**.
- Tech: **Next.js (App Router) + TypeScript**, **Tailwind**, **GSAP (ScrollTrigger)**, **Lenis**, **Supabase Postgres + Prisma**, **Stripe**. Deploy: **Vercel**.
- Theme: **TKS palette** (examples captured: `#f2f2f2`, `#17191a`, `#51b04c`).
- Accessibility: support `prefers-reduced-motion`; animations must not block reading or interaction.
- Offer constraints (from `Plans/plan.md`):
  - **Premium, in-person, hands-on**, pods of **3–4**, no alcohol
  - **No hype**; no job/income guarantees; avoid absolute outcome guarantees (use “designed so most attendees…” framing)
  - Toronto pilot first, then expand across North America
  - Pricing direction: `1500` list and “network code” `1000` (currency TBD; likely CAD — must be explicit before payment)
  - Pilot constraint: do **not** rely on paid ads (site should support warm sharing + referral codes without looking “discounty”)

## Success Criteria
- `Plans/plan.md` is explicitly incorporated into IA, copy, and CTA/payment decisions (no “plan.md is empty” assumptions).
- Site IA + section list is final and mapped to content requirements (anchors + required components).
- Motion spec defines global timing/easing rules + per-section interactions.
- Prisma schema + Stripe flow for applications/payments is defined, with security + idempotency notes.
- QA plan includes Playwright scenarios and performance/accessibility gates.

## Subphase Index
* a — Narrative arc + single-page IA (content map)
* b — Design system + layout scaffolding (Next.js/Tailwind)
* c — Motion system (GSAP/ScrollTrigger/Lenis + micro-interactions)
* d — Apply funnel + admin dashboard (Supabase + API)
* e — QA, performance, and deployment readiness
* f — Align IA + copy to `Plans/plan.md` (Zero-to-Agent landing-page spec)
* g — Prisma + Stripe spec (data model, webhooks, admin auth, capacity/waitlist)

## RED TEAM Findings (Gaps / Weak Spots)

### Highest-risk failure modes
- **Apply + Stripe ambiguity** (apply gating vs pay-first) → add explicit decision + flow + webhook plan (Phase 1g).
- **Data security mismatch** (client-side writes / anon inserts) → require server-only Prisma writes + signed Stripe webhooks; never expose DB creds.
- **Scroll perf regressions** (Lenis + heavy GSAP) → add perf budgets + reduced-motion fallback + “no jank” checklist.

### Missing or ambiguous requirements
- **What “Apply” means** for this offer (lead form vs seat reservation vs approval gate) → define the canonical funnel and copy labels (Phase 1g + Open Questions).
- **Pricing mechanics** (deposit vs pay-in-full default) and refund/transfer policy final wording → lock copy + Stripe product/price setup before implementation.

### Repo mismatches (fix the plan)
- Subphase `1a` references `Plans/plan.md` as “currently empty” → cannot edit completed subphases; Phase `1f` patches/overrides this assumption.
- Subphase `1d` assumes “Supabase + API” with RLS/anon inserts → Phase `1g` specifies **Supabase Postgres via Prisma** + Stripe, and clarifies security posture.

### Performance / timeouts
- Webhook and third-party calls need timeouts + retries → specify Stripe webhook idempotency + retry-safe updates; cap server action/API route time.

### Security / permissions
- `/admin` access must not rely on obscurity → define an explicit auth mechanism (recommended: Basic Auth middleware for v1; upgrade path documented).

### Testing / validation
- Stripe webhooks cannot be “tested later” → include Stripe test-mode + local webhook forwarding steps and minimal e2e coverage for “form → redirect to Stripe”.

## Assumptions (Agent)

- Public brand name is **Zero-to-Agent** (confidence ~95%).
- Stack is **Next.js + Tailwind + GSAP/Lenis + Supabase Postgres + Prisma + Stripe**, deployed on **Vercel** (confidence ~95%).
- Primary persona for Event #1 is the advanced PM/operator cohort described in `Plans/plan.md` (confidence ~90%).

## Open Questions (Need Human Input)

- [ ] Should payment happen immediately after submitting the Apply form, or only after manual approval? (confidence <90%)
  - Why it matters: changes the funnel, required emails/admin actions, and how Stripe sessions are created.
  - Current assumption in this plan: **Apply → pay deposit immediately** (fastest path; still lets admin manage status post-payment).
