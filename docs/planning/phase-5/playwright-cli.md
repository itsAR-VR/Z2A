# Playwright CLI Smoke (Phase 5f)

## What This Covers

Smoke E2E checks (no Stripe dependency) in `z2a/*.spec.ts`:
- Landing renders and anchored sections exist
- Sticky “Admissions open” apply bar appears after hero and hides near final CTA
- Speakers: modal opens, award plaque is shown for Abdur Sajid, ESC closes and restores focus
- Apply: client-side validation errors; mocked `/api/apply` redirects to `/apply/success`
- Admin: `/admin` requires basic auth (401)
- Reduced-motion: marquee does not animate

## Base URL

The test base URL is resolved in `playwright.config.ts`:
- `PLAYWRIGHT_BASE_URL`, else
- `NEXT_PUBLIC_APP_URL`, else
- `https://zerotoagent.com`

## Run

One-time setup (installs Playwright browsers):

```bash
npx playwright install
```

```bash
npm run test:e2e
```

List tests:

```bash
npx playwright test --list
```

## Run Against Local Dev Server

If you want Playwright to start the dev server automatically:

```bash
PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e
```

Notes:
- When `PLAYWRIGHT_WEB_SERVER=1`, `playwright.config.ts` enforces a `localhost` base URL so you don’t accidentally run the suite against production.
- The webServer command uses `npm run dev:webpack` for determinism in nested workspaces.

If you start the server yourself, you can omit `PLAYWRIGHT_WEB_SERVER`:

```bash
npm run dev:webpack
PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e
```

## Debugging

Run a single test with UI:

```bash
npx playwright test z2a/speakers.spec.ts --ui
```

If a test retries and captures a trace, open it:

```bash
npx playwright show-trace test-results/**/trace.zip
```
