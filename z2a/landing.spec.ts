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
    await page.waitForTimeout(160);

    const scrollOutcomesToProgress = async (progress: number) => {
      await page.locator("#outcomes").evaluate((section, rawProgress) => {
        const track = section.querySelector(
          "[data-testid='outcomes-track']",
        ) as HTMLElement | null;
        if (!track) return;

        const rect = track.getBoundingClientRect();
        const scrollRange = rect.height - window.innerHeight;
        const clamped = Math.max(0, Math.min(1, Number(rawProgress)));
        const trackTop = window.scrollY + rect.top;

        window.scrollTo({
          top: trackTop + scrollRange * clamped,
          behavior: "auto",
        });
      }, progress);
      await page.waitForTimeout(180);
    };

    const assertBreakSplit = async (
      progress: number,
      upperText: string,
      lowerText: string,
    ) => {
      await scrollOutcomesToProgress(progress);
      const snapshot = await page.locator("#outcomes").evaluate((section) => {
        const slot = section.querySelector(
          "[data-testid='outcomes-title-slot']",
        ) as HTMLElement | null;

        if (!slot) {
          return { found: false, headings: [] as Array<{ text: string; mid: number }>, slotMid: 0 };
        }

        const rect = slot.getBoundingClientRect();
        const slotMid = rect.top + rect.height / 2;

        const headings = Array.from(slot.querySelectorAll("h3"))
          .map((heading) => {
            const hRect = heading.getBoundingClientRect();
            return {
              text: (heading.textContent ?? "").trim(),
              mid: (hRect.top + hRect.bottom) / 2,
            };
          })
          .sort((a, b) => a.mid - b.mid);

        return { found: true, headings, slotMid };
      });

      if (!snapshot.found) {
        throw new Error("Expected outcomes title slot to be present.");
      }

      expect(snapshot.headings.length).toBe(2);
      expect(snapshot.headings[0]?.text).toBe(upperText);
      expect(snapshot.headings[1]?.text).toBe(lowerText);
      expect(snapshot.headings[0]!.mid).toBeLessThan(snapshot.slotMid);
      expect(snapshot.headings[1]!.mid).toBeGreaterThan(snapshot.slotMid);
    };

    await assertBreakSplit(1 / 3, "One weekend", "Pods of 5");
    await assertBreakSplit(2 / 3, "Pods of 5", "Future-ready");

    await scrollOutcomesToProgress(0.95);
    const final = await page.locator("#outcomes").evaluate((section) => {
      const slot = section.querySelector(
        "[data-testid='outcomes-title-slot']",
      ) as HTMLElement | null;

      if (!slot) {
        return { found: false, text: "", count: 0 };
      }

      const headings = Array.from(slot.querySelectorAll("h3")).map((heading) =>
        (heading.textContent ?? "").trim(),
      );

      return {
        found: true,
        text: headings[0] ?? "",
        count: headings.length,
      };
    });

    expect(final.found).toBeTruthy();
    expect(final.count).toBe(1);
    expect(final.text).toBe("Future-ready");
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
