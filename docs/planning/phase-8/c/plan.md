# Phase 8c — Pricing + Apply Copy (Single Plan, Trust Cues, Referral Tracking)

## Focus
Remove the two-card "List Price vs Network Code" presentation, keep one base plan, and make trust mechanics (Stripe + refund + location) explicit in Pricing. Reframe "network code" in `/apply` as referral tracking (not pricing).

## Inputs
- Root plan: `docs/planning/phase-8/plan.md`
- Pricing section: `src/components/sections/Pricing.tsx`
  - Two-card `plans` array: lines 9–26 ("List Price" $1,500, "Network Code" $1,000 with "Save $500" badge)
  - Grid layout: line 48 (`grid-cols-1 md:grid-cols-2`)
  - "Reimbursement and referrals" card: lines 111–123 (copy mentions "Network codes are discount-only")
  - Currently imports: `Card`, `Badge`, `Button`, `RevealOnScroll`, `SectionWrapper`
- Apply page: `src/app/apply/page.tsx`
  - Network code field: toggle-reveal pattern (`networkCode` field, "Add a network code (optional)" button)
  - Query param: `?network=1` pre-expands the network code input
  - Helper text: "Network codes discount the remainder only. The deposit stays $100."
- Apply API: `src/app/api/apply/route.ts`
  - networkCode validation: lines 55–62 (queries `ReferralCode` table)
  - Remainder pricing: lines 64–66 (`networkCodeValid ? NETWORK_REMAINDER_AMOUNT_CENTS : LIST_REMAINDER_AMOUNT_CENTS`)
  - Metadata: line 124 (`network_code` stored in Stripe metadata)
- Config: `src/lib/config.ts`
  - `LIST_REMAINDER_AMOUNT_CENTS` = 140000 (line 7)
  - `NETWORK_REMAINDER_AMOUNT_CENTS` = 90000 (line 8)
- E2E: `z2a/apply.spec.ts` (tests network code input behavior)

## Work
1. **Pricing UI — collapse to single plan**
   - Replace the `plans` array with a single object: `{ name: "Workshop", price: "$1,500", deposit: "$100", remainder: "$1,400" }`.
   - Change the grid from `md:grid-cols-2` to single-column layout (centered, max-width constrained).
   - Remove the `Badge` "Save $500" rendering.
   - Remove the `featured` conditional styling.
   - Remove the "Network codes discount the remainder only" helper text (line 91–95).
2. **Add trust cues to Pricing**
   - Below the plan card, add a compact trust row (previously in hero pills):
     - "Checkout via Stripe" (with lock or Stripe icon)
     - "Full refund by end of Day 2"
     - "Venue shared after seat is reserved"
   - Style as a subtle pill row or info grid, consistent with existing design tokens.
3. **Update "Reimbursement and referrals" card**
   - Remove or rewrite "Network codes are discount-only for this pilot (no cash payouts)."
   - Replace with: "Invoice/receipt available for professional reimbursement." (simpler, no network code mention).
4. **Apply UI — rename "network code" to "referral code"**
   - Change the toggle button label from "Add a network code (optional)" to "Add a referral code (optional)".
   - Update helper text from "Network codes discount the remainder only. The deposit stays $100." to "Referral codes help us track how you found us." (tracking-only language).
   - Update the query param from `?network=1` to `?referral=1` (and update any internal links that use `?network=1` — Phase 8a should have removed the hero CTA, but verify).
   - Rename the form field label if applicable.
5. **Backend — make networkCode tracking-only**
   - In `src/app/api/apply/route.ts`:
     - Remove the `networkCodeValid` query (lines 55–62) — the code is now for tracking, not pricing.
     - Set `remainderAmount` to a fixed `LIST_REMAINDER_AMOUNT_CENTS` (140000) for all registrants.
     - Keep storing `networkCode` on the attendee record (for referral attribution/tracking).
     - Keep storing `network_code` in Stripe metadata (useful for ops visibility).
   - In `src/lib/config.ts`:
     - Remove `NETWORK_REMAINDER_AMOUNT_CENTS` (dead code).
     - Optionally rename `LIST_REMAINDER_AMOUNT_CENTS` to `REMAINDER_AMOUNT_CENTS` for clarity.
6. **Update tests**
   - In `z2a/apply.spec.ts`:
     - Update assertions that reference "network code" to "referral code".
     - Update the query param test from `?network=1` to `?referral=1`.
     - Verify the apply flow still completes with and without a referral code.
7. **Smoke test**
   - `npm run lint && npm run typecheck && npm run build`
   - `npm run test:e2e` (apply + landing subset)

## Validation (RED TEAM)
- `git grep "NETWORK_REMAINDER"` returns zero results.
- `git grep "networkCodeValid"` returns zero results in `apply/route.ts`.
- Pricing section renders one card (not two) — verify in browser or snapshot.
- Trust cues (Stripe, refund, venue) are visible in the Pricing section.
- Apply form shows "referral code" language, not "network code."
- `?referral=1` pre-expands the referral code input.
- `npm run lint` — no unused imports/variables.
- `npm run test:e2e` — apply specs pass.

## Assumptions / Open Questions (RED TEAM)
- **Assumption**: Base price is $1,500 (deposit $100 + remainder $1,400). Confidence ~90%. If the user wants a different base price, update `config.ts` and Pricing UI.
- **Assumption**: The `networkCode` field in `applySchema` (Zod) keeps its name in the API for backward compat — only the UI label changes. Confidence ~92%. If the field name should also change to `referralCode`, a schema migration + Stripe metadata key change is needed.

## Output
Pricing is single-plan; trust cues moved from hero to pricing; apply code field is tracking-only; copy is consistent; backend no longer price-branches on code validity. Playwright execution is blocked in this environment due to missing Playwright browsers.

## Handoff
- Proceed to Phase 8d to implement the Stripe-side discount flow (promotion codes) without a second SKU and wire ops/admin + webhook accordingly.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Collapsed Pricing to a single plan and moved Stripe/refund/venue trust cues into the Pricing section.
  - Renamed “network code” UI to “referral code” on `/apply` and moved the pre-expand query param from `network=1` to `referral=1`.
  - Removed backend remainder discount branching; remainder amount is now fixed list remainder and code is tracking-only.
  - Removed the secondary hero CTA for codes (keeps hero focus on one CTA).
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
- Blockers:
  - Playwright browsers are not installed and cannot be downloaded in this sandbox → run `npx playwright install` locally and rerun `npm run test:e2e:prod`.
- Next concrete steps:
  - Execute Phase 8d (Stripe-side promo codes + remainder Checkout + admin ops actions + webhook updates).
