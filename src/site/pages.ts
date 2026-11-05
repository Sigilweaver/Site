/**
 * Build-time renderers for the generated pages: homepage, docs hub and one
 * landing page per catalog project.
 */

import {
    CATEGORIES,
    CORPORA,
    LICENSE_URLS,
    PROJECTS,
    getProject,
    packageUrl,
    projectsIn,
    type Project,
} from './projects.ts';
import { escapeHtml, externalAttrs, headline, html, inline, plain } from './html.ts';
import { icon } from './icons.ts';
import { ORGANIZATION_LD, SITE_NAME, SITE_URL, renderDocument } from './layout.ts';

// ------------------------------------------------------------------ shared pieces

function projectHref(p: Project): string {
    return `/${p.slug}/`;
}

function meta(p: Project): string {
    const parts = [
        p.version ? `v${p.version}` : 'Not yet published',
        p.license,
        p.languages.join(', '),
    ];
    return parts.map((x) => `<span>${escapeHtml(x)}</span>`).join('<span aria-hidden="true">&middot;</span>');
}

function badge(p: Project): string {
    return p.badge ? `<span class="badge">${escapeHtml(p.badge)}</span>` : '';
}

function projectCard(p: Project): string {
    return html`
    <article class="card card-link group">
      <div class="flex items-start justify-between gap-3">
        <h3 class="text-lg font-semibold text-strong">
          <a href="${projectHref(p)}" class="card-title-link">${escapeHtml(p.name)}</a>
        </h3>
        ${badge(p)}
      </div>
      <p class="mt-2 text-sm leading-relaxed text-muted">${inline(p.tagline)}</p>
      ${p.formats ? `<ul class="mt-4 flex flex-wrap gap-1.5" aria-label="File types">${p.formats.map((f) => `<li class="chip">${escapeHtml(f)}</li>`).join('')}</ul>` : ''}
      <p class="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-subtle">${meta(p)}</p>
    </article>`;
}

function categorySection(id: (typeof CATEGORIES)[number]['id'], headingLevel: 'h2' | 'h3' = 'h2'): string {
    const category = CATEGORIES.find((c) => c.id === id)!;
    const items = projectsIn(id).filter((p) => !p.customPage);
    return html`
    <section class="mt-16" aria-labelledby="cat-${id}">
      <${headingLevel} id="cat-${id}" class="section-title">${escapeHtml(category.title)}</${headingLevel}>
      <p class="mt-2 max-w-2xl text-muted">${escapeHtml(category.blurb)}</p>
      <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        ${items.map(projectCard)}
      </div>
    </section>`;
}

// ------------------------------------------------------------------ homepage

export function renderHome(): string {
    const loom = getProject('loom');
    const readerCount = PROJECTS.filter((p) => !p.customPage).length;
    const body = html`
    <section class="hero">
      <div class="wrap py-20 sm:py-28">
        <p class="eyebrow">Open source &middot; Clean room &middot; Rust and Python</p>
        <h1 class="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-strong sm:text-6xl">
          Open-source readers for <span class="text-accent">closed data formats</span>.
        </h1>
        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Sigilweaver writes open specifications and Rust and Python readers for proprietary file
          formats in mass spectrometry, business software and medical imaging, and builds Loom, a
          self-hosted visual data pipeline tool.
        </p>
        <div class="mt-9 flex flex-wrap gap-3">
          <a href="#projects" class="btn btn-primary">Browse ${readerCount} projects ${icon.arrowRight('icon h-4 w-4')}</a>
          <a href="/docs/" class="btn btn-secondary">${icon.docs('icon h-4 w-4')} Documentation</a>
          <a href="https://github.com/Sigilweaver" class="btn btn-ghost"${externalAttrs('https://github.com')}>${icon.github('icon h-4 w-4')} GitHub</a>
        </div>
      </div>
    </section>

    <div class="wrap pb-24 pt-14">
      <section aria-labelledby="principles" class="grid gap-4 md:grid-cols-3">
        <h2 id="principles" class="sr-only">How the projects are built</h2>
        <div class="card">
          <h3 class="font-semibold text-strong">Clean-room</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">Readers are derived from public sample files and public documentation. They ship no vendor code and need no vendor SDK.</p>
        </div>
        <div class="card">
          <h3 class="font-semibold text-strong">Open specifications</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">Where a format is reverse-engineered, the write-up is published in the repository next to the code, so others can build their own readers.</p>
        </div>
        <div class="card">
          <h3 class="font-semibold text-strong">Known limits, written down</h3>
          <p class="mt-2 text-sm leading-relaxed text-muted">Each project lists what it does not decode correctly yet. Project pages below summarize those limits.</p>
        </div>
      </section>

      <section class="mt-16" aria-labelledby="cat-platform">
        <h2 id="cat-platform" class="section-title">Data pipelines</h2>
        <a href="/loom/" class="card card-link mt-6 block overflow-hidden sm:p-8">
          <div class="flex flex-wrap items-center gap-3">
            <span class="text-2xl font-bold text-strong">Loom</span>
            ${badge(loom)}
          </div>
          <p class="mt-3 max-w-3xl text-muted">${inline(loom.tagline)} ${inline(loom.summary)}</p>
          <span class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">About Loom ${icon.arrowRight('icon h-4 w-4')}</span>
        </a>
      </section>

      <div id="projects" class="scroll-mt-20">
        ${categorySection('mass-spec')}
        ${categorySection('business')}
        ${categorySection('life-sciences')}
      </div>

      <section class="mt-16" aria-labelledby="corpora">
        <h2 id="corpora" class="section-title">Public test corpora</h2>
        <p class="mt-2 max-w-2xl text-muted">Indexes of publicly available sample files that the format readers are developed and checked against.</p>
        <ul class="mt-6 grid gap-4 sm:grid-cols-2">
          ${CORPORA.map(
              (c) => html`<li class="card"><a class="font-semibold text-strong hover:text-accent" href="${c.repo}"${externalAttrs(c.repo)}>${escapeHtml(c.name)}</a><p class="mt-1 text-sm text-muted">${escapeHtml(c.description)}</p></li>`,
          )}
        </ul>
      </section>
    </div>`;

    return renderDocument({
        title: 'Sigilweaver: open-source readers for closed data formats',
        description:
            'Open specifications and Rust and Python readers for proprietary file formats in mass spectrometry, business software and medical imaging, plus Loom, a self-hosted visual data pipeline tool.',
        path: '/',
        body,
        jsonLd: [
            { '@context': 'https://schema.org', ...ORGANIZATION_LD },
            { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: SITE_URL },
        ],
    });
}

