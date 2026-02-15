import { test, expect } from "@playwright/test";

test.describe("Individuals Landing", () => {
  test("renders hero and anchored sections @prod-safe", async ({ page }) => {
    await page.goto("/individuals");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Automate real work",
    );
    await expect(page.locator("#top")).toContainText("Applications open now");
    await expect(page.locator("#top")).toContainText(
      "Feb 28 – Mar 1, 2026 · Toronto",
    );
    await expect(page.locator("#top")).toContainText(
      "Limited to 50 seats in Toronto",
    );

    const sticky = page.getByTestId("sticky-apply-bar");
    const hasClass = (className: string) =>
      new RegExp(`(^|\\s)${className}(\\s|$)`);
    await expect(sticky).toHaveCount(1);
    await expect(sticky).toHaveClass(hasClass("invisible"));

    for (const id of [
      "why",
      "speakers",
      "how",
      "agenda",
      "pricing",
      "faq",
      "apply",
    ]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }

    await page.locator("#how").scrollIntoViewIfNeeded();
    await expect(sticky).toHaveClass(hasClass("visible"));

    await page.locator("#apply").scrollIntoViewIfNeeded();
    await expect(sticky).toHaveClass(hasClass("invisible"));
  });

  test("hero loop is present and ticket is lowered @prod-safe", async ({
    page,
  }) => {
    await page.goto("/individuals");

    const loop = page.getByTestId("hero-agent-loop");
    await expect(loop).toBeVisible();
    await expect(loop.locator('text[data-loop-node-label="plan"]')).toHaveText(
      "Plan",
    );
    await expect(loop.locator('text[data-loop-node-label="build"]')).toHaveText(
      "Build",
    );
    await expect(
      loop.locator('text[data-loop-node-label="deploy"]'),
    ).toHaveText("Deploy");
    await expect(
      loop.locator('text[data-loop-node-label="evaluate"]'),
    ).toHaveText("Evaluate");

    const torontoTicket = page.getByTestId("hero-ticket-toronto");
    await expect(torontoTicket).toHaveCount(1);
    await expect(torontoTicket).toHaveClass(/-bottom-4/);

    await expect(page.getByTestId("hero-agent-loop-runner")).toHaveCount(1);
  });

  test("menu locks scroll and restores focus on close @prod-safe", async ({
    page,
  }) => {
    await page.goto("/individuals");

    const menuButton = page.locator('button[aria-controls="nav-menu"]');
    await menuButton.click();

    const menu = page.getByRole("dialog", { name: "Navigate" });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: "Home" })).toBeFocused();
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Navigate" })).toHaveCount(0);
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
    await expect(menuButton).toBeFocused();
  });
});
