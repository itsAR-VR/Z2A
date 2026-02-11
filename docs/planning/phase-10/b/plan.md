# Phase 10b — Copy Clarity System (`impeccable-clarify`)

## Focus
Rewrite unclear, ambiguous, or confidence-reducing copy so normal consumers can decide in under 60 seconds with minimal confusion.

## Inputs
- Evidence ledger from Phase 10a.
- `impeccable-clarify` skill rules:
  - remove ambiguity/jargon,
  - keep action-oriented wording,
  - explain what happens next,
  - preserve consistent terminology.
- Current copy sources:
  - `src/components/sections/Hero.tsx`
  - `src/components/Nav.tsx`
  - `src/components/StickyApplyBar.tsx`
  - `src/components/sections/Why.tsx`
  - `src/components/sections/Outcomes.tsx`
  - `src/components/sections/HowItWorks.tsx`
  - `src/components/sections/Pricing.tsx`
  - `src/components/sections/FAQ.tsx`
  - `src/components/sections/CTAFooter.tsx`
  - `src/app/apply/page.tsx`

## Work
1. Establish canonical terminology dictionary (single source):
   - **Artifact location**: `docs/planning/phase-10/b/terminology.md`
   - Status term: choose ONE canonical string from {"Admissions open", "Applications open", or other} — currently three inconsistent strings exist:
     - "Admissions live" (Hero chip)
     - "Admissions open" (Nav badge, StickyApplyBar badge)
     - "Applications open" (Hero marquee)
   - CTA labels
   - Payment flow labels (deposit/remainder/refund)
   - Referral code language
2. Define the narrative ladder for all core sections, with explicit section assignments:
   - **Layer 1 (save time now)**: Hero + StickyApplyBar — immediate value proposition
   - **Layer 2 (level up practical skill)**: Why + Outcomes + HowItWorks — capability building
   - **Layer 3 (create upside with reclaimed time)**: Speakers + Pricing + CTAFooter — credibility and commitment
   - Map each section to its primary narrative layer so copy rewrites reinforce the correct message.
3. Rewrite high-priority copy surfaces:
   - Hero status, headline, subhead, trust snippets
   - Menu badge/status terms
   - Sticky bar urgency + trust terms
   - Speaker card text consistency
   - Pricing and FAQ plain-language confidence copy
   - Apply form intro, helper text, and CTA certainty copy
4. Produce “before/after” copy map for every changed string.
5. Add copy acceptance checks:
   - 2-second comprehension check for status/CTA
   - no conflicting terms across components
   - one-step-next clarity on all primary CTAs
6. Add escalation list for policy/legal-sensitive copy (refund/payment terms) requiring final human sign-off.

## Output
- Copy-system artifacts created:
  - `docs/planning/phase-10/b/terminology.md`
  - `docs/planning/phase-10/b/copy-spec.md`
- Delivered contents:
  - canonical terminology dictionary,
  - narrative ladder by section,
  - before/after high-impact copy map,
  - copy acceptance checks.

## Handoff
Feed finalized copy targets from `terminology.md` and `copy-spec.md` into:
- Phase 10e implementation checklist,
- and CTA/FAQ regression checks in test updates.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Defined canonical terms (status/CTA/payment/referral) to eliminate ambiguity.
  - Produced section-mapped copy strategy aligned to the normal-consumer narrative ladder.
  - Captured acceptance checks for clarity consistency and action confidence.
- Commands run:
  - `cat > docs/planning/phase-10/b/terminology.md` — pass.
  - `cat > docs/planning/phase-10/b/copy-spec.md` — pass.
- Blockers:
  - None for this subphase.
- Next concrete steps:
  - Translate copy spec into file-by-file engineering tasks in Phase 10e.
