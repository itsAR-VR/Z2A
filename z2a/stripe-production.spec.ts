import { config as dotenvConfig } from "dotenv";
import { expect, type Page, test } from "@playwright/test";

const shouldRun = process.env.Z2A_STRIPE_PROD_E2E === "1";

// Only load local env vars when explicitly running this test.
if (shouldRun) {
  dotenvConfig({ path: ".env.local" });
}

function basicAuthHeader(user: string, pass: string) {
  return `Basic ${Buffer.from(`${user}:${pass}`).toString("base64")}`;
}

async function fillStripeCheckoutCard(page: Page) {
  // Stripe Checkout UI has multiple variants. Prefer first-party placeholders (seen in the
  // current hosted checkout) and fall back to iframe-based Stripe Elements selectors.

  try {
    const cardNumber = page.locator('input[name="cardNumber"]');
    await cardNumber.waitFor({ state: "visible", timeout: 15_000 });

    await cardNumber.fill("4242 4242 4242 4242");
    await page.locator('input[name="cardExpiry"]').fill("12 / 34");
    await page.locator('input[name="cardCvc"]').fill("123");

    const name = page.locator('input[name="billingName"]');
    if (await name.count()) {
      await name.fill("Test Checkout");
    }

    const zipField = page.getByLabel(/zip|postal code/i);
    if (await zipField.count()) {
      await zipField.fill("94103");
    }

    return;
  } catch {
    // Continue to iframe-based fallbacks below.
  }

  // Legacy embedded elements (iframes)
  const cardNumberFrame = page
    .frameLocator('iframe[title*="card number" i], iframe[title*="Card number" i]')
    .first();
  await cardNumberFrame.locator('input[name="cardnumber"]').fill("4242 4242 4242 4242");

  const expFrame = page
    .frameLocator('iframe[title*="expiration" i], iframe[title*="Expiry" i]')
    .first();
  await expFrame.locator('input[name="exp-date"]').fill("12 / 34");

  const securityCodeIframe =
    (await page.locator('iframe[title*="security code" i]').count()) > 0
      ? 'iframe[title*="security code" i]'
      : 'iframe[title*="CVC" i]';
  const cvcFrame = page.frameLocator(securityCodeIframe).first();
  await cvcFrame.locator('input[name="cvc"]').fill("123");
}

test.describe("Stripe (production) end-to-end", () => {
  test.skip(!shouldRun, "Set Z2A_STRIPE_PROD_E2E=1 to run (creates test payments).");

  test("completes a Stripe test checkout and admin reflects depositStatus=paid", async ({ page, request }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Desktop Chromium only.");
    test.setTimeout(180_000);

    const email = `qa+prod-pay-${Date.now()}@example.com`;

    const applyRes = await request.post("/api/apply", {
      data: {
        firstName: "Test",
        lastName: "ProdCheckout",
        email,
        roleTitle: "QA",
        useCase: "Verify production Stripe Checkout + webhook -> depositStatus paid.",
      },
    });
    expect(applyRes.ok(), `applyRes status=${applyRes.status()}`).toBeTruthy();

    const applyJson = (await applyRes.json()) as { checkoutUrl?: string };
    expect(applyJson.checkoutUrl).toBeTruthy();
    const checkoutUrl = String(applyJson.checkoutUrl);
    expect(checkoutUrl).toContain("checkout.stripe.com");

    await page.goto(checkoutUrl, { waitUntil: "domcontentloaded" });
    await fillStripeCheckoutCard(page);

    const payButton = page.getByRole("button", { name: /pay/i }).first();
    await expect(payButton).toBeEnabled();
    await payButton.click();

    await expect(page).toHaveURL(/\/apply\/success\?session_id=/, { timeout: 90_000 });
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Deposit received. Seat reserved.",
    );

    const adminUser = process.env.ADMIN_BASIC_AUTH_USER || "";
    const adminPass =
      process.env.ADMIN_BASIC_AUTH_PASS || process.env.ADMIN_BASIC_AUTH_PASSWORD || "";
    expect(adminUser, "Missing ADMIN_BASIC_AUTH_USER (load .env.local)").toBeTruthy();
    expect(adminPass, "Missing ADMIN_BASIC_AUTH_PASS/ADMIN_BASIC_AUTH_PASSWORD (load .env.local)").toBeTruthy();

    const auth = basicAuthHeader(adminUser, adminPass);

    await expect
      .poll(
        async () => {
          const res = await request.get(
            `/api/admin/attendees?q=${encodeURIComponent(email)}`,
            { headers: { Authorization: auth } },
          );
          if (!res.ok()) return null;

          const json = (await res.json()) as {
            attendees?: Array<{ email?: string; depositStatus?: string }>;
          };
          const attendee = json.attendees?.find(
            (a) => a.email?.toLowerCase() === email.toLowerCase(),
          );
          return attendee?.depositStatus ?? null;
        },
        { timeout: 90_000, intervals: [1000, 2000, 5000] },
      )
      .toBe("paid");
  });
});
