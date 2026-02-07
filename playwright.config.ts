import { defineConfig, devices } from "@playwright/test";

const isCI = Boolean(process.env.CI);
const baseURL =
  process.env.PLAYWRIGHT_BASE_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  "https://zerotoagent.com";
const useWebServer = Boolean(process.env.PLAYWRIGHT_WEB_SERVER);

if (
  useWebServer &&
  !/^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?$/i.test(baseURL)
) {
  throw new Error(
    [
      "PLAYWRIGHT_WEB_SERVER=1 starts a local dev server, so tests must target a local base URL.",
      `Received PLAYWRIGHT_BASE_URL/NEXT_PUBLIC_APP_URL: ${baseURL}`,
      "Fix: set PLAYWRIGHT_BASE_URL=http://localhost:3000 (or disable PLAYWRIGHT_WEB_SERVER).",
    ].join("\n"),
  );
}

export default defineConfig({
  testDir: "./z2a",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 5"] } },
  ],
  // Optional: set `PLAYWRIGHT_WEB_SERVER=1` to have Playwright start the dev server.
  // Example:
  //   PLAYWRIGHT_WEB_SERVER=1 PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e
  webServer: useWebServer
    ? {
        // `next dev` (Turbopack) can infer the wrong workspace root in nested
        // workspaces; webpack is more deterministic for CI/smoke purposes.
        command: "npm run dev:webpack",
        url: baseURL,
        reuseExistingServer: !isCI,
        timeout: 120_000,
      }
    : undefined,
});
