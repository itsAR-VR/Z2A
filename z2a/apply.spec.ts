import { test, expect } from "@playwright/test";

test.describe("Apply", () => {
  test("shows validation errors when submitting empty form", async ({ page }) => {
    await page.goto("/apply");

    await page.getByRole("button", { name: /Continue to deposit/i }).click();

    await expect(page.getByText("First name is required")).toBeVisible();
    await expect(page.getByText("Last name is required")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Role/title is required")).toBeVisible();
    await expect(page.getByText("Use case is required")).toBeVisible();
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