// ------------------------------------------------------------------ docs hub

export function renderDocsHub(): string {
    const row = (p: Project) => {
        const target = p.docs ?? `${p.repo}#readme`;
        const label = p.docs ? 'Docs' : 'README';
        return html`
        <li class="card card-link flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div class="min-w-0">
            <h3 class="font-semibold text-strong">
              <a class="card-title-link" href="${target}"${externalAttrs(target)}>${escapeHtml(p.name)} <span class="sr-only">${label}</span></a>
            </h3>
            <p class="mt-1 text-sm text-muted">${inline(p.tagline)}</p>
          </div>
          <span class="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent">
            ${p.docs ? icon.docs('icon h-4 w-4') : icon.github('icon h-4 w-4')} ${label}
          </span>
        </li>`;
    };
    const sections = CATEGORIES.map(
        (c) => html`
      <section class="mt-12" aria-labelledby="docs-${c.id}">
        <h2 id="docs-${c.id}" class="section-title">${escapeHtml(c.title)}</h2>
        <ul class="mt-5 grid gap-3">
          ${projectsIn(c.id).filter((p) => p.slug !== 'openmassspec-core').map(row)}
        </ul>
      </section>`,
    );
    const body = html`
    <div class="wrap py-16 sm:py-20"><div class="max-w-4xl">
      <p class="eyebrow">Documentation</p>
      <h1 class="mt-3 text-4xl font-bold tracking-tight text-strong sm:text-5xl">Project documentation</h1>
      <p class="mt-5 max-w-2xl text-lg text-muted">
        Each project publishes its own reference site with installation, usage, API and format
        notes. Projects without a docs site yet link to their README.
      </p>
      ${sections}
    </div></div>`;
    return renderDocument({
        title: 'Documentation - Sigilweaver',
        description: 'Documentation for every Sigilweaver project: install guides, API references and format notes.',
        path: '/docs/',
        body,
    });
}

// ------------------------------------------------------------------ project page

