# Phase 7f — Optimize + Polish + Verification

## Focus
Perform the final quality pass across the whole site: performance, motion smoothness, responsive details, and cross-surface consistency. Expand regression coverage so the "impeccable" standard stays intact.

## Inputs
- Outputs of 7b/7c/7d/7e
- Existing QA commands and Playwright suite

## Work
1. Optimize
   - Confirm all animations use only `transform`/`opacity` (grep for `animate-`, `transition-` in component files; flag any that animate `height`, `width`, `margin`, `padding`, `top`, `left`).
   - Verify `RevealOnScroll` no longer has permanent `will-change` (fixed in 7b).
   - Review image usage: all `<img>` tags should use `next/image` with explicit `width`/`height` or `fill` to prevent CLS.
   - Confirm `LenisProvider.tsx` stays desktop-only (media query check) and disabled under `prefers-reduced-motion`.
   - Check GSAP bundle: confirm no paid plugins imported (DrawSVGPlugin, MorphSVG, SplitText, etc.).
2. Polish
   - Spacing/typography rhythm: all landing sections use `.section-padding`; verify consistent `container-content` usage.
   - Interactive state completeness: every `<button>` and `<a>` has hover, focus-visible, active, and disabled states.
   - Copy consistency: "Zero-to-Agent" (hyphenated), "AI agent" (not "AI Agent"), "deposit" (not "payment"), "network code" (not "referral code" in public copy).
3. Verification
   - Run: `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:e2e`.
   - Add/verify Playwright coverage for:
     - **Reduced-motion** (`z2a/reduced-motion.spec.ts`):
       - Hero GSAP elements have no transform animation (opacity is 1, y is 0).
       - Agent-trace SVG (if added in 7c) is static (no stroke-dashoffset animation class).
       - `RevealOnScroll` elements are immediately visible (opacity 1, transform none).
       - Lenis is not initialized (no `html.lenis` class or equivalent marker).
       - Nav overlay transitions are instant (no CSS transition classes).
     - **Mobile menu** (`z2a/landing.spec.ts` or new spec):
       - Menu button click opens overlay, first link receives focus.
       - ESC closes overlay, focus returns to menu button.
       - Body scroll is locked when menu is open (verify `overflow: hidden`).
     - **Agent-trace dialog** (if added in 7c):
       - Trigger button click opens dialog (`role="dialog"` visible).
       - ESC closes dialog, focus restores to trigger.
     - **Admin tabs** (if E2E tests set up in 7e):
       - `role="tablist"` exists, tab click switches `aria-selected`.
       - Tab panel content updates.
     - **Admin dialog** (if E2E tests set up in 7e):
       - AttendeeDetail opens with `role="dialog"`, ESC closes, focus restores.
   - Note: admin E2E tests require Basic Auth credentials from `.env.local` (`ADMIN_BASIC_AUTH_USER` + `ADMIN_BASIC_AUTH_PASS`/`ADMIN_BASIC_AUTH_PASSWORD`) via Playwright `httpCredentials`.
4. Final report
   - Write `docs/planning/phase-7/review.md` summarizing:
     - Files modified per subphase.
     - Key decisions made and why.
     - Remaining risks or known issues.
     - QA gate results (lint, typecheck, build, e2e).

## Validation (RED TEAM)
- All QA commands pass: `npm run lint && npm run typecheck && npm run build && npm run test:e2e`.
- `z2a/reduced-motion.spec.ts` has >= 5 test cases (marquee + hero + reveals + lenis + nav).
- No `will-change: transform` permanently set in any component.
- No GSAP paid plugin imports found in codebase.
- `docs/planning/phase-7/review.md` exists and is non-empty.

## Assumptions / Open Questions (RED TEAM)
- Assumption: All prior subphases (7b-7e) completed successfully before 7f runs. If any subphase was skipped, 7f's verification may fail on missing features. (confidence ~95%)
  - Mitigation: 7f's first step should run `npm run build` to catch any compilation errors from incomplete prior work.

## Output

Completed artifacts:
- Expanded reduced-motion regression coverage to 5+ cases:
  - Marquee non-animated
  - RevealOnScroll visible + transitionless
  - Lenis disabled marker
  - Menu open/close scroll lock + no transitions
  - Hero agent trace static
  - (file: `z2a/reduced-motion.spec.ts`)
- Added landing regression test for menu focus/scroll lock:
  - (file: `z2a/landing.spec.ts`)
- Added a small, testable marker for Lenis initialization:
  - `document.documentElement.dataset.z2aLenis="on"` when active
  - (file: `src/components/motion/LenisProvider.tsx`)
- QA gates run and passing:
  - `npm run lint && npm run typecheck && npm run build`
  - `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e`

## Handoff
If new pages/features are added later, repeat the 7a -> 7f loop using the same system primitives and acceptance criteria.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Added menu regression coverage and expanded reduced-motion suite to enforce progressive enhancement behaviors.
  - Added a deterministic Lenis marker to enable reduced-motion verification.
  - Re-ran full QA gates after changes.
- Commands run:
  - `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e` — pass (34 passed, 2 skipped)
  - `npm run lint && npm run typecheck && npm run build` — pass
- Blockers:
  - None.
- Next concrete steps:
  - Write `docs/planning/phase-7/review.md`.
  - Run prod-safe smoke suite against deploy (`PLAYWRIGHT_BASE_URL=https://zerotoagent.com npm run test:e2e:prod`) after production updates.
