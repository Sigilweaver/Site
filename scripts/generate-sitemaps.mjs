#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const siteRoot = join(__dirname, '..');
// Written into the build output after `vite build`; nothing is committed.
const outDir = join(siteRoot, 'dist');

const domain = 'https://sigilweaver.app';

// ------------------------------------------------------------------ helpers

/**
 * Date of the last commit that touched `file`, as YYYY-MM-DD.
 * Returns null (and the <lastmod> element is omitted) when the page has no
 * source file in this repo or git history is unavailable, because a file
 * mtime in a fresh checkout is the clone time, not the edit time.
 */
function getLastMod(file) {
  if (!file) return null;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], {
      cwd: siteRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
    return out || null;
  } catch (err) {
    console.warn(`sitemap: no git date for ${file} (${err.message.split('\n')[0]}); omitting lastmod`);
    return null;
  }
}

function renderUrlset(pages) {
  const urls = pages
    .map((p) => {
      const lines = [
        `    <loc>${domain}${p.loc}</loc>`,
        ...(p.lastmod ? [`    <lastmod>${p.lastmod}</lastmod>`] : []),
        `    <changefreq>${p.changefreq}</changefreq>`,
        `    <priority>${p.priority}</priority>`,
      ];
      return `  <url>\n${lines.join('\n')}\n  </url>`;
    })
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function renderSitemapIndex(locs) {
  const entries = locs
    .map((loc) => `  <sitemap>\n    <loc>${domain}${loc}</loc>\n  </sitemap>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>\n`;
}

// ------------------------------------------------------------------ page definitions

// Main Website pages (homepage, docs hub, legal)
const corePages = [
  { loc: '/', file: 'src/index.html', changefreq: 'monthly', priority: '1.0' },
  { loc: '/docs/', file: 'src/docs/index.html', changefreq: 'weekly', priority: '0.9' },
  { loc: '/terms', file: 'src/terms.html', changefreq: 'yearly', priority: '0.3' },
  { loc: '/privacy', file: 'src/privacy.html', changefreq: 'yearly', priority: '0.3' },
];

// Loom marketing site pages
const loomPages = [
  { loc: '/loom/', file: 'src/loom/index.html', changefreq: 'weekly', priority: '1.0' },
  { loc: '/loom/downloads', file: 'src/loom/downloads.html', changefreq: 'weekly', priority: '0.8' },
  { loc: '/loom/contributing', file: 'src/loom/contributing.html', changefreq: 'monthly', priority: '0.5' },
  { loc: '/loom/verify-downloads', file: 'src/loom/verify-downloads.html', changefreq: 'monthly', priority: '0.4' },
];

// Per-project stub sitemaps covering the static Website landing pages.
// Each entry produces public/<dir>/sitemap.xml.
// Docusaurus doc sitemaps are separate (see docusaurusSitemaps below).
const projectStubs = [
  {
    dir: 'dicom-atlas',
    pages: [
      { loc: '/dicom-atlas/', file: 'src/dicom-atlas/index.html', changefreq: 'monthly', priority: '0.8' },
    ],
  },
  {
    dir: 'openkspace',
    pages: [
      { loc: '/openkspace/', file: 'src/openkspace/index.html', changefreq: 'monthly', priority: '0.8' },
    ],
  },
  {
    dir: 'openmassspec',
    pages: [
      { loc: '/openmassspec/', file: 'src/openmassspec/index.html', changefreq: 'monthly', priority: '0.8' },
    ],
  },
  {
    dir: 'openqbw',
    pages: [
      { loc: '/openqbw/', file: 'src/openqbw/index.html', changefreq: 'monthly', priority: '0.8' },
    ],
  },
  {
    dir: 'opensqlanywhere',
    pages: [
      { loc: '/opensqlanywhere/', file: 'src/opensqlanywhere/index.html', changefreq: 'monthly', priority: '0.8' },
    ],
  },
  {
    dir: 'opentfraw',
    pages: [
      { loc: '/opentfraw/', file: 'src/opentfraw/index.html', changefreq: 'monthly', priority: '0.8' },
    ],
  },
  {
    dir: 'opentimstdf',
    pages: [
      { loc: '/opentimstdf/', file: 'src/opentimstdf/index.html', changefreq: 'monthly', priority: '0.8' },
    ],
  },
  {
    dir: 'openwraw',
    pages: [
      { loc: '/openwraw/', file: 'src/openwraw/index.html', changefreq: 'monthly', priority: '0.8' },
    ],
  },
  {
    dir: 'openaraw',
    pages: [
      { loc: '/openaraw/', file: 'src/openaraw/index.html', changefreq: 'monthly', priority: '0.8' },
    ],
  },
  {
    dir: 'opensxraw',
    pages: [
      { loc: '/opensxraw/', file: 'src/opensxraw/index.html', changefreq: 'monthly', priority: '0.8' },
    ],
  },
  {
    dir: 'openyxdb',
    pages: [
      { loc: '/openyxdb/', file: 'src/openyxdb/index.html', changefreq: 'monthly', priority: '0.8' },
    ],
  },
  {
    dir: 'speclance',
    pages: [
      { loc: '/speclance/', file: 'src/speclance/index.html', changefreq: 'monthly', priority: '0.8' },
    ],
  },
  {
    dir: 'sigilyx',
    pages: [
      { loc: '/sigilyx/', file: 'src/sigilyx/index.html', changefreq: 'monthly', priority: '0.8' },
    ],
  },
  {
    dir: 'genolance',
    pages: [
      { loc: '/genolance/', file: 'src/genolance/index.html', changefreq: 'monthly', priority: '0.8' },
    ],
  },
  {
    dir: 'openqvd',
    pages: [
      { loc: '/openqvd/', file: 'src/openqvd/index.html', changefreq: 'monthly', priority: '0.8' },
    ],
  },
];

// Docusaurus-generated sitemaps - produced by each project's own build, not this
// script. Listed in the main index so Google crawls every doc page.
const docusaurusSitemaps = [
  '/blog/sitemap.xml',
  '/dicom-atlas/docs/sitemap.xml',
  '/loom/docs/sitemap.xml',
  '/openaraw/docs/sitemap.xml',
  '/openkspace/docs/sitemap.xml',
  '/openmassspec/docs/sitemap.xml',
  '/openqbw/docs/sitemap.xml',
  '/openqvd/docs/sitemap.xml',
  '/opensqlanywhere/docs/sitemap.xml',
  '/opensxraw/docs/sitemap.xml',
  '/openszraw/docs/sitemap.xml',
  '/opentfraw/docs/sitemap.xml',
  '/opentimstdf/docs/sitemap.xml',
  '/openwraw/docs/sitemap.xml',
  '/openyxdb/docs/sitemap.xml',
  '/speclance/docs/sitemap.xml',
  '/sigilyx/docs/sitemap.xml',
];

// ------------------------------------------------------------------ main

function main() {
  if (!existsSync(outDir)) {
    throw new Error('dist/ does not exist; run `vite build` before generating sitemaps');
  }

  // sitemap-core.xml - main Website pages
  const coreEntries = corePages.map((p) => ({ ...p, lastmod: getLastMod(p.file) }));
  writeFileSync(join(outDir, 'sitemap-core.xml'), renderUrlset(coreEntries), 'utf8');
  console.log('Generated dist/sitemap-core.xml');

  // loom/sitemap-core.xml and loom/sitemap.xml (Loom sub-index for standalone use)
  const loomOutDir = join(outDir, 'loom');
  mkdirSync(loomOutDir, { recursive: true });
  const loomEntries = loomPages.map((p) => ({ ...p, lastmod: getLastMod(p.file) }));
  writeFileSync(join(loomOutDir, 'sitemap-core.xml'), renderUrlset(loomEntries), 'utf8');
  writeFileSync(
    join(loomOutDir, 'sitemap.xml'),
    renderSitemapIndex(['/loom/sitemap-core.xml', '/loom/docs/sitemap.xml']),
    'utf8'
  );
  console.log('Generated dist/loom/sitemap-core.xml and dist/loom/sitemap.xml');

  // Per-project stub sitemaps
  for (const project of projectStubs) {
    const dir = join(outDir, project.dir);
    mkdirSync(dir, { recursive: true });
    const entries = project.pages.map((p) => ({ ...p, lastmod: getLastMod(p.file) }));
    writeFileSync(join(dir, 'sitemap.xml'), renderUrlset(entries), 'utf8');
    console.log(`Generated dist/${project.dir}/sitemap.xml`);
  }

  // Main sitemap index - flat list of every individual urlset sitemap.
  // Google does not follow nested sitemap indexes, so every leaf sitemap
  // must be referenced here directly.
  const allSitemapLocs = [
    '/sitemap-core.xml',
    '/loom/sitemap-core.xml',
    ...projectStubs.map((p) => `/${p.dir}/sitemap.xml`),
    ...docusaurusSitemaps,
  ];
  writeFileSync(join(outDir, 'sitemap.xml'), renderSitemapIndex(allSitemapLocs), 'utf8');
  console.log('Generated dist/sitemap.xml');
}

main();
