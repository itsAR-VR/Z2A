# Phase 7a — Implementation Backlog (Decision-Complete)

Date: 2026-02-08

Legend:
- Severity: P0 (must fix), P1 (high), P2 (medium), P3 (nice-to-have)
- Target subphase: b/c/d/e/f

## P0 — Must Fix (Ship Bar)

1. Tokenize motion across the system (CSS + JS)
   - Impact: consistency, reduced future drift, easier reduced-motion correctness.
   - Files: `src/app/globals.css`, add `src/lib/motion-tokens.ts`
   - Subphase: 7b
   - Acceptance:
     - motion tokens exist in `globals.css`
     - GSAP uses JS tokens (later in 7c), and CSS transitions use CSS tokens

2. Fix RevealOnScroll hard-coded transitions + permanent `will-change`
   - Impact: perf + consistency; avoids persistent GPU layers.
   - Files: `src/components/motion/RevealOnScroll.tsx`
   - Subphase: 7b
   - Acceptance:
     - `variant?: "soft" | "snappy" | "cinematic"` exists
     - no permanent `willChange` inline style
     - reduced-motion yields immediate visibility

3. Replace hard-coded admin status colors with semantic tokens
   - Impact: consistent palette + semantic meaning + contrast control.
   - Files:
     - `src/app/globals.css` (add `--color-success`, `--color-info`, and surface mixes)
     - `src/components/admin/AttendeeTable.tsx:140-149`
     - `src/components/admin/AuditLogViewer.tsx:78-79`
     - `src/components/admin/ReferralCodeTable.tsx:169-170,198-199`
   - Subphase: 7b
   - Acceptance:
     - `rg "text-(green|yellow|red)-400" src/components/admin` returns 0 matches

## P1 — High Priority (Trust + Accessibility)

4. Admin: migrate AttendeeDetail overlay to shared Dialog
   - Impact: keyboard/a11y correctness, premium feel, predictable behavior.
   - Files: `src/components/admin/AttendeeDetail.tsx` (and any callers)
   - Subphase: 7e
   - Acceptance:
     - has `role="dialog"` via shared Dialog
     - ESC closes, focus restores, scroll lock works

5. Admin: implement ARIA tabs + arrow key navigation
   - Impact: a11y correctness; consistent UI semantics.
   - Files: `src/app/admin/page.tsx`
   - Subphase: 7e
   - Acceptance:
     - `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected` present

6. Admin: remove clickable `<tr>` and add explicit action control
   - Impact: keyboard usability; clearer interaction.
   - Files: `src/components/admin/AttendeeTable.tsx`
   - Subphase: 7e
   - Acceptance:
     - no row-level click handler that opens details
     - user can Tab to the “open detail” control and activate with Enter/Space

## P1 — High Priority (Landing “TKS-inspired” direction)

7. Motion consistency: replace ad-hoc nav overlay timing classes with tokens
   - Impact: coherent feel across the site.
   - Files: `src/components/Nav.tsx`
   - Subphase: 7b (token foundation), then 7c (apply on landing)
   - Acceptance:
     - nav overlay uses tokenized timing/easing (no `duration-200 ease-out` for core transitions)

8. Expand reduced-motion E2E coverage beyond marquee
   - Impact: prevents silent regressions in GSAP/reveals/nav.
   - Files: `z2a/reduced-motion.spec.ts`
   - Subphase: 7f (or minimally in 7b if reveal changes require it)
   - Acceptance:
     - checks hero/reveal/nav/Lenis behaviors under reduced-motion

## P2 — Medium (Apply conversion resilience)

9. Apply: add error summary + focus first invalid field
   - Impact: faster correction; better accessibility.
   - Files: `src/app/apply/page.tsx`
   - Subphase: 7d
   - Acceptance:
     - submit empty → summary visible (`aria-live="assertive"`) and focus lands on first invalid field

10. Apply: prevent double submission + show in-flight state
   - Impact: reduces duplicate charges / confusion; makes flow feel robust.
   - Files: `src/app/apply/page.tsx`
   - Subphase: 7d
   - Acceptance:
     - submit button disabled while request in-flight

11. Apply: add skippable example use-case chips
   - Impact: lowers blank-page friction for users.
   - Files: `src/app/apply/page.tsx`
   - Subphase: 7d
   - Acceptance:
     - clicking a chip inserts text into the textarea (Playwright test)

## P2 — Medium (Landing hero signature moment)

12. Landing: add a single “agent trace” decorative layer and optional “Agent Trace” dialog
   - Impact: TKS-inspired energy while staying grounded.
   - Files: `src/components/sections/Hero.tsx`, `src/components/Dialog.tsx` usage
   - Subphase: 7c
   - Acceptance:
     - desktop-only decorative trace
     - reduced-motion shows it static
     - dialog has focus/ESC/focus restore tests

## P3 — Nice-to-have

13. Admin: better empty/loading/error states
   - Impact: polish + ops trust.
   - Files: `src/components/admin/AttendeeDetail.tsx`, `src/components/admin/AttendeeTable.tsx`
   - Subphase: 7e

