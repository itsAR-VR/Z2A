# Stripe CLI Webhook Smoke (Phase 5f)

This repo’s webhook endpoint is:
- `POST /api/stripe/webhook` (`src/app/api/stripe/webhook/route.ts`)

It handles:
- `checkout.session.completed`
- `charge.refunded`

## 1. Start The App

Run the dev server (or any server that serves `/api/stripe/webhook`):

```bash
npm run dev:webpack
```

## 2. Listen And Forward Events

In a second terminal:

```bash
stripe listen \
  --events checkout.session.completed,charge.refunded \
  --forward-to localhost:3000/api/stripe/webhook
```

Stripe prints a webhook signing secret like:

```text
Ready! Your webhook signing secret is 'whsec_...'
```

Set `STRIPE_WEBHOOK_SECRET` to that value for your local server (then restart the server):

```bash
export STRIPE_WEBHOOK_SECRET=whsec_...
```

Or inline for a one-off run:

```bash
STRIPE_WEBHOOK_SECRET=whsec_... npm run dev:webpack
```

## 3. Trigger Events

```bash
stripe trigger checkout.session.completed
stripe trigger charge.refunded
```

## Notes

- API version experimentation:
  - Add `--latest` or `--stripe-version <version>` to CLI commands if needed.
- Sandbox (this Codex environment) quirk:
  - If Stripe CLI can’t write to `~/.config/stripe`, run with an alternate config dir:
    ```bash
    XDG_CONFIG_HOME=$PWD/.config stripe listen --forward-to localhost:3000/api/stripe/webhook
    ```
