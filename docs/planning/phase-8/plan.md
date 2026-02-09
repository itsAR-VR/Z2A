# Phase 8 — Landing Simplification + LinkedIn Speakers + Discount Codes (No 2 SKUs)

## Purpose
Ship the requested landing cleanups (remove hero header tiles; simplify speakers to LinkedIn links) and replace the two-tier “List Price vs Network Code” pricing presentation with a discount-code-based flow (no second SKU).

## Context
- Jam report: `https://jam.dev/c/8f22f98b-b1ce-4de1-93a8-14364dde4d96`
- Current implementation highlights:
  - `src/components/sections/Hero.tsx` renders a hero “meta” pill row containing:
    - Deposit, Stripe, refund policy, location, instructor, and an “Agent Trace” trigger.
  - `src/components/sections/Speakers.tsx` renders speaker cards that open an on-page dialog with:
    - Long bullet highlight lists, a details block, and (for Abdur) an award plaque image.
  - `src/components/sections/Pricing.tsx` presents two plan cards (“List Price” vs “Network Code”) even though the user wants discounts handled via a code.
  - `POST /api/apply` currently accepts `networkCode`, validates it against the DB, and sets `remainderAmount` accordingly (deposit remains $100).
- User requests to implement now:
  1. Remove the hero header tiles (Deposit/Stripe/Refund/Location/Instructor/Agent Trace pills).
  2. Simplify speakers and link directly to LinkedIn (no dialog; remove bullets; remove award plaque).
  3. Replace the two pricing “SKUs” with a discount code that applies to the purchase.
- Repo reality / coordination:
  - The working tree currently has uncommitted modifications across landing/apply/admin/Stripe/test files.
  - Phases 6 and 7 planning docs exist locally but are currently untracked. Treat Phase 7 output as the baseline state and avoid “resetting” changes.

## Concurrent Phases
Overlap detected with prior “complete” phases that touched the same files/domains.

| Phase | Status | Overlap | Coordination |
|-------|--------|---------|--------------|
| Phase 7 | Complete (working tree has uncommitted edits) | Files: `src/components/sections/Hero.tsx`, `src/components/sections/Speakers.tsx`, `src/app/apply/page.tsx`, `z2a/*.spec.ts` | Start Phase 8 from the current Phase 7 baseline; do not revert Phase 7 work. Prefer committing Phase 7 (or working on a branch) before implementing Phase 8 to reduce merge risk. |
| Phase 6 | Complete | Domain: Stripe deposit + webhook + prod-safe tests | Preserve the deposit checkout and webhook idempotency behavior; update tests with care. |

## Objectives
* [x] Remove hero header tiles and the Agent Trace entry point without degrading hero hierarchy.
* [x] Simplify Speakers to LinkedIn-only cards (no dialog), remove bullets/details, remove award plaque, keep badge pills.
* [x] Collapse Pricing to a single base price plan and move hero trust cues (Stripe/refund/location) into Pricing.
* [x] Replace the “Network Code” pricing SKU concept with a discount-code-based flow that applies at payment time.
* [ ] Keep funnel correctness and trust cues: seat cap, Stripe deposit flow, refund policy clarity, accessibility.

## Constraints
- Brand/voice: focused, premium, builder-first. No hype copy; trust cues are explicit and easy to verify.
- A11y: keyboard navigable, proper roles/labels; touch targets >= 44px.
- Motion: progressive enhancement only; reduced-motion compliant; 60fps transforms/opacity only.
- Payments: do not break existing Stripe deposit checkout + webhook behavior; changes must be testable and observable in admin.

## Success Criteria
- Landing:
  - Hero meta pill row is removed (Deposit/Stripe/Refund/Location/Instructor/Agent Trace).
  - Speakers section contains no dialog and no long bullet lists; each speaker card links to LinkedIn in a new tab.
  - Award plaque content is removed from the site.
- Pricing:
  - Only one plan is shown (no “Network Code” SKU card).
  - Trust info previously in hero (Stripe, refund, location) is present and scannable in Pricing.
