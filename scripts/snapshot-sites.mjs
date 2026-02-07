import { chromium } from "playwright-core";
import fs from "node:fs";
import path from "node:path";

function sanitizeFilename(input) {
  return input
    .replace(/^https?:\/\//, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .toLowerCase();
}

function usage() {
  console.log(
    [
      "Usage:",
      "  node scripts/snapshot-sites.mjs --out <dir> <url...>",
      "",
      "Example:",
      "  node scripts/snapshot-sites.mjs --out /tmp/z2a-snap http://localhost:3000 https://refunnel.com https://www.tks.world/",
    ].join("\n"),
  );
}

async function dismissCookieBanners(page) {
  // Best-effort cookie banner dismissal for competitor snapshots.
  //
  // Many cookie modals are embedded in iframes or use non-semantic buttons, so we:
  // 1) search all frames (including main frame)
  // 2) try role-based locators first (safest), then text/CSS fallbacks.
  const roleFirst = [
    /Reject all/i,
    /Reject/i,
    /Decline/i,
    /Deny/i,
    /Allow all/i,
    /Accept all/i,
    /I agree/i,
    /^OK$/i,
    /Got it/i,
  ];

  const textFallback = [
    "Reject all",
    "Reject",
    "Decline",
    "Deny",
    "Allow All",
    "Allow all",
    "Accept all",
    "I agree",
    "OK",
    "Got it",
  ];

  async function tryClickInFrame(frame) {
    for (const re of roleFirst) {
      try {
        const btn = frame.getByRole("button", { name: re }).first();
        if (await btn.isVisible({ timeout: 900 })) {
          await btn.click({ timeout: 1500 });
          await page.waitForTimeout(350);
          return true;
        }
      } catch {
        // ignore
      }

      // Some cookie modals (e.g. refunnel.com) use <a> links styled like buttons.
      try {
        const link = frame.getByRole("link", { name: re }).first();
        if (await link.isVisible({ timeout: 900 })) {
          await link.click({ timeout: 1500 });
          await page.waitForTimeout(350);
          return true;
        }
      } catch {
        // ignore
      }
    }

    for (const text of textFallback) {
      try {
        const btn = frame.locator("button", { hasText: text }).first();
        if (await btn.isVisible({ timeout: 900 })) {
          await btn.click({ timeout: 1500 });
          await page.waitForTimeout(350);
          return true;
        }
      } catch {
        // ignore
      }

      try {
        const link = frame.locator("a", { hasText: text }).first();
        if (await link.isVisible({ timeout: 900 })) {
          await link.click({ timeout: 1500 });
          await page.waitForTimeout(350);
          return true;
        }
      } catch {
        // ignore
      }
    }

    // Last resort: common close buttons on modals.
    try {
      const closeBtn = frame
        .locator(
          'button[aria-label*="close" i], button[aria-label*="dismiss" i], button:has-text("Close")',
        )
        .first();
      if (await closeBtn.isVisible({ timeout: 900 })) {
        await closeBtn.click({ timeout: 1500 });
        await page.waitForTimeout(350);
        return true;
      }
    } catch {
      // ignore
    }

    return false;
  }

  // Some sites hydrate and inject banners late; try a couple passes.
  for (let pass = 0; pass < 3; pass += 1) {
    for (const frame of page.frames()) {
      const clicked = await tryClickInFrame(frame);
      if (clicked) return;
    }
    await page.waitForTimeout(450);
  }
}

async function scrollToReveal(page) {
  // Many pages animate content in via IntersectionObserver; Playwright's fullPage
  // screenshot doesn't scroll the document, so elements may remain hidden.
  //
  // We do a gentle scroll down + back up so "reveal once" animations are triggered
  // and stay visible when taking fullPage snapshots.
  const height = await page.evaluate(() => document.body.scrollHeight);
  const step = 700;

  for (let y = 0; y < height; y += step) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(90);
  }

  for (let y = height; y > 0; y -= step) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(60);
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(350);
}

