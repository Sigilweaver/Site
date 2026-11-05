# Changelog

All notable changes to sigilweaver.app are recorded here.

## Unreleased

### Added

- CI workflow that runs the unit tests and the full build on every pull
  request and push to `main`.
- `scripts/check-links.mjs`, run at the end of `bun run build`: fails the
  build on internal links, assets, fragments or `og:image` URLs that the
  build does not produce, and on links to docs paths that no project
  deploys.
- Site-wide Open Graph image (`public/og/sigilweaver.jpg`) and its
  generator, `scripts/render-og.mjs`.

### Changed

- Updated Vite to 8, Vitest to 4.1, Lucide to 1.x and the PostCSS tooling.
- Sitemaps and `llms.txt` are generated into `dist/` after `vite build`
  instead of being committed under `public/`. Sitemap `<lastmod>` comes
  from the last git commit that touched each page, not the file mtime.
- Docs links use the trailing-slash form that the Docusaurus deployments
  serve (`/<project>/docs/`).

### Removed

- The OpenYXDB docs stub page at `/openyxdb/docs`; the OpenYXDB Docusaurus
  site at `/openyxdb/docs/` replaces it.
- Unused `prismjs` dependency, and `robots.txt` files under `/loom/` and
  `/openyxdb/`, which crawlers ignore outside the site root.

### Fixed

- `og:image` and `twitter:image` pointed at a file that did not exist.
- The GenoLance docs link pointed at a docs site that does not exist; it now
  links to the README.
- Loom page links: placeholder `#` community links, a missing
  `#web` anchor, and docs paths (`/loom/docs/getting-started`,
  `/loom/docs/api`, `/loom/docs/code-of-conduct`) that do not exist.
- Sitemap index listed a GenoLance docs sitemap that does not exist and
  missed the OpenARaw, OpenQVD, OpenSXRaw and OpenSZRaw docs sitemaps.
