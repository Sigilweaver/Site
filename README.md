# sigilweaver.app

The Sigilweaver website: the homepage, the docs hub, the Loom pages and one
landing page per project. It is a multi-page Vite build (TypeScript and
Tailwind CSS, no framework) served by a single Cloudflare Worker at
`sigilweaver.app/*`.

Each project's documentation (Docusaurus) and the blog live in their own
repositories and are deployed by more specific worker routes, which take
precedence over this one:

```
sigilweaver.app/                  this repo (homepage)
sigilweaver.app/docs/             this repo (docs hub)
sigilweaver.app/loom/             this repo (Loom pages)
sigilweaver.app/loom/docs/        Sigilweaver/Loom, docs/
sigilweaver.app/<project>/        this repo (project landing page)
sigilweaver.app/<project>/docs/   Sigilweaver/<Project>, docs/
sigilweaver.app/blog/             Sigilweaver/Blog
```

## Layout

```
src/
  site/projects.ts    the project catalog: every project the site lists
  site/pages.ts       renders the homepage, docs hub and project pages
  site/layout.ts      shared <head>, header, footer and navigation
  site/vite-plugin.ts serves the generated pages and injects the layout
  site/client.ts      browser behaviour (mobile menu, copy buttons)
  styles/global.css   Tailwind entry, design tokens and components
  loom/               hand-written Loom pages, download logic and tests
  terms.html, privacy.html
public/               copied as-is (fonts, icons, Open Graph images, _headers)
scripts/              sitemaps, llms.txt, link check, Open Graph images
dist/                 build output (gitignored)
```

The homepage, the docs hub and the project landing pages have no HTML file:
they are rendered at build time from `src/site/projects.ts`. Hand-written
pages put `<div id="header-root" data-nav="site|loom"></div>` and
`<div id="footer-root"></div>` where the shared header and footer go.

## Adding or updating a project

1. Edit its entry in `src/site/projects.ts`. Every statement there must be
   backed by the project's repository or its published packages; versions
   are the latest published release.
2. Run `bun run og` to render its Open Graph image into `public/og/`.
3. Run `bun run test` and `bun run build`.

The page, navigation, footer, docs hub entry, sitemap entry, `llms.txt`
line and link-check allowlist all follow from the catalog.

## Commands

```sh
bun install
bun run dev          # dev server on http://localhost:25807
bun run test         # unit tests (vitest)
bun run build        # type-check, build, sitemaps, llms.txt, link check
bun run og           # re-render Open Graph images (needs playwright)
bun run deploy       # build, then wrangler deploy
```

`bun run build` fails when a page links to a file the build does not
produce, or to a docs path that no project in the catalog deploys. Paths
served by other workers are `MOUNTED_PREFIXES` in `scripts/check-links.ts`.
