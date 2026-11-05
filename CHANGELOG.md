# Changelog

All notable changes to sigilweaver.app are recorded here.

## Unreleased

### Added

- Light theme. The site follows the system preference, and a toggle in the
  header switches and remembers the choice. An inline script applies the
  stored choice before first paint. Every page, including the Loom and legal
  pages, passes an axe-core WCAG 2 AA check in both themes.

- Project catalog (`src/site/projects.ts`), checked against each public
  repository and the published PyPI and crates.io versions. The homepage,
  docs hub, project pages, footer, sitemaps, `llms.txt`, Open Graph images
  and the link-check allowlist are generated from it.
- Landing pages for OpenSZRaw (Shimadzu) and OpenMassSpecCore.
- Every project page states who the project is for, its latest published
  version, license and languages, install commands with copy buttons, and a
  "Status and known limitations" summary taken from the repository README.
- Per-project Open Graph images, Twitter card tags, `og:image` sizes,
  JSON-LD (`SoftwareSourceCode`, `Organization`, `WebSite`) and a web app
  manifest.
- Unit tests for the catalog and the generated pages (ASCII-only text,
  one `h1`, canonical URL, repository and docs links).

- CI workflow that runs the unit tests and the full build on every pull
  request and push to `main`.
- `scripts/check-links.mjs`, run at the end of `bun run build`: fails the
  build on internal links, assets, fragments or `og:image` URLs that the
  build does not produce, and on links to docs paths that no project
  deploys.
- Site-wide Open Graph image (`public/og/sigilweaver.jpg`) and its
  generator, `scripts/render-og.mjs`.

### Changed

- The Loom page is rewritten from the Loom repository READMEs: what
  Studio, Server and Hub are, the features the READMEs list, who it is for,
  licensing, and links to downloads and the user, deployment and
  contributor docs. It is now generated with the other pages and has its own
  Open Graph image and `SoftwareApplication` JSON-LD.

- The header and footer are rendered into the HTML at build time instead of
  being injected by JavaScript, so navigation works without JavaScript and
  is visible to crawlers. The header is sticky, marks the current section,
  and links the blog.
- New visual design: semantic colour tokens, shared component styles,
  consistent page width, and a footer listing every project.
- Inter is loaded on every page (it was only loaded on the Loom pages) and
  preloaded.
- One `sitemap-core.xml` lists every page this repo builds; the
  per-project sitemap stubs are gone.

- Updated Vite to 8, Vitest to 4.1, Lucide to 1.x and the PostCSS tooling.
- Sitemaps and `llms.txt` are generated into `dist/` after `vite build`
  instead of being committed under `public/`. Sitemap `<lastmod>` comes
  from the last git commit that touched each page, not the file mtime.
- Docs links use the trailing-slash form that the Docusaurus deployments
  serve (`/<project>/docs/`).

### Removed

- Claims on the Loom page that the Loom repository does not support:
  Electron, a "Python orchestrator", exporting workflows as standalone code,
  "compliance ready", Git integration, a "semi-permissive" license, the
  `Python 3.10+` requirement and FAQ structured data. Also the link to a
  frontend demo that the Loom repository does not reference.
- Unused Loom styles (demo nodes, use-case cards, Prism overrides).

- The OpenYXDB docs stub page at `/openyxdb/docs`; the OpenYXDB Docusaurus
  site at `/openyxdb/docs/` replaces it.
- Unused `prismjs` dependency, and `robots.txt` files under `/loom/` and
  `/openyxdb/`, which crawlers ignore outside the site root.

### Fixed

- The mobile menu on Loom pages never became visible: a Loom stylesheet
  rule kept it at zero opacity.
- On phones, Loom pages added 12px padding to every link and button,
  including the header and footer; the rule now applies to page content only.
- Heading order on the Loom downloads page.
- The Loom page's canonical URL and `og:url` pointed at the homepage.

- Project descriptions that the repositories do not support: OpenQBW's
  "validated on 13,375 invoices, $399.9M" check (removed upstream as
  invalid), GenoLance BCF support (not supported), OpenTFRaw "format
  versions 8-66" (tested on 63, 64 and 66), OpenMassSpec "three vendors"
  (six), and `pip install speclance` / `cargo install genolance-cli`
  (neither package is published).
- `/fonts/inter.css` referenced an italic font file that does not exist.

- `og:image` and `twitter:image` pointed at a file that did not exist.
- The GenoLance docs link pointed at a docs site that does not exist; it now
  links to the README.
- Loom page links: placeholder `#` community links, a missing
  `#web` anchor, and docs paths (`/loom/docs/getting-started`,
  `/loom/docs/api`, `/loom/docs/code-of-conduct`) that do not exist.
- Sitemap index listed a GenoLance docs sitemap that does not exist and
  missed the OpenARaw, OpenQVD, OpenSXRaw and OpenSZRaw docs sitemaps.
