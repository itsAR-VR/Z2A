import { chromium, devices } from 'playwright';
import path from 'node:path';
import fs from 'node:fs/promises';

const outDir = path.resolve('.artifacts/hero-intro');

async function capture(name, use) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...use,
    recordVideo: { dir: outDir, size: use.viewport ?? { width: 1280, height: 720 } },
  });
  const page = await context.newPage();
  await page.goto('http://localhost:3000/individuals', { waitUntil: 'networkidle' });
  await page.waitForTimeout(4000);
  await context.close();
  const videoPath = await page.video()?.path();
  await browser.close();
  if (videoPath) {
    await fs.rename(videoPath, path.join(outDir, `hero-${name}.webm`));
  }
}

await capture('desktop', devices['Desktop Chrome']);
await capture('mobile', devices['Pixel 5']);
