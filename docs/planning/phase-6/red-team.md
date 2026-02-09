# Phase 6 — RED TEAM Findings (Living Doc)

This is a running list of the highest-risk gaps to close before launch.

## Funnel / Stripe
- F2: `checkout.session.completed` with missing `metadata.attendee_id` must not silently no-op. We need error logging so ops can detect corrupted checkouts.
- F6: `/apply/success` is a static confirmation page and does not verify `session_id` against Stripe. This is acceptable for v1 if webhook + admin are the source of truth.
- F11: Seat cap enforcement in `/api/apply` is check-then-act (optimistic). Acceptable for a 50-seat pilot; revisit if contention appears.

## Testing / QA
- F7: Define a production-safe Playwright subset (read-only assertions only). Keep mocking tests local-only.

## Nav / Menu
- F1: Nav/menu already exists; Phase 6c should refine, not rebuild.
- F3: Close any ARIA wiring gaps (`aria-controls` ↔ overlay `id`).
- F4: If we want close animations, the overlay likely needs to become always-mounted (CSS visibility vs conditional render).
- F9: Body scroll lock can cause layout shift on desktop; fix with scrollbar compensation or stable gutter.

## Visual / Motion
- F8: Add a regression guard so hero elements can’t get stuck hidden (GSAP/reveal coordination).
- F10: Capture before/after snapshots to validate we’re actually getting cleaner.

