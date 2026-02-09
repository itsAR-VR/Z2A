# Phase 7b — System Foundations (Tokens + Motion Primitives)

## Focus
Make the improvements scalable: define and apply system-level motion + semantic color primitives so every section/feature uses the same rules. This is the "recursive" foundation that prevents one-off styling and random animation timings.

## Inputs
- 7a backlog (`docs/planning/phase-7/a/backlog.md`)
- Existing tokens: `src/app/globals.css`
- Existing motion infra: `src/components/motion/RevealOnScroll.tsx`, `src/hooks/useReveal.ts`, `src/hooks/useReducedMotion.ts`, `src/components/motion/LenisProvider.tsx`
- Existing E2E tests: `z2a/*.spec.ts`
- Phase 6 changes (if merged) as baseline

## Work
1. Motion tokens — dual-layer approach
   - **CSS motion tokens** (for transitions/CSS animations): Add to `src/app/globals.css` `@theme` block:
     - `--duration-fast: 0.2s`, `--duration-default: 0.4s`, `--duration-slow: 0.72s`, `--duration-cinematic: 1.0s`
     - `--ease-quart: cubic-bezier(0.25, 1, 0.5, 1)`, `--ease-expo: cubic-bezier(0.16, 1, 0.3, 1)`, `--ease-quint: cubic-bezier(0.22, 1, 0.36, 1)`
     - `--stagger-step: 60ms`
   - **JS motion constants** (for GSAP timelines): Create `src/lib/motion-tokens.ts` exporting:
     - `DURATION = { fast: 0.2, default: 0.4, slow: 0.72, cinematic: 1.0 }`
     - `EASE = { quart: "power2.out", expo: "power3.out", quint: "power4.out" }`
     - `STAGGER = { step: 0.06 }`
   - Note: CSS variables cannot be read by GSAP's JS engine — that's why we need both layers.
   - Replace ad-hoc `duration-*` + `ease-out` Tailwind classes with token-based `transition` properties where they appear in public and admin components.
2. Reveal primitive standardization
   - Upgrade `RevealOnScroll` (`src/components/motion/RevealOnScroll.tsx`) to:
     - Read CSS motion tokens instead of hardcoded `0.72s` / `cubic-bezier(0.16, 1, 0.3, 1)`.
     - Add variant prop: `variant?: "soft" | "snappy" | "cinematic"` (default: `"soft"`).
       - `soft` = `--duration-slow` + `--ease-expo` + 18px translate
       - `snappy` = `--duration-default` + `--ease-quart` + 10px translate
       - `cinematic` = `--duration-cinematic` + `--ease-quint` + 24px translate
     - Remove permanent `willChange: "transform, opacity"` — set it only before animation, clear after reveal completes (use a class toggle or inline style reset).
   - Ensure reduced-motion yields instant visibility (already handled by `useReveal`; verify no regression).
3. Semantic status/theming tokens
   - **Existing**: `--color-error` (oklch 58% 0.22 25), `--color-warning` (oklch 80% 0.17 85) — do NOT duplicate.
   - **Add only**: `--color-success: oklch(55% 0.18 155)` and `--color-info: oklch(55% 0.15 240)` (plus surface mixes: `--color-success-surface`, `--color-info-surface`, `--color-error-surface`, `--color-warning-surface`).
   - Replace all 15 hard-coded admin status color instances:
     - `src/components/admin/AttendeeTable.tsx` lines 140-149
     - `src/components/admin/AuditLogViewer.tsx` lines 78-79
     - `src/components/admin/ReferralCodeTable.tsx` lines 169-170, 198-199
   - Ensure contrast AA (4.5:1 text-on-surface minimum).
4. A11y interaction primitives (system-level)
   - Normalize focus ring: define `--ring-color: var(--color-focus)`, `--ring-offset: 2px`, `--ring-width: 2px` tokens. Ensure `focus-visible` usage is consistent across all interactive elements.
   - Document that `src/components/Dialog.tsx` is the canonical dialog pattern. All new dialogs must use it. `AttendeeDetail.tsx` must be migrated in 7e.
5. Verification gates
   - Update/extend `z2a/reduced-motion.spec.ts` to ensure new CSS tokens do not regress (e.g., `RevealOnScroll` elements are immediately visible).
   - Run `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:e2e` as required gates.

## Validation (RED TEAM)
- `src/app/globals.css` contains all new CSS motion and semantic tokens without duplicating existing `--color-error`/`--color-warning`.
- `src/lib/motion-tokens.ts` exists and exports typed duration/easing/stagger constants.
- `RevealOnScroll` accepts a `variant` prop and no longer has permanent `willChange`.
- Zero instances of `text-green-400`, `text-yellow-400`, `text-red-400` remain in `src/components/admin/`.
- `npm run lint && npm run typecheck && npm run build` pass.
- `npm run test:e2e` passes (no regressions).

## Output
Completed artifacts:
- Motion tokens + semantic status tokens in `src/app/globals.css`
- JS motion constants: `src/lib/motion-tokens.ts`
- Tokenized `RevealOnScroll` variants: `src/components/motion/RevealOnScroll.tsx`
- Removed hard-coded Tailwind status colors from admin:
  - `src/components/admin/AttendeeTable.tsx`
  - `src/components/admin/AuditLogViewer.tsx`
  - `src/components/admin/ReferralCodeTable.tsx`
- Tokenized nav overlay transitions: `src/components/Nav.tsx`
- Documentation: `docs/planning/phase-7/b/motion-and-tokens.md`

## Handoff
Subphases 7c/7d/7e must only use the new tokens/primitives (no new one-off easings/timings/colors). Any deviation must be documented in `motion-and-tokens.md`.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Added semantic status tokens (success/info + surface mixes) and motion tokens (durations/eases) to global theme.
  - Introduced JS motion constants (`src/lib/motion-tokens.ts`) for GSAP usage in later phases.
  - Upgraded `RevealOnScroll` to support variants and tokenized transitions; removed permanent `will-change`.
  - Replaced all hard-coded admin status colors (`text-*-400`) with semantic token usage.
  - Tokenized mobile nav overlay transition timings to use motion variables.
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
  - `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e` — pass (14 passed, 2 skipped)
- Blockers:
  - None.
- Next concrete steps:
  - Execute 7c: hero GSAP should use `src/lib/motion-tokens.ts` and land the “agent trace” signature moment + dialog.
