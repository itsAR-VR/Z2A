# Phase 10 — Consumer Repositioning + Jam-Driven UX Remediation + Impeccable Skill Matrix

## Purpose
Capture every actionable item from the recent Jam investigations and planning conversation into one decision-complete execution phase, then convert those findings into a concrete mobile+desktop remediation roadmap that shifts the site toward a normal-consumer audience without losing premium trust.

## Context
- User instruction for this phase:
  - Consolidate all work so far into a new phase plan with full detail.
  - Use deep Jam analysis as the evidence base.
  - Produce a clear action plan using Impeccable design skills.
  - Prioritize clarity of copy and UX communication.
- Jam evidence to include:
  - Mobile session: `39d008ce-ff63-41e4-a1a7-62f023a53933` (390x844, Arc).
  - Desktop session: `6d76b0f8-80fd-46a7-b5ec-f78d18a82816` (1333x863, Chromium).
- High-signal findings already established:
  - Mobile: repeated menu toggles, transition harshness feedback, admissions/status copy confusion, vertical alignment concern.
  - Desktop: speaker professionalism concerns, repeated FAQ toggles for confidence checks, repeated CTA clicks.
  - Cross-jam: no hard first-party functional blockers; primary issues are copy clarity, trust sequencing, and interaction confidence.
- Strategic positioning requested by user:
  - Keep three outcome layers in the narrative:
    1) save time on recurring work now,
    2) level up practical AI skills,
    3) use reclaimed time/skill to build bigger upside.

## Concurrent Phases
Overlap exists with prior completed phases that touch the same UI surfaces and must be treated as baseline, not reverted.

| Phase | Status | Overlap | Coordination |
|-------|--------|---------|--------------|
| Phase 9 | Complete | `src/components/sections/Hero.tsx`, `src/components/Nav.tsx`, `z2a/landing.spec.ts`, `z2a/reduced-motion.spec.ts` | Preserve current hero motion baseline; only apply deliberate copy/UX edits. |
| Phase 8 | Complete | `src/components/sections/Speakers.tsx`, `src/components/sections/Pricing.tsx`, `src/app/apply/page.tsx`, apply API and trust copy surfaces | Build on single-plan/referral-tracking model; do not reintroduce old two-SKU logic. |
| Phase 7 | Complete | Impeccable-driven UX/motion/theming conventions | Reuse existing motion tokens and accessibility patterns; do not fork design language. |

## Objectives
* [x] Produce a single source-of-truth issue inventory from both Jams, split by viewport and funnel stage.
* [x] Define copy and microcopy rewrites with `impeccable-clarify` rigor for all high-impact text surfaces.
* [x] Define visual hierarchy/IA/credibility improvements with `impeccable-critique` rigor.
* [x] Map every available `impeccable-*` skill to concrete website areas/files and intended use.
* [x] Create a file-level implementation sequence with acceptance criteria and verification checks.
* [x] Prepare evaluator-facing artifacts (independent review prompt + scoring rubric) for plan quality validation.

## Prerequisites
- **Analytics instrumentation**: Instrument basic conversion tracking *before* any copy changes ship. At minimum: page views (landing, apply, success), apply-form starts, deposit completions, CTA click events (Hero, Pricing, StickyBar, CTAFooter). This establishes a measurable baseline.
- **Phase 7/8/9 baseline locked**: All three phases are complete and merged to `main` (verified commit `9dbe246`). No uncommitted changes.

## Execution Model
Impeccable skills (`/impeccable:clarify`, `/impeccable:critique`, etc.) are invoked as a **two-step pattern**:
1. **Invoke** the skill via its Claude Code slash command (e.g., `/impeccable:clarify`) to generate initial analysis/output.
2. **Refine** the output manually to fit the specific context, target component, and Jam evidence.
3. **Capture** final refined artifacts as markdown in the relevant subphase folder (e.g., `docs/planning/phase-10/b/`).

## Constraints
- Audience and tone:
  - Shift to normal consumer/professional clarity while preserving premium, grounded, builder-first credibility.
  - No hypey "AI magic" language.