- Discounts:
  - Discount codes are supported without maintaining a second "discounted" SKU.
  - Discount is applied at payment time (Stripe-side), with a clear operational path for when/how it's collected.
- Remainder collection (authorize-then-capture):
  - Admin can pre-authorize each attendee's remainder at check-in (Day 1) via Stripe Checkout with promo code entry.
  - Admin can batch-capture all authorized remainders after Day 1 with a single "Capture All" action.
  - Admin can cancel individual authorizations for no-shows.
- QA:
  - Update Playwright specs impacted by removal of the Agent Trace trigger and Speakers dialog.
  - `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:e2e:prod` pass.

## Subphase Index
* a — Landing hero: remove header tiles + Agent Trace entry point; update landing tests
* b — Speakers: simplify cards to LinkedIn links, remove bullets + plaque; update speakers tests
* c — Pricing/apply copy: collapse pricing to one plan, move trust cues to pricing, reframe "network code" as referral tracking
* d — Discounts/Stripe: implement a discount-code flow that applies at payment time (Stripe), without a second SKU; update backend/admin/webhook and add runbook/tests

## Repo Reality Check (RED TEAM)

- What exists today:
  - `src/components/sections/Hero.tsx` — Hero has a GSAP timeline (lines 62–108) animating 6 elements including `metaRef` (the pill row). The meta pill row (lines 173–218) contains 5 informational pills + the Agent Trace `<button>` with `data-testid="agent-trace-trigger"`. The Agent Trace dialog (lines 354–429) uses the shared `Dialog` component. The hero also has an SVG "trace" decorative element (lines 222–273) attached to `traceRef`/`traceVisible` reveal logic.
  - `src/components/sections/Speakers.tsx` — Speaker cards are `<button>` elements that `onClick={() => setActiveSpeaker(speaker)}`. Dialog renders detailed bullets, external links, company logo, LinkedIn button, and award plaque. Both speakers have `linkedinUrl` populated (Aadil: `/in/aadilkazmi/`, Abdur: `/in/abdur-sajid/`).
  - `src/components/sections/Pricing.tsx` — Two-card grid: "List Price" ($1,500) and "Network Code" ($1,000, `featured: true`, "Save $500" badge). Both link to `/apply`. The bottom "Reimbursement and referrals" card mentions "Network codes are discount-only for this pilot."
  - `src/app/api/apply/route.ts` — Accepts `networkCode`, validates against `ReferralCode` table (type: "network", active: true), and sets `remainderAmount` to either `NETWORK_REMAINDER_AMOUNT_CENTS` (900_00) or `LIST_REMAINDER_AMOUNT_CENTS` (1400_00). Stores `networkCode` in attendee record and Stripe metadata.
  - `src/app/api/stripe/webhook/route.ts` — Handles `checkout.session.completed` and `charge.refunded`. Idempotency via `StripeEvent` upsert with P2002 duplicate guard. Does NOT currently handle any remainder-related events.
  - `prisma/schema.prisma` — `Attendee` model already has remainder fields: `remainderAmount`, `remainderCurrency`, `remainderStatus` (enum: none/authorized/captured/canceled/refunded), `remainderPaymentIntentId`, `remainderAuthorizedAt`, `remainderCapturedAt`. **No schema migration needed for Phase 8d.**
  - `src/lib/config.ts` — Constants: `DEPOSIT_AMOUNT_CENTS` = 10000, `LIST_REMAINDER_AMOUNT_CENTS` = 140000, `NETWORK_REMAINDER_AMOUNT_CENTS` = 90000. **These will become stale once pricing is single-plan + Stripe promo-code-based.**
  - `src/lib/env.ts` — Validates: `APP_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_DEPOSIT_PRICE_ID`, `DATABASE_URL`, `DIRECT_URL`, `ADMIN_BASIC_AUTH_USER`, `ADMIN_BASIC_AUTH_PASS`. Does NOT yet include `STRIPE_REMAINDER_PRICE_ID`.
  - `z2a/landing.spec.ts` — Contains Agent Trace trigger/dialog assertions (data-testid selectors).
  - `z2a/speakers.spec.ts` — Contains dialog-opening assertions.
  - `z2a/reduced-motion.spec.ts` — Tests marquee + hero GSAP behavior under reduced motion.
  - `z2a/apply.spec.ts` — Tests apply form including network code UI.
  - **No `allow_promotion_codes` usage** in application code — only in Stripe SDK type definitions.
  - GSAP hero timeline references `metaRef.current` at line 93–97 — this will break if the pill row is removed without updating the timeline.
  - Hero "Have a network code?" CTA button (line 168) links to `/apply?network=1`.
