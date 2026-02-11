# Phase 10d — Impeccable Skill-to-Site Coverage Matrix

## Focus
Map each available `impeccable-*` skill to exact website surfaces so design/UX improvements are systematic rather than ad hoc.

## Inputs
- Impeccable skill inventory from `/Users/AR180/.codex/skills/impeccable-*`.
- Site structure in `src/app/page.tsx` and related section components.
- Jam-led pain points from Phase 10a.

## Work
1. Build a complete skill-to-surface matrix and define expected outcomes per skill.
2. Split matrix by priority:
   - immediate (Jam-critical)
   - near-term (conversion/supporting)
   - maintenance (quality hardening).
3. Mark owners and execution checkpoints for each mapped skill.

### Skill Coverage Targets

| Skill | Primary Website Targets | Why Here | Priority |
|------|--------------------------|----------|----------|
| impeccable-clarify | `Hero.tsx`, `Nav.tsx`, `StickyApplyBar.tsx`, `Pricing.tsx`, `FAQ.tsx`, `apply/page.tsx` | Resolve ambiguity and improve decision clarity | Immediate |
| impeccable-critique | Whole landing flow (`src/app/page.tsx`) | Prioritize high-impact UX issues by viewport | Immediate |
| impeccable-adapt | `Hero.tsx`, `Nav.tsx`, `Speakers.tsx`, `Pricing.tsx`, `FAQ.tsx`, `apply/page.tsx` | Ensure mobile/desktop parity of trust and clarity | Immediate |
| impeccable-animate | `Nav.tsx`, `Hero.tsx`, `StickyApplyBar.tsx`, `RevealOnScroll.tsx` usage | Smooth harsh transitions and reinforce state changes | Immediate |
| impeccable-simplify | `Hero.tsx`, `Pricing.tsx`, `FAQ.tsx`, `CTAFooter.tsx` | Reduce cognitive load at decision points | Immediate |
| impeccable-polish | All section components + `globals.css` spacing/typography tokens | Eliminate rough edges reducing premium feel | Near-term |
| impeccable-harden | `apply/page.tsx`, `FAQ.tsx`, `Nav.tsx`, `Dialog.tsx`, admin UI | Improve edge-case resilience and state handling | Near-term |
| impeccable-rams | `Nav.tsx`, `Accordion.tsx`, `Button.tsx`, `apply/page.tsx` | Accessibility + visual review against WCAG and interaction quality | Near-term |
| impeccable-optimize | `Hero.tsx` GSAP loop, marquee, imagery, section render cost | Reduce jank and preserve responsiveness | Near-term |
| impeccable-onboard | Hero + `HowItWorks.tsx` + `apply/page.tsx` step framing | Make first-time flow obvious and low-friction | Near-term |
| impeccable-normalize | Cross-component tokens and semantic wording consistency | Ensure consistent design language | Near-term |
| impeccable-extract | Reusable trust/policy UI blocks, testimonial card patterns | Create composable design system primitives | Near-term |
| impeccable-colorize | `Pricing.tsx`, `FAQ.tsx`, trust strips, CTA accents | Improve cue salience without over-saturation | Maintenance |
| impeccable-quieter | Hero and decorative accents | Prevent over-aggressive visuals after bold passes | Maintenance |
| impeccable-bolder | Hero proposition block and proof strip | Increase emphasis only where hierarchy demands it | Maintenance |
| impeccable-delight | CTA micro-interactions, success and confirmation states | Add memorable touches without harming clarity | Maintenance |
| impeccable-audit | Full-site checkpoint after implementation | Severity-ranked post-change quality report | Maintenance |
| impeccable-teach-impeccable | Team-level configuration context | Persist this product’s design rules for future agents | Maintenance |

## Output
- Matrix artifact created:
  - `docs/planning/phase-10/d/impeccable-matrix.md`
- Delivered contents:
  - full `impeccable-*` coverage across immediate/near-term/maintenance bands,
  - per-skill target areas and expected outcomes,
  - orchestration order for execution.

## Handoff
Use this matrix as the orchestration layer for:
- Phase 10e implementation execution order,
- and Phase 10f evaluator verification of skill coverage completeness.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Mapped every discovered `impeccable-*` skill to concrete website surfaces and outcomes.
  - Added prioritization bands tied to Jam urgency and conversion impact.
  - Defined execution order to reduce conflicting changes.
- Commands run:
  - `cat > docs/planning/phase-10/d/impeccable-matrix.md` — pass.
- Blockers:
  - None for this subphase.
- Next concrete steps:
  - Use this matrix to validate no skill-domain gaps remain before implementation.
