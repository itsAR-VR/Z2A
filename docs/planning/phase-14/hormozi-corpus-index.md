# Phase 14a Artifact - Recursive Corpus Index (Hormozi + Supporting Docs)

## Scope and method
- Recursive source set:
  - `Hormozi/*.pdf` (19 files)
  - `Workshop Market Analysis - Zero to Agent.pdf`
  - `Agentic Engineering Workshop - Zero to Agent.pdf`
  - Sahil Bloom thread excerpts provided in chat (2026-02-10 and 2026-02-12)
  - IBM web research notes (Feb 2026 snapshot):
    - multi-agent orchestration overview, watsonx Orchestrate product positioning, Oct 2025 watsonx platform announcement (see `docs/planning/phase-14/ibm-approach-notes.md`).
- Extraction approach:
  - PDF text extraction via `pypdf` page-by-page.
  - DOCX conversion via `textutil` into `docs/planning/phase-14/_market_analysis_docx.txt`.
  - Scan outputs persisted to `docs/planning/phase-14/_corpus_scan.json`.

## Extractability inventory

| Source | Classification | Extractable pages | Notes |
|---|---|---:|---|
| `Hormozi/100M Offers Volume 1 by Alex Hormozi.pdf` | Offers, value equation, guarantees | 125/138 | High signal for value equation and offer structure |
| `Hormozi/$100M Playbook Pricing 2025.pdf` | Pricing, anchoring, tier framing | 61/61 | High signal for anchor order and tier communication |
| `Hormozi/$100M Playbook Hooks by Alex Hormozi.pdf` | Hooks, positioning, attention | 26/26 | Useful for headlines and first-line framing |
| `Hormozi/$100M Playbook Closing Alex Hormozi 2025.pdf` | Closing, objections, risk language | 56/56 | Useful for objection handling and risk framing |
| `Hormozi/$100M Playbook Branding 2025.pdf` | Market/message fit, positioning | 36/36 | Useful for niche specificity |
| `Hormozi/$100M Leads_ How to Get Strangers To Want To Buy Your Stuff -- Alex Hormozi -- 2023 -- 2838100a1fc52d31f3b73b56369d76ba -- Anna’s Archive.pdf` | Leads, hooks, demand capture | 373/393 | Broad source for demand-side framing |
| `Hormozi/100M Leads Bonus Chapters.pdf` | Lead expansion and conversion | 24/24 | Supplemental lead strategy |
| `Hormozi/100M Series Lost Chapters.pdf` | Supplemental strategy mix | 162/164 | Multi-topic reinforcement |
| `Hormozi/100M Playbook Marketing Machine.pdf` | Marketing process systemization | 30/30 | Useful for repeatable pipeline language |
| `Hormozi/$100M Playbook Lead Nurture.pdf` | Follow-up and nurture | 43/45 | Useful for post-workshop continuity language |
| `Hormozi/$100M Playbook Lifetime Value.pdf` | LTV and retention mechanics | 27/27 | Useful for recurring partnership rationale |
| `Hormozi/100M Playbook Fast Cash Alex Hormozi 2025.pdf` | Offer acceleration and monetization | 29/29 | Useful for urgency framing without hype |
| `Hormozi/100M Playbook GOATed Ads.pdf` | Ad/message testing | 29/29 | Useful for hook variants and proof style |
| `Hormozi/100M Playbook Price Raise 2025.pdf` | Price increase strategy | 28/28 | Useful for price integrity stance |
| `Hormozi/100M Playbook Retention.pdf` | Retention, ongoing value | 35/35 | Useful for ongoing partnership framing |
| `Hormozi/ACQ Closer Handbook  (1).pdf` | Sales conversations and objections | 147/148 | Useful for FAQ objection handling |
| `Hormozi/Money Models How To Make Money.pdf` | Business model economics | 181/183 | Useful for offer architecture logic |
| `Hormozi/ACQ Advertising Handbook copy1 (1).pdf` | Ads (scanned) | 0/103 | Not machine-extractable; manual/OCR needed if required |
| `Hormozi/$100M Playbook Proof Checklist.pdf` | Proof framework (scanned) | 0/24 | Not machine-extractable; substitute proof guidance from extractable docs |
| `Workshop Market Analysis - Zero to Agent.pdf` | ICP, niche matrix, price ranges | 13/13 | Primary source for niche + tier ranges |
| `Agentic Engineering Workshop - Zero to Agent.pdf` | Delivery model, tools/workflow framing | 54/54 | Source for "AI acts in tools/workflows" framing |

## Concept -> source -> page refs -> page implication

