# Phase 6 — Stripe Verification Runbook (Local + Production)

This is the practical runbook version of `docs/planning/phase-6/complete-flow-checklist.md`.

## Local (Recommended For Development)

### 1) Start the app
```bash
APP_URL=http://localhost:3000 npm run dev:webpack
```

> Note: `.env.local` currently sets `APP_URL=https://zerotoagent.com`. For local end-to-end
> verification (including Stripe success/cancel redirects), override it to `http://localhost:3000`.

### 2) Forward Stripe events to your local webhook
In another terminal:
```bash
stripe listen \\
  --events checkout.session.completed,charge.refunded \\
  --forward-to localhost:3000/api/stripe/webhook
```

> If your Stripe CLI is logged into a different Stripe account than the one your app is using,
> run `stripe listen` with the same API key as `STRIPE_SECRET_KEY` in `.env.local`:
> ```bash
> set -a && source .env.local && set +a
> stripe listen \\
>   --api-key "$STRIPE_SECRET_KEY" \\
>   --events checkout.session.completed,charge.refunded \\
>   --forward-to localhost:3000/api/stripe/webhook
> ```

Stripe prints:
```text
Ready! Your webhook signing secret is 'whsec_...'
```

Set that as `STRIPE_WEBHOOK_SECRET` for your local server and restart dev:
```bash
STRIPE_WEBHOOK_SECRET=whsec_... npm run dev:webpack
```

### 3) Create a real Checkout session via our `/api/apply`
```bash
node scripts/create-test-checkout-url.mjs
```

This prints a Stripe Checkout URL. Open it and complete the test payment.

### 4) Verify outcomes
- In the `stripe listen` terminal:
  - Expect `[200] POST http://localhost:3000/api/stripe/webhook` for `checkout.session.completed`
- In `http://localhost:3000/admin`:
  - Find the attendee by email
  - Confirm `depositStatus` is `paid`

### 5) Optional: refund verification (real mapping)
The CLI fixture `stripe trigger charge.refunded` may not map to your attendee.

For a real mapping:
1. Find the payment in Stripe Dashboard (test mode)
2. Issue a refund
3. Confirm webhook received and the attendee becomes `depositStatus: refunded`

## Production (After Deploy)

### Production smoke (safe subset)
```bash
PLAYWRIGHT_BASE_URL=https://www.zerotoagent.com npm run test:e2e:prod
```

> Note: `https://zerotoagent.com` currently redirects `307` to `https://www.zerotoagent.com` for
> `/api/*` routes. For requests that rely on `Authorization` headers (admin basic auth), use the
> `www` domain to avoid headers being dropped on cross-host redirects.

### Stripe test checkout
Run a real test checkout against production and confirm:
- success redirect works (`/apply/success`)
- webhook returns `2xx`
- admin reflects `depositStatus: paid`

#### Optional: automated production checkout (creates a real Stripe *test* payment)
```bash
Z2A_STRIPE_PROD_E2E=1 PLAYWRIGHT_BASE_URL=https://www.zerotoagent.com \
  npx playwright test z2a/stripe-production.spec.ts --project=chromium --reporter=list
```

### Stripe webhook endpoint gotcha (production)
If Stripe events show `pending_webhooks: 1`, confirm the webhook endpoint URL is the canonical
`www` domain (avoid redirects):

```bash
stripe webhook_endpoints list --limit 10
```

Expected:
- URL: `https://www.zerotoagent.com/api/stripe/webhook`
