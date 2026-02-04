# Phase 3 — Merged Master Plan (Offer + Site + Funnel + Ops)

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
* [ ] Produce a canonical offer brief (name, persona, promise, guardrails)
* [ ] Define the single-page IA and copy/asset requirements
* [ ] Specify the design/motion system (TKS palette + Refunnel polish)
* [ ] Define the apply + payment funnel (Stripe + DB + admin)
* [ ] Define ops assets: agenda, prework, referral program, outreach, content capture, post-event loop
* [ ] Produce QA + deployment checklist for a v1 launch

## Prerequisites (LOCKED — Resolved via RED TEAM)

| Item | Decision | Rationale |
|------|----------|-----------|
| Brand name | **Zero-to-Agent** | Confirmed; no rights concerns |
| Currency | **USD** | Standard for tech products |
| Deposit | **$500 USD** | ~33% of list price |
| Remainder due | **At check-in** | Simplifies ops, confirms attendance |
| Refund policy | **Full refund if unsatisfied, no questions asked** | Maximum trust signal |
| Event dates | **Feb 28 - Mar 1, 2026** | Last weekend of February (confirmed) |

### Pre-Execution Dependency
Reference captures at `/tmp/site-analysis/` must be regenerated before Phase 3c:
- TKS.world: structure, screenshots, motion recordings
- Refunnel.com: structure, screenshots, motion recordings

## Constraints
- **No pixel-perfect cloning**: reuse principles, keep **original layout composition, copy, and visuals**.
- Single-page scroll site with anchor navigation; primary CTA is **Apply / Reserve seat**.
- **TKS palette**: black/near-black, white/off-white, green accent.
- **No paid ads** for pilot; site must support warm sharing.
- Must honor `prefers-reduced-motion`.
- Today is **February 3, 2026**; **Pilot event: Feb 28 - Mar 1, 2026**; Toronto Tech Week is **late May 2026**.

## Success Criteria
- All major deliverables listed in `Plans/plan.md` are represented in subphases.
- Funnel decisions are explicit (apply vs pay-first; deposit vs pay-in-full; refund policy stance).
- Stripe + DB + admin are defined with idempotent webhook handling.
- Motion + design spec is implementable without further subjective decisions.
- QA + deployment checklist is runnable.

## Subphase Index
* a — Canonical offer brief (name, persona, promises, guardrails)
* b — Single-page IA + copy/asset spec (anchored)
* c — Design + motion system spec (TKS palette, GSAP/Lenis)
* d — Apply + payment funnel spec (Stripe + DB + admin)
* e — Ops + GTM assets (agenda, prework, referrals, outreach, content capture, post-event)
* f — QA + deployment checklist (Playwright + Vercel)

