# Phase 10f — Independent Evaluation Pack and Closure Criteria

## Focus
Create external-review artifacts so another agent can grade plan quality, catch blind spots, and validate that this phase is implementation-ready.

## Inputs
- All prior subphase outputs (`10a` through `10e`).
- User requirement for an additional agent evaluator.

## Work
1. Prepare evaluator prompt for independent review.
2. Define scoring rubric with weighted criteria.
3. Define closure checklist that must pass before implementation begins.

### Evaluator Prompt (ready to use)
"Evaluate Phase 10 planning artifacts under `docs/planning/phase-10/` with emphasis on Jam-grounding, decision completeness, and execution safety.

Tasks:
1. Validate that every major finding from Jam mobile (`39d008ce-ff63-41e4-a1a7-62f023a53933`) and desktop (`6d76b0f8-80fd-46a7-b5ec-f78d18a82816`) is represented in the plan.
2. Verify the plan separates mobile and desktop remediation appropriately.
3. Verify copy work follows clarity best practices (no ambiguity/jargon for normal consumer audience).
4. Verify the Impeccable skill matrix is complete and practically mapped to files/components.
5. Identify missing decisions, risky assumptions, or test gaps.

Output format:
- Findings first, severity ordered.
- Missing decisions list.
- Suggested plan edits.
- Final readiness score (0-100)."

### Scoring Rubric
- Evidence grounding: 20%
- Decision completeness: 20%
- Copy clarity readiness: 15%
- UX prioritization quality: 10%
- Impeccable skill coverage quality: 10%
- Testability and acceptance criteria quality: 10%
- Accessibility preservation (Phase 7 a11y patterns maintained): 10%
- Test coverage (Playwright assertions updated for new copy): 5%

### Closure Checklist
- [ ] Every Jam finding has a mapped file/component and acceptance check.
- [ ] Mobile and desktop lanes are explicitly separated (Hero.tsx unified to avoid conflicts).
- [ ] Canonical terminology table exists at `docs/planning/phase-10/b/terminology.md` and is conflict-free.
- [ ] Status language uses single canonical term across Hero, Nav, and StickyApplyBar.
- [ ] Skill matrix includes every `impeccable-*` skill with rationale.
- [ ] Implementation sequence is linear and dependency-safe (Steps 0–6 in 10e).
- [ ] QA checks cover copy, interaction, accessibility, and regressions.
- [ ] Phase 7 a11y patterns preserved (focus management, keyboard nav, touch targets ≥44px).
- [ ] Playwright text assertions updated for new copy in `z2a/landing.spec.ts` and `z2a/reduced-motion.spec.ts`.
- [ ] GSAP hero loop verified at both mobile (390×844) and desktop (1333×863) viewports.
- [ ] Analytics instrumentation in place before copy changes (page views, form starts, deposits, CTA clicks).
- [ ] `npm run lint && npm run typecheck && npm run build` pass.

## Output
- Evaluator artifact created:
  - `docs/planning/phase-10/f/evaluator-pack.md`
- Delivered contents:
  - independent evaluator prompt,
  - weighted rubric,
  - minimum pass gate and closure checklist.

## Handoff
If evaluator score is >=90, proceed to execution phase. If below 90, patch the specific gaps and re-run evaluation.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Built independent evaluation packet with explicit scoring and pass threshold.
  - Aligned closure checks to Jam-grounding, copy clarity, and skill matrix completeness.
- Commands run:
  - `cat > docs/planning/phase-10/f/evaluator-pack.md` — pass.
- Blockers:
  - None for this subphase.
- Next concrete steps:
  - Run external evaluator against phase-10 docs and capture score + findings.
