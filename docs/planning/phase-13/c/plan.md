# Phase 13c - Businesses Page Implementation (`/businesses`)

## Focus
Build a dedicated B2B page positioned around managed deployment plus ongoing value realization, with clear niche targeting and explicit tiered pricing.

## Inputs
- `docs/planning/phase-13/plan.md`
- `docs/planning/phase-14/offer-pricing-rules.md` (canonical decision rules)
- `docs/planning/phase-14/copy-spec.md` (canonical `/businesses` copy)
- Output from `docs/planning/phase-13/b/plan.md` for visual/structural consistency

## Work
- Create `src/app/businesses/page.tsx` with required sections:
  - `#top`: B2B hero + primary CTA
  - `#who`: target profile (function-led starving crowd: ops/revops/cs ops/finance ops/procurement)
  - `#what`: managed implementation model (agentic workflows + guardrails + ongoing improvement)
  - `#pricing`: three tiers with price ranges (ordered high -> low for anchoring)
  - `#faq`: explicit answer to post-deployment value/ownership
  - `#contact`: final conversion block
- Apply section copy from `docs/planning/phase-14/copy-spec.md` and rules from `docs/planning/phase-14/offer-pricing-rules.md` without ad-lib changes.
- Use explicit tier ranges:
  - Discovery Workshop (3 hrs): `$500-$1,500`
  - Implementation Sprint (2-4 weeks): `$5,000-$15,000`
  - Ongoing AI Partnership: `$2,000-$5,000/month`
- Include risk reversal text exactly as:
  - `100% refund if you aren't satisfied`
- Keep claims operational and concrete (no hype phrasing).

## Output
- `src/app/businesses/page.tsx` created with required sections:
  - `top`, `who`, `what`, `pricing`, `faq`, `contact`.
- Businesses pricing tiers render in anchored order:
  - `Ongoing AI Partnership` -> `Implementation Sprint` -> `Discovery Workshop`.
- Refund language and scope clarifier implemented:
  - `100% refund if you aren't satisfied`
  - `Applies to the Discovery Workshop.`

## Handoff
Subphase `13d` integrates this page into shared navigation and menu behavior.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Implemented full `/businesses` page using Phase 14 function-led positioning and copy constraints.
  - Added route-level metadata and deterministic CTA fallback behavior.
- Commands run:
  - `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e -- z2a/businesses.spec.ts` - pass.
- Blockers:
  - None.
- Next concrete steps:
  - Refactor global nav for page-aware anchors + pages-first overlay.
