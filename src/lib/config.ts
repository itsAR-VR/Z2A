export const SEAT_CAP = 50;
export const MS_PER_DAY = 24 * 60 * 60 * 1000;

export const CURRENCY = "usd" as const;

// Amounts in USD cents.
export const DEPOSIT_AMOUNT_CENTS = 100 * 100;
export const LIST_REMAINDER_AMOUNT_CENTS = 1400 * 100;

// Early Bird (Toronto time). Eligibility is locked in when the deposit is paid.
export const EARLY_BIRD_END_AT_ISO = "2026-02-21T23:59:00-05:00";
export const WORKSHOP_START_AT_ISO = "2026-02-28T09:00:00-05:00";

// NOTE: This must match the Early Bird discount configured in Stripe.
// If you change the Stripe amount (coupon/promotion code), update this constant to match.
export const EARLY_BIRD_DISCOUNT_AMOUNT_CENTS = 500 * 100;
export const EARLY_BIRD_REMAINDER_AMOUNT_CENTS =
  LIST_REMAINDER_AMOUNT_CENTS - EARLY_BIRD_DISCOUNT_AMOUNT_CENTS;

export const LIST_TOTAL_AMOUNT_CENTS =
  DEPOSIT_AMOUNT_CENTS + LIST_REMAINDER_AMOUNT_CENTS;
export const EARLY_BIRD_TOTAL_AMOUNT_CENTS =
  DEPOSIT_AMOUNT_CENTS + EARLY_BIRD_REMAINDER_AMOUNT_CENTS;
