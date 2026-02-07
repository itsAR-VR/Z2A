# Phase 5f — QA + Launch Readiness

## Focus
Validate that the website is correct, polished, and safe to deploy.

## Inputs
- `/Users/AR180/Desktop/Codespace/Z2A/docs/phase-3/qa-deploy-checklist.md`
- Phase 5 handoff doc: `/Users/AR180/Desktop/Codespace/Z2A/docs/planning/phase-5/handoff.md`

## Work
1. Engineering checks:
   - `npm run lint`
   - `npm run typecheck`
   - `npm run build`
2. Stripe:
   - Stripe CLI smoke for webhook events (checkout.session.completed, charge.refunded).
3. Playwright smoke (recommended minimum):
   - Landing loads; anchors exist.
   - Reduced motion renders correctly.
   - Apply form validation and submit behavior (mock/test env).
   - Admin auth gate + page loads.
4. Performance + accessibility:
   - No CLS on hero/speakers/pricing.
   - No scroll jank on desktop.
   - Keyboard navigability (nav/menu/accordion/admin forms).

## Output
- A checklist with pass/fail evidence and a go/no-go decision for deploy.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Ran engineering quality gates and resolved all lint warnings.
  - Implemented clickable speaker profiles with an accessible modal (ESC close, focus trap, focus restore, body scroll lock).
  - Fixed referral code toggle semantics so `reason` is required only when deactivating (server + admin UI + docs).
  - Updated Phase 5 handoff doc speaker links and corrected design token guidance to match current repo reality.
  - Added a TKS-inspired sticky “Admissions open” apply bar to reinforce urgency without clutter.
  - Fixed the How-it-Works timeline “vertical line on empty section” artifact by hiding the line until the timeline container is in view.
  - Added a `cold2close.ai` logo placeholder asset and displayed it in Abdur Sajid’s speaker modal.
  - Added explicit webpack fallback scripts (`npm run dev:webpack`, `npm run build:webpack`) for environments where Turbopack is unstable.
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass (webpack)
  - `npm run dev` — fail (`listen EPERM: operation not permitted 0.0.0.0:3000` in this environment)
- Blockers:
  - Local Playwright smoke against `localhost` is blocked because the dev server cannot bind to a port in this environment (`EPERM`).
  - Playwright MCP browsing is blocked by an existing Chrome profile lock (“Opening in existing browser session”).
  - Stripe CLI smoke is blocked in this environment because:
    - the dev server cannot bind a port (`EPERM`)
    - outbound DNS/network is blocked (`ENOTFOUND`)
    - Stripe CLI cannot write to `~/.config/stripe` in this sandbox (workaround: `XDG_CONFIG_HOME=$PWD/.config`)
- Next concrete steps:
  - Run Playwright smoke via CLI (or CI) using `docs/planning/phase-5/playwright-cli.md`.
  - Run Stripe webhook smoke via Stripe CLI using `docs/planning/phase-5/stripe-cli.md`.
  - Speaker headshots are now in place at `public/speakers/aadil-headshot.jpg` and `public/speakers/abdur-headshot.jpg`.

## Handoff
- Evidence and go/no-go summary is captured in `docs/planning/phase-5/review.md`.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Updated Phase 5 planning/review docs to reflect current repo reality (Turbopack default scripts, headshots added, and Playwright prerequisites).
  - Moved raw headshot exports out of `public/` into `assets/headshots-source/` and documented the source/processed paths.
  - Hardened the Playwright sticky bar assertion to avoid false positives (`visible` vs `invisible` substring match).
  - Set `turbopack.root` in `next.config.ts` to prevent Next.js from inferring the wrong workspace root when multiple lockfiles exist outside the repo.
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
  - `npm run test:e2e` — fail (Playwright browsers not installed in this environment; DNS for `zerotoagent.com` also blocked here)
- Blockers:
  - Playwright CLI smoke cannot run in this sandbox without downloading browsers (`npx playwright install`) and with DNS/network restrictions.
  - Sub-agent spawning is blocked due to agent thread limit in this session.
- Next concrete steps:
  - Run `npx playwright install` + `npm run test:e2e` on a normal local machine or CI.
  - If you want fresh competitive snapshots, run `node scripts/snapshot-sites.mjs --out <dir> <url...>` from a non-restricted environment.

## Progress This Turn (Terminus Maximus)
- Work done:
  - Fixed Playwright local webServer smoke to be deterministic:
    - enforce `localhost` base URL when `PLAYWRIGHT_WEB_SERVER=1` (prevents accidentally running against production)
    - use `npm run dev:webpack` as the Playwright webServer command (avoids nested-workspace resolution issues)
  - De-flaked the reduced-motion marquee check by adding a stable `data-testid` on the marquee element.
  - Ran QA gates and recorded updated evidence in `docs/planning/phase-5/review.md`.
  - Ran Stripe CLI webhook smoke (forward + triggers) and confirmed 200 responses for:
    - `checkout.session.completed`
    - `charge.refunded`
- Commands run:
  - `npm run lint` — pass
  - `npm run typecheck` — pass
  - `npm run build` — pass
  - `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e` — pass (14/14)
  - `PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e -- --repeat-each=3` — pass (42/42)
  - `stripe listen --events checkout.session.completed,charge.refunded --forward-to http://localhost:3000/api/stripe/webhook` — pass (forwarded events)
  - `stripe trigger checkout.session.completed` — pass (webhook 200)
  - `stripe trigger charge.refunded` — pass (webhook 200)
- Blockers:
  - Sub-agent spawning is blocked due to agent thread limit in this session.
- Next concrete steps:
  - Optional: run the same Playwright smoke against `https://zerotoagent.com` (without `PLAYWRIGHT_WEB_SERVER`) after confirming prod is deployed with the current commit.
  - If prod smoke fails, deploy the current UI (prod is currently running older hero copy as of 2026-02-07; see `docs/planning/phase-5/review.md`).
