# Phase 8d — Stripe Discount Codes (Apply At Payment Time, No Second SKU)

## Focus
Implement a discount code flow that applies in Stripe at payment time (instead of maintaining a second discounted SKU), and make it operable for the in-person check-in / remainder-collection process.

## Inputs
- Root plan: `docs/planning/phase-8/plan.md`
- Current deposit checkout creation: `src/app/api/apply/route.ts`
  - Creates Stripe Checkout Session at line 115 with `mode: "payment"`, `price: env.STRIPE_DEPOSIT_PRICE_ID`
  - Stores `checkoutSessionId` on the attendee (line 138)
- Stripe webhook: `src/app/api/stripe/webhook/route.ts`
  - Handles: `checkout.session.completed` (deposit) and `charge.refunded`
  - Idempotency: `StripeEvent` unique constraint on `stripeEventId` (P2002 duplicate guard)
  - Updates: `depositStatus`, `checkoutSessionId`, `depositPaymentIntentId`
  - Does NOT currently handle remainder-related events
- Admin UI: `src/components/admin/AttendeeDetail.tsx`
- Admin APIs: `src/app/api/admin/attendees/[id]/route.ts` (GET/PATCH single attendee)
- Env schema: `src/lib/env.ts` — includes `STRIPE_REMAINDER_PRICE_ID` (optional to avoid blocking builds)
- Prisma schema: `prisma/schema.prisma`
  - `Attendee` already has: `remainderAmount`, `remainderCurrency`, `remainderStatus` (enum: none/authorized/captured/canceled/refunded), `remainderPaymentIntentId`, `remainderAuthorizedAt`, `remainderCapturedAt`
  - Does NOT have: `remainderCheckoutSessionId`
- Stripe SDK types: `allow_promotion_codes` exists on `Stripe.Checkout.SessionCreateParams` — not currently used

## Work

### Part 1: Stripe Dashboard Setup (Manual, Document Only)
1. **Create a Stripe Product + Price for the remainder**
   - Product: "Z2A Workshop — Remainder"
   - Price: $1,400 USD (one-time)
   - Copy the Price ID → set `STRIPE_REMAINDER_PRICE_ID` in `.env.local` and production env
2. **Create Stripe Coupons**
   - Coupon: "$500 off remainder" (amount_off: 50000, currency: usd)
   - Restrict to the remainder product (Stripe "applies to" restriction)
3. **Create Stripe Promotion Codes**
   - Attach to the coupon above
   - Set a memorable code (e.g., `NETWORK500`)
   - Restrict to first-time redemption per customer if desired
4. **Document the setup** in `docs/planning/phase-8/stripe-remainder-setup.md`:
   - Product/Price IDs
   - Coupon/Promo Code details
   - Steps to create new promo codes in the future

### Part 2: Env + Config Changes
5. **Add `STRIPE_REMAINDER_PRICE_ID` to env schema**
   - In `src/lib/env.ts`: add `STRIPE_REMAINDER_PRICE_ID: z.string().min(1).optional()` to the schema and parse block.
   - Add to `.env.local` and production environment variables.
   - **Note**: The remainder admin endpoint must fail clearly (500) if the env var is not set.

