# Phase 10e Output — Implementation Checklist and Test Matrix

## Step 0 — Instrumentation Baseline
- [ ] Add CTA click tracking for Hero/Pricing/Sticky/CTAFooter.
- [ ] Add apply-form-start event.
- [ ] Confirm success-page signal exists.

## Step 1 — Shared Terminology Patch
Files:
- `src/components/sections/Hero.tsx`
- `src/components/Nav.tsx`
- `src/components/StickyApplyBar.tsx`
Actions:
- [ ] Replace non-canonical status terms with `Applications open now`.

## Step 2 — Mobile Lane
Files:
- `src/components/Nav.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/StickyApplyBar.tsx`
Actions:
- [ ] Tune menu enter/exit timing and easing.
- [ ] Improve first-screen spacing/scan path.
- [ ] Verify reduced-motion behavior still correct.

## Step 3 — Desktop Lane
Files:
- `src/components/sections/Speakers.tsx`
- `src/components/sections/FAQ.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/Pricing.tsx`
- `src/components/sections/CTAFooter.tsx`
Actions:
- [ ] Normalize speaker card structure/proof hierarchy.
- [ ] Add pre-FAQ confidence strip.
- [ ] Add CTA immediate feedback state (`Redirecting...` + disabled).

## Step 4 — Shared Copy Narrative Patch
Files:
- `src/components/sections/Why.tsx`
- `src/components/sections/Outcomes.tsx`
- `src/components/sections/HowItWorks.tsx`
- `src/components/sections/Pricing.tsx`
- `src/app/apply/page.tsx`
Actions:
- [ ] Apply message ladder consistently (save time -> level up -> upside).
- [ ] Keep trust mechanics explicit and plain-language.

## Step 5 — Proof/Testimonial Section
Files:
- `src/app/page.tsx`
- `src/components/sections/` (new testimonial section component file to be added)
Actions:
- [ ] Add one video testimonial card + one placeholder card + examples strip.

## Test Matrix

| Check | Method | Pass Condition |
|------|--------|----------------|
| Status language consistency | search/grep + visual QA | canonical term appears everywhere required |
| Mobile menu smoothness | manual on 390x844 | no abrupt close/open perception |
| Speaker credibility readability | manual on 1333x863 | cards read uniformly with clear proof cues |
| FAQ confidence load | manual + click count | fewer repeated toggles for key policy answers |
| CTA click certainty | manual interaction | immediate state change visible on first click |
| Apply flow safety | manual + existing specs | no route/regression break |
| Accessibility | keyboard/focus check | no focus regressions, controls remain obvious |
| Build quality gates | `npm run lint && npm run typecheck && npm run build` | all pass |

## Coordination Notes
- Overlap-sensitive files (`Hero.tsx`, `Nav.tsx`, `Pricing.tsx`) were recently touched in Phase 8/9. Re-read current file before each edit and merge semantically.
