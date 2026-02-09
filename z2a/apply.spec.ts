import { test, expect } from "@playwright/test";

test.describe("Apply", () => {
  test("shows validation errors when submitting empty form", async ({ page }) => {
    await page.goto("/apply");

    await page.getByRole("button", { name: /Continue to deposit/i }).click();

    const alert = page
      .getByRole("alert")
      .filter({ hasText: "Please fix the highlighted fields and try again." });
    await expect(alert).toBeVisible();
    await expect(alert).toContainText(
      "Please fix the highlighted fields and try again.",
    );
    await expect(page.getByLabel("First name")).toBeFocused();

    await expect(page.getByText("First name is required")).toBeVisible();
    await expect(page.getByText("Last name is required")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Role/title is required")).toBeVisible();
    await expect(page.getByText("Use case is required")).toBeVisible();
  });

  test("example use case chips insert text", async ({ page }) => {
    await page.goto("/apply");

    await page.getByRole("button", { name: "Support triage" }).click();
    await expect(page.getByLabel(/What do you want to automate\?/i)).toHaveValue(
      "Triage inbound support tickets and draft replies with guardrails.",
    );
  });

  test("prevents double-submit during request (mocked /api/apply)", async ({
    page,
  }) => {
    let requests = 0;
    let release!: () => void;
    const gate = new Promise<void>((resolve) => {
      release = resolve;
    });

    await page.route("**/api/apply", async (route) => {
      if (route.request().method() !== "POST") return route.continue();

      requests += 1;
      if (requests > 1) {
        return route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({ error: "Duplicate request" }),
        });
      }

      await gate;
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ checkoutUrl: "/apply/success" }),
      });
    });

    await page.goto("/apply");

    await page.getByLabel("First name").fill("Test");
    await page.getByLabel("Last name").fill("User");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Role / title").fill("Product Manager");
    await page.getByRole("button", { name: "Support triage" }).click();

    const submit = page.locator('button[type="submit"]');
    await submit.click();

    await expect(submit).toBeDisabled();
    await expect(submit).toHaveText(/Redirecting to payment/i);

    release();
    await expect(page).toHaveURL(/\/apply\/success$/);
    expect(requests).toBe(1);
  });

  test("submits and redirects (mocked /api/apply)", async ({ page }) => {
    await page.route("**/api/apply", async (route) => {
      if (route.request().method() !== "POST") return route.continue();
      const body = route.request().postDataJSON();
      expect(body).toEqual({
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        roleTitle: "Product Manager",
        useCase: "Triage inbound support tickets and draft replies with guardrails.",
      });
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ checkoutUrl: "/apply/success" }),
      });
    });

    await page.goto("/apply");

    await page.getByLabel("First name").fill("Test");
    await page.getByLabel("Last name").fill("User");
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Role / title").fill("Product Manager");
    await page.getByLabel(/What do you want to automate\?/i).fill(
      "Triage inbound support tickets and draft replies with guardrails.",
    );

    await page.getByRole("button", { name: /Continue to deposit/i }).click();
    await expect(page).toHaveURL(/\/apply\/success$/);
  });
});
