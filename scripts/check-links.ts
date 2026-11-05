/**
 * check-links.ts
 *
 * Checks every internal link and asset reference in the built site (dist/).
 * Run after `vite build`. Exits non-zero when a link points at a page or
 * file that the build does not produce.
 *
 * Paths under MOUNTED_PREFIXES are served by other Cloudflare workers (the
 * Docusaurus docs of each project, the blog, Loom release downloads), so
 * they cannot be checked here. Docs prefixes come from the `docs` field of
 * the project catalog: a link to /foo/docs/ for a project without a docs
 * deployment fails.
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve, posix } from 'node:path';
import { PROJECTS } from '../src/site/projects.ts';

const siteRoot = resolve(import.meta.dirname, '..');
const distDir = join(siteRoot, 'dist');

// Routes served by other workers on sigilweaver.app.
export const MOUNTED_PREFIXES = [
  '/blog/',
  '/releases/',
  ...new Set(PROJECTS.flatMap((p) => (p.docs ? [p.docs] : []))),
];

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

/** Map a URL path to the file Cloudflare's asset server would return. */
function resolveTarget(pathname: string): string | null {
  const clean = decodeURIComponent(pathname);
  const candidates = clean.endsWith('/')
    ? [join(distDir, clean, 'index.html')]
    : [join(distDir, clean), join(distDir, `${clean}.html`), join(distDir, clean, 'index.html')];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile()) ?? null;
}

function isMounted(pathname: string): boolean {
  const withSlash = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return MOUNTED_PREFIXES.some((prefix) => withSlash.startsWith(prefix));
}

function collectIds(html: string): Set<string> {
  const ids = new Set<string>();
  for (const m of html.matchAll(/\sid\s*=\s*["']([^"']+)["']/g)) ids.add(m[1]);
  for (const m of html.matchAll(/\sname\s*=\s*["']([^"']+)["']/g)) ids.add(m[1]);
  return ids;
}

function main() {
  if (!existsSync(distDir)) {
    console.error('dist/ does not exist; run `vite build` first.');
    process.exit(2);
  }

  const htmlFiles = walk(distDir).filter((f) => f.endsWith('.html'));
  const idCache = new Map<string, Set<string>>();
  const getIds = (file: string): Set<string> => {
    let ids = idCache.get(file);
    if (!ids) {
      ids = collectIds(readFileSync(file, 'utf8'));
      idCache.set(file, ids);
    }
    return ids;
  };

  const problems: string[] = [];
  let checked = 0;

  for (const file of htmlFiles) {
    const html = readFileSync(file, 'utf8');
    const rel = relative(distDir, file);
    const pageUrl = '/' + rel.split('\\').join('/');

    const refs = [
      ...[...html.matchAll(/\s(?:href|src)\s*=\s*["']([^"']*)["']/g)].map((m) => m[1]),
      // og:image, twitter:image and similar absolute URLs in meta tags
      ...[...html.matchAll(/<meta[^>]+content\s*=\s*["'](https:\/\/sigilweaver\.app\/[^"']*)["']/g)].map((m) => m[1]),
    ];
    for (const ref of refs) {
      // Absolute links to this site are checked like root-relative ones.
      const raw = ref.trim().replace(/^https:\/\/sigilweaver\.app(?=\/|$)/, '') || (ref.trim() ? '/' : '');
      if (!raw) {
        problems.push(`${rel}: empty link target`);
        continue;
      }
      if (/^(https?:|mailto:|tel:|data:|javascript:)/i.test(raw) || raw.startsWith('//')) continue;
      checked += 1;

      const [beforeHash, hash] = raw.split('#');
      const pathPart = beforeHash.split('?')[0];

      // Same-page fragment
      if (pathPart === '') {
        if (hash === undefined || hash === '') {
          problems.push(`${rel}: placeholder link "${raw}"`);
        } else if (!getIds(file).has(hash)) {
          problems.push(`${rel}: fragment "#${hash}" has no matching id on the page`);
        }
        continue;
      }

      const absolute = pathPart.startsWith('/')
        ? pathPart
        : posix.join(posix.dirname(pageUrl), pathPart);

      if (isMounted(absolute)) continue;

      const target = resolveTarget(absolute);
      if (!target) {
        problems.push(`${rel}: broken link "${raw}"`);
        continue;
      }
      if (hash && target.endsWith('.html') && !getIds(target).has(hash)) {
        problems.push(`${rel}: "${raw}" points at a fragment that does not exist`);
      }
    }
  }

  if (problems.length > 0) {
    console.error(`Link check failed: ${problems.length} problem(s) in ${htmlFiles.length} pages`);
    for (const p of problems) console.error(`  - ${p}`);
    process.exit(1);
  }
  console.log(`Link check passed: ${checked} internal links in ${htmlFiles.length} pages`);
}

main();
