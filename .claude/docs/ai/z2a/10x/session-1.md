# 10x Analysis: Z2A Admin + Conversion + Ops
Session 1 | Date: 2026-02-11

## Current Value
Z2A is a premium 2-day AI Build Weekend in Toronto (Feb 28 - Mar 1, 2026). 50-seat cap, $100 deposit + $900-$1,400 remainder via Stripe manual capture. Shipped: landing page (10 sections, motion-enhanced), apply form, Stripe 2-step payment, admin dashboard (attendee table, referral codes, CSV export), email confirmation via Resend.

## The Question
What would make this 10x more valuable — for the admin running the event, attendees preparing for it, and visitors deciding to apply?

---

## Massive Opportunities

### 1. Multi-Cohort Engine
**What**: Add a `Cohort` model (city, dates, seat cap, pricing config). All attendees belong to a cohort. Admin dashboard scoped by cohort. Landing page dynamically renders cohort details.
**Why 10x**: Transforms a one-time event into a repeatable business. Opens recurring revenue, multi-city expansion, alumni network effects.
**Unlocks**: Toronto Tech Week (May 2026), NYC/SF/London expansions, cohort-over-cohort comparison.
**Effort**: Very High
**Risk**: Over-engineering before validating the pilot.
**Score**: 🤔 — Validate pilot first, build after.

### 2. Attendee Portal / Dashboard
**What**: Magic-link authenticated page where attendees check payment status, access prework materials, see venue details, connect with pod members.
**Why 10x**: Turns a one-time transaction into an ongoing relationship. Reduces "did my payment work?" anxiety emails.
**Unlocks**: Self-service prework tracking, pod introductions, post-event resource hub.
**Effort**: High
**Risk**: Building auth infrastructure for 50 users may be overkill.
**Score**: 👍 — Build post-pilot when scaling.

### 3. Pod Matching System
**What**: Smart matching of attendees into pods of 3-4 based on use case, industry, skill level. Admin UI for drag-and-drop pod formation.
**Why 10x**: Pod quality determines the entire event experience. Bad matches = frustrated attendees.
**Unlocks**: Better outcomes, stronger networking, testimonials.
**Effort**: High
**Risk**: 50 attendees can be matched manually in a spreadsheet.
**Score**: 🤔 — Manual for pilot, automate for scale.

---

## Medium Opportunities

### 4. Admin Stats Summary Bar
**What**: Row of 6 stat cards at top of admin: Total Registrants, Deposits Paid, Seats Remaining, Authorized Remainders, Captured Remainders, Total Revenue.
**Why 10x**: Admin flies blind today. Can't answer "how many seats are left?" without counting rows. Foundation for all operational decisions.
**Impact**: Every admin session starts with clarity instead of manual counting.
**Effort**: Medium (~2h)
**Score**: 🔥 Must do

### 5. Admin Attendee Filters
**What**: Dropdown filters for deposit status, remainder status, seat status, referral code. Combine with search.
**Why 10x**: Can't answer "who hasn't paid?" or "show me all no-shows." On event day this is the difference between smooth ops and chaos.
**Impact**: 10x faster admin workflows for every operational task.
**Effort**: Medium (~2h)
**Score**: 🔥 Must do

### 6. Waitlist + Sold-Out Gate
**What**: When 50 seats fill, apply form shows waitlist. Admin can convert waitlist entries when seats open.
**Why 10x**: Every visitor past seat 50 currently hits a dead end and is lost forever. Waitlist captures demand for cancellations and future cohorts.
**Impact**: Captures 100% of overflow demand instead of 0%.
**Effort**: Medium (~3h)
**Score**: 🔥 Must do

### 7. Email Sequences (Prework / Venue / Day 1 Prep)
**What**: Three admin-triggered batch emails: prework checklist (Feb 21), venue details (Feb 25), Day 1 prep (Feb 27).
**Why 10x**: Attendees get ONE email today then silence. Prework completion directly determines Day 1 productivity. Three emails = prepared attendees vs. chaos.
**Impact**: Dramatically higher attendee preparedness and lower no-show rate.
**Effort**: Medium (~3h)
**Score**: 🔥 Must do

