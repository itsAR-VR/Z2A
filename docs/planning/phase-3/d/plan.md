# Phase 3d — Apply + Payment Funnel Spec (Stripe + DB + Admin)

## Focus
Define the conversion funnel and backend contracts: apply flow, Stripe checkout, referral codes, and admin tooling.

## Inputs
- `docs/phase-3/offer-brief.md` + `docs/phase-3/ia-copy-spec.md` (offer + pricing decisions).
- Referral program details in `Plans/plan.md`.

## Locked Decisions (from RED TEAM)

| Item | Value |
|------|-------|
| Funnel model | **Apply → $500 deposit → remainder at check-in** |
| Currency | **USD** |
| Refund policy | **Full refund if unsatisfied, no questions asked** |
| Backend | **Supabase Postgres + Prisma ORM** |
| Admin gating | **Basic auth (server-only DB access)** |
| Referral payouts | **None for pilot (discount only)** |
| Remainder capture | **Authorize at check-in, capture after event for Day 1 attendees** |

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
- `docs/phase-3/funnel-spec.md` end-to-end funnel spec with field list and webhook sequence.

## Handoff
Pass `docs/phase-3/funnel-spec.md` to Phase 3e (ops assets) and Phase 3f (QA/deploy).

## Validation (RED TEAM)
- Field list includes deposit + remainder status, refund status, referral attribution, and seat status.
- Webhook sequence includes idempotency keys and refund handling.
- Admin access is explicitly gated (basic auth or allowlist).

## Assumptions / Open Questions (RED TEAM)
None currently.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Drafted `docs/phase-3/funnel-spec.md` with apply flow, Stripe deposit + manual capture remainder, Prisma data model, and admin surfaces.
- Commands run:
  - `cat <<'EOF' > docs/phase-3/funnel-spec.md` — pass
- Blockers:
  - None.
- Next concrete steps:
  - Begin Phase 3e to produce ops + GTM asset pack.