### Part 3: Remainder Checkout Endpoint (Authorize-Then-Capture)
6. **Create `src/app/api/admin/attendees/[id]/remainder-checkout/route.ts`**
   - This is under `/api/admin/` to inherit Basic Auth middleware.
   - `POST` handler:
     - Look up attendee by `id` (from route params — remember `params` is a Promise in Next.js 16).
     - Validate: attendee exists, `depositStatus === "paid"`, `remainderStatus === "none"`.
     - Create a Stripe Checkout Session with **manual capture**:
       ```ts
       stripe.checkout.sessions.create({
         mode: "payment",
         line_items: [{ price: env.STRIPE_REMAINDER_PRICE_ID, quantity: 1 }],
         allow_promotion_codes: true,
         payment_intent_data: {
           capture_method: "manual",
         },
         customer_email: attendee.email,
         client_reference_id: attendee.id,
         metadata: {
           attendee_id: attendee.id,
           payment_type: "remainder",
           referral_code: attendee.networkCode || "",
         },
         success_url: `${env.APP_URL}/remainder/success?session_id={CHECKOUT_SESSION_ID}`,
         cancel_url: `${env.APP_URL}/remainder/canceled`,
       })
       ```
     - Return `{ checkoutUrl: session.url }`.
   - **Key**: `payment_intent_data.capture_method: "manual"` creates an authorization hold. Stripe's `checkout.session.completed` fires after authorization (not capture). The PaymentIntent status will be `requires_capture`.
   - **Stripe Checkout + `allow_promotion_codes` + `capture_method: "manual"` compatibility**: Verify via Context7/Stripe docs that this combination is supported. If not, fall back to creating a PaymentIntent manually and using a custom checkout page (significantly more work — escalate to user).

### Part 4: Webhook — Remainder Authorization Handling
7. **Extend `src/app/api/stripe/webhook/route.ts`**
   - In the `checkout.session.completed` handler, distinguish between deposit and remainder sessions:
     - Check `session.metadata?.payment_type`:
       - If `"remainder"`: update attendee with `remainderStatus: "authorized"`, `remainderPaymentIntentId`, `remainderAuthorizedAt: new Date()`.
       - If absent/other: existing deposit logic (unchanged).
     - This is backward-compatible: existing deposit sessions don't have `payment_type` metadata.
   - Keep existing idempotency logic (StripeEvent unique constraint).
   - **Important**: The `amount_total` on the session will reflect any applied promo code discount. Log this for ops visibility.
   - **Note on authorization window**: Stripe authorizations expire after 7 days (standard) or up to 31 days for certain card networks with extended auth. If the workshop is Day 1 → capture needed within 7 days. Document this constraint.

### Part 5: Batch Capture + Individual Cancel Endpoints
8. **Create `src/app/api/admin/remainder-capture-all/route.ts`** (batch auto-capture)
   - This is the primary capture mechanism. On Day 1, admin triggers a single action to capture **all** authorized remainders at once.
   - `POST` handler:
     - Query all attendees where `remainderStatus === "authorized"` and `remainderPaymentIntentId` is set.
     - For each attendee, call `stripe.paymentIntents.capture(attendee.remainderPaymentIntentId)`.
     - On success: update `remainderStatus: "captured"`, `remainderCapturedAt: new Date()`.
     - On failure (e.g., auth expired for one attendee): log the error, skip that attendee, continue with the rest.
     - Return `{ captured: number, failed: { attendeeId, error }[] }` so admin can see results.
   - **Concurrency**: Process sequentially (not parallel) to avoid Stripe rate limits. Stripe allows ~100 req/s but sequential is safer for 50 attendees max.

9. **Create `src/app/api/admin/attendees/[id]/remainder-capture/route.ts`** (individual override)
   - `POST` handler for single-attendee capture (fallback/override).
     - Look up attendee, validate `remainderStatus === "authorized"` and `remainderPaymentIntentId` is set.
     - Call `stripe.paymentIntents.capture(attendee.remainderPaymentIntentId)`.
     - Update attendee: `remainderStatus: "captured"`, `remainderCapturedAt: new Date()`.
     - Return `{ success: true }`.
   - Error handling: If Stripe returns an error (e.g., auth expired), return the error message and don't update status.

10. **Create `src/app/api/admin/attendees/[id]/remainder-cancel/route.ts`** (cancel auth)
    - `POST` handler:
      - Look up attendee, validate `remainderStatus === "authorized"` and `remainderPaymentIntentId` is set.
      - Call `stripe.paymentIntents.cancel(attendee.remainderPaymentIntentId)`.
      - Update attendee: `remainderStatus: "canceled"`.
      - Return `{ success: true }`.