export function renderProjectPage(slug: string): string {
    const p = getProject(slug);
    const category = CATEGORIES.find((c) => c.id === p.category)!;
    const related = (p.related ?? []).map(getProject);

    const actions = [
        p.docs ? `<a href="${p.docs}" class="btn btn-primary">${icon.docs('icon h-4 w-4')} Documentation</a>` : '',
        `<a href="${p.repo}" class="btn ${p.docs ? 'btn-secondary' : 'btn-primary'}"${externalAttrs(p.repo)}>${icon.github('icon h-4 w-4')} Source on GitHub</a>`,
        ...p.packages.map(
            (pkg) => `<a href="${packageUrl(pkg)}" class="btn btn-ghost"${externalAttrs(packageUrl(pkg))}>${icon.package('icon h-4 w-4')} ${escapeHtml(pkg.name)} <span class="sr-only">on</span><span class="text-subtle">${pkg.registry}</span></a>`,
        ),
    ].join('');

    const install = p.install.length
        ? html`
      <section aria-labelledby="install" class="mt-14">
        <h2 id="install" class="section-title">Install</h2>
        <div class="mt-5 space-y-3">
          ${p.install.map(
              (cmd) => html`
          <div class="code-block">
            <code><span class="select-none text-subtle" aria-hidden="true">$ </span>${escapeHtml(cmd)}</code>
            <button type="button" class="copy-button" data-copy="${escapeHtml(cmd)}" aria-label="Copy command: ${escapeHtml(cmd)}">${icon.copy('icon h-4 w-4 copy-icon')}${icon.check('icon h-4 w-4 copied-icon')}</button>
          </div>`,
          )}
        </div>
        ${p.installNote ? `<p class="mt-3 text-sm text-muted">${inline(p.installNote)}</p>` : ''}
      </section>`
        : '';

    const body = html`
    <section class="hero">
      <div class="wrap py-16 sm:py-20">
        <nav aria-label="Breadcrumb" class="text-sm text-subtle">
          <ol class="flex flex-wrap items-center gap-2">
            <li><a href="/" class="hover:text-accent">Home</a></li>
            <li aria-hidden="true">/</li>
            <li><a href="/#cat-${p.category}" class="hover:text-accent">${escapeHtml(category.title)}</a></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" class="text-muted">${escapeHtml(p.name)}</li>
          </ol>
        </nav>
        <div class="mt-8 flex flex-wrap items-center gap-3">
          <p class="eyebrow">${escapeHtml(p.name)}</p>
          ${badge(p)}
        </div>
        <h1 class="mt-3 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-strong sm:text-5xl">${headline(p.headline)}</h1>
        <p class="mt-6 max-w-3xl text-lg leading-relaxed text-muted">${inline(p.summary)}</p>
        <p class="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-subtle">
          ${p.version ? `<span>Latest release v${escapeHtml(p.version)}</span>` : '<span>Not yet published to a package registry</span>'}
          <span aria-hidden="true">&middot;</span>
          <a class="hover:text-accent" href="${LICENSE_URLS[p.license]}"${externalAttrs(LICENSE_URLS[p.license])}>${escapeHtml(p.license)}</a>
          <span aria-hidden="true">&middot;</span>
          <span>${escapeHtml(p.languages.join(', '))}</span>
        </p>
        <div class="mt-8 flex flex-wrap gap-3">${actions}</div>
      </div>
    </section>

    <div class="wrap pb-24"><div class="max-w-4xl">
      <section aria-labelledby="audience" class="mt-14 grid gap-8 md:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 id="audience" class="section-title">Who it is for</h2>
          <p class="mt-4 leading-relaxed text-muted">${inline(p.audience)}</p>
          ${p.formats ? `<h3 class="mt-6 text-sm font-semibold uppercase tracking-wider text-subtle">File types</h3><ul class="mt-3 flex flex-wrap gap-1.5">${p.formats.map((f) => `<li class="chip">${escapeHtml(f)}</li>`).join('')}</ul>` : ''}
        </div>
        <div>
          <h2 class="section-title">What it does</h2>
          <ul class="mt-4 space-y-3">
            ${p.highlights.map((h) => `<li class="check-item">${icon.check('icon mt-1 h-4 w-4 shrink-0 text-accent')}<span>${inline(h)}</span></li>`)}
          </ul>
        </div>
      </section>

      <section aria-labelledby="status" class="callout mt-14">
        <h2 id="status" class="flex items-center gap-2 font-semibold text-strong">${icon.warning('icon h-5 w-5 text-accent')} Status and known limitations</h2>
        <p class="mt-2 leading-relaxed text-muted">${inline(p.status)}</p>
        <p class="mt-3 text-sm"><a class="text-accent underline-offset-4 hover:underline" href="${p.repo}#readme"${externalAttrs(p.repo)}>Full details in the README</a></p>
      </section>

      ${install}

      ${
          related.length
              ? html`
      <section aria-labelledby="related" class="mt-14">
        <h2 id="related" class="section-title">Related projects</h2>
        <div class="mt-5 grid gap-4 sm:grid-cols-2">${related.map(projectCard)}</div>
      </section>`
              : ''
      }
    </div></div>`;

    return renderDocument({
        title: `${p.name}: ${plain(p.headline).replace(/\.$/, '')} - Sigilweaver`,
        description: plain(p.tagline),
        path: projectHref(p),
        ogImage: `/og/${p.slug}.jpg`,
        body,
        jsonLd: [
            {
                '@context': 'https://schema.org',
                '@type': 'SoftwareSourceCode',
                name: p.name,
                description: plain(p.tagline),
                url: SITE_URL + projectHref(p),
                codeRepository: p.repo,
                programmingLanguage: p.languages,
                license: LICENSE_URLS[p.license],
                ...(p.version ? { version: p.version } : {}),
                author: ORGANIZATION_LD,
            },
        ],
    });
}
