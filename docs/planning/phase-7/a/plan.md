# Phase 7a — Platform Inventory + Audit/Critique/Rams

## Focus
Establish a shared, written baseline of what exists today and what must change, using the "audit first" mandate. Output is a prioritized backlog that is specific enough to implement without additional decisions.

## Inputs
- Phase 7 root plan (`docs/planning/phase-7/plan.md`)
- Brand/context rules (`AGENTS.md`)
- Existing implementation:
  - Landing: `src/app/page.tsx`, `src/components/sections/*`, `src/components/Nav.tsx`
  - Apply: `src/app/apply/page.tsx`, `src/app/apply/success/page.tsx`
  - Admin: `src/app/admin/page.tsx`, `src/components/admin/*`
  - Motion: `src/components/motion/*`, `src/hooks/useReveal.ts`, `src/hooks/useReducedMotion.ts`
- Existing tests: `z2a/*.spec.ts`
- Phase 6 docs if present (do not duplicate; only reference for context)

## Work
1. Pre-flight conflict check
   - Run `git status --porcelain` and confirm all Phase 7 target files are clean (no uncommitted Phase 6 changes).
   - If dirty files detected: halt and coordinate with Phase 6 (commit/merge first).
   - Specifically check: `src/components/Nav.tsx`, `src/components/sections/Hero.tsx`, `src/app/apply/page.tsx`, `src/app/api/stripe/webhook/route.ts`, `z2a/*.spec.ts`.
2. Inventory surfaces and key user journeys
   - Landing: section scan path (Why → Speakers → Outcomes → How → Agenda → Pricing → FAQ → CTAFooter), nav behavior (sticky pill, scroll spy, mobile overlay dialog), Speakers dialog, StickyApplyBar.
   - Apply: happy path (submit → Stripe redirect → success page), validation, error states, network-code deep-link (`?network=1`).
   - Admin: tab buttons (attendees / referral-codes), AttendeeTable (clickable `<tr onClick>` rows, CSV export), AttendeeDetail overlay (bespoke, no Dialog component), ReferralCodeTable, AuditLogViewer.
3. Impeccable Audit (report only; do not fix in this subphase)
   - Accessibility: labels, focus, keyboard traps, dialog semantics, touch targets.
   - Performance: `will-change` permanently set on RevealOnScroll, GSAP bundle, image sizing.
   - Theming: 15 hard-coded Tailwind color instances in admin (`text-green-400`, `text-yellow-400`, `text-red-400`), missing `--color-success`/`--color-info` tokens.
   - Responsive: overflow, fixed widths, tap targets, mobile nav.
   - Admin a11y: no `tablist`/`tab`/`tabpanel` roles, clickable `<tr>` not keyboard-accessible, AttendeeDetail overlay lacks ESC/focus-trap/scroll-lock/aria-modal.
   - Anti-patterns verdict: does it look AI-generated, and where.
4. Impeccable Critique (design-director feedback)
   - Top 3-5 priority issues for conversion/trust + "agentic" story.
   - Concrete fixes and file targets.
5. Rams reviews (file-by-file, with line references)
   - Minimum set:
     - `src/components/Nav.tsx`
     - `src/components/sections/Hero.tsx`
     - `src/app/apply/page.tsx`
     - `src/app/admin/page.tsx`
     - `src/components/admin/AttendeeTable.tsx`
     - `src/components/admin/ReferralCodeTable.tsx`
     - `src/components/admin/AttendeeDetail.tsx` (added — bespoke overlay needs specific review)
6. Produce a decision-complete backlog
   - Each item: severity, user impact, file(s), recommended subphase (b/c/d/e/f), and acceptance test.

## Validation (RED TEAM)
- Pre-flight: `git status --porcelain` returns empty or only `docs/planning/phase-7/` files.
- Backlog contains at minimum: the 15 hard-coded admin color instances, the AttendeeDetail a11y gaps, the admin tab semantics gap, the clickable `<tr>` gap, the RevealOnScroll `will-change` issue, and the motion tokenization work.
- Each backlog item has a specific target subphase assignment (b/c/d/e/f).

## Output
Completed artifacts:
- `docs/planning/phase-7/a/audit.md`
- `docs/planning/phase-7/a/critique.md`
- `docs/planning/phase-7/a/rams.md`
- `docs/planning/phase-7/a/backlog.md`

## Handoff
Subphase 7b uses `backlog.md` to implement system-level tokens/primitives first, so later surface changes are consistent and low-risk.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Confirmed Phase 7 target files are clean; only untracked planning docs present.
  - Verified key audit claims against the repo (admin hard-coded colors, admin overlay, clickable row selection, RevealOnScroll hard-coded motion).
  - Produced the required audit/critique/rams/backlog artifacts.
- Commands run:
  - `git status --porcelain=v1` — pass (only untracked `docs/planning/phase-6/` and `docs/planning/phase-7/`).
  - `rg "text-(green|yellow|red)-400" src/components/admin` — pass (findings recorded with line refs).
  - `rg "willChange" src/components/motion/RevealOnScroll.tsx` — pass (finding recorded).
  - `rg "fixed inset-0" src/components/admin/AttendeeDetail.tsx` — pass (finding recorded).
- Blockers:
  - None.
- Next concrete steps:
  - Execute 7b to add motion + semantic tokens, upgrade `RevealOnScroll`, and remove hard-coded admin status colors.