- Truth and trust:
  - Refund, Stripe, seat limit, deposit/remainder mechanics must remain explicit and accurate.
- Technical boundaries:
  - No backend pricing model changes in this phase plan.
  - Preserve existing API contract unless explicitly listed.
- UX quality:
  - Mobile and desktop require separate remediation tracks.
  - All motion changes must remain reduced-motion compliant.
- Accessibility:
  - Preserve Phase 7 a11y patterns (focus management, keyboard navigation, touch targets ≥44px).
  - Any new interactive elements must meet WCAG 2.1 AA.
- Coordination:
  - Any edits to Hero/Nav/Pricing/Speakers/FAQ/Apply must account for Phase 8/9 behavior and tests.
- Rollback safety:
  - All changes committed in granular, revertible commits (one per lane minimum).
  - If post-launch feedback is negative, revert to the pre-Phase-10 commit.

## Success Criteria
- Planning artifacts:
  - [x] `docs/planning/phase-10/plan.md` exists and is complete.
  - [x] Subphase files `a` through `f` exist and are populated.
- Decision completeness:
  - [x] Every Jam-derived issue has: evidence, root cause, target file/component, concrete change, acceptance check.
  - [x] Copy strategy is explicit and consistent across hero, pricing, FAQ, and apply funnel.
- Impeccable coverage:
  - [x] Every `impeccable-*` skill has a mapped application area in this product.
- QA readiness:
  - [x] Contains a runnable verification matrix (manual + automated checks) and independent evaluation prompt.

## Subphase Index
* a — Jam Evidence Consolidation (mobile vs desktop forensic ledger)
* b — Copy Clarity System (`impeccable-clarify` execution plan)
* c — UX/Design Critique System (`impeccable-critique` execution plan)
* d — Impeccable Skill-to-Site Coverage Matrix (all impeccable skills)
* e — File-Level Implementation Plan + Acceptance Tests
* f — Independent Evaluation Pack (agent prompt, scoring rubric, closure checklist)
* g — Implementation Execution (consumer copy + trust UX + CTA confidence + instrumentation)

### Subphase Dependency Diagram
```
a (evidence) → b (copy) ──────→ e (implementation) → f (evaluation)
a (evidence) → c (critique) → d (skill mapping) ↗
```
- `a` must complete first (evidence base for everything).
- `b` and `c` can run in parallel after `a` (copy and UX critique are independent disciplines).
- `d` depends on `c` output (skill mapping needs critique priorities).
- `e` depends on both `b` and `d` (implementation needs finalized copy + prioritized fixes).
- `f` runs after `e` (evaluation requires completed implementation plan).

## Repo Reality Check

### Verified Touch Points (all exist on `main` at commit `9dbe246`)
| File | Status | Current State |
|------|--------|---------------|
| `src/components/sections/Hero.tsx` | Exists | Headline: "Build a working AI agent in a weekend. In person." Status chip: "Admissions live". GSAP hero loop (Phase 9). |
| `src/components/Nav.tsx` | Exists | 7 desktop links, mobile 2-col grid, badge: "Admissions open" |
| `src/components/StickyApplyBar.tsx` | Exists | Badge: "Admissions open", CTA: "Apply now" |
| `src/components/sections/Speakers.tsx` | Exists | 2 speakers with LinkedIn links (Phase 8 simplified) |
| `src/components/sections/FAQ.tsx` | Exists | 11 Q&A items in accordion |
| `src/components/sections/Pricing.tsx` | Exists | Single plan, $100 deposit, early bird (Phase 8) |
| `src/components/sections/Why.tsx` | Exists | 3 reason cards |
| `src/components/sections/Outcomes.tsx` | Exists | 3 outcome cards |
| `src/components/sections/HowItWorks.tsx` | Exists | 5-step timeline |
| `src/components/sections/CTAFooter.tsx` | Exists | Final CTA + badges |
| `src/app/apply/page.tsx` | Exists | 8-field form, 3 quick-select templates |
| `src/app/page.tsx` | Exists | Section order: Nav→StickyApplyBar→Hero→Why→Speakers→Outcomes→HowItWorks→Agenda→Pricing→FAQ→CTAFooter |

