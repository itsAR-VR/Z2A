import { test, expect } from "@playwright/test";

test.describe("Speakers", () => {
  test("opens Abdur Sajid profile with award plaque and restores focus on close", async ({
    page,
  }) => {
    await page.goto("/");

    const trigger = page.getByRole("button", {
      name: "View Abdur Sajid details",
    });
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: "Abdur Sajid" });
    await expect(dialog).toBeVisible();

    await expect(dialog.getByRole("img", { name: /OpenAI award plaque/i })).toBeVisible();

    await expect(dialog.getByRole("link", { name: "zeroriskgrowth.com" })).toHaveAttribute(
      "href",
      "https://zeroriskgrowth.com",
    );
    await expect(dialog.getByRole("link", { name: "cold2close.ai" })).toHaveAttribute(
      "href",
      "https://cold2close.ai",
    );

    await expect(dialog.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/abdur-sajid/",
    );

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test("opens Aadil profile and does not show award plaque", async ({ page }) => {
    await page.goto("/");

    const trigger = page.getByRole("button", { name: "View Aadil Kazmi details" });
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();

    const dialog = page.getByRole("dialog", { name: "Aadil Kazmi" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("img", { name: /OpenAI award plaque/i })).toHaveCount(0);
  });
});