- What the plan assumes:
  - Agent Trace trigger/dialog exist → ✅ confirmed (button at line 195, dialog at line 354)
  - Speakers use dialog pattern → ✅ confirmed (`<button>` cards opening `<Dialog>`)
  - Pricing shows two plans → ✅ confirmed (two-element `plans` array)
  - Backend discounts remainder via `networkCode` → ✅ confirmed (line 64–66)
  - Prisma schema supports remainder status tracking → ✅ confirmed (enum + fields exist)
- Verified touch points:
  - `Hero.tsx:56` — `traceOpen` state
  - `Hero.tsx:93-97` — GSAP timeline animates `metaRef` (pill row)
  - `Hero.tsx:195-217` — Agent Trace trigger button
  - `Hero.tsx:354-429` — Agent Trace Dialog
  - `Speakers.tsx:286-289` — `<button onClick>` card interaction
  - `Speakers.tsx:353-374` — Speaker Dialog component
  - `Pricing.tsx:9-26` — `plans` array (two entries)
  - `apply/route.ts:55-66` — networkCode validation + remainder pricing
  - `webhook/route.ts:46-103` — event switch (only deposit events)
  - `config.ts:7-8` — `LIST_REMAINDER_AMOUNT_CENTS` / `NETWORK_REMAINDER_AMOUNT_CENTS`

## Repo Reality Check (Post-Implementation)
- Current state (after Phase 8a–8d):
  - Landing hero no longer renders the meta pill row or Agent Trace trigger/dialog (hero keeps the decorative SVG trace).
  - Speakers are direct LinkedIn links (no dialog, no highlight bullets, no award plaque).
  - Pricing is single-plan; referral codes are tracking-only on `/apply`.
  - Discounts are applied at remainder payment time via Stripe promo codes (no second discounted SKU).
  - Remainder ops exist (authorize at check-in, capture later):
    - Admin endpoints under `/api/admin/*` for remainder checkout/capture/cancel + batch capture.
    - Stripe webhook branches remainder vs deposit via `metadata.payment_type`.
    - Public redirect targets at `/remainder/*` (avoid `/admin/*` Basic Auth).

## RED TEAM Findings (Gaps / Weak Spots)

### Highest-risk failure modes

- **F1: GSAP timeline will error if `metaRef` element is removed** — The hero GSAP timeline (Hero.tsx:93–97) animates `metaRef.current`. If 8a removes the pill row DOM but keeps the `metaRef` ref and timeline step, GSAP will animate `null` (no-op but wasted cycle). If the ref is removed but the timeline step isn't, it will attempt to animate `null`. → **Mitigation**: 8a must remove both the `metaRef` ref declaration AND the timeline `.fromTo(metaRef.current, ...)` step, then verify remaining timeline offsets (e.g., `"-=0.2"`) still chain correctly.

- **F2: Hero SVG trace visual and reveal logic may become orphaned** — The Agent Trace trigger and dialog are being removed, but the decorative SVG trace (lines 222–273) and its `traceRef`/`traceVisible`/`traceActive` reveal logic (lines 57–60) serve a separate decorative purpose. The plan doesn't state whether the SVG trace stays or goes. → **Mitigation**: 8a must explicitly decide: keep the SVG trace (decorative only, no user interaction) or remove it. If kept, remove `traceOpen`-related state only. If removed, also remove the `useReveal` call and CSS class references.

