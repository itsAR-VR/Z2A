# Phase 3d — Apply + Payment Funnel Spec (Stripe + DB + Admin)

## Focus
Define the conversion funnel and backend contracts: apply flow, Stripe checkout, referral codes, and admin tooling.

## Inputs
- Phase 3a/3b offer + pricing decisions.
- Referral program details in `Plans/plan.md`.

## Locked Decisions (from RED TEAM)

| Item | Value |
|------|-------|
| Funnel model | **Apply → $500 deposit → remainder at check-in** |
| Currency | **USD** |
| Refund policy | **Full refund if unsatisfied, no questions asked** |

### Pricing Structure
- List price: **$1,500 USD**
- Network code price: **$1,000 USD** ($500 off)
- Deposit: **$500 USD** (due at checkout)
- Remainder (list): **$1,000 USD** (due at check-in)
- Remainder (network): **$500 USD** (due at check-in)

### Refund Terms
- Window: until end of Day 2
- Process: attendee requests via email; refund issued within 7 days
- No questions asked — maximum trust signal

## Work
1. **Funnel decision** — **LOCKED: Apply → $500 deposit → remainder at check-in**
   - Deposit collected via Stripe at checkout
   - Remainder collected at venue check-in (manual or second Stripe link)
2. **Stripe pricing + codes**
   - Product: "Zero-to-Agent Toronto Pilot"
   - Price (deposit): $500 USD
   - Promo code for network discount applies to remainder, not deposit
3. **Referral logic**
   - Unique codes per referrer; qualified referrals based on deposit paid AND no refund requested
   - Payout timing: 7 days post-event
4. **Database schema**
   - Attendee info + deposit status + remainder status + code used + attribution fields.
5. **Webhooks**
   - Idempotent `checkout.session.completed` for deposit
   - `charge.refunded` handler to update status and referral eligibility
6. **Admin**
   - Basic auth; list seats; track deposit/remainder status; export CSV; referral stats.

## Output
- End-to-end funnel spec with field list and webhook sequence.

## Handoff
Pass to Phase 3e (ops assets) and Phase 3f (QA/deploy).

