# Phase 14b — Offer + Pricing Decision Rules (Hormozi -> Page Decisions)

## Focus
Translate extracted Hormozi frameworks into explicit decisions for `/businesses`:
- niche framing (who it is for),
- promise and scope boundaries (what we deliver and what we don't claim),
- pricing tier structure and anchor order,
- risk reversal and proof mechanics (how we increase perceived likelihood).

## Inputs
- Output index from `docs/planning/phase-14/a/plan.md`
- `Workshop Market Analysis - Zero to Agent.docx` (tier ranges and buyer profile)
- Sahil Bloom threads (post-deploy value + ongoing servicing)

## Work
- Decide and document (in rule form):
  - "Starving crowd" niche framing using the market analysis niches.
  - Value equation mapping for the B2B page:
    - dream outcome, likelihood, time delay, effort/sacrifice (as user-perceived).
  - Pricing presentation rules:
    - tier order (anchor -> down-sell), tier naming, and disclosure level (ranges + what they include).
  - Risk reversal rules:
    - how we reduce perceived risk without overpromising (ex: start with Discovery Workshop; explicit deliverables).
  - Proof rules:
    - demo-first language, concrete workflow examples, and what proof can be shown now vs later.

## Validation (RED TEAM)
- [x] Rules explicitly map to source-backed frameworks and market-analysis constraints.
- [x] Pricing order and range decisions are deterministic (no open copy choices left).
- [x] Risk-reversal language is concrete and non-hype.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Converted indexed source findings into implementation rules.
  - Locked tier order, public range strategy, and risk-reversal language.
  - Added language constraints to prevent jargon drift in `/businesses`.
- Commands run:
  - `python3 ... keyword snippet extraction (Offers/Pricing/Closing/Leads/Workshop)` — pass.
  - `python3 ... Pricing playbook anchor-page extraction` — pass.
  - `python3 ... Market Analysis pricing snippet extraction` — pass.
- Blockers:
  - None (available sources were sufficient to make all decisions deterministic).
- Next concrete steps:
  - Translate these rules into section-level copy in `14c`.

## Output
- `docs/planning/phase-14/offer-pricing-rules.md` contains:
  - niche framing rules,
  - value equation mapping,
  - tier architecture and anchor order,
  - risk reversal and proof mechanics,
  - language constraints and source references.

## Handoff
Subphase `14c` must implement copy directly from `docs/planning/phase-14/offer-pricing-rules.md` and avoid introducing new offer/pricing variants.