- **F3: "Have a network code?" hero CTA becomes stale** — Hero.tsx:168 has `<Button variant="secondary" href="/apply?network=1">Have a network code?</Button>`. Phase 8c reframes the code as "referral tracking," but the hero CTA still says "network code" and links to a query param. → **Mitigation**: 8a or 8c must update or remove this CTA. If referral codes are tracking-only (no pricing lever), the CTA loses its purpose entirely. Consider removing it and keeping a single CTA.

- **F4: config.ts constants become dead code / misleading** — `NETWORK_REMAINDER_AMOUNT_CENTS` (90000) is used in `apply/route.ts:64–66` to apply the discount. If 8c changes networkCode to "tracking only" (no pricing impact), this constant and the validation/pricing logic become dead code. If 8d introduces Stripe promo codes instead, the backend remainder calculation must be updated. → **Mitigation**: 8c must remove or comment the `NETWORK_REMAINDER_AMOUNT_CENTS` constant and the remainder-amount branching in `apply/route.ts` if the code is truly tracking-only. 8d must define what sets `remainderAmount` now (a fixed value? Stripe-side only?).

- **F5: Ordering conflict between 8c and 8d** — 8c says "stop altering `remainderAmount` based on DB code validity (or explicitly document that it remains as-is if Phase 8d chooses otherwise)" — this creates a circular dependency. 8d may or may not change this behavior, but 8c needs a definitive answer. → **Mitigation**: Resolve now: 8c should set `remainderAmount` to a fixed value (`LIST_REMAINDER_AMOUNT_CENTS` for all registrants), and 8d should handle discounts purely via Stripe promo codes on the remainder checkout session. Document this decision in both subphase plans.

- **F6: Uncommitted Phase 7 changes** — git status shows many modified files overlapping with Phase 8 targets (`Hero.tsx`, `Speakers.tsx` via Dialog, `apply/page.tsx`, `landing.spec.ts`, `reduced-motion.spec.ts`). Executing Phase 8 on top of uncommitted Phase 7 changes risks losing work if anything goes wrong. → **Mitigation**: Commit Phase 7 changes before starting Phase 8 implementation. Add this as an explicit pre-flight step.

## Phase Summary (running)
- 2026-02-09 — Removed hero header tiles + Agent Trace entry point; updated landing spec (files: `src/components/sections/Hero.tsx`, `z2a/landing.spec.ts`, `docs/planning/phase-8/a/plan.md`)
- 2026-02-09 — Simplified speakers to LinkedIn cards and removed plaque/bullets (files: `src/components/sections/Speakers.tsx`, `z2a/speakers.spec.ts`, `docs/planning/phase-8/b/plan.md`)
- 2026-02-09 — Collapsed pricing to one plan; moved trust cues; reframed codes as referral tracking (files: `src/components/sections/Pricing.tsx`, `src/app/apply/page.tsx`, `src/app/api/apply/route.ts`, `src/lib/config.ts`, `src/components/sections/Hero.tsx`, `docs/planning/phase-8/c/plan.md`)
- 2026-02-09 — Implemented Stripe promo-code remainder authorization + capture ops flow (files: `src/app/api/admin/remainder-capture-all/route.ts`, `src/app/api/admin/attendees/[id]/remainder-checkout/route.ts`, `src/app/api/admin/attendees/[id]/remainder-capture/route.ts`, `src/app/api/admin/attendees/[id]/remainder-cancel/route.ts`, `src/app/api/stripe/webhook/route.ts`, `src/components/admin/AttendeeDetail.tsx`, `src/components/admin/AttendeeTable.tsx`, `src/app/remainder/*`, `z2a/admin.spec.ts`, `docs/planning/phase-8/stripe-remainder-setup.md`, `docs/planning/phase-8/d/plan.md`)

### Missing or ambiguous requirements

- **M1: What happens to the "Reimbursement and referrals" card in Pricing.tsx:111–123?** — The plan says "collapse to one plan" but doesn't mention this separate card. Its copy says "Network codes are discount-only for this pilot (no cash payouts)" which will be stale. → **Mitigation**: 8c must update or remove this card to align with the new discount-code language.

