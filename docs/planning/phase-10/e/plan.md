# Phase 10e — File-Level Implementation Plan + Acceptance Tests

## Focus
Translate Jam findings, copy strategy, critique priorities, and skill mapping into a deterministic engineering implementation sequence.

## Inputs
- Evidence ledger (10a)
- Copy clarity spec (10b)
- UX critique backlog (10c)
- Impeccable matrix (10d)
- Current codebase structure under the section components, shared components, `src/app/apply/page.tsx`, and Playwright specs in `z2a/`.

## Work

### Step 0 — Analytics prerequisite
Before any copy changes, instrument basic conversion tracking:
- Page views: landing (`/`), apply (`/apply`), success (`/apply/success`)
- Apply form starts: fire event when first form field receives focus
- Deposit completions: fire event on Stripe success redirect
- CTA click events: Hero CTA, Pricing CTA, StickyApplyBar CTA, CTAFooter CTA
- Implementation: choose one of Vercel Analytics (zero-config) / GA4 / lightweight custom `navigator.sendBeacon`

### Step 1 — Hero.tsx unified changes (shared across viewports)
**Note:** Hero.tsx is touched by both mobile and desktop concerns. All Hero changes are combined here to avoid file-level conflicts.

Mobile concerns:
- Resolve status chip wording ambiguity (use canonical term from 10b terminology dictionary).
- Tune first-screen spacing and trust scan path.

Desktop concerns:
- Add immediate visual CTA click feedback (match apply-page pattern: text → "Redirecting..." + disabled state).

Both viewports:
- After all Hero changes, **verify GSAP hero loop** renders correctly at both 390×844 and 1333×863. The "Plan → Build → Deploy → Evaluate" runner dot positions are tied to absolute coordinates — re-calibrate node positions if layout shift detected.

### Step 2 — Lane A: Mobile-first corrections (excluding Hero)
- `src/components/Nav.tsx`
  - Smooth menu enter/exit timing.
  - Improve menu state clarity.
  - Standardize status language in overlay (use canonical term from 10b).
- `src/components/StickyApplyBar.tsx`
  - Align status language with hero/nav (use canonical term from 10b).
  - Keep trust cues concise and visible.

### Step 3 — Lane B: Desktop-first corrections (excluding Hero)
- `src/components/sections/Speakers.tsx`
  - Normalize speaker card structure and credibility proof hierarchy.
  - Improve outbound-profile affordance clarity.
- `src/components/sections/FAQ.tsx`
  - Add pre-accordion quick confidence strip (spec from 10c).
  - Reorder FAQ items by decision friction (order from 10c).
- CTA surfaces (click feedback):
  - `src/components/sections/Pricing.tsx`
  - `src/components/sections/CTAFooter.tsx`
  - Add immediate visual response on click (same pattern as Hero CTA above).

### Step 4 — Shared conversion/copy updates
- `src/components/sections/Why.tsx`
- `src/components/sections/Outcomes.tsx`
- `src/components/sections/HowItWorks.tsx`
- `src/components/sections/Pricing.tsx`
- `src/app/apply/page.tsx`
- Apply the canonical narrative ladder and plain-language terminology consistently.

### Step 5 — SEO metadata update
- `src/app/layout.tsx`
  - Review and update page title and meta description to match new headline copy.

### Step 6 — Verification plan
- Copy consistency checks (every status/CTA term matches 10b terminology dictionary).
- Viewport QA checks (mobile 390×844 and desktop 1333×863).
- GSAP hero loop visual verification at both viewports.
- Accessibility checks for all changed interactions (preserve Phase 7 a11y patterns).
- Regression checks for apply flow and CTA routing.
- **Playwright test updates**: Update text-matching assertions in `z2a/landing.spec.ts` and `z2a/reduced-motion.spec.ts` to match new copy. Add assertions for any new UI elements (e.g., confidence strip, CTA feedback states).
- **Quality gates**: `npm run lint && npm run typecheck && npm run build` must pass after each step.

## Output
- Implementation artifact created:
  - `docs/planning/phase-10/e/implementation-checklist.md`
- Delivered contents:
  - stepwise execution sequence,
  - mobile and desktop remediation lanes,
  - test matrix and quality gates,
  - coordination notes for overlap-sensitive files.

## Handoff
Send `implementation-checklist.md` to Phase 10f as primary evidence of execution readiness.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Converted strategy into deterministic engineering steps with explicit file targets.
  - Added verification matrix with pass/fail conditions.
  - Added overlap coordination notes for Hero/Nav/Pricing surfaces.
- Commands run:
  - `cat > docs/planning/phase-10/e/implementation-checklist.md` — pass.
- Blockers:
  - None for this subphase.
- Next concrete steps:
  - Execute evaluator pass in 10f and close any gaps surfaced by scoring.
