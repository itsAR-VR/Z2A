# Phase 14a — Recursive Corpus Indexing (Hormozi + Supporting Docs)

## Focus
Build an explicit reference index (with file paths and page references where possible) so later subphases can justify positioning and pricing decisions without hand-waving.

## Inputs
- `Hormozi/**` (all PDFs recursively)
- `Workshop Market Analysis - Zero to Agent.docx`
- `Workshop Market Analysis - Zero to Agent.pdf`
- `Agentic Engineering Workshop - Zero to Agent.pdf`
- Sahil Bloom threads (from chat transcript)

## Work
- Enumerate all documents under `Hormozi/` and classify by likely use:
  - Offers, pricing/anchoring, guarantees/risk reversal, proof, hooks, leads, closing.
- For each doc:
  - Attempt text extraction (note if the PDF is image/scanned and not extractable).
  - Locate high-signal sections using keywords aligned to our needs:
    - market/niche, starving crowd, value equation, proof, guarantee, risk reversal, anchor, tiers, offer stack, hooks.
- Produce an index artifact:
  - A table mapping: Concept -> Source file -> Page refs -> "So what" for our pages.
  - Record extraction limitations (e.g., scanned PDFs requiring manual review).

## Validation (RED TEAM)
- [x] Recursive inventory completed for all `Hormozi/*.pdf` files.
- [x] Extraction status captured with page-level counts.
- [x] Non-extractable PDFs identified and documented with mitigation.
- [x] Concept-to-source map includes explicit page references and implementation implications.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Created machine scan output at `docs/planning/phase-14/_corpus_scan.json`.
  - Converted docx source into `docs/planning/phase-14/_market_analysis_docx.txt` for searchable extraction.
  - Authored consolidated index in `docs/planning/phase-14/hormozi-corpus-index.md`.
- Commands run:
  - `python3 ... -> docs/planning/phase-14/_corpus_scan.json` — pass (21 files scanned; 2 non-extractable).
  - `textutil -convert txt -stdout "Workshop Market Analysis - Zero to Agent.docx"` — pass (source text extracted).
  - `python3 ... concept/page mapping` — pass (concept-to-page crosswalk produced).
- Blockers:
  - `Hormozi/ACQ Advertising Handbook copy1 (1).pdf` and `Hormozi/$100M Playbook Proof Checklist.pdf` are image/scanned for this extractor.
- Next concrete steps:
  - Apply indexed concepts to concrete offer/pricing rules in `14b`.

## Output
- `docs/planning/phase-14/hormozi-corpus-index.md` now provides:
  - full corpus inventory,
  - extractability status,
  - concept -> source -> page refs -> implementation implications.
- Supporting artifacts:
  - `docs/planning/phase-14/_corpus_scan.json`
  - `docs/planning/phase-14/_market_analysis_docx.txt`

## Handoff
Subphase `14b` must use `docs/planning/phase-14/hormozi-corpus-index.md` as the sole source for offer/pricing derivation decisions.