- **M2: What is the single plan's total price?** — Currently "List Price" = $1,500 and "Network Code" = $1,000. If we collapse to one plan, is it $1,500 base with Stripe promo codes providing discounts? Or a different price point? → **Mitigation**: Assume $1,500 base price (deposit $100 + remainder $1,400) with promo codes handled by Stripe. Document this assumption.

- **M3: Speakers — should the bio text remain on the card, or just name/role/badges?** — The plan says "remove bullets" but the `bio` field is separate from `highlights`/`details`. Currently the card shows highlights, not bio. The dialog shows details + bio. → **Mitigation**: Keep name, role, badges, and a 1-line bio on the card. Remove highlights bullet list. Document explicitly in 8b.

- **M4: What replaces the Speaker Dialog import/usage?** — `Speakers.tsx` imports `Dialog` from `@/components/Dialog`. After removing the dialog, this import and all dialog state (`activeSpeaker`, `dialogIds`, `titleId`, `descId`, `dialogTitle`, `dialogBody`) become dead code. → **Mitigation**: 8b must list all state/imports to remove to avoid lint warnings.

- **M5: Apply page `?network=1` query param behavior** — The apply page reads this param to pre-expand the network code input field. If 8c renames "network code" to "referral code," the query param name and URL references must be updated consistently. → **Mitigation**: 8c must update the query param from `network` to `referral` (or remove it entirely if the field is always visible or tracking-only). Update the hero CTA link if it still exists after 8a.

- **M6: Phase 8d scope is very large** — Creating a Stripe remainder Price, Coupons, Promotion Codes, a new admin endpoint, webhook extensions, admin UI ops actions, docs, and tests — this is effectively a full mini-phase. → **Mitigation**: Consider splitting 8d or explicitly time-boxing. At minimum, separate the "Stripe dashboard setup" (manual, env-var-documented) from "code changes."

### Repo mismatches (fix the plan)

- **R1**: 8a references "Update any GSAP timeline steps that animate removed nodes" — correct concern, but needs to be more specific. The exact step to remove is `Hero.tsx:93–97` (`.fromTo(metaRef.current, ...)` in the timeline chain). Also need to adjust the overlap offset `"-=0.2"` at line 98 which bridges from the meta step to the art step.

- **R2**: 8b references `z2a/speakers.spec.ts` — **exists** ✅. But the plan should also note that `z2a/landing.spec.ts` may contain speaker-dialog-related assertions (since it tests the full landing page).

- **R3**: 8c references `src/app/api/apply/route.ts` but doesn't mention `src/lib/config.ts` which defines the constants that must be updated when removing the two-tier pricing.

- **R4**: 8d references `allow_promotion_codes` — this parameter **does exist** in the Stripe API (`checkout.sessions.create({ allow_promotion_codes: true })`), but it is **not currently used** anywhere in the codebase. 8d would need to add it to a new remainder checkout session creation endpoint.

- **R5**: 8d says "Persist necessary Stripe IDs to Attendee (e.g., remainder session id + payment intent id)" — the schema **already has** `remainderPaymentIntentId`, `remainderAuthorizedAt`, `remainderCapturedAt`, and `remainderStatus`. It does NOT have a `remainderCheckoutSessionId` field. → **Decide**: either add it to the schema (migration needed) or rely on `remainderPaymentIntentId` only.

### Performance / timeouts

- **P1: No performance risk from 8a/8b/8c** — These are removal/simplification changes that reduce DOM and JS. Net positive.
- **P2: 8d creates a new Stripe Checkout Session per remainder collection** — This is a Stripe API call (~200–600ms). Should not be called from a client-side action without loading/timeout state. → **Mitigation**: The admin endpoint creating the session should be async with a loading indicator in the admin UI.

### Security / permissions

