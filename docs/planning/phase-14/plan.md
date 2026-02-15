# Phase 14 — Hormozi Corpus Index + Offer/COPY Refinement (Feeds Phase 13)

## Purpose
Deepen the reasoning and knowledge layer behind the `/businesses` offer (and the Home pathway framing) by indexing the Hormozi corpus **recursively** and translating the relevant frameworks into explicit, implementable page decisions and copy constraints for Phase 13.

## Context
- Phase 13 is the implementation phase for the multi-entrypoint IA:
  - `"/"` Home, `"/individuals"` existing funnel, `"/businesses"` managed B2B.
- The user request for this phase is to improve decision quality by explicitly referencing and mining the Hormozi materials (and related docs already in-repo), rather than relying on partial memory or ad-hoc snippets.
- This phase does **not** change the IA split itself; it refines:
  - how we frame the B2B offer (what we promise vs what we avoid),
  - what we show in pricing (tiers, anchors, order, disclaimers),
  - what we emphasize as proof/likelihood (demos, process, risk reversal),
  - how we keep language simple for "normal people" while preserving premium trust.

## Reference Corpus (Hormozi - Recursive)
This phase treats `Hormozi/` as a corpus and mines it **recursively** for decision-making frameworks relevant to: market/niche, offers, pricing/anchoring, guarantees/risk reversal, proof, hooks, and closing.

High-signal starting points (not exhaustive):
* `Hormozi/100M Offers Volume 1 by Alex Hormozi.pdf`
* `Hormozi/$100M Playbook Pricing 2025.pdf`
* `Hormozi/$100M Playbook Hooks by Alex Hormozi.pdf`
* `Hormozi/$100M Playbook Proof Checklist.pdf`
* `Hormozi/$100M Playbook Closing Alex Hormozi 2025.pdf`
* `Hormozi/$100M Playbook Branding 2025.pdf`
* `Hormozi/$100M Leads_ How to Get Strangers To Want To Buy Your Stuff -- Alex Hormozi -- 2023 -- 2838100a1fc52d31f3b73b56369d76ba -- Anna’s Archive.pdf`
* `Hormozi/100M Leads Bonus Chapters.pdf`
* `Hormozi/100M Series Lost Chapters.pdf`
* `Hormozi/100M Playbook Marketing Machine.pdf`
* `Hormozi/100M Playbook Lead Nurture.pdf`
* `Hormozi/100M Playbook Retention.pdf`
* `Hormozi/100M Playbook Lifetime Value.pdf`
* `Hormozi/100M Playbook Fast Cash Alex Hormozi 2025.pdf`
* `Hormozi/100M Playbook GOATed Ads.pdf`
* `Hormozi/100M Playbook Price Raise 2025.pdf`
* `Hormozi/ACQ Advertising Handbook copy1 (1).pdf`
* `Hormozi/ACQ Closer Handbook  (1).pdf`
* `Hormozi/Money Models How To Make Money.pdf`

## Reference Corpus (Non-Hormozi)
* `Workshop Market Analysis - Zero to Agent.docx` (buyer psychology + niche matrix + pricing tier ranges)
* `Workshop Market Analysis - Zero to Agent.pdf` (matrix pages + niche deep-dives)
* `Agentic Engineering Workshop - Zero to Agent.pdf` (definitions, MCP framing, business workflow language)
* Sahil Bloom threads (provided in chat) (managed swarms + ongoing servicing + "abstract complexity")

## Concurrent Phases
| Phase | Status | Overlap | Coordination |
|-------|--------|---------|--------------|
| Phase 13 | Active (planning complete) | `/businesses` positioning, nav/menu copy, pricing framing | Phase 14 outputs become inputs to Phase 13 execution. Phase 13 should implement copy decisions from Phase 14 rather than ad-libbing. |
| Phase 10 | Complete | Public copy tone + trust cues | Preserve the existing "premium + grounded" voice; Phase 14 refines, not rebrands. |
| Phase 12 | Complete/Recent | None (email ops) | No coordination required. |

## Objectives
* [x] Build a corpus index across `Hormozi/` (recursive) mapping concepts -> source -> page refs -> implications for our pages.
* [x] Produce decision rules for B2B offer architecture (market/niche framing + value equation + risk reversal + proof).
* [x] Produce decision rules for B2B pricing presentation (tiers, anchor order, what to show/hide, copy constraints).
* [x] Produce a copy spec for `/businesses` and a tightened principles spec for `/` (Home) that Phase 13 can implement verbatim.

## Constraints
- No hypey language; keep claims operational and verifiable.
- Keep copy low-jargon and "normal people" readable; acronyms must be avoided or explained.
- Preserve existing design system primitives and tone constraints already defined in the repo (light-first, premium, grounded).
- The output of this phase must be decision-complete for implementers (Phase 13): headings, bullets, CTA labels, tier labels, disclaimers.

