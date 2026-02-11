# Phase 10b Output — Copy Clarity Spec (Impeccable Clarify)

## Narrative Ladder by Section
- **Layer 1: Save time now**
  - Hero, StickyApplyBar
- **Layer 2: Level up practical skill**
  - Why, Outcomes, HowItWorks
- **Layer 3: Build upside with reclaimed time**
  - Speakers, Pricing, CTAFooter, Apply intro

## Before/After Map (high-impact)

### Hero (`src/components/sections/Hero.tsx`)
- Status chip:
  - Before: `Admissions live`
  - After: `Applications open now`
- Headline concept:
  - Before: highly builder-centric framing
  - After: `Automate real work in a weekend.` (final wording to be tuned in implementation)
- Subhead concept:
  - Before: agent/deployment/eval heavy
  - After: plain-language outcome with one technical sentence max.

### Nav + Mobile Overlay (`src/components/Nav.tsx`)
- Badge:
  - Before: `Admissions open`
  - After: `Applications open now`
- Orientation line:
  - Add concise guidance for first-time users in overlay.

### Sticky Apply Bar (`src/components/StickyApplyBar.tsx`)
- Badge:
  - Before: `Admissions open`
  - After: `Applications open now`
- Supporting line:
  - Keep dates/seat cap; reduce ambiguity and duplicate phrasing.

### Speakers (`src/components/sections/Speakers.tsx`)
- Normalize role/bio/proof copy to equal structure and length.
- Add explicit outbound label (`View LinkedIn`) where appropriate.

### Pricing (`src/components/sections/Pricing.tsx`)
- Clarify mechanics in one summary block:
  - `Pay $100 now to reserve your seat. Pay the remainder after check-in flow.`
- Keep refund line plain and unambiguous.

### FAQ (`src/components/sections/FAQ.tsx`)
- Reorder by highest decision friction first.
- Rewrite first sentence of each answer for direct confidence.

### Apply (`src/app/apply/page.tsx`)
- Intro copy should emphasize:
  - 2–3 minute application,
  - what happens immediately next,
  - why deposit exists,
  - refund confidence.

## Acceptance Checks
1. Status terminology appears exactly once in canonical form across hero/nav/sticky.
2. A first-time user can explain payment flow after reading hero + pricing only.
3. CTA labels communicate exact action and next step.
4. No ambiguous policy phrasing in FAQ/apply helper text.
