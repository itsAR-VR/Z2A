import Stripe from "stripe";

import { env } from "@/lib/env";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  // Stripe will default to the account's API version if not set here.
  typescript: true,
});