- **S1: Remainder checkout endpoint must be admin-only** — 8d adds an endpoint to create remainder Checkout Sessions. This MUST be behind Basic Auth (same as other `/api/admin/*` routes). The plan says "admin-only" but should specify using the existing middleware pattern. → **Mitigation**: Place the endpoint under `src/app/api/admin/attendees/[id]/remainder-checkout/route.ts` to inherit the admin auth middleware.
- **S2: Stripe promo codes are Stripe-dashboard-only** — Creating/managing promo codes happens in Stripe Dashboard, not in the Z2A admin. This is a good security boundary. Confirm the plan doesn't accidentally expose coupon creation in the app.

### Testing / validation

- **T1: 8a must update `z2a/landing.spec.ts`** — The spec has Agent Trace trigger/dialog test assertions (`data-testid="agent-trace-trigger"`, `data-testid="agent-trace-dialog"`). Removing the trigger without updating the test will cause E2E failures.
- **T2: 8b must verify `z2a/landing.spec.ts` doesn't also test speaker dialog** — If the landing spec has speaker dialog assertions (not just `speakers.spec.ts`), those must also be updated.
- **T3: 8c/8d must update `z2a/apply.spec.ts`** — The apply spec tests the network code input field. Renaming to "referral code" or changing its behavior will break assertions.
- **T4: 8d admin tests need Basic Auth `httpCredentials`** — Per Phase 7 findings, admin Playwright tests must use `httpCredentials`. Confirm this pattern is documented.

## Assumptions (Agent)

- **Phase 7 uncommitted changes will be committed before Phase 8 execution begins** (confidence ~95%)
  - Mitigation: Add explicit pre-flight step to 8a requiring clean git state or committed baseline.
- **The single base price is $1,500 (deposit $100 + remainder $1,400), matching the current "List Price"** (confidence ~90%)
  - Mitigation: If the base price should be different, update `config.ts` constants and Pricing UI accordingly.
- **RESOLVED: SVG trace removed** — user confirmed remove everything (Q1).
- **RESOLVED: Hero has single CTA** — "Have a network code?" button removed (Q2).
- **RESOLVED: Authorize-then-capture** — pre-authorize at check-in, capture later (Q3). Uses Stripe Checkout with `capture_method: "manual"`.
- **`allow_promotion_codes` + `capture_method: "manual"` are compatible in Stripe Checkout** (confidence ~85%)
  - Mitigation: Test immediately in Stripe test mode. If incompatible, escalate — may need PaymentIntents flow.
- **No Prisma schema migration is needed** — all remainder fields already exist (confidence ~95%)
  - Mitigation: If a `remainderCheckoutSessionId` field is desired, a small schema migration would be required. See Q4.

## Open Questions (Need Human Input)

- [x] **Q1: Should the decorative SVG trace (Scope→Build→Deploy→Evaluate) in the hero remain?** → **RESOLVED: Remove everything.** Remove SVG trace, dialog, trigger, and all trace-related state/refs/CSS.

- [x] **Q2: Should the "Have a network code?" hero CTA button be removed entirely?** → **RESOLVED: Remove it.** Single CTA hero ("Apply / Reserve Seat" only).

- [x] **Q3: Capture mode for remainder collection?** → **RESOLVED: Authorize-then-capture.** Pre-authorize at check-in (Day 1), then batch-capture all authorized remainders after Day 1 via a single admin "Capture All Authorized Remainders" button. Individual cancel available for no-shows. Uses Stripe Checkout with `capture_method: "manual"` + `allow_promotion_codes: true`. Phase 8d updated with batch capture endpoint, individual capture override, and cancel endpoint.

- [ ] **Q4: Should we add a `remainderCheckoutSessionId` column to the Attendee model?** (confidence ~65%)
  - Why it matters: Without it, we can't easily look up which Stripe Checkout Session corresponds to the remainder payment. `remainderPaymentIntentId` is set after checkout completes (via webhook), but the session ID is available immediately when the admin creates the session. Useful for debugging.
  - Current assumption in this plan: **Do not add** — keep schema changes minimal. Use `remainderPaymentIntentId` (set by webhook) as the primary reference. If needed later, add in a follow-up.
