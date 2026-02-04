# Phase 2 — Consolidated Offer → Single-Page Site + Checkout (Toronto Pilot)

> **STATUS: SUPERSEDED** — This phase has been superseded by **Phase 3**. Do not execute. Use `docs/planning/phase-3/plan.md` as the source of truth.

## Purpose
Turn `Plans/plan.md` into a single, decision-complete implementation plan for shipping the **Toronto pilot** marketing site + conversion funnel (apply → pay) with a **TKS-inspired** theme and **TKS/Refunnel-inspired** motion quality.

## Context
- Source of truth for the offer is `Plans/plan.md` (includes: context brief, personas, pricing, distribution constraints, referral program, objection handling).
- Reference motion/design targets (principles only) were captured from:
  - `https://www.tks.world/` (TKS)
  - `https://refunnel.com/` (Refunnel)
  - Local artifacts exist under `/tmp/site-analysis/` (screenshots, JSON, videos, and a side-by-side motion board).
- The offer (from `Plans/plan.md`) is explicitly:
  - Premium, in-person, hands-on, **2-day weekend (Sat/Sun), ~12 hours total**
  - Pods of **3–4**
  - Outcome promise: leave with **(1) a working AI agent**, **(2) basic deployment approach**, **(3) evaluation/testing workflow**
  - Toronto pilot first; fill seats via warm outreach (no paid ads); capture proof; repeat and scale toward Toronto Tech Week (late May 2026)
  - Pricing direction: **$1,500 list**, **$500 network code** (= $1,000); currency TBD (CAD vs USD)
  - Messaging guardrails: premium, practical, no hype, no job/income guarantees

## Concurrent Phases
Phase overlap exists with `docs/planning/phase-1/` (same domain: marketing site + motion). Phase 2 supersedes Phase 1 by grounding the plan in the now-populated `Plans/plan.md` brief.

| Phase | Status | Overlap | Coordination |
|-------|--------|---------|--------------|
| Phase 1 | Active | Domain: marketing site + motion + funnel | Phase 2 is the new source of truth; merge only if Phase 1 has additional unported requirements |

## Objectives
* [ ] Consolidate naming, persona choice, and claims into a single canonical brief
* [ ] Specify the single-page IA and section-by-section copy requirements
* [ ] Specify exact conversion funnel (apply vs pay-first), pricing mechanics, referral code logic
* [ ] Specify the design/motion system (tokens + interactions) for implementation
* [ ] Define QA + deployment checklist (Vercel, Supabase, Stripe)

## Constraints
- **No pixel-perfect cloning**: copy principles and interaction motifs, but keep **original layout composition, copy, and visuals**.
- Single-page scroll site with anchor navigation; primary CTA is **Apply / Reserve Seat**.
- Must support **warm sharing** and referral codes without “discount-bin” vibes.
- Must not rely on paid ads for pilot distribution (site should be optimized for direct link sharing + DMs).
- Must honor `prefers-reduced-motion`.
- Dates: today is **February 3, 2026**; Toronto Tech Week is referenced as **late May 2026** (exact dates must be confirmed before copy locks).

## Success Criteria
- Implementation can start without any unresolved funnel decisions.
- The planned pages/sections/components and required copy/assets are explicitly enumerated.
- Stripe + storage model is defined with idempotent webhook handling and basic admin controls.
- A minimal Playwright QA suite is defined and runnable.

## Subphase Index
* a — Canonical offer brief (name, persona, promises, guardrails)
* b — Single-page IA + section copy spec (anchored)
* c — Motion + design system spec (TKS palette + Refunnel polish)
* d — Checkout + referrals + data model (Stripe + DB + admin)
* e — QA + deploy checklist (Playwright, perf, Vercel)

