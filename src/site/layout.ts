/**
 * Build-time page shell: <head>, header and footer.
 *
 * Rendered into every page by the Vite plugin in ./vite-plugin.ts, so the
 * navigation is in the HTML that crawlers and no-JS visitors receive.
 */

import { CATEGORIES, PROJECTS, projectsIn } from './projects.ts';
import { escapeHtml, externalAttrs, html } from './html.ts';
import { icon } from './icons.ts';

export const SITE_URL = 'https://sigilweaver.app';
export const SITE_NAME = 'Sigilweaver';
export const DEFAULT_OG_IMAGE = '/og/sigilweaver.jpg';

// ------------------------------------------------------------------ navigation

export interface NavLink {
    label: string;
    href: string;
}

export interface NavConfig {
    links: NavLink[];
    cta?: NavLink;
}

export const NAVS = {
    site: {
        links: [
            { label: 'Projects', href: '/#projects' },
            { label: 'Loom', href: '/loom/' },
            { label: 'Docs', href: '/docs/' },
            { label: 'Blog', href: '/blog/' },
            { label: 'GitHub', href: 'https://github.com/Sigilweaver' },
        ],
    },
    loom: {
        links: [
            { label: 'Docs', href: '/loom/docs/' },
            { label: 'Contributing', href: '/loom/contributing' },
            { label: 'All projects', href: '/#projects' },
            { label: 'GitHub', href: 'https://github.com/Sigilweaver/Loom' },
        ],
        cta: { label: 'Download', href: '/loom/downloads' },
    },
} satisfies Record<string, NavConfig>;

export type NavName = keyof typeof NAVS;

export function isNavName(value: string): value is NavName {
    return Object.prototype.hasOwnProperty.call(NAVS, value);
}

// ------------------------------------------------------------------ head

export interface HeadOptions {
    title: string;
    description: string;
    /** Path of the canonical URL, e.g. "/openqbw/". */
    path: string;
    ogImage?: string;
    ogType?: 'website' | 'article';
    jsonLd?: object[];
}

export function renderHead(o: HeadOptions): string {
    const url = SITE_URL + o.path;
    const image = SITE_URL + (o.ogImage ?? DEFAULT_OG_IMAGE);
    const title = escapeHtml(o.title);
    const description = escapeHtml(o.description);
    return html`
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="${o.ogType ?? 'website'}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${image}" />
    ${renderHeadAssets()}
    ${(o.jsonLd ?? []).map((data) => `<script type="application/ld+json">${JSON.stringify(data)}</script>`)}`;
}

/**
 * Applies a stored theme choice before first paint. Inline on purpose: an
 * external script would let the page flash in the wrong theme.
 */
export const THEME_SCRIPT = `<script>(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();</script>`;

/** Theme script, theme colour, icons, manifest and fonts shared by every page. */
export function renderHeadAssets(): string {
    return `${THEME_SCRIPT}
    <meta name="color-scheme" content="dark light" />
    <meta name="theme-color" content="#160a26" media="(prefers-color-scheme: dark)" />
    <meta name="theme-color" content="#faf8ff" media="(prefers-color-scheme: light)" />
    <link rel="icon" href="/icons/favicon.ico" sizes="48x48" />
    <link rel="icon" type="image/svg+xml" href="/icons/sigilweaver-logo.svg" />
    <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="preload" href="/fonts/InterVariable.woff2" as="font" type="font/woff2" crossorigin />`;
}

// ------------------------------------------------------------------ header

function navLink(link: NavLink, current: string, cls: string): string {
    const active = current !== '' && (link.href === current || (link.href !== '/' && link.href.endsWith('/') && current.startsWith(link.href)));
    return `<a href="${link.href}" class="${cls}"${active ? ' aria-current="page"' : ''}${externalAttrs(link.href)}>${escapeHtml(link.label)}</a>`;
}

