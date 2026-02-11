# Phase 10c — UX/Design Critique System (`impeccable-critique`)

## Focus
Run a design-director-level critique across mobile and desktop to convert Jam friction into prioritized visual hierarchy, IA, affordance, and trust fixes.

## Inputs
- Evidence ledger from Phase 10a.
- `impeccable-critique` dimensions:
  - AI-slop detection,
  - hierarchy,
  - IA,
  - emotional resonance,
  - affordance/discoverability,
  - composition,
  - typography,
  - color purpose,
  - state quality,
  - microcopy voice.
- Current section composition in `src/app/page.tsx`.

## Work
1. Issue a pass/fail anti-pattern verdict for current landing experience.
2. Produce mobile and desktop critique separately:
   - mobile focus: hero/menu trust semantics, motion harshness, first-screen scan path.
   - desktop focus: speaker credibility architecture, FAQ confidence burden, CTA confidence feedback.
3. Prioritize top 3–5 UX issues with concrete fixes:
   - what,
   - why it matters,
   - exact fix (specify: CSS tweak, copy change, component restructure, or new component),
   - success signal.
4. Identify IA adjustments:
   - what should move above the fold,
   - what should move out of FAQ and into pre-FAQ trust summary.
5. Define concrete specs for interaction patterns referenced in 10e:
   - **Quick confidence strip** (FAQ): Define content and visual pattern (e.g., a row of 3–4 key trust facts displayed above the accordion: "50 seats · Full refund by Day 2 · $100 deposit · Stripe checkout"). Specify: inline badges, a summary card, or a horizontal strip.
   - **CTA click feedback**: Define the interaction pattern for all CTA buttons (Hero, Pricing, CTAFooter) to reduce repeated-click uncertainty. Recommend: match existing apply-page pattern (button text changes to "Redirecting..." + disabled state on click).
   - **FAQ reorder**: Produce a ranked FAQ order by decision friction. Identify which of the 11 current items are high-friction (blocking purchase decision) vs low-friction (nice-to-know).
5. Define an explicit command mapping for follow-on design passes:
   - clarify, simplify, polish, adapt, animate, harden, optimize.
6. Produce critical vs minor observation split to guide implementation order.

## Output
- Critique artifact created:
  - `docs/planning/phase-10/c/critique-report.md`
- Delivered contents:
  - anti-pattern verdict,
  - mobile and desktop priority issues,
  - concrete fixes and command mapping,
  - critical vs minor observation split.

## Handoff
Use `critique-report.md` priorities to drive sequence and risk focus in Phase 10e.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Produced design-director-level critique structured around Jam-confirmed friction.
  - Split recommendations by viewport to prevent blended, low-signal remediation.
  - Mapped each issue to a concrete corrective command style (clarify/animate/normalize/harden).
- Commands run:
  - `cat > docs/planning/phase-10/c/critique-report.md` — pass.
- Blockers:
  - None for this subphase.
- Next concrete steps:
  - Apply critique priorities to implementation ordering and acceptance criteria in 10e.
