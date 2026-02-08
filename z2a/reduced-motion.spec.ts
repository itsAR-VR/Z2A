import { test, expect } from "@playwright/test";

test.describe("Reduced Motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("does not animate marquee @prod-safe", async ({ page }) => {
    await page.goto("/");

    const marqueeRow = page.getByTestId("hero-marquee");
    await expect(marqueeRow).not.toHaveClass(/z2a-marquee/);
  });
});
