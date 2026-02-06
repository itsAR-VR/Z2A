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

## Subphase Index
* a — Master handoff doc (single doc consolidating Phase 3 + 4 into execution plan)
* b — Spec deltas (IA/copy + motion playbook updates: `#speakers`, proof line, admin motion)
* c — Admin foundations (DB + admin APIs: attendee updates, referral codes + audit logs)
* d — Motion system implementation spec (Lenis + GSAP/ScrollTrigger + CSS/IO + reduced-motion)
* e — UI implementation checklist (public + admin: file-level tasks and component inventory)
* f — QA + launch readiness (Stripe CLI + Playwright smoke + perf/a11y gates)

