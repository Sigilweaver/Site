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
src/                  Vite root; one directory per page group
  index.html          homepage
  docs/               docs hub
  loom/               Loom pages, download logic and tests
  <project>/          project landing pages
  components/         shared header, footer and navigation config
  styles/global.css   Tailwind entry and shared styles
public/               copied as-is (fonts, icons, Open Graph images, _headers)
scripts/              build helpers (sitemaps, llms.txt, link check, OG images)
dist/                 build output (gitignored)
```

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
produce, or to a docs path that no project deploys. The list of paths
served by other workers is `MOUNTED_PREFIXES` in `scripts/check-links.mjs`.