### Known Status Language Inconsistency
Three different strings currently in use — must be resolved to a single canonical term in 10b:
- "Admissions live" — Hero status chip
- "Admissions open" — Nav badge + StickyApplyBar badge
- "Applications open" — Hero marquee

### What Does NOT Exist
- No analytics/tracking on the site (prerequisite above addresses this)
- No testimonial/proof section yet (implementation checkpoint defined in subphase 10e).

## RED TEAM Findings (2026-02-11)
Key plan hardening updates this turn:
- Removed stale reference to non-existent external RED TEAM file.
- Confirmed subphase outputs now exist on disk:
  - `a/jam-evidence-ledger.md`
  - `b/terminology.md`, `b/copy-spec.md`
  - `c/critique-report.md`
  - `d/impeccable-matrix.md`
  - `e/implementation-checklist.md`
  - `f/evaluator-pack.md`
- Confirmed multi-agent coordination constraints for overlap-heavy files (`Hero.tsx`, `Nav.tsx`, `Pricing.tsx`).
- Preserved implementation-phase prerequisite: analytics baseline before copy rollout.

## Phase Summary (running)
- 2026-02-11 — Collected and compared two deep Jam analyses (mobile + desktop) and produced cross-jam synthesis.
- 2026-02-11 — Identified that current risk is conversion UX/copy/trust sequencing, not first-party technical failure.
- 2026-02-11 — Initiated Phase 10 planning to transform findings into a single decision-complete implementation blueprint.
- 2026-02-11 — RED TEAM review completed. Resolved 4 open questions. Patched all subphase plans.
- 2026-02-11 — Completed subphase deliverables 10a–10f and linked each plan to concrete output artifacts for execution handoff.
- 2026-02-11 — Added execution subphase 10g and implemented Jam-priority copy/UX remediations in product code.
- 2026-02-11 — Added lightweight analytics baseline (page views, CTA clicks, apply start, success signal) and updated landing assertions.
- 2026-02-11 23:34 EST — Implemented mobile-first conversion polish pass (menu swipe-down softening, hero metadata emphasis, marquee removal, outcomes section replacement with three-image block, objection-first FAQ rewrite, LinkedIn icon CTA update, pods-of-5 copy normalization) and validated via lint/typecheck/build + Playwright specs + Playwright visual QA (files: `src/components/Nav.tsx`, `src/components/sections/Hero.tsx`, `src/components/sections/Why.tsx`, `src/components/sections/Outcomes.tsx`, `src/components/sections/Speakers.tsx`, `src/components/sections/FAQ.tsx`, `src/components/sections/Pricing.tsx`, `src/components/sections/HowItWorks.tsx`, `src/components/sections/CTAFooter.tsx`, `src/app/globals.css`, `z2a/landing.spec.ts`, `z2a/reduced-motion.spec.ts`, `z2a/speakers.spec.ts`, `public/program/*`, `docs/planning/phase-10/g/plan.md`).

## Phase Summary

- Shipped:
  - Jam evidence ledger, copy clarity system, critique report, impeccable skill matrix, implementation checklist, and evaluator pack.
  - Root and all subphase plans updated with concrete progress/output/handoff entries.
  - Phase 10g execution edits across Hero/Nav/Sticky/Speakers/FAQ/Pricing/CTAFooter/Apply/Layout + analytics endpoint/tracker.
- Verified:
  - `npm run lint`: pass
  - `npm run typecheck`: pass
  - `npm run build`: pass
  - Playwright local validation: blocked in sandbox (`listen EPERM 0.0.0.0:3000`).
  - `npm run db:push`: skip (no schema change)
- Notes:
  - Post-implementation review written at `docs/planning/phase-10/review.md`.
  - Phase 10 is complete as a planning/review phase; execution is next-phase work.
