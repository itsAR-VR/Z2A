import { test, expect } from "@playwright/test";

test.describe("Reduced Motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("does not animate marquee @prod-safe", async ({ page }) => {
    await page.goto("/");

    const marqueeRow = page.getByTestId("hero-marquee");
    await expect(marqueeRow).not.toHaveClass(/z2a-marquee/);
  });

  test("RevealOnScroll content is visible and transitionless @prod-safe", async ({
    page,
  }) => {
    await page.goto("/");

    const wrapper = page
      .getByRole("heading", { name: /The hard part isn't knowing/i })
      .locator("..");

    await expect(wrapper).toBeVisible();
    await expect(wrapper).toHaveCSS("opacity", "1");

    const inline = await wrapper.evaluate((el) => ({
      transition: (el as HTMLElement).style.transition,
      transform: (el as HTMLElement).style.transform,
    }));
    expect(inline.transition).toBe("none");
    const t = inline.transform.trim();
    if (t === "none") return;
    const m = t.match(
      /^translate3d\(\s*([+-]?\d+(?:\.\d+)?)px?,\s*([+-]?\d+(?:\.\d+)?)px?,\s*([+-]?\d+(?:\.\d+)?)px?\s*\)$/,
    );
    expect(m, `unexpected transform: ${t}`).toBeTruthy();
    if (!m) return;
    expect(Number(m[1])).toBe(0);
    expect(Number(m[2])).toBe(0);
    expect(Number(m[3])).toBe(0);
  });

  test("does not initialize Lenis smooth scroll @prod-safe", async ({ page }) => {
    await page.goto("/");
    const marker = await page.evaluate(() => document.documentElement.dataset.z2aLenis);
    expect(marker).not.toBe("on");
  });

  test("menu opens without transitions and locks scroll @prod-safe", async ({
    page,
  }) => {
    await page.goto("/");

    const menuButton = page.getByRole("button", { name: "Open menu" });
    await menuButton.click();

    const menu = page.getByRole("dialog", { name: "Navigate" });
    await expect(menu).toBeVisible();

    await expect(menu.getByRole("link", { name: "Why" })).toBeFocused();
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
    await expect(menu).not.toHaveClass(/transition-opacity/);

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Navigate" })).toHaveCount(0);
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
    await expect(menuButton).toBeFocused();
  });

  test("hero stepper is visible and transitionless @prod-safe", async ({
    page,
  }) => {
    await page.goto("/");

    const stepper = page.getByTestId("hero-stepper");
    await expect(stepper).toBeVisible();

    // Reduced motion forces transition durations to near-zero via globals.css.
    const progress = stepper.getByTestId("hero-stepper-progress");
    const transitionDuration = await progress.evaluate((el) => {
      const d = getComputedStyle(el).transitionDuration;
      const parts = d.split(",").map((p) => p.trim()).filter(Boolean);
      const toMs = (part: string) => {
        if (part.endsWith("ms")) return Number.parseFloat(part);
        if (part.endsWith("s")) return Number.parseFloat(part) * 1000;
        return Number.parseFloat(part);
      };
      return Math.max(0, ...parts.map(toMs));
    });
    expect(transitionDuration).toBeLessThanOrEqual(5);
  });
});
