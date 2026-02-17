import { test, expect } from "@playwright/test";

test.describe("Businesses", () => {
  test("renders custom pricing workflow and conversion CTA @prod-safe", async ({
    page,
  }) => {
    const isMobile = test.info().project.name.includes("mobile");

    await page.goto("/businesses");

    await expect(page.locator("#pricing")).toBeVisible();
    await expect(page.locator("#pricing")).toContainText("Custom scope, custom pricing");
    await expect(page.locator("#pricing")).toContainText("Step 1");
    await expect(page.locator("#pricing")).toContainText("Step 2");
    await expect(page.locator("#pricing")).toContainText("Step 3");
    await expect(page.locator("#pricing")).toContainText(/30-minute|30 min/i);
    await expect(page.locator("#pricing")).toContainText("Discovery");
    await expect(page.locator("#pricing")).toContainText("AI Enablement Workshop");
    await expect(page.locator("#pricing")).toContainText("Done-for-you setup + enablement");
    await expect(page.locator("#pricing")).toContainText("Contact for pricing");
    await expect(page.locator("#pricing")).not.toContainText("$");
    await expect(
      page.getByRole("link", { name: "Contact for pricing" }).first(),
    ).toBeVisible();
    await expect(page.locator(".flip-label__secondary[aria-hidden='true']").first()).toBeVisible();

    const menuButton = page.locator('button[aria-controls="nav-menu"]');
    await menuButton.click();
    const menu = page.getByRole("dialog", { name: "Zero-to-Agent" });
    await expect(menu).toBeVisible();

    if (isMobile) {
      await expect(menu.getByRole("button", { name: "Pages" })).toBeVisible();
      await expect(menu.getByRole("button", { name: "On this page" })).toBeVisible();
      await expect(menu.getByRole("link", { name: "Who" })).toHaveCount(0);
      await menu.getByRole("button", { name: "On this page" }).click();
      await expect(menu.getByRole("link", { name: "Who" })).toBeVisible();
      await expect(menu.getByRole("link", { name: "What" })).toBeVisible();
      await expect(menu.getByRole("link", { name: "Pricing" })).toBeVisible();
      await expect(menu.getByRole("link", { name: "Contact" })).toBeVisible();
    } else {
      await expect(menu.getByRole("link", { name: "Who" })).toBeVisible();
      await expect(menu.getByRole("link", { name: "What" })).toBeVisible();
      await expect(menu.getByRole("link", { name: "Pricing" })).toBeVisible();
      await expect(menu.getByRole("link", { name: "Contact" })).toBeVisible();
    }
  });
});
