import { config as dotenvConfig } from "dotenv";
import { test, expect } from "@playwright/test";

dotenvConfig({ path: ".env.local" });

const adminUser = process.env.ADMIN_BASIC_AUTH_USER || "";
const adminPass =
  process.env.ADMIN_BASIC_AUTH_PASS || process.env.ADMIN_BASIC_AUTH_PASSWORD || "";

test.describe("Admin (authenticated)", () => {
  test.skip(
    !(adminUser && adminPass),
    "Set ADMIN_BASIC_AUTH_USER and ADMIN_BASIC_AUTH_PASS/ADMIN_BASIC_AUTH_PASSWORD to run.",
  );

  test.use({
    httpCredentials: { username: adminUser, password: adminPass },
  });

  test("tabs use ARIA semantics and switch panels", async ({ page }) => {
    await page.route("**/api/admin/attendees**", async (route) => {
      if (route.request().method() !== "GET") return route.continue();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ attendees: [] }),
      });
    });

    await page.route("**/api/admin/referral-codes**", async (route) => {
      if (route.request().method() !== "GET") return route.continue();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ referralCodes: [] }),
      });
    });

    await page.goto("/admin");

    const tablist = page.getByRole("tablist", { name: "Admin sections" });
    await expect(tablist).toBeVisible();

    const attendeesTab = page.getByRole("tab", { name: "Attendees" });
    const referralTab = page.getByRole("tab", { name: "Referral Codes" });

    await expect(attendeesTab).toHaveAttribute("aria-selected", "true");

    const attendeesPanelId = await attendeesTab.getAttribute("aria-controls");
    expect(attendeesPanelId).toBeTruthy();
    await expect(page.locator(`#${attendeesPanelId}`)).toBeVisible();

    await referralTab.click();
    await expect(referralTab).toHaveAttribute("aria-selected", "true");

    const referralPanelId = await referralTab.getAttribute("aria-controls");
    expect(referralPanelId).toBeTruthy();
    await expect(page.locator(`#${referralPanelId}`)).toBeVisible();

    await expect(page.getByText("No referral codes yet.")).toBeVisible();
  });

  test("attendee detail opens as a dialog and restores focus on close", async ({
    page,
  }) => {
    const attendeeId = "att_1";
    const createdAt = new Date().toISOString();

    await page.route("**/api/admin/attendees**", async (route) => {
      if (route.request().method() !== "GET") return route.continue();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          attendees: [
            {
              id: attendeeId,
              createdAt,
              firstName: "Test",
              lastName: "User",
              email: "test.user@example.com",
              roleTitle: "QA",
              company: null,
              depositStatus: "paid",
              remainderStatus: "none",
              seatStatus: "reserved",
              networkCode: null,
            },
          ],
        }),
      });
    });

    await page.route(`**/api/admin/attendees/${attendeeId}`, async (route) => {
      if (route.request().method() !== "GET") return route.continue();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          attendee: {
            id: attendeeId,
            firstName: "Test",
            lastName: "User",
            email: "test.user@example.com",
            roleTitle: "QA",
            company: null,
            linkedinUrl: null,
            useCase: "Verify admin dialog accessibility.",
            networkCode: null,
            applicationStatus: "submitted",
            seatStatus: "reserved",
            depositStatus: "paid",
            remainderStatus: "none",
            internalNotes: null,
            createdAt,
          },
        }),
      });
    });

    await page.route("**/api/admin/referral-codes**", async (route) => {
      if (route.request().method() !== "GET") return route.continue();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ referralCodes: [] }),
      });
    });

    await page.goto("/admin");

    const trigger = page.getByRole("button", { name: "View Test User details" });
    await expect(trigger).toBeVisible();
    await trigger.click();

    const dialog = page.getByTestId("admin-attendee-detail-dialog");
    await expect(dialog).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByTestId("admin-attendee-detail-dialog")).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test("remainder actions call admin endpoints", async ({ page }) => {
    const attendeeId = "att_2";
    const createdAt = new Date().toISOString();

    await page.addInitScript(() => {
      // Avoid popups/navigation during tests.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).open = () => ({ location: { href: "" }, close: () => {} });
      // Auto-accept confirm prompts.
      window.confirm = () => true;
    });

    await page.route("**/api/admin/attendees**", async (route) => {
      if (route.request().method() !== "GET") return route.continue();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          attendees: [
            {
              id: attendeeId,
              createdAt,
              firstName: "Remainder",
              lastName: "Ready",
              email: "remainder.ready@example.com",
              roleTitle: "PM",
              company: null,
              depositStatus: "paid",
              remainderStatus: "none",
              seatStatus: "reserved",
              networkCode: "REF123",
            },
          ],
        }),
      });
    });

    await page.route(`**/api/admin/attendees/${attendeeId}`, async (route) => {
      if (route.request().method() !== "GET") return route.continue();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          attendee: {
            id: attendeeId,
            firstName: "Remainder",
            lastName: "Ready",
            email: "remainder.ready@example.com",
            roleTitle: "PM",
            company: null,
            linkedinUrl: null,
            useCase: "Test remainder actions.",
            networkCode: "REF123",
            applicationStatus: "submitted",
            seatStatus: "reserved",
            depositStatus: "paid",
            remainderStatus: "none",
            internalNotes: null,
            createdAt,
          },
        }),
      });
    });

    await page.route(
      `**/api/admin/attendees/${attendeeId}/remainder-checkout`,
      async (route) => {
        if (route.request().method() !== "POST") return route.continue();
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ checkoutUrl: "https://example.com/stripe" }),
        });
      },
    );

    await page.route("**/api/admin/referral-codes**", async (route) => {
      if (route.request().method() !== "GET") return route.continue();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ referralCodes: [] }),
      });
    });

    await page.goto("/admin");

    await page.getByRole("button", { name: "View Remainder Ready details" }).click();
    await expect(page.getByTestId("admin-attendee-detail-dialog")).toBeVisible();

    const collect = page.getByRole("button", { name: /Collect remainder/i });
    await expect(collect).toBeVisible();

    const req = page.waitForRequest(
      `**/api/admin/attendees/${attendeeId}/remainder-checkout`,
    );
    await collect.click();
    await req;
  });

  test("capture all button calls batch endpoint when authorized remainders exist", async ({
    page,
  }) => {
    const createdAt = new Date().toISOString();

    await page.addInitScript(() => {
      window.confirm = () => true;
    });

    await page.route("**/api/admin/attendees**", async (route) => {
      if (route.request().method() !== "GET") return route.continue();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          attendees: [
            {
              id: "att_a",
              createdAt,
              firstName: "Auth",
              lastName: "One",
              email: "auth.one@example.com",
              roleTitle: "PM",
              company: null,
              depositStatus: "paid",
              remainderStatus: "authorized",
              seatStatus: "reserved",
              networkCode: null,
            },
            {
              id: "att_b",
              createdAt,
              firstName: "Auth",
              lastName: "Two",
              email: "auth.two@example.com",
              roleTitle: "PM",
              company: null,
              depositStatus: "paid",
              remainderStatus: "authorized",
              seatStatus: "reserved",
              networkCode: null,
            },
          ],
        }),
      });
    });

    await page.route("**/api/admin/remainder-capture-all", async (route) => {
      if (route.request().method() !== "POST") return route.continue();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ captured: 2, failed: [] }),
      });
    });

    await page.route("**/api/admin/referral-codes**", async (route) => {
      if (route.request().method() !== "GET") return route.continue();
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ referralCodes: [] }),
      });
    });

    await page.goto("/admin");

    const capture = page.getByRole("button", { name: /Capture 2 authorized/i });
    await expect(capture).toBeVisible();

    const req = page.waitForRequest("**/api/admin/remainder-capture-all");
    await capture.click();
    await req;

    await expect(page.getByText(/Captured 2/i)).toBeVisible();
  });
});
