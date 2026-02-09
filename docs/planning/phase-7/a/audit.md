# Phase 7a — Impeccable Audit (Report Only)

Date: 2026-02-08

Scope: public landing (`/`), apply funnel (`/apply`), admin (`/admin`), and shared motion/theming primitives.

## Executive Summary

The public funnel is already strong: premium light-first palette, clear hierarchy, and a credible “deposit via Stripe + refund policy” story. The main gaps are (1) lack of a system-level motion/token layer (lots of hard-coded timings), and (2) admin UX/a11y drift (bespoke overlay, missing ARIA semantics, non-keyboard row interactions, hard-coded status colors). Phase 7 should start by standardizing tokens/primitives (7b), then apply them across landing/apply/admin.

## Findings

### A) Accessibility (High impact)

1. **Admin detail overlay is not a real dialog**
   - `src/components/admin/AttendeeDetail.tsx:83` uses a bespoke `fixed inset-0 ...` overlay without shared dialog semantics.
   - Risk: no focus trap, no ESC close, no guaranteed focus restore, no `role="dialog"` / `aria-modal`.
   - Fix target: migrate to shared `src/components/Dialog.tsx` in 7e.

2. **Admin tabs lack ARIA semantics**
   - `src/app/admin/page.tsx` contains tab-like buttons but no `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`.
   - Risk: screen reader and keyboard navigation regressions.
   - Fix target: implement tab semantics + arrow key nav in 7e.

3. **Clickable table row interaction not keyboard accessible**
   - `src/components/admin/AttendeeTable.tsx:96` opens detail via `onClick={() => setSelectedId(a.id)}` (row-level interaction pattern).
   - Risk: keyboard users cannot access row action reliably; also discoverability.
   - Fix target: explicit button/link in the first cell in 7e.

### B) Motion Consistency + Reduced Motion (High impact)

1. **Reveal primitive uses hard-coded timings and permanent `will-change`**
   - `src/components/motion/RevealOnScroll.tsx:40-41` sets `willChange: "transform, opacity"` permanently and uses hard-coded `0.72s` + easing.
   - Risk: inconsistent motion feel and possible perf costs due to persistent GPU layers.
   - Fix target: tokenized motion system + variants and clear `will-change` after reveal (7b).

2. **Nav overlay transitions use ad-hoc Tailwind timing utilities**
   - `src/components/Nav.tsx:215,224` uses `duration-200 ease-out` toggles.
   - Risk: inconsistent feel vs other animations and harder to maintain.
   - Fix target: replace with motion tokens (7b).

3. **Reduced-motion E2E coverage is too narrow**
   - Current: `z2a/reduced-motion.spec.ts` only asserts marquee class absence.
   - Risk: regressions in hero GSAP, reveals, nav overlay transitions, or Lenis behavior can ship unnoticed.
   - Fix target: expand reduced-motion tests in 7f (and minimally in 7b if needed for new tokens).

### C) Theming / Semantic Tokens (Medium-high impact)

1. **Hard-coded admin status colors**
   - Confirmed instances:
     - `src/components/admin/AttendeeTable.tsx:140-149`
     - `src/components/admin/AuditLogViewer.tsx:78-79`
     - `src/components/admin/ReferralCodeTable.tsx:169-170, 198-199`
   - Risk: inconsistent palette vs public site, weak semantic mapping, and accessibility risk (contrast across backgrounds).
   - Fix target: introduce `--color-success` / `--color-info` + surface mixes, replace all Tailwind hard-coded colors (7b).

### D) Apply Funnel Resilience (Medium impact)

1. **Conversion UX is good but can be more resilient**
   - The apply flow is usable and already has validation tests.
   - Opportunity: add a first-invalid focus, aria-live summary, double-submit prevention, and a better retry state (7d).

### E) Performance / Quality (Medium impact)

1. **Persistent `will-change`**
   - Same as motion finding: likely the highest leverage perf win in Phase 7.

2. **Animation hygiene**
   - Phase 7 should enforce transform/opacity-only animations and ensure reduced-motion path is a first-class “no animation” experience.

## “AI Slop” Risk Check (Anti-pattern verdict)

Public site does not read as generic AI boilerplate; it feels intentionally designed. The admin UI is the main surface that looks “less intentional,” largely due to inconsistent semantics and hard-coded colors. Fixing tokens + a11y primitives will eliminate most of that gap.

## Recommended Phase Ordering

1. 7b (tokens + reveal primitive + semantic status colors) first.
2. 7c (landing structure + hero moment), then 7d (apply harden), then 7e (admin a11y/theming), then 7f (optimize + lock in tests).

