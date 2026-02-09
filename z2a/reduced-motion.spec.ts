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

  test("does not animate hero agent loop @prod-safe", async ({ page }) => {
    await page.goto("/");

    const loop = page.getByTestId("hero-agent-loop");
    await expect(loop).toBeVisible();

    // In reduced motion we never initialize the GSAP loop timeline, so the
    // animated draw-path and runner dot remain hidden.
    await expect(loop.locator("path[data-loop-draw]")).toHaveCSS("opacity", "0");
    await expect(loop.locator("circle[data-loop-runner]")).toHaveCSS(
      "opacity",
      "0",
    );
  });
});
