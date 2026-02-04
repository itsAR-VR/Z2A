# Phase 1d — Apply Funnel + Admin Dashboard (Supabase + API)

## Focus
Build the conversion funnel: a multi-step Apply form, persistent storage in Supabase, and a basic admin review dashboard.

## Inputs
- Phase 1b layout and section placement for `#apply`.
- Phase 1c motion patterns for form transitions and success states.
- Storage decision: Supabase Postgres.

## Work
1. Define Supabase schema (applications table) and required fields for the adult persona.
2. Define security posture:
   - RLS enabled
   - allow anon inserts
   - admin reads via server-only Supabase service role key
3. Implement Next.js API contract:
   - `POST /api/applications` validates input and inserts rows
4. Implement Apply UI:
   - 2–3 step form, zod validation, progress indicator, optimistic UX
5. Implement `/admin`:
   - simple password gate
   - list view + detail view + CSV export
6. Tracking:
   - capture UTMs and referrer
   - emit a submission event for analytics (vendor TBD)

## Output
- Working Apply funnel storing submissions in Supabase.
- Working admin dashboard for reviewing and exporting applications.

## Handoff
Hand off end-to-end funnel to Phase 1e for QA, performance checks, and deployment readiness.

