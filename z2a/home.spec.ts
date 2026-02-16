import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("renders core home pathways and menu links @prod-safe", async ({
    page,
  }) => {
    const isMobile = test.info().project.name.includes("mobile");

    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "AI that actually ships.",
    );
    await expect(
      page.locator("#top").getByRole("link", { name: "Explore Individuals" }),
    ).toBeVisible();
    await expect(
      page.locator("#top").getByRole("link", { name: "Explore Businesses" }),
    ).toBeVisible();

    const menuButton = page.locator('button[aria-controls="nav-menu"]');
    await menuButton.click();

    const menu = page.getByRole("dialog", { name: "Zero-to-Agent" });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: /Home/i }).first()).toBeVisible();
    await expect(
      menu.getByRole("link", { name: /Individuals/i }).first(),
    ).toBeVisible();
    await expect(
      menu.getByRole("link", { name: /Businesses/i }).first(),
    ).toBeVisible();
    await expect(page.locator(".flip-label__secondary[aria-hidden='true']").first()).toBeVisible();

    if (isMobile) {
      await expect(menu.getByRole("button", { name: "Pages" })).toBeVisible();
      await expect(menu.getByRole("button", { name: "On this page" })).toBeVisible();
      await expect(menu.getByRole("link", { name: "Home" })).toBeVisible();
      await expect(menu.getByRole("link", { name: "Vision" })).toHaveCount(0);
      await menu.getByRole("button", { name: "On this page" }).click();
      await expect(menu.getByRole("link", { name: "Vision" })).toBeVisible();
      await menu.getByRole("button", { name: "Pages" }).click();
      await expect(menu.getByRole("link", { name: "Vision" })).toHaveCount(0);
    } else {
      await expect(menu.getByRole("link", { name: "Vision" })).toBeVisible();
      await expect(menu.getByRole("link", { name: "Programs" })).toBeVisible();
      await expect(menu.getByRole("link", { name: "Principles" })).toBeVisible();
    }
  });
});
