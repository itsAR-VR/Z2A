# Phase 15e — Regression Safeguards + Local/Live Playwright Verification

## Focus
Lock in the motion overhaul with deterministic test coverage and live-domain validation across desktop/mobile/reduced-motion contexts.

## Inputs
- `docs/planning/phase-15/plan.md`
- Implementation outputs from `15b`, `15c`, and `15d`
- Existing Playwright specs in `z2a/*`

## Work
1. Update/add Playwright assertions to match new nav/menu interaction model and hero expectations where necessary.
2. Run local deterministic suite for changed pages/specs:
   - Home
   - Businesses
   - shared nav/menu behavior
   - reduced-motion expectations
3. Execute Playwright MCP live verification on `https://zerotoagent.com` after deployment:
   - desktop: `/`, `/businesses`
   - mobile: `/`, `/businesses`
   - menu open/close/focus and route switching
   - hover/highlight/scroll-spy sanity checks
4. Validate businesses page still contains custom pricing workflow and no public rate card text.
5. Capture and store screenshot evidence and summarize pass/fail with actionable deltas.

## Output
- Updated Playwright specs:
  - `z2a/home.spec.ts` (hero text + menu link locator tolerance for dual-label names),
  - `z2a/businesses.spec.ts` (custom-pricing workflow assertions; no public dollar pricing).
- Local deterministic suite passed:
  - `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e -- z2a/home.spec.ts z2a/businesses.spec.ts z2a/landing.spec.ts z2a/reduced-motion.spec.ts` (20/20).
- Live Playwright MCP verification executed on `https://zerotoagent.com` for desktop/mobile menu/focus/anchor checks.
- Blocker captured:
  - production `/businesses` still serves previous pricing-tier content, so live parity for custom-pricing/motion changes is pending deployment.
- Review artifact created at `docs/planning/phase-15/review.md`.

## Handoff
Phase 15 is implementation-complete locally and deployment-gated for final live parity confirmation. Re-run live MCP checks after deployment and close if parity is confirmed.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Aligned tests with updated Home/Businesses UX and pricing posture.
  - Executed lint/build/local e2e validation and fixed one failing spec.
  - Ran live MCP checks on desktop/mobile and documented deploy lag.
- Commands run:
  - Agentic impact check — out of scope (no AI drafting/prompt/message/webhook/cron reply files touched), NTTAN gate not required this turn.
  - `npm run lint` — pass.
  - `npm run build` — pass.
  - `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e -- z2a/home.spec.ts z2a/businesses.spec.ts z2a/landing.spec.ts z2a/reduced-motion.spec.ts` — first run fail (`home` exact names), second run pass (20/20).
  - Playwright MCP (`https://zerotoagent.com`) — functional menu/focus checks pass; content parity blocked by production deploy lag.
- Blockers:
  - Live domain still reflects pre-change `/businesses` content; cannot mark live parity criterion complete until deployment updates.
- Next concrete steps:
  - After deployment, rerun MCP checks for `/` + `/businesses` desktop/mobile and verify custom-pricing-only language on live.
