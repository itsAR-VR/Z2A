# Phase 1f — Align IA + Copy to `Plans/plan.md` (Zero-to-Agent)

## Focus
Turn the now-populated `Plans/plan.md` into a **decision-complete** single-page IA + content spec that the site can implement without copy/structure ambiguity.

This subphase exists because earlier subphases were authored before `Plans/plan.md` was populated and cannot be edited under RED TEAM rules.

## Inputs
- Offer + landing-page draft: `Plans/plan.md`
- Reference captures (local): `/tmp/site-analysis/` (structure + motion principles only; no pixel-perfect cloning)
- Existing Phase 1 constraints (root plan)
- Existing subphase outputs (`a`–`e`) as baseline context

## Work
1. Extract non‑negotiables from `Plans/plan.md` and surface them as “copy + UX constraints”:
   - premium, in-person, hands-on, pods of 3–4, no alcohol
   - outcome promise (working agent + basic deployment approach + evaluation/testing workflow)
   - no hype / no job or income guarantees / avoid absolute completion guarantees
2. Lock the **single-page section order + anchors** to match the `Plans/plan.md` wireframe:
   - `#top` (Hero)
   - `#for-you` (Who it’s for / not for)
   - `#outcomes`
   - `#agenda`
   - `#how-it-works`
   - `#proof`
   - `#pricing`
   - `#faq`
   - `#venue`
   - `#apply` (Apply + payment CTA)
3. Define required placeholders (must be explicit in the UI until filled):
   - `[EVENT_DATE]`, `[EVENT_TIME]`, `[VENUE_NAME]`, `[CITY]`, `[CAPACITY]`
   - `[CURRENCY]`, `[LIST_PRICE]`, `[NETWORK_PRICE]`, `[DEPOSIT_AMOUNT]`, `[NETWORK_CODE]`
   - `[CHECKOUT_MODE]` (deposit vs pay-in-full default)
4. Define the **content model** (recommended: typed TS object to avoid MDX complexity):
   - `src/content/site.ts` exports `event`, `sections`, `faq`, `pricing`, `legal`
   - include copy variants where needed (e.g., 2–3 hero headline options) but keep one default
5. Copy guardrails + compliance:
   - required disclaimers (no job guarantees, no 100% completion guarantee)
   - reimbursement language: “many employers reimburse professional development” (never “your employer will”)
   - “premium ops” credibility cues: agenda, prework, pods, support ratio, logistics clarity
6. Asset list + constraints:
   - original hero visual (no TKS/Refunnel asset reuse), OG image, favicon, optional instructor photo
   - any proof points must be verifiable and sourced (links stored in content model)
7. Validation (RED TEAM):
   - ensure the IA supports the full `Plans/plan.md` landing-page copy without awkward omissions
   - ensure anchors map 1:1 to nav items and are stable for GSAP triggers

## Output
- Final single-page IA + anchor map aligned to `Plans/plan.md` (no “empty plan.md” assumptions).
- Concrete content model + placeholder list ready for implementation.
- Copy guardrails + required disclaimers checklist.

## Handoff
Hand off:
- Anchors + content model to Phase 1b (layout) and Phase 1c (motion).
- Pricing/CTA field requirements to Phase 1g (Stripe + application flow).
