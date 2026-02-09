# Stripe Remainder Setup (Promo Codes + Manual Capture)

## Goal
Collect the workshop remainder at in-person check-in via Stripe Checkout, allowing attendees to enter a promo code at payment time, while using **manual capture** so we can capture charges after Day 1.

This removes the need for two discounted SKUs.

## Stripe Dashboard Setup (One-Time)
1. Create a Product
   - Name: `Zero-to-Agent — Remainder`
2. Create a Price for that Product
   - Type: one-time
   - Amount: `$1,400.00 USD`
   - Copy the Price ID (looks like `price_...`)
3. Create a Coupon (discount definition)
   - Example: `$500 off`
   - Type: `amount_off = 500.00 USD`
   - Restrict applies-to:
     - Restrict to the remainder product/price (recommended) so the deposit is unaffected
4. Create Promotion Codes (the codes attendees enter)
   - Attach to the coupon above
   - Set code(s) (example: `NETWORK500`)
   - Optional: set redemption limits / expiration / first-time-only rules as needed

## App Environment Variables
Set:
- `STRIPE_REMAINDER_PRICE_ID` to the remainder price ID from Stripe

Notes:
- In code, this env var is optional to avoid blocking builds, but the remainder checkout endpoint will return a `500` if it isn’t configured.

## Ops Runbook (Event Flow)
### At check-in (Day 1)
1. Open `/admin` (Basic Auth)
2. Find the attendee, open their details
3. Click `Collect remainder (Stripe)`
4. Have the attendee complete Stripe Checkout
   - They can enter a promo code in Stripe Checkout (if they have one)
5. After checkout completes
   - Refresh the attendee detail dialog
   - Confirm remainder status shows `authorized`

### After Day 1 (capture)
1. In the Attendees tab, look for the banner:
   - `N remainders authorized`
2. Click `Capture N authorized`
3. Review results
   - Any failures are listed with an error message and the attendee ID

### No-shows (release the hold)
1. Open attendee detail
2. If remainder is `authorized`, click `Cancel authorization`

## Important Constraints
- Authorizations typically expire after ~7 days. Capture should happen the same day (or shortly after Day 1).
- Discounts are applied in Stripe (promo code entry). The app does not validate promo codes.

