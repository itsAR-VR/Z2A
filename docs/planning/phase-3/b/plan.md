# Phase 3b — Single-Page IA + Copy/Asset Spec (Anchored)

## Focus
Define the `/` page structure and all copy/asset requirements with direct mapping to the canonical offer brief.

## Inputs
- `docs/phase-3/offer-brief.md` (Phase 3a output).
- `Plans/plan.md` (landing page wireframe + objections).

## Work
1. **Final anchor map** (single-page):
   - `#top`, `#why`, `#outcomes`, `#how`, `#agenda`, `#pricing`, `#faq`, `#apply`
2. **Section specs**
   - For each section: headline, subhead, bullets, CTA, supporting media, and proof placeholders.
3. **FAQ selection**
   - Choose 8–12 of the strongest objections from `Plans/plan.md`.
4. **Pricing copy**
   - List vs network code price; currency disclaimer; reimbursement phrasing.
5. **Referral mention (tone-safe)**
   - Subtle mention near pricing/apply if desired; no “coupon vibes.”

## Output
- `docs/phase-3/ia-copy-spec.md` IA + copy/asset spec mapped to components.

## Handoff
Pass `docs/phase-3/ia-copy-spec.md` to Phase 3c for design/motion alignment.

## Validation (RED TEAM)
- Every anchor section lists: headline, subhead, bullets, CTA, supporting media, proof placeholders.
- Pricing + refund language matches `docs/phase-3/offer-brief.md` without overpromising.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Drafted `docs/phase-3/ia-copy-spec.md` with full anchor map, section copy, pricing mechanics, and FAQ aligned to the offer brief.
- Commands run:
  - `cat <<'EOF' > docs/phase-3/ia-copy-spec.md` — pass
- Blockers:
  - None.
- Next concrete steps:
  - Begin Phase 3c to define design tokens and motion rules using the IA spec.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Updated `docs/phase-3/ia-copy-spec.md` with seat cap (50), location visibility copy, and instructor bio quote.
- Commands run:
  - `apply_patch` — pass
- Blockers:
  - None.
- Next concrete steps:
  - Ensure funnel and QA docs reflect the finalized env var list and seat cap (Phase 3d/3f).