## Success Criteria
- [x] There is a single, easy-to-use index for Hormozi references that an implementer can consult quickly.
- [x] `/businesses` offer decisions are justified with explicit references to the corpus (not vague "Hormozi says").
- [x] Pricing section decisions (tier order + anchor framing + disclosure level) are explicit and consistent.
- [x] Phase 13 can proceed without further "what should we say here?" decisions.

## Subphase Index
* a — Recursive corpus indexing (Hormozi + supporting docs)
* b — Offer + pricing decision rules (Hormozi frameworks -> page decisions)
* c — Copy spec for `/businesses` + principles spec for `/` (implementable)
* d — Phase 13 integration notes (what changes in implementation plan + acceptance checks)

## Repo Reality Check (RED TEAM)

- What exists today:
  - Existing public experience is still concentrated in `src/app/page.tsx`.
  - New split-route files (`src/app/individuals/page.tsx`, `src/app/businesses/page.tsx`) and new route specs (`z2a/home.spec.ts`, `z2a/businesses.spec.ts`) are not yet created.
  - Core touchpoints for upcoming implementation exist:
    - `src/components/Nav.tsx`
    - `src/app/layout.tsx`
    - `src/app/apply/page.tsx`
    - `z2a/landing.spec.ts`
    - `z2a/reduced-motion.spec.ts`
- What this phase assumed:
  - We could fully resolve offer/copy/pricing decisions without creating app code.
  - Market-analysis ranges remain the canonical B2B pricing signal.
- Verified touch points:
  - `src/app/page.tsx`, `src/components/Nav.tsx`, `src/app/layout.tsx`, `src/app/apply/page.tsx`, `z2a/landing.spec.ts`, `z2a/reduced-motion.spec.ts`.

## RED TEAM Findings (Gaps / Weak Spots)

### Highest-risk failure modes
- OCR gap in two Hormozi PDFs could block edge-case nuance extraction.
  - Mitigation: logged explicit non-extractable sources; used adjacent extractable docs for current decisions.
- Phase 13 could drift from refined copy if implementers improvise.
  - Mitigation: added canonical artifacts and explicit insertion map to Phase 13 docs.
- Pricing order could be implemented inconsistently across UI/tests.
  - Mitigation: locked required order and listed assertions in integration checklist.

### Missing or ambiguous requirements (closed in this phase)
- Businesses CTA fallback was previously open.
  - Resolution: deterministic fallback set to `#contact` in copy/integration docs.
- Risk reversal wording had conflicting historical variants.
  - Resolution: standardized to `100% refund if you aren't satisfied`.

### Multi-agent coordination risks
- Overlap with active `phase-13` planning domain (`/businesses`, nav/menu, pricing/test assertions).
  - Mitigation: Phase 14 limited itself to reasoning/copy artifacts + Phase 13 plan wiring; app/test code remains Phase 13 execution scope.

## Assumptions (Agent)
- Assumption: Current extracted corpus is sufficient to finalize positioning/copy decisions for this release without OCRing the two scanned PDFs (confidence ~94%).
- Assumption: Phase 13 will treat Phase 14 artifacts as source of truth unless user overrides (confidence ~95%).

## Phase Summary (running)
- 2026-02-14 — Completed recursive corpus indexing, offer/pricing decision rules, implementable copy specs, and Phase 13 integration wiring (files: `docs/planning/phase-14/hormozi-corpus-index.md`, `docs/planning/phase-14/offer-pricing-rules.md`, `docs/planning/phase-14/copy-spec.md`, `docs/planning/phase-14/phase-13-integration.md`, `docs/planning/phase-14/a/plan.md`, `docs/planning/phase-14/b/plan.md`, `docs/planning/phase-14/c/plan.md`, `docs/planning/phase-14/d/plan.md`, `docs/planning/phase-13/plan.md`, `docs/planning/phase-13/b/plan.md`, `docs/planning/phase-13/c/plan.md`, `docs/planning/phase-13/d/plan.md`, `docs/planning/phase-13/e/plan.md`, `docs/planning/phase-13/f/plan.md`).
- 2026-02-15 — Re-evaluated Phase 14 for Hormozi alignment + mission fit; tightened proof-first hero, value-equation specificity, and refund scoping in canonical artifacts (files: `docs/planning/phase-14/re-evaluation.md`, `docs/planning/phase-14/copy-spec.md`, `docs/planning/phase-14/offer-pricing-rules.md`, `docs/planning/phase-14/phase-13-integration.md`, `docs/planning/phase-14/hormozi-corpus-index.md`).
- 2026-02-15 — Added IBM-style enterprise positioning notes and refocused `/businesses` from vertical-led to function-led starving-crowd framing (agentic workflows + orchestration + governance concepts translated into plain language) (files: `docs/planning/phase-14/ibm-approach-notes.md`, `docs/planning/phase-14/copy-spec.md`, `docs/planning/phase-14/offer-pricing-rules.md`, `docs/planning/phase-14/hormozi-corpus-index.md`, `docs/planning/phase-14/phase-13-integration.md`, `docs/planning/phase-13/c/plan.md`).
