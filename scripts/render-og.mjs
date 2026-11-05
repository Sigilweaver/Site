#!/usr/bin/env node
/**
 * render-og.mjs
 *
 * Renders the Open Graph preview images (1200x630 JPEG) into public/og/.
 * The images are committed, so this only needs to run when a title or
 * tagline changes:
 *
 *   node scripts/render-og.mjs
 *
 * Requires the `playwright` package and a Chromium build. Neither is a
 * dependency of the site build.
 */

import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const siteRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(siteRoot, 'public', 'og');

/** @type {{ file: string, eyebrow: string, title: string, subtitle: string }[]} */
export const OG_IMAGES = [
  {
    file: 'sigilweaver.jpg',
    eyebrow: 'sigilweaver.app',
    title: 'Sigilweaver',
    subtitle: 'Open-source readers for closed data formats, and Loom, a self-hosted visual data pipeline tool.',
  },
];

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function template(img, logoSvg, fontUrl) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: 'Inter'; src: url('${fontUrl}') format('woff2'); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
html, body { width: 1200px; height: 630px; }
body {
  font-family: 'Inter', sans-serif; color: #f3f0ff; padding: 72px 80px;
  background: radial-gradient(900px 500px at 85% 0%, rgba(139,92,246,0.35), transparent 70%),
              linear-gradient(160deg, #1a0b2e 0%, #2d1b42 60%, #1a0b2e 100%);
  display: flex; flex-direction: column; justify-content: space-between;
}
.brand { display: flex; align-items: center; gap: 18px; font-size: 30px; font-weight: 600; color: #ddd6fe; }
.brand svg { width: 56px; height: 56px; }
.eyebrow { font-size: 24px; letter-spacing: 0.14em; text-transform: uppercase; color: #fbbf24; font-weight: 600; margin-bottom: 20px; }
h1 { font-size: 92px; line-height: 1.02; font-weight: 750; letter-spacing: -0.02em; }
p { font-size: 34px; line-height: 1.35; color: #c4b5fd; margin-top: 26px; max-width: 980px; }
.rule { height: 6px; width: 120px; border-radius: 3px; background: linear-gradient(90deg, #fbbf24, #8b5cf6); }
</style></head><body>
<div class="brand">${logoSvg}<span>Sigilweaver</span></div>
<div>
  <div class="eyebrow">${escapeHtml(img.eyebrow)}</div>
  <h1>${escapeHtml(img.title)}</h1>
  <p>${escapeHtml(img.subtitle)}</p>
</div>
<div class="rule"></div>
</body></html>`;
}

async function main() {
  let chromium;
  try {
    // createRequire honours NODE_PATH, so a globally installed playwright works.
    ({ chromium } = createRequire(import.meta.url)('playwright'));
  } catch (err) {
    console.error('render-og needs the `playwright` package (not a site dependency).');
    throw err;
  }
  mkdirSync(outDir, { recursive: true });
  const logoSvg = readFileSync(join(siteRoot, 'public/icons/sigilweaver-logo.svg'), 'utf8');
  const fontUrl = 'file://' + join(siteRoot, 'public/fonts/InterVariable.woff2');

  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    for (const img of OG_IMAGES) {
      await page.setContent(template(img, logoSvg, fontUrl), { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: join(outDir, img.file), type: 'jpeg', quality: 88 });
      console.log(`Rendered public/og/${img.file}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
