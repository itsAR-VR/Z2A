import { test, expect } from "@playwright/test";

test.describe("Businesses", () => {
  test("renders pricing tiers and conversion CTA @prod-safe", async ({
    page,
  }) => {
    await page.goto("/businesses");

    await expect(page.locator("#pricing")).toBeVisible();
    await expect(page.locator("#pricing")).toContainText("Ongoing AI Partnership");
    await expect(page.locator("#pricing")).toContainText("Implementation Sprint");
    await expect(page.locator("#pricing")).toContainText("Discovery Workshop");
    await expect(page.locator("#pricing")).toContainText(
      "100% refund if you aren't satisfied",
    );
    await expect(page.getByRole("link", { name: "Book a call" }).first()).toBeVisible();

    const tierTitles = await page
      .locator("#pricing h3")
      .allTextContents();
    const ongoingIdx = tierTitles.indexOf("Ongoing AI Partnership");
    const sprintIdx = tierTitles.indexOf("Implementation Sprint");
    const discoveryIdx = tierTitles.indexOf("Discovery Workshop");
    expect(ongoingIdx).toBeGreaterThanOrEqual(0);
    expect(sprintIdx).toBeGreaterThanOrEqual(0);
    expect(discoveryIdx).toBeGreaterThanOrEqual(0);
    expect(ongoingIdx).toBeLessThan(sprintIdx);
    expect(sprintIdx).toBeLessThan(discoveryIdx);
  });
});