### 8. Automated Email Triggers
**What**: Cron-based email sends instead of manual admin triggers. Deposit → auto prework reminder after 24h. Day 1 check-in → auto Day 2 prep.
**Why 10x**: Removes admin labor, ensures no email is forgotten, scales to future cohorts.
**Impact**: Set-and-forget attendee communication.
**Effort**: Medium
**Score**: 👍 — Build post-pilot.

### 9. Mobile Check-in UI
**What**: Dedicated `/admin/checkin` optimized for phone — large tap targets, search, one-tap Day 1 marking.
**Why 10x**: Current check-in requires opening detail modal and changing a dropdown. Fine for desktop, painful for 50 people arriving in 15 minutes on a phone.
**Impact**: 5x faster check-in flow on event morning.
**Effort**: Medium
**Score**: 👍 — Nice for pilot but not blocking.

---

## Small Gems

### 10. Live Seat Counter on Landing Page
**What**: Replace static "50 seats" with "X of 50 seats remaining" in Hero + StickyApplyBar. Updates on page load.
**Why powerful**: Scarcity drives conversion. Dynamic count compounds as seats fill. Every premium event site does this.
**Effort**: Low (~1h, depends on seats API)
**Score**: 🔥 Must do

### 11. Referral Code Performance View
**What**: Each code row shows registration count. Summary: "X total via referral codes."
**Why powerful**: Referral codes are a black box today. 30 minutes of work makes the entire referral system actionable.
**Effort**: Low (~1h)
**Score**: 🔥 Must do

### 12. Click-to-Filter from Referral Codes
**What**: Clicking a referral code's registration count switches to Attendees tab pre-filtered by that code.
**Why powerful**: Instant drill-down from aggregate to individual. Connects two admin views.
**Effort**: Low (~30min)
**Score**: 👍 Strong

---

## Recommended Priority

### Do Now (Quick wins — before Feb 28)
1. **Admin Stats Summary Bar** — Instant operational clarity. Every admin session starts informed.
2. **Admin Attendee Filters** — 10x faster admin workflows. Essential for event day ops.
3. **Waitlist + Sold-Out Gate** — Captures 100% of overflow demand. Public seats API enables seat counter.
4. **Live Seat Counter** — Scarcity-driven conversion. Builds on seats API.
5. **Email Sequences** — Prework + venue + Day 1 prep. Directly reduces no-shows and unpreparedness.
6. **Referral Code Performance** — Makes referral system visible and actionable.

### Do Next (Post-pilot, pre-scale)
1. **Mobile Check-in UI** — Faster event-day operations on phone.
2. **Attendee Portal** — Self-service reduces support, builds trust.
3. **Automated Email Triggers** — Set-and-forget communication.
4. **Post-Event Follow-Up Email** — Survey, resources, community invite.

### Explore (Strategic bets for scaling)
1. **Multi-Cohort Architecture** — Prerequisite for repeat events and multi-city.
2. **Pod Matching System** — Automated group formation by use case/skill.
3. **Analytics Dashboard** — Funnel metrics, conversion rates by referral code.
4. **CRM Integration** — Alumni nurture, repeat cohort marketing.

---

## Questions

### Answered
- **Q**: How are remainder payments tied to the same user? **A**: Via `attendee_id` in Stripe session metadata. Webhook handler looks up attendee by ID and updates remainder fields directly. Guard prevents double-authorization.
- **Q**: Is there an admin dashboard? **A**: Yes, full tabbed UI at `/admin` with attendee management, referral codes, CSV export, remainder actions. Protected by Basic Auth.

### Blockers
- **Q**: What is the venue address? (needed for venue details email template)
- **Q**: Are there any specific prework instructions beyond Node/Python/Git/VS Code?

## Next Steps
- [ ] Implement 6 "Do Now" features (see implementation plan)
- [ ] Draft email copy for prework/venue/Day 1 templates
- [ ] Confirm venue details for email template
