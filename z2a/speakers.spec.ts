import { test, expect } from "@playwright/test";

test.describe("Speakers", () => {
  test("speaker cards link to LinkedIn @prod-safe", async ({ page }) => {
    await page.goto("/");

    const aadil = page.getByRole("link", {
      name: "Open Aadil Kazmi on LinkedIn",
    });
    await expect(aadil).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/aadilkazmi/",
    );

    const abdur = page.getByRole("link", {
      name: "Open Abdur Sajid on LinkedIn",
    });
    await expect(abdur).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/abdur-sajid/",
    );
    await expect(page.locator("text=View LinkedIn profile")).toHaveCount(0);

    // Removed from the simplified section.
    await expect(page.locator("text=Award plaque")).toHaveCount(0);
    await expect(
      page.getByRole("img", { name: /OpenAI award plaque/i }),
    ).toHaveCount(0);

    for (const removed of [
      "Joined after the team passed 100B tokens; leading what comes next.",
      "20 years old, high school dropout.",
      "Forbes 30 Under 30 (Retail & Ecommerce, 2022).",
    ]) {
      await expect(page.locator(`text=${removed}`)).toHaveCount(0);
    }
  });
});
