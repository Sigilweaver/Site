/**
 * Writes the sitemaps into dist/ after `vite build`:
 *
 *   dist/sitemap.xml        index of every sitemap below
 *   dist/sitemap-core.xml   every page this repo builds
 *
 * The index also lists the sitemaps that the Docusaurus deployments and the
 * blog publish under their own paths, taken from the project catalog.
 */

import { execFileSync } from 'node:child_process';
import { existsSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { PROJECTS } from '../src/site/projects.ts';

const siteRoot = join(import.meta.dirname, '..');
const outDir = join(siteRoot, 'dist');
const domain = 'https://sigilweaver.app';

interface Page {
    loc: string;
    /** Source files; the newest commit touching any of them is <lastmod>. */
    files: string[];
    changefreq: 'weekly' | 'monthly' | 'yearly';
    priority: string;
}

const CATALOG_SOURCES = ['src/site/projects.ts', 'src/site/pages.ts', 'src/site/layout.ts'];

const pages: Page[] = [
    { loc: '/', files: CATALOG_SOURCES, changefreq: 'weekly', priority: '1.0' },
    { loc: '/docs/', files: CATALOG_SOURCES, changefreq: 'weekly', priority: '0.9' },
    { loc: '/loom/', files: CATALOG_SOURCES, changefreq: 'weekly', priority: '0.9' },
    { loc: '/loom/downloads', files: ['src/loom/downloads.html'], changefreq: 'weekly', priority: '0.8' },
    { loc: '/loom/contributing', files: ['src/loom/contributing.html'], changefreq: 'monthly', priority: '0.5' },
    { loc: '/loom/verify-downloads', files: ['src/loom/verify-downloads.html'], changefreq: 'monthly', priority: '0.4' },
    ...PROJECTS.filter((p) => !p.customPage).map(
        (p): Page => ({ loc: `/${p.slug}/`, files: CATALOG_SOURCES, changefreq: 'monthly', priority: '0.8' }),
    ),
    { loc: '/terms', files: ['src/terms.html'], changefreq: 'yearly', priority: '0.3' },
    { loc: '/privacy', files: ['src/privacy.html'], changefreq: 'yearly', priority: '0.3' },
];

/**
 * Date of the last commit touching any of `files`, as YYYY-MM-DD, or null
 * (the element is then omitted) when git history is unavailable. A file mtime
 * would be the clone time in CI, not the edit time.
 */
function lastModified(files: string[]): string | null {
    try {
        const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...files], {
            cwd: siteRoot,
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'pipe'],
        }).trim();
        return out || null;
    } catch (err) {
        console.warn(`sitemap: no git date for ${files.join(', ')} (${(err as Error).message.split('\n')[0]}); omitting lastmod`);
        return null;
    }
}

function urlset(entries: Page[]): string {
    const urls = entries.map((p) => {
        const lastmod = lastModified(p.files);
        return [
            '  <url>',
            `    <loc>${domain}${p.loc}</loc>`,
            ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
            `    <changefreq>${p.changefreq}</changefreq>`,
            `    <priority>${p.priority}</priority>`,
            '  </url>',
        ].join('\n');
    });
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

function sitemapIndex(locs: string[]): string {
    const entries = locs.map((loc) => `  <sitemap>\n    <loc>${domain}${loc}</loc>\n  </sitemap>`);
    return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</sitemapindex>\n`;
}

if (!existsSync(outDir)) {
    throw new Error('dist/ does not exist; run `vite build` before generating sitemaps');
}

// Docusaurus sitemaps, one per docs deployment (several projects can share one).
const docsSitemaps = [...new Set(PROJECTS.flatMap((p) => (p.docs ? [`${p.docs}sitemap.xml`] : [])))].sort();

writeFileSync(join(outDir, 'sitemap-core.xml'), urlset(pages), 'utf8');
// Google does not follow nested sitemap indexes, so every leaf is listed here.
writeFileSync(join(outDir, 'sitemap.xml'), sitemapIndex(['/sitemap-core.xml', '/blog/sitemap.xml', ...docsSitemaps]), 'utf8');
console.log(`Generated dist/sitemap-core.xml (${pages.length} pages) and dist/sitemap.xml (${docsSitemaps.length + 2} sitemaps)`);
