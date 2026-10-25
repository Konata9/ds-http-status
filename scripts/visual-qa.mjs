import { existsSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import puppeteer from 'puppeteer-core';

const BASE_URL = process.env.PREVIEW_URL || 'http://127.0.0.1:4322';
const OUT_DIR = join(process.cwd(), 'tmp', 'shots');

const chromeCandidates = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

const executablePath = chromeCandidates.find((candidate) => existsSync(candidate));

if (!executablePath) {
  console.error(
    'visual-qa: no Chrome found. Set CHROME_PATH to a Chrome or Chromium binary.',
  );
  process.exit(1);
}

const pages = [
  { name: 'home-en', path: '/' },
  { name: 'home-zh', path: '/zh/' },
  { name: 'detail-en', path: '/status/404/' },
  { name: 'detail-zh', path: '/zh/status/404/' },
];

const viewports = [
  { name: '1440', width: 1440, height: 900 },
  { name: '390', width: 390, height: 844 },
];

await mkdir(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({ executablePath, headless: true });
const page = await browser.newPage();

try {
  for (const viewport of viewports) {
    await page.setViewport({ width: viewport.width, height: viewport.height });

    for (const target of pages) {
      await page.goto(`${BASE_URL}${target.path}`, {
        waitUntil: 'networkidle0',
        timeout: 15_000,
      });
      await page.screenshot({
        path: join(OUT_DIR, `${target.name}-${viewport.name}.png`),
        fullPage: true,
      });
    }
  }
} finally {
  await browser.close();
}

console.log(`visual-qa: ${pages.length * viewports.length} screenshots in ${OUT_DIR}`);