export function renderHeader(nav: NavName, currentPath = ''): string {
    const config: NavConfig = NAVS[nav];
    return html`
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <header class="site-header" data-site-header>
      <div class="wrap flex h-16 items-center gap-2">
        <a href="/" class="brand mr-auto" aria-label="Sigilweaver home">
          <img src="/icons/sigilweaver-logo.svg" alt="" width="28" height="28" />
          <span>Sigilweaver</span>
        </a>
        <nav aria-label="Main" class="hidden md:flex items-center gap-1">
          ${config.links.map((l) => navLink(l, currentPath, 'nav-link'))}
          ${config.cta ? `<a href="${config.cta.href}" class="btn btn-primary btn-sm ml-3">${escapeHtml(config.cta.label)}</a>` : ''}
        </nav>
        <div class="-mr-2 flex items-center gap-1">
        <button type="button" class="icon-button theme-toggle" data-theme-toggle hidden aria-label="Switch to light theme">
          ${icon.sun('icon h-5 w-5 theme-icon-light')}${icon.moon('icon h-5 w-5 theme-icon-dark')}
        </button>
        <button type="button" class="icon-button md:hidden" data-menu-toggle aria-controls="mobile-menu" aria-expanded="false" aria-label="Open menu">
          ${icon.menu('icon h-6 w-6 menu-open-icon')}${icon.close('icon h-6 w-6 menu-close-icon')}
        </button>
        </div>
      </div>
      <nav id="mobile-menu" class="mobile-menu md:hidden" aria-label="Main" hidden>
        <div class="wrap flex flex-col gap-1 py-3">
          ${config.links.map((l) => navLink(l, currentPath, 'mobile-link'))}
          ${config.cta ? `<a href="${config.cta.href}" class="btn btn-primary mt-2">${escapeHtml(config.cta.label)}</a>` : ''}
        </div>
      </nav>
    </header>`;
}

// ------------------------------------------------------------------ footer

export function renderFooter(): string {
    const year = new Date().getFullYear();
    const columns = CATEGORIES.map((c) => ({
        title: c.title,
        links: projectsIn(c.id).map((p) => ({ label: p.name, href: `/${p.slug}/` })),
    }));
    columns.push({
        title: 'Resources',
        links: [
            { label: 'Documentation', href: '/docs/' },
            { label: 'Blog', href: '/blog/' },
            { label: 'GitHub', href: 'https://github.com/Sigilweaver' },
            { label: 'Terms of Use', href: '/terms' },
            { label: 'Privacy Policy', href: '/privacy' },
        ],
    });
    return html`
    <footer class="site-footer">
      <div class="wrap py-14">
        <div class="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.4fr_repeat(5,1fr)]">
          <div class="col-span-2 lg:col-span-1">
            <a href="/" class="brand"><img src="/icons/sigilweaver-logo.svg" alt="" width="28" height="28" /><span>Sigilweaver</span></a>
            <p class="mt-4 text-sm text-muted max-w-xs">
              Open-source readers for closed data formats, and Loom, a self-hosted visual data pipeline tool.
            </p>
          </div>
          ${columns.map(
              (col) => html`
            <div>
              <h2 class="footer-heading">${escapeHtml(col.title)}</h2>
              <ul class="mt-3 space-y-2 text-sm">
                ${col.links.map((l) => `<li><a class="footer-link" href="${l.href}"${externalAttrs(l.href)}>${escapeHtml(l.label)}</a></li>`)}
              </ul>
            </div>`,
          )}
        </div>
        <p class="mt-12 border-t border-line pt-8 text-sm text-muted">
          &copy; ${year} Sigilweaver Holdings LLC. Sigilweaver&trade; is a trademark of Sigilweaver Holdings LLC.
        </p>
      </div>
    </footer>`;
}

// ------------------------------------------------------------------ document

export interface DocumentOptions extends HeadOptions {
    nav?: NavName;
    body: string;
}

/** A complete page: head, header, main content and footer. */
export function renderDocument(o: DocumentOptions): string {
    return html`<!DOCTYPE html>
<html lang="en">
  <head>${renderHead(o)}
  </head>
  <body>
    ${renderHeader(o.nav ?? 'site', o.path)}
    <main id="main-content" tabindex="-1">
      ${o.body}
    </main>
    ${renderFooter()}
    <script type="module" src="/site/page.ts"></script>
  </body>
</html>
`;
}

export const ORGANIZATION_LD = {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icons/icon-512.png`,
    sameAs: ['https://github.com/Sigilweaver'],
};

/** All project slugs that get a generated landing page. */
export const GENERATED_PROJECT_SLUGS = PROJECTS.filter((p) => !p.customPage).map((p) => p.slug);
