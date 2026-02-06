# Phase 4 — Public UI + Motion + Ops Admin UI (Speakers + Referral Audits)

> **STATUS: SUPERSEDED** — Consolidated into `docs/planning/phase-5/plan.md`. Use Phase 5 as the single source of truth.

## Purpose
Create a **decision-complete execution plan** for a follow-on UI agent to implement the public marketing site UI/motion and the ops admin UI on top of the existing Phase 3 backend scaffold.

## Context
- Phase 3 shipped the **backend/funnel scaffold** (Next.js + Prisma + Stripe + admin auth + admin APIs) and produced the canonical offer/IA/motion specs.
- New requirements since Phase 3:
  - Add a new `#speakers` section **after** `#why` with **two speaker cards**:
    - Aadil Kazmi (primary instructor)
    - Abdur Rehman Sajid (guest speaker; co-host content Day 1 and Day 2)
  - Replace the current TBD proof line in `#why` with a stronger outcome sentence:
    - “Attendees leave knowing how to build a production-ready enterprise-grade workflow that leverages AI agents to repeatably automate work.”
  - Use the **most robust motion stack**:
    - Lenis (desktop-only) + GSAP/ScrollTrigger (scroll-driven) + CSS/IntersectionObserver (everything else)
  - Build a **full ops admin UI** and add **referral code management with audit logs**.

## Concurrent Phases
Overlap exists with Phase 3 (same domain: IA/copy/motion + backend scaffold). Phase 4 is a delta-plan to capture the additional requirements without reworking Phase 3’s locked decisions.

| Phase | Status | Overlap | Coordination |
|-------|--------|---------|--------------|
| Phase 3 | Active | IA/copy/motion docs; backend scaffold; admin auth | Phase 3 remains source of truth for offer mechanics. Phase 4 updates copy structure (`#speakers`) and specifies admin UI + audit logging additions. |

## Objectives
* [ ] Update IA/copy and motion playbook to include `#speakers`, Abdur speaker content, and the new proof line.
* [ ] Specify the robust motion stack with clear reduced-motion behavior and performance budgets.
* [ ] Specify the ops admin UI (IA + interactions) and the required backend/DB changes (referral audit logs, internal notes).
* [ ] Produce a clear, runnable QA/acceptance checklist for the UI agent (public + admin).

## Constraints
- **Do not clone** TKS/Refunnel pixel-perfect; use principles and motion motifs only.
- Honor `prefers-reduced-motion` globally:
  - Disable Lenis and scroll-scrub motion in reduced-motion mode.
  - All content must be usable without JS motion.
- Keep locked offer constants unchanged (seat cap, deposit, pricing mechanics). Treat Phase 3 docs as the canonical source.
- Abdur is labeled **“Guest speaker”** for v1; structure should allow adding more speakers later.
- Award naming: derive exact award name from `/Users/AR180/Desktop/Codespace/Z2A/docs/image2-2-1.jpeg` (no extra research required).

## Success Criteria
- `docs/planning/phase-4/plan.md` and each subphase scaffold exists and is populated.
- Subphase plans are decision-complete and contain:
  - Exact section order including `#speakers`
  - Speaker card content requirements and asset paths
  - Motion stack decisions (Lenis + GSAP/ScrollTrigger + CSS/IO) and reduced-motion rules
  - Admin UI IA + required API/DB deltas for referral code audit logs
  - QA and acceptance tests for public + admin

## Subphase Index
* a — IA/copy + motion playbook delta (`#speakers`, proof line, speaker content/assets)
* b — Admin data + API deltas (internal notes, referral code CRUD + audit logs)
* c — Motion infrastructure spec (Lenis + GSAP/ScrollTrigger + CSS/IO, reduced-motion, perf)
* d — Public UI implementation checklist (`/`, `/apply`, `/apply/success`)
* e — Admin UI implementation checklist (`/admin` + referral code/audit UI)
* f — QA + acceptance criteria (public + admin, perf + accessibility)