### Part 6: Admin UX
11. **Add ops actions to `src/components/admin/AttendeeDetail.tsx`** (per-attendee)
    - **"Collect Remainder" button**: visible when `depositStatus === "paid"` AND `remainderStatus === "none"`.
      - On click: POST to `/api/admin/attendees/{id}/remainder-checkout`.
      - Open the returned `checkoutUrl` in a new tab (`window.open()`).
      - Show a loading state while the API call is in flight.
    - **"Cancel Authorization" button**: visible when `remainderStatus === "authorized"`.
      - On click: confirm dialog → POST to `/api/admin/attendees/{id}/remainder-cancel`.
    - **Remainder status display**: Show `remainderStatus` with appropriate semantic color token (same pattern as `depositStatus` display). Use: none=neutral, authorized=warning/amber, captured=success/green, canceled=muted, refunded=muted.
    - After webhook processes the authorization, admin can refresh to see `remainderStatus: "authorized"`.

12. **Add batch capture to admin dashboard** (`src/app/admin/page.tsx`)
    - **"Capture N authorized" button**: visible in the Attendees tab when at least one attendee has `remainderStatus === "authorized"`.
      - Shows count: "Capture N authorized remainders"
      - On click: confirm dialog ("This will charge all N authorized cards. Continue?") → POST to `/api/admin/remainder-capture-all`.
      - Show progress/results: "Captured X of Y. Z failed." with error details for failures.
    - This is the **primary Day 1 workflow**: admin clicks one button to charge all pre-authorized cards after the event.

13. **Consider additional ops actions (stretch/future)**:
    - "Refund Remainder" — uses `stripe.refunds.create({ payment_intent: remainderPaymentIntentId })` via a new admin endpoint. Out of scope for Phase 8 MVP; document as future work.
    - Automated cron-based capture (e.g., Vercel Cron or similar) — out of scope; the batch button is sufficient for 50 attendees.

### Part 7: Tests + Docs
14. **Update/add tests**
    - In `z2a/admin.spec.ts`:
      - Test that "Collect Remainder" button is visible for paid-deposit attendees (remainderStatus: "none").
      - Test that "Cancel Authorization" button is visible for authorized attendees (remainderStatus: "authorized").
      - Test that "Capture All Authorized Remainders" button is visible on admin dashboard when authorized attendees exist.
      - Test that buttons trigger API calls (mock or intercept the routes).
      - **Note**: Full Stripe Checkout flow is NOT testable in E2E without real Stripe sessions. Test button presence and API calls only.
    - Verify all existing tests still pass: `npm run test:e2e`.
15. **Add runbook** at `docs/planning/phase-8/stripe-remainder-setup.md`:
    - Stripe Dashboard setup steps (product, price, coupon, promo codes)
    - Env var checklist
    - Operational flow:
      1. Attendees register online and pay $100 deposit.
      2. Before/during check-in (Day 1), admin opens each attendee's detail → clicks "Collect Remainder."
      3. Admin shares/shows Checkout URL to attendee (or sends via email/message).
      4. Attendee completes Stripe Checkout (can enter promo code). Card is **pre-authorized** (hold placed, not charged).
      5. Webhook fires `checkout.session.completed` → attendee `remainderStatus` = `"authorized"`.
      6. **After Day 1**: Admin clicks **"Capture All Authorized Remainders"** on the admin dashboard → all pre-authorized cards are charged in one batch.
      7. If an attendee doesn't attend / needs cancellation before capture, admin clicks "Cancel Authorization" on that attendee → hold is released.
    - **Authorization window warning**: Stripe authorizations expire after ~7 days. Batch capture must happen within this window.
16. **Smoke test**
    - `npm run lint && npm run typecheck && npm run build`
    - `npm run test:e2e`

