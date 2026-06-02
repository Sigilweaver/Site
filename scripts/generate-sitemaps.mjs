#!/usr/bin/env node

import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const siteRoot = join(__dirname, '..');
const publicDir = join(siteRoot, 'public');

const domain = 'https://sigilweaver.app';

// ------------------------------------------------------------------ helpers

function toDateString(d) {
  return d.toISOString().slice(0, 10);
}

function getLastMod(file) {
  if (!file) return toDateString(new Date());
  try {
    return toDateString(statSync(join(siteRoot, file)).mtime);
  } catch {
    return toDateString(new Date());
  }
}

function renderUrlset(pages) {
  const urls = pages
    .map((p) => {
      const lines = [
        `    <loc>${domain}${p.loc}</loc>`,
        `    <lastmod>${p.lastmod}</lastmod>`,
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
    dir: 'openproteo',
    pages: [
      { loc: '/openproteo/', file: 'src/openproteo/index.html', changefreq: 'monthly', priority: '0.8' },
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
      { loc: '/opentfraw/docs', file: null, changefreq: 'weekly', priority: '0.7' },
    ],
  },
  {
    dir: 'opentimstdf',
    pages: [
      { loc: '/opentimstdf/', file: 'src/opentimstdf/index.html', changefreq: 'monthly', priority: '0.8' },
      { loc: '/opentimstdf/docs', file: null, changefreq: 'weekly', priority: '0.7' },
    ],
  },
  {
    dir: 'openwraw',
    pages: [
      { loc: '/openwraw/', file: 'src/openwraw/index.html', changefreq: 'monthly', priority: '0.8' },
      { loc: '/openwraw/docs', file: null, changefreq: 'weekly', priority: '0.7' },
    ],
  },
  {
    dir: 'openyxdb',
    pages: [
      { loc: '/openyxdb/', file: 'src/openyxdb/index.html', changefreq: 'monthly', priority: '0.8' },
      { loc: '/openyxdb/docs', file: 'src/openyxdb/docs.html', changefreq: 'weekly', priority: '0.7' },
    ],
  },
  {
    dir: 'prolance',
    pages: [
      { loc: '/prolance/', file: 'src/prolance/index.html', changefreq: 'monthly', priority: '0.8' },
    ],
  },
];

// Docusaurus-generated sitemaps - produced by each project's own build, not this
// script. Listed in the main index so Google crawls every doc page.
// Note: SigilYX owns the entire /sigilyx/ path (Docusaurus baseUrl: '/sigilyx/').
// Note: OpenTimsTDF config uses '/OpenTimsTDF/docs/' - verify deployment path casing.
const docusaurusSitemaps = [
  '/blog/sitemap.xml',
  '/dicom-atlas/docs/sitemap.xml',
  '/loom/docs/sitemap.xml',
  '/openkspace/docs/sitemap.xml',
  '/openproteo/docs/sitemap.xml',
  '/openqbw/docs/sitemap.xml',
  '/opensqlanywhere/docs/sitemap.xml',
  '/opentfraw/docs/sitemap.xml',
  '/opentimstdf/docs/sitemap.xml',
  '/openwraw/docs/sitemap.xml',
  '/openyxdb/docs/sitemap.xml',
  '/prolance/docs/sitemap.xml',
  '/sigilyx/sitemap.xml',
];

// ------------------------------------------------------------------ main

function main() {
  mkdirSync(publicDir, { recursive: true });

  // sitemap-core.xml - main Website pages
  const coreEntries = corePages.map((p) => ({ ...p, lastmod: getLastMod(p.file) }));
  writeFileSync(join(publicDir, 'sitemap-core.xml'), renderUrlset(coreEntries), 'utf8');
  console.log('Generated public/sitemap-core.xml');

  // loom/sitemap-core.xml and loom/sitemap.xml (Loom sub-index for standalone use)
  const loomPublicDir = join(publicDir, 'loom');
  mkdirSync(loomPublicDir, { recursive: true });
  const loomEntries = loomPages.map((p) => ({ ...p, lastmod: getLastMod(p.file) }));
  writeFileSync(join(loomPublicDir, 'sitemap-core.xml'), renderUrlset(loomEntries), 'utf8');
  writeFileSync(
    join(loomPublicDir, 'sitemap.xml'),
    renderSitemapIndex(['/loom/sitemap-core.xml', '/loom/docs/sitemap.xml']),
    'utf8'
  );
  console.log('Generated public/loom/sitemap-core.xml and public/loom/sitemap.xml');

  // Per-project stub sitemaps
  for (const project of projectStubs) {
    const dir = join(publicDir, project.dir);
    mkdirSync(dir, { recursive: true });
    const entries = project.pages.map((p) => ({ ...p, lastmod: getLastMod(p.file) }));
    writeFileSync(join(dir, 'sitemap.xml'), renderUrlset(entries), 'utf8');
    console.log(`Generated public/${project.dir}/sitemap.xml`);
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
  writeFileSync(join(publicDir, 'sitemap.xml'), renderSitemapIndex(allSitemapLocs), 'utf8');
  console.log('Generated public/sitemap.xml');
}

main();