| Concept | Source(s) and page refs | So what for `/` and `/businesses` |
|---|---|---|
| Starving crowd / high-pain niche | `Workshop Market Analysis - Zero to Agent.pdf` p3, p7; `Hormozi/100M Offers Volume 1 by Alex Hormozi.pdf` p11 (market section marker) | Lead with distribution/wholesale operators with live operational pain, not broad "all businesses" messaging. |
| Value equation | `Hormozi/100M Offers Volume 1 by Alex Hormozi.pdf` p62-63 (`Dream Outcome`, `Perceived Likelihood`, `Time Delay`, `Effort & Sacrifice`) | Build copy that increases outcome/likelihood and reduces time/effort perception (managed implementation + ongoing support). |
| Pricing anchor order | `Hormozi/$100M Playbook Pricing 2025.pdf` p41 ("first number ... anchors"), p54-55 (ultra-high-ticket anchor example) | On `/businesses`, show highest commitment tier first, then down-sell to sprint/workshop. |
| Tier naming guidance | `Hormozi/$100M Playbook Pricing 2025.pdf` p23 (make tier purpose clear) | Keep tier names explicit and outcome-oriented: Ongoing AI Partnership, Implementation Sprint, Discovery Workshop. |
| Risk reversal language | `Hormozi/$100M Playbook Closing Alex Hormozi 2025.pdf` p22 ("best case/worst case", risk framing); Sahil thread (post-deploy trust gap) | Use bounded risk reversal with clear deliverables and plain language, not inflated guarantees. |
| Proof over theory | `Workshop Market Analysis - Zero to Agent.pdf` p3-4 (engagement spikes on live workflows, not taxonomy) | In hero/what/faq, describe concrete workflow demos and outcomes before conceptual explanations. |
| Managed + improve post-deploy | Sahil thread excerpts (2026-02-10 and 2026-02-12: ongoing servicing and managed improvement opportunity) | Position offer as deployment plus continuous improvement; FAQ must explicitly answer "what happens after deployment?" |
| AI inside existing tools | `Agentic Engineering Workshop - Zero to Agent.pdf` p5, p37 (agents take action; MCP/tool automation language) | `#what` section should say we implement in client's existing stack/workflows, not separate theoretical systems. |
| Recurring value model | `Workshop Market Analysis - Zero to Agent.pdf` p13 (`$2,000-$5,000/month` ongoing partnership) + Hormozi retention/LTV docs | Justify ongoing tier as operating service, not one-time setup fee. |
| Offer enhancements (bonuses/guarantees/naming) | `Hormozi/100M Offers Volume 1 by Alex Hormozi.pdf` p11 (enhancement section marker: scarcity/urgency/bonuses/guarantees/naming) | Use small “likelihood boosters” (clear deliverables, bounded guarantee) and precise tier naming; do not invent scarcity numbers unless they are true. |
| Proof phrasing (experience > opinion) | `Hormozi/$100M Leads_ ...` p146 (proof snippet about speaking from experience) | Prefer “how we do X” / “what we saw in X workflow” phrasing over abstract claims; makes copy harder to dispute. |
| Enterprise agentic workflow framing | IBM announcement (Oct 2025) describes “agentic workflows” as standardized/reusable with toolchains, conditional logic, and data transparency. | Use “agentic workflows” with a plain-language definition; emphasize predictable/auditable delivery rather than novelty. |
| Orchestration and governance language | IBM multi-agent orchestration overview emphasizes supervision/routing and governance/observability. | Add “managed + measured” language: monitoring, guardrails, and ongoing improvement after launch. |

## Key extracted snippets (minimal)
- `Hormozi/100M Offers Volume 1 by Alex Hormozi.pdf` p62:
  - "Dream Outcome", "Perceived Likelihood of Achievement", "Perceived Time Delay", "Perceived Effort & Sacrifice".
- `Hormozi/$100M Playbook Pricing 2025.pdf` p41:
  - "The first number ... anchors the entire conversation."
- `Hormozi/$100M Playbook Pricing 2025.pdf` p54-55:
  - Ultra-high-ticket anchor example used to reframe affordability of core offer.
- `Workshop Market Analysis - Zero to Agent.pdf` p3:
  - Strongest engagement came from live, specific business workflows.
- `Workshop Market Analysis - Zero to Agent.pdf` p13:
  - Tier ranges for Discovery, Sprint, and Ongoing Partnership.
- `Hormozi/$100M Leads_ ...` p146:
  - Proof phrasing via experience framing (“bulletproof” style language).
- IBM web research (Feb 2026 snapshot):
  - Agentic workflows + orchestration + governance framing for enterprise audiences (see `docs/planning/phase-14/ibm-approach-notes.md`).

## Extraction limitations and mitigation
- Non-extractable PDFs:
  - `Hormozi/ACQ Advertising Handbook copy1 (1).pdf`
  - `Hormozi/$100M Playbook Proof Checklist.pdf`
- Mitigation:
  - Use extractable adjacent sources for decision rules (Offers, Pricing, Closing, Market Analysis, Workshop deck).
  - Only add OCR for these files if Phase 13 implementation needs additional nuance not covered by current sources.
