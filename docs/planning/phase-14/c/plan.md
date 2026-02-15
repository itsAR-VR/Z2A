# Phase 14c — Copy Spec for `/businesses` + Principles Spec for `/`

## Focus
Produce implementable copy (headings, bullets, microcopy) that Phase 13 can drop into UI without additional decisions.

## Inputs
- Decision rules from `docs/planning/phase-14/b/plan.md`
- Existing tone constraints and design context already established in the repo

## Work
- Write `/businesses` copy spec by section ID:
  - `#top`, `#who`, `#what`, `#pricing`, `#faq`, `#contact`
- Write `/` (Home) copy spec for:
  - `#vision`, `#programs`, `#principles`
- Ensure:
  - copy is low-jargon and concrete,
  - pricing tiers match market analysis ranges,
  - CTA label and fallback behavior are specified.

## Validation (RED TEAM)
- [x] Every required section ID has concrete heading/body/CTA copy.
- [x] Pricing copy includes deterministic high-to-low tier order and exact ranges.
- [x] Risk reversal text is aligned to latest wording requirement.
- [x] Home principles copy uses plain, non-acronym language.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Authored complete `/businesses` copy blocks for `#top`, `#who`, `#what`, `#pricing`, `#faq`, `#contact`.
  - Authored Home copy blocks for `#vision`, `#programs`, `#principles`.
  - Specified CTA label/target/fallback behavior for implementation.
- Commands run:
  - N/A (copy derivation executed from completed 14a/14b artifacts).
- Blockers:
  - None.
- Next concrete steps:
  - Map this copy into Phase 13 file/test touchpoints in `14d`.

## Output
- `docs/planning/phase-14/copy-spec.md` now provides implementation-ready copy for:
  - `/businesses` section IDs,
  - `/` vision/program/principles sections.

## Handoff
Subphase `14d` must map `docs/planning/phase-14/copy-spec.md` into explicit Phase 13 file insertion points and test assertions.
