import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("renders core home pathways and menu links @prod-safe", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "AI that does real work.",
    );
    await expect(
      page.locator("#top").getByRole("link", { name: "Explore Individuals" }),
    ).toBeVisible();
    await expect(
      page.locator("#top").getByRole("link", { name: "Explore Businesses" }),
    ).toBeVisible();

    const menuButton = page.locator('button[aria-controls="nav-menu"]');
    await menuButton.click();

    const menu = page.getByRole("dialog", { name: "Navigate" });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: "Home", exact: true })).toBeVisible();
    await expect(
      menu.getByRole("link", { name: "Individuals", exact: true }),
    ).toBeVisible();
    await expect(
      menu.getByRole("link", { name: "Businesses", exact: true }),
    ).toBeVisible();
  });
});
