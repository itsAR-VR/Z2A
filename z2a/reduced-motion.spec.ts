import { test, expect } from "@playwright/test";

test.describe("Reduced Motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } });

  test("removes the old hero marquee @prod-safe", async ({ page }) => {
    await page.goto("/individuals");

    await expect(page.getByTestId("hero-marquee")).toHaveCount(0);
  });

  test("RevealOnScroll content is visible and transitionless @prod-safe", async ({
    page,
  }) => {
    await page.goto("/individuals");

    const wrapper = page
      .getByRole("heading", { name: /The bottleneck isn't ideas/i })
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
    await page.goto("/individuals");
    const marker = await page.evaluate(() => document.documentElement.dataset.z2aLenis);
    expect(marker).not.toBe("on");
  });

  test("menu opens without transitions and locks scroll @prod-safe", async ({
    page,
  }) => {
    await page.goto("/individuals");

    const menuButton = page.getByRole("button", { name: "Open menu" });
    await menuButton.click();

    const menu = page.getByRole("dialog", { name: "Navigate" });
    await expect(menu).toBeVisible();

    await expect(menu.getByRole("link", { name: "Home" })).toBeFocused();
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
    await expect(menu).not.toHaveClass(/transition-opacity/);

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Navigate" })).toHaveCount(0);
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
    await expect(menuButton).toBeFocused();
  });

  test("hero loop runner does not animate @prod-safe", async ({ page }) => {
    await page.goto("/individuals");

    const loop = page.getByTestId("hero-agent-loop");
    await expect(loop).toBeVisible();

    const runner = page.getByTestId("hero-agent-loop-runner");
    await expect(runner).toHaveCount(1);
    const bb1 = await runner.boundingBox();
    expect(bb1).not.toBeNull();
    if (!bb1) return;

    await page.waitForTimeout(400);

    const bb2 = await runner.boundingBox();
    expect(bb2).not.toBeNull();
    if (!bb2) return;
    expect(Math.abs(bb2.x - bb1.x)).toBeLessThan(0.5);
    expect(Math.abs(bb2.y - bb1.y)).toBeLessThan(0.5);
  });
});
