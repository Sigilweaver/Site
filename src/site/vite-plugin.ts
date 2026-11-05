/**
 * Vite plugin that renders the site at build time.
 *
 * - Generated pages (homepage, docs hub, one per catalog project) have no
 *   HTML file on disk. They are build inputs at src/<path>/index.html, and
 *   this plugin supplies their content in `load` (build) or a middleware
 *   (dev server).
 * - Hand-written pages (Loom, legal) keep their own HTML; the plugin
 *   replaces their `<div id="header-root" data-nav="...">` and
 *   `<div id="footer-root">` placeholders with the shared header and footer.
 */

import { resolve } from 'node:path';
import type { Plugin } from 'vite';
import { GENERATED_PROJECT_SLUGS, isNavName, renderFooter, renderHeader } from './layout.ts';
import { renderDocsHub, renderHome, renderProjectPage } from './pages.ts';

export interface GeneratedPage {
    /** URL path, e.g. "/openqbw/". */
    path: string;
    /** Rollup input name, e.g. "openqbw/index". */
    name: string;
    render: () => string;
}

export function generatedPages(): GeneratedPage[] {
    return [
        { path: '/', name: 'main', render: renderHome },
        { path: '/docs/', name: 'docs/index', render: renderDocsHub },
        ...GENERATED_PROJECT_SLUGS.map((slug) => ({
            path: `/${slug}/`,
            name: `${slug}/index`,
            render: () => renderProjectPage(slug),
        })),
    ];
}

/** Absolute path Vite uses as the module id of a generated page. */
export function pageFile(srcRoot: string, page: GeneratedPage): string {
    return resolve(srcRoot, `.${page.path}index.html`);
}

/** URL path of an HTML file relative to the Vite root ("/loom/index.html" -> "/loom/"). */
function urlPath(htmlPath: string): string {
    return htmlPath.replace(/index\.html$/, '').replace(/\.html$/, '');
}

const HEADER_RE = /<div id="header-root"(?:\s+data-nav="([^"]*)")?\s*><\/div>/;
const FOOTER_RE = /<div id="footer-root"\s*><\/div>/;

export function injectLayout(html: string, htmlPath: string): string {
    return html
        .replace(HEADER_RE, (_match, nav: string | undefined) => {
            const name = nav ?? 'site';
            if (!isNavName(name)) {
                throw new Error(`${htmlPath}: unknown data-nav="${name}"`);
            }
            return renderHeader(name, urlPath(htmlPath));
        })
        .replace(FOOTER_RE, () => renderFooter());
}

export function sitePages(srcRoot: string): Plugin {
    const pages = generatedPages();
    const byFile = new Map(pages.map((p) => [pageFile(srcRoot, p), p]));
    const byUrl = new Map<string, GeneratedPage>();
    for (const p of pages) {
        byUrl.set(p.path, p);
        byUrl.set(`${p.path}index.html`, p);
        if (p.path !== '/') byUrl.set(p.path.slice(0, -1), p);
    }

    return {
        name: 'sigilweaver-site-pages',
        enforce: 'pre',
        resolveId(id) {
            return byFile.has(id) ? id : null;
        },
        load(id) {
            return byFile.get(id)?.render() ?? null;
        },
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                const url = (req.url ?? '/').split('?')[0];
                const page = byUrl.get(url);
                if (!page) return next();
                try {
                    const out = await server.transformIndexHtml(page.path, page.render(), req.originalUrl);
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    res.end(out);
                } catch (err) {
                    next(err);
                }
            });
        },
        transformIndexHtml: {
            order: 'pre',
            handler(html, ctx) {
                return injectLayout(html, ctx.path);
            },
        },
    };
}
