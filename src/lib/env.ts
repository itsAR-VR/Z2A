import { z } from "zod";

const envSchema = z.object({
  APP_URL: z.string().url(),
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  STRIPE_DEPOSIT_PRICE_ID: z.string().min(1),
  STRIPE_REMAINDER_PRICE_ID: z.string().min(1).optional(),
  // Promotion code ID for Early Bird (starts with "promo_").
  STRIPE_EARLY_BIRD_PROMOTION_CODE_ID: z.string().min(1).optional(),
  // Coupon ID for Early Bird (can be a custom string ID like "eb001").
  STRIPE_EARLY_BIRD_COUPON_ID: z.string().min(1).optional(),
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().min(1),
  ADMIN_BASIC_AUTH_USER: z.string().min(1),
  ADMIN_BASIC_AUTH_PASS: z.string().min(1),
  RESEND_API_KEY: z.string().min(1).optional(),
  RESEND_FROM_EMAIL: z.string().email().optional(),
  RESEND_REPLY_TO_EMAIL: z.string().email().optional(),
  CRON_SECRET: z.string().min(1).optional(),
});

const parsedEnv = envSchema.parse({
  APP_URL: process.env.APP_URL,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  STRIPE_DEPOSIT_PRICE_ID: process.env.STRIPE_DEPOSIT_PRICE_ID,
  STRIPE_REMAINDER_PRICE_ID: process.env.STRIPE_REMAINDER_PRICE_ID,
  STRIPE_EARLY_BIRD_PROMOTION_CODE_ID: process.env.STRIPE_EARLY_BIRD_PROMOTION_CODE_ID,
  STRIPE_EARLY_BIRD_COUPON_ID: process.env.STRIPE_EARLY_BIRD_COUPON_ID,
  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_URL: process.env.DIRECT_URL ?? process.env.DATABASE_URL,
  ADMIN_BASIC_AUTH_USER: process.env.ADMIN_BASIC_AUTH_USER,
  // Support both env var spellings (PASS preferred; PASSWORD accepted).
  ADMIN_BASIC_AUTH_PASS:
    process.env.ADMIN_BASIC_AUTH_PASS || process.env.ADMIN_BASIC_AUTH_PASSWORD,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
  RESEND_REPLY_TO_EMAIL: process.env.RESEND_REPLY_TO_EMAIL,
  CRON_SECRET: process.env.CRON_SECRET,
});

export const env = parsedEnv;