async function snapshotLocalSections(page, outDir, base) {
  const sections = [
    { id: "top", selector: "#top" },
    { id: "why", selector: "#why" },
    { id: "speakers", selector: "#speakers" },
    { id: "outcomes", selector: "#outcomes" },
    { id: "how", selector: "#how" },
    { id: "agenda", selector: "#agenda" },
    { id: "pricing", selector: "#pricing" },
    { id: "faq", selector: "#faq" },
    { id: "apply", selector: "#apply" },
  ];

  // Ensure reveal-on-scroll elements have been observed at least once.
  await scrollToReveal(page);

  for (const section of sections) {
    if (section.id === "top") {
      await page.evaluate(() => window.scrollTo(0, 0));
    } else {
      await page.locator(section.selector).first().scrollIntoViewIfNeeded();
    }

    await page.waitForTimeout(550);

    const outPath = path.join(outDir, `${base}-section-${section.id}.png`);
    await page.screenshot({ path: outPath, fullPage: false, type: "png" });
  }
}

const args = process.argv.slice(2);
const outIdx = args.indexOf("--out");
if (outIdx === -1 || outIdx === args.length - 1) {
  usage();
  process.exit(1);
}

const outDir = path.resolve(args[outIdx + 1]);
const urls = args.filter((a, i) => i !== outIdx && i !== outIdx + 1);
if (urls.length === 0) {
  usage();
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: "desktop", width: 1440, height: 900, deviceScaleFactor: 2 },
  { name: "mobile", width: 390, height: 844, deviceScaleFactor: 2 },
];

// Prefer Playwright-managed Chromium (if installed) over system Chrome.
// In some environments, launching system Chrome via `channel: "chrome"` can
// fail due to profile locking ("Opening in existing browser session") or
// teardown permissions.
const browser = await chromium.launch({ headless: true });

try {
  for (const url of urls) {
    for (const vp of viewports) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: vp.deviceScaleFactor,
        userAgent:
          vp.name === "mobile"
            ? "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
            : undefined,
        isMobile: vp.name === "mobile",
        hasTouch: vp.name === "mobile",
      });

      const page = await context.newPage();
      page.setDefaultTimeout(45_000);

      console.log(`[snapshot] ${vp.name}: ${url}`);

      await page.goto(url, { waitUntil: "domcontentloaded" });

      // Fonts materially change layout; wait for them when possible.
      try {
        await page.evaluate(() => document.fonts?.ready);
      } catch {
        // ignore
      }

      // Competitor sites often have cookie banners that obscure the hero.
      if (!url.includes("localhost")) {
        // Some sites show banners after initial hydration; try twice.
        await dismissCookieBanners(page);
        await page.waitForTimeout(900);
        await dismissCookieBanners(page);
      }

      // Let above-the-fold motion settle a bit before capturing.
      await page.waitForTimeout(url.includes("localhost") ? 1100 : 2200);

      const base = `${sanitizeFilename(url)}-${vp.name}`;
      const viewportPath = path.join(outDir, `${base}-viewport.png`);
      await page.screenshot({ path: viewportPath, fullPage: false, type: "png" });

      if (url.includes("localhost")) {
        // Stitched fullPage screenshots can be unreliable with fixed/nav/backdrop
        // effects. We prefer a deterministic section-by-section capture.
        await snapshotLocalSections(page, outDir, base);
      } else {
        // Grab a "below the fold" comparator without trying to fullPage stitch.
        const y = vp.name === "mobile" ? 720 : 1200;
        await page.evaluate((yy) => window.scrollTo(0, yy), y);
        await page.waitForTimeout(800);
        const belowPath = path.join(outDir, `${base}-below-fold.png`);
        await page.screenshot({ path: belowPath, fullPage: false, type: "png" });
      }

      await context.close();
    }
  }
} finally {
  await browser.close();
}
