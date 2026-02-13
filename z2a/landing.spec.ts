import { test, expect } from "@playwright/test";

test.describe("Landing", () => {
  test("renders hero and anchored sections @prod-safe", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Automate real work",
    );
    await expect(page.locator("#top")).toContainText("Applications open now");
    await expect(page.locator("#top")).toContainText(
      "Feb 28 – Mar 1, 2026 · Toronto · 50 seats",
    );
    await expect(page.locator("#top")).toContainText(
      "Limited to 50 seats in Toronto",
    );
    await expect(page.locator("#outcomes")).toContainText("One weekend");
    await expect(page.locator("#outcomes")).toContainText("Pods of 5");

    const sticky = page.getByTestId("sticky-apply-bar");
    const hasClass = (className: string) =>
      new RegExp(`(^|\\s)${className}(\\s|$)`);
    await expect(sticky).toHaveCount(1);
    await expect(sticky).toHaveClass(hasClass("invisible"));

    for (const id of [
      "why",
      "speakers",
      "outcomes",
      "how",
      "agenda",
      "pricing",
      "faq",
      "apply",
    ]) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }

    await page.locator("#outcomes").scrollIntoViewIfNeeded();
    let sawFutureReady = false;
    for (let i = 0; i < 16; i += 1) {
      const text = (await page.locator("#outcomes").textContent()) ?? "";
      if (text.includes("Future-ready")) {
        sawFutureReady = true;
        break;
      }
      await page.mouse.wheel(0, 220);
      await page.waitForTimeout(120);
    }
    expect(sawFutureReady).toBeTruthy();

    // Sticky bar should show once we're past the hero and hide again near the final CTA.
    await page.locator("#how").scrollIntoViewIfNeeded();
    await expect(sticky).toHaveClass(hasClass("visible"));

    await page.locator("#apply").scrollIntoViewIfNeeded();
    await expect(sticky).toHaveClass(hasClass("invisible"));
  });

  test("outcomes title transition splits at page breaks @prod-safe", async ({
    page,
  }) => {
    await page.goto("/");

    await page.locator("#outcomes").scrollIntoViewIfNeeded();
    await page.waitForTimeout(120);

    const readSplitHeadings = async () =>
      page.locator("#outcomes").evaluate(() => {
        const mask = document.querySelector(
          "[data-testid='outcomes-title-mask']",
        ) as HTMLElement | null;

        if (!mask) {
          return { found: false, topText: "", bottomText: "" };
        }

        const rect = mask.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;

        const readPoint = (y: number) => {
          const node = document.elementFromPoint(centerX, y);
          const heading = node?.closest("h3");
          return (heading?.textContent ?? "").trim();
        };

        return {
          found: true,
          topText: readPoint(rect.top + rect.height * 0.25),
          bottomText: readPoint(rect.top + rect.height * 0.75),
        };
      });

    let sawOneWeekend = false;
    let sawPodsSplit = false;
    let sawFutureSplit = false;

    for (let i = 0; i < 20; i += 1) {
      const split = await readSplitHeadings();
      if (!split.found) {
        continue;
      }

      if (split.topText === "One weekend" && split.bottomText === "Pods of 5") {
        sawPodsSplit = true;
      }

      if (split.topText === "Pods of 5" && split.bottomText === "Future-ready") {
        sawFutureSplit = true;
      }

      if (split.topText === "One weekend" || split.topText === "Pods of 5") {
        sawOneWeekend = true;
      }

      if (sawPodsSplit && sawFutureSplit) {
        break;
      }

      await page.mouse.wheel(0, 200);
      await page.waitForTimeout(120);
    }

    expect(sawOneWeekend).toBeTruthy();
    expect(sawPodsSplit).toBeTruthy();
    expect(sawFutureSplit).toBeTruthy();

    let sawFutureReady = false;
    for (let i = 0; i < 12; i += 1) {
      const text = (await page.locator("#outcomes").textContent()) ?? "";
      if (text.includes("Future-ready")) {
        sawFutureReady = true;
        break;
      }
      await page.mouse.wheel(0, 220);
      await page.waitForTimeout(120);
    }
    expect(sawFutureReady).toBeTruthy();
  });

  test("hero loop is present and ticket is lowered @prod-safe", async ({
    page,
  }) => {
    await page.goto("/");

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
    await page.goto("/");

    const menuButton = page.locator('button[aria-controls="nav-menu"]');
    await menuButton.click();

    const menu = page.getByRole("dialog", { name: "Navigate" });
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("link", { name: "Why" })).toBeFocused();
    await expect(menu.getByText("Applications open now")).toHaveCount(0);
    await expect(menu).toContainText("Limited to 50 seats in Toronto.");
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: "Navigate" })).toHaveCount(0);
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
    await expect(menuButton).toBeFocused();
  });
});
