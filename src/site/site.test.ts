import { describe, expect, it } from 'vitest';
import { CATEGORIES, PROJECTS, packageUrl } from './projects.ts';
import { renderDocsHub, renderHome, renderProjectPage } from './pages.ts';
import { generatedPages, injectLayout } from './vite-plugin.ts';
import { renderHeader } from './layout.ts';

// Plain ASCII only: no smart quotes, dashes or other typographic characters.
const NON_ASCII = /[^\x09\x0a\x0d\x20-\x7e]/;

describe('project catalog', () => {
    it('has unique slugs and names', () => {
        const slugs = PROJECTS.map((p) => p.slug);
        const names = PROJECTS.map((p) => p.name);
        expect(new Set(slugs).size).toBe(slugs.length);
        expect(new Set(names).size).toBe(names.length);
    });

    it('uses only known categories, and every category has projects', () => {
        const ids = CATEGORIES.map((c) => c.id);
        for (const p of PROJECTS) expect(ids).toContain(p.category);
        for (const id of ids) expect(PROJECTS.some((p) => p.category === id)).toBe(true);
    });

    it('is plain ASCII', () => {
        for (const p of PROJECTS) {
            const text = JSON.stringify(p);
            expect(NON_ASCII.test(text), `${p.slug} contains non-ASCII text`).toBe(false);
        }
    });

    it('points every project at its Sigilweaver repository', () => {
        for (const p of PROJECTS) expect(p.repo).toMatch(/^https:\/\/github\.com\/Sigilweaver\/[A-Za-z-]+$/);
    });

    it('uses the /<project>/docs/ form for docs paths', () => {
        for (const p of PROJECTS) {
            if (p.docs) expect(p.docs).toMatch(/^\/[a-z-]+\/docs\/$/);
        }
    });

    it('only references existing related projects', () => {
        const slugs = new Set(PROJECTS.map((p) => p.slug));
        for (const p of PROJECTS) for (const r of p.related ?? []) expect(slugs.has(r), `${p.slug} -> ${r}`).toBe(true);
    });

    it('builds registry URLs', () => {
        expect(packageUrl({ registry: 'PyPI', name: 'openqvd' })).toBe('https://pypi.org/project/openqvd/');
        expect(packageUrl({ registry: 'crates.io', name: 'openqvd' })).toBe('https://crates.io/crates/openqvd');
    });

    it('lists an install path for every project without a custom page', () => {
        for (const p of PROJECTS.filter((x) => !x.customPage)) {
            expect(p.install.length, p.slug).toBeGreaterThan(0);
            if (p.version === null) expect(p.packages, `${p.slug} is unpublished`).toEqual([]);
        }
    });
});

describe('generated pages', () => {
    const pages = generatedPages();

    it('generates the homepage, docs hub and one page per project', () => {
        expect(pages.map((p) => p.path)).toEqual(
            expect.arrayContaining(['/', '/docs/', '/loom/', ...PROJECTS.filter((p) => !p.customPage).map((p) => `/${p.slug}/`)]),
        );
    });

    it.each(pages.map((p) => [p.path, p] as const))('%s renders plain ASCII with one h1 and a canonical URL', (path, page) => {
        const out = page.render();
        expect(NON_ASCII.test(out)).toBe(false);
        expect(out.match(/<h1[\s>]/g)?.length).toBe(1);
        expect(out).toContain(`<link rel="canonical" href="https://sigilweaver.app${path}" />`);
        expect(out).toContain('id="main-content"');
    });

    it('links each project page to its repository and docs', () => {
        for (const p of PROJECTS.filter((x) => !x.customPage)) {
            const out = renderProjectPage(p.slug);
            expect(out).toContain(`href="${p.repo}"`);
            if (p.docs) expect(out).toContain(`href="${p.docs}"`);
            expect(out).toContain(`/og/${p.slug}.jpg`);
        }
    });

    it('lists every project on the homepage and the docs hub', () => {
        const home = renderHome();
        const docs = renderDocsHub();
        for (const p of PROJECTS) {
            expect(home).toContain(`href="/${p.slug}/"`);
            if (p.slug !== 'openmassspec-core') expect(docs).toContain(p.name);
        }
    });
});

describe('layout injection', () => {
    it('replaces header and footer placeholders', () => {
        const out = injectLayout('<div id="header-root" data-nav="loom"></div><main></main><div id="footer-root"></div>', '/loom/index.html');
        expect(out).toContain('class="site-header"');
        expect(out).toContain('href="/loom/downloads"');
        expect(out).toContain('class="site-footer"');
        expect(out).not.toContain('header-root');
    });

    it('rejects unknown navigation names', () => {
        expect(() => injectLayout('<div id="header-root" data-nav="nope"></div>', '/x.html')).toThrow(/unknown data-nav/);
    });

    it('marks the current section in the navigation', () => {
        expect(renderHeader('site', '/docs/')).toMatch(/href="\/docs\/" class="nav-link" aria-current="page"/);
    });
});
