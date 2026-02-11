# Phase 10f Output — Independent Evaluator Pack

## Evaluator Prompt
Evaluate `docs/planning/phase-10/` for readiness to execute and ship conversion-quality UX improvements.

Required checks:
1. Validate that all major mobile Jam findings (`39d008ce-ff63-41e4-a1a7-62f023a53933`) are represented.
2. Validate that all major desktop Jam findings (`6d76b0f8-80fd-46a7-b5ec-f78d18a82816`) are represented.
3. Confirm viewport split is explicit and actionable.
4. Confirm copy strategy is clarity-first for a normal consumer audience.
5. Confirm `impeccable-*` skill coverage is complete and practical.
6. Flag missing decisions, risky assumptions, and test gaps.

Output format:
- Findings first (severity-ordered)
- Missing decisions
- Suggested edits
- Readiness score (0–100)

## Scoring Rubric
- Evidence grounding: 25
- Decision completeness: 20
- Copy clarity quality: 15
- UX prioritization quality: 15
- Impeccable skill coverage quality: 10
- Testability/acceptance quality: 15

## Minimum Pass Gate
- Score >= 90
- No unresolved high-severity findings
- No ambiguous ownership for high-impact files

## Closure Checklist
- [ ] Every Jam finding maps to a file/component and acceptance check.
- [ ] Mobile and desktop lanes are separate and conflict-safe.
- [ ] Canonical terminology dictionary exists and is applied.
- [ ] Skill matrix includes all `impeccable-*` skills.
- [ ] Implementation checklist includes verifiable quality gates.
