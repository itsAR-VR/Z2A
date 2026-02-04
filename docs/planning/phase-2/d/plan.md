# Phase 2d — Checkout + Referrals + Data Model (Stripe + DB + Admin)

## Focus
Define the conversion funnel and backend contracts: apply flow, Stripe checkout, referral codes, and admin tooling.

## Inputs
- Phase 2a offer decisions (persona, pricing, currency stance).
- Phase 2b pricing + apply section spec.
- Operational constraints in `Plans/plan.md` (manual simplicity; deposit/payment gating).

## Work
1. Decide the v1 funnel:
   - Recommended: **Reserve seat → Stripe Checkout (pay in full)** for pilot simplicity
   - Alternative: deposit now, remainder later (only if refund policy is defined)
2. Stripe product/pricing model:
   - one base price (list)
   - “network code” discount ($500 off) via Promotion Code or custom logic
   - currency must be explicit before pay
3. Referral code system (manual-friendly, warm outreach):
   - generate unique codes (one per referrer)
   - referred attendee uses code to get the network price
   - track “qualified referrals” based on paid seats and refund status
4. Database schema (Supabase Postgres):
   - `applications` (or `orders`) table with: attendee info, code used, stripe session id, payment status, timestamps
   - store UTM/referrer fields for attribution
5. Webhooks + idempotency:
   - handle `checkout.session.completed` (and refund/cancel events if enabled)
6. Admin v1:
   - list paid seats, export CSV, view referral stats per code

## Output
- A complete spec for Stripe + DB + webhook + admin, with exact field list and event handling notes.

## Handoff
Hand off to Phase 2e for QA scenarios and deployment checklist.

