# Phase 6c — TKS-Style Menu + Navigation Polish (Accessibility-First)

## Focus
**Refine and polish** the existing Nav.tsx menu toward a TKS-inspired structure:
- stronger visual treatment and micro-interactions
- close remaining accessibility gaps
- cleaner mobile hierarchy

> **RED TEAM note (F1):** The current `Nav.tsx` already implements: mobile overlay menu, focus trap, ESC close, body scroll lock, `aria-expanded`, "Apply / Reserve Seat" CTA, and "Limited to 50 seats. Toronto." urgency text. This phase is **refinement**, not greenfield. Start by auditing what exists.

## Inputs
- Current nav implementation: `src/components/Nav.tsx` (200 lines, fully functional)
- Existing anchored IA on `/`:
  - `#why` → `#speakers` → `#outcomes` → `#how` → `#agenda` → `#pricing` → `#faq` → `#apply`
- Motion constraints from Phase 5:
  - reduced-motion must disable/shorten transitions
- Reduced-motion hook: `src/hooks/useReducedMotion.ts`
- StickyApplyBar: `src/components/StickyApplyBar.tsx` (already shows "Admissions open" badge)

## Work
1. **Audit the current nav** (read `Nav.tsx` first!)
   - Document what already exists (overlay, focus trap, scroll lock, ARIA)
   - Identify gaps vs. Phase 6 goals (listed below)
   - Desktop vs mobile behavior differences
   - Current affordance for jump-to-section + Apply CTA
2. **Close accessibility gaps** _(RED TEAM F3)_
   - Add `id="nav-menu"` to the overlay div (currently has no ID)
   - Add `aria-controls="nav-menu"` to the mobile menu button
   - Verify focus trap covers the Close button inside the overlay
3. **Refactor menu overlay for transitions** _(RED TEAM F4)_
   - Current: `{menuOpen && <div ...>}` — conditional rendering, no exit animation possible
   - Target: Always-mounted overlay with CSS-driven visibility (opacity + pointer-events + transform)
   - Gate transitions behind `prefers-reduced-motion` (use `useReducedMotion()` hook or CSS media query)
   - Without this refactor, open/close micro-interactions are impossible
4. **Fix scroll lock layout shift** _(RED TEAM F9)_
   - Current: `document.body.style.overflow = "hidden"` causes ~15px layout shift when scrollbar disappears
   - Fix: Either add `scrollbar-gutter: stable` to `<html>`, or compute scrollbar width and apply compensating `padding-right` to body when locking
5. **Enhance visual treatment (TKS-inspired)**
   - Evaluate: larger typography in overlay links, stronger "admissions open" treatment
   - Evaluate: staggered entry animation for overlay links (progressive enhancement)
   - Keep the 2-column grid layout or test full-width layout for readability
   - Ensure "Apply / Reserve Seat" CTA remains prominent
6. **Micro-interactions**
   - Hover/press states on overlay links (subtle background shift)
   - Small directional motion (translate/opacity) gated by `prefers-reduced-motion`
   - Menu open: overlay fades in + content slides up (or instant for reduced-motion)
   - Menu close: reverse animation (or instant for reduced-motion)
7. **Tests**
   - Add/adjust Playwright checks for:
     - menu opens/closes (already partially covered in landing.spec.ts — check)
     - focus behavior (button → first link → trap → ESC → button)
     - section navigation works (click link → menu closes → scroll to section)
     - `aria-controls` and `aria-expanded` attributes present

## Validation
- [ ] `aria-controls="nav-menu"` present on menu button when rendered
- [ ] Overlay has `id="nav-menu"`
- [ ] No layout shift when menu opens (scrollbar compensation)
- [ ] Menu open/close has visible transition (when reduced-motion not active)
- [ ] Menu open/close is instant (when reduced-motion is active)
- [ ] Focus trap: Tab cycles within overlay, Shift+Tab wraps backward
- [ ] ESC closes menu and returns focus to menu button
- [ ] All Playwright tests pass: `npm run test:e2e`
- [ ] `npm run lint` and `npm run typecheck` pass

## Output
- Updated `src/components/Nav.tsx` (TKS-inspired polish + a11y hardening):
  - Added reliable open/close lifecycle with exit animation support (no timer race).
  - Kept body scroll lock, plus scrollbar-width padding compensation to avoid layout shift.
  - Added `aria-current` on active section links (desktop + overlay).
  - Added `aria-labelledby` for the overlay dialog (“Navigate”) and kept existing `aria-controls` + `id`.
  - Tightened focus-trap filtering (`aria-hidden="true"`, `hidden`, disabled controls).
  - Added reduced-motion-safe styles for the mobile Menu button.
- Verified:
  - `npm run lint` PASS
  - `npm run typecheck` PASS
  - `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e` PASS

## Handoff
- No additional handoff required beyond `src/components/Nav.tsx`.