## Validation (RED TEAM)
- `STRIPE_REMAINDER_PRICE_ID` is in `env.ts` schema and `.env.local`.
- Per-attendee checkout endpoint at `/api/admin/attendees/[id]/remainder-checkout/` responds with 200 + `checkoutUrl` for valid paid attendees.
- Per-attendee checkout endpoint returns 400/404 for invalid states (no attendee, deposit not paid, remainder already authorized/captured).
- Webhook correctly distinguishes deposit vs remainder sessions via `metadata.payment_type`.
- Webhook updates `remainderStatus` to `"authorized"` (not "captured") and sets `remainderPaymentIntentId` + `remainderAuthorizedAt`.
- Batch capture endpoint at `/api/admin/remainder-capture-all/` captures all authorized remainders and returns counts.
- Individual capture endpoint at `/api/admin/attendees/[id]/remainder-capture/` works as single-attendee override.
- Cancel endpoint calls `stripe.paymentIntents.cancel()` and updates status to `"canceled"`.
- Duplicate webhook deliveries for the same event are handled idempotently (P2002 guard).
- Attendee detail shows "Collect remainder (Stripe)" when `remainderStatus === "none"`, "Cancel authorization" when `"authorized"`.
- Attendees tab shows "Capture N authorized" button when authorized attendees exist.
- `npm run lint`, `npm run typecheck`, `npm run build` pass.
- `npm run test:e2e:prod` requires Playwright browsers (`npx playwright install`) and is blocked in this sandbox.

## Assumptions / Open Questions (RED TEAM)

- **RESOLVED: Authorize-then-capture required.** The plan now uses `payment_intent_data: { capture_method: "manual" }` on the Checkout Session. Stripe fires `checkout.session.completed` after auth; admin manually captures later.

- **Assumption**: `allow_promotion_codes: true` is compatible with `capture_method: "manual"` in Stripe Checkout Sessions. Confidence ~85%.
  - Why it matters: If Stripe doesn't support this combination, we'd need to build a custom PaymentIntents flow with Elements instead of using Checkout. Significantly more work.
  - Mitigation: Test in Stripe test mode immediately in Part 3 implementation. If incompatible, escalate to user — may need to drop promo codes from the auth flow and apply discounts manually.

- **Assumption**: The `remainderCheckoutSessionId` is NOT needed on the Attendee model (see root plan Q4). Confidence ~65%.
  - Mitigation: If debugging requires session → attendee lookup, add the field in a follow-up migration.

- **Assumption**: Only one promo code can be applied per checkout (Stripe default). Confidence ~95%.

- **Assumption**: Authorization window of ~7 days is sufficient for the Day 1 → capture workflow. Confidence ~90%.
  - Mitigation: If the capture might happen more than 7 days after auth, request extended authorization via Stripe dashboard settings or use a different payment flow.

## Output
- Discount codes work via Stripe promotion codes without a second SKU.
- Ops can collect remainder at check-in with Stripe Checkout and promo code entry; webhook/admin reflect statuses safely.

## Handoff
After implementation:
- Run QA gates locally with Playwright browsers installed (`npx playwright install && npm run test:e2e:prod`).
- Update the root plan with a short Phase Summary + evidence (commands run, key links, test results).

## Progress This Turn (Terminus Maximus)
- Work done:
  - Added Stripe remainder collection via admin endpoints using Checkout + `allow_promotion_codes` + manual capture.
  - Extended webhook to mark remainder as `authorized` on `checkout.session.completed` when `metadata.payment_type="remainder"`.
  - Added admin UI actions for per-attendee collect/capture/cancel plus a batch capture banner in the Attendees table.
  - Added public remainder success/canceled pages and an ops runbook doc.
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
  - `npm run test:e2e:prod` — fail (Playwright browsers not installed in this sandbox; requires `npx playwright install`)
- Blockers:
  - Playwright browsers are missing in this environment (cannot download here).
- Next concrete steps:
  - Verify the flow in Stripe test mode (authorize via Checkout, then capture via admin).
  - Run E2E locally after installing Playwright browsers.
