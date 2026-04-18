# sigilweaver.app

All marketing sites for Sigilweaver projects live here and are served from a
single Cloudflare Worker at `sigilweaver.app/*`. Project **documentation**
(Docusaurus, etc.) stays bundled with each project repo and is deployed by a
more-specific worker route that takes precedence over this one.

```
sigilweaver.app/           ← Site/homepage      (this repo)
sigilweaver.app/loom/      ← Site/loom          (this repo)
sigilweaver.app/loom/docs  ← Sigilweaver/Loom   (Loom/docs, Docusaurus)
sigilweaver.app/openyxdb/  ← Site/openyxdb      (this repo)
sigilweaver.app/cms/       ← (not yet)
sigilweaver.app/keep/      ← (not yet)
```

## Layout

```
Site/
├── homepage/      # hub landing page        → dist/
├── loom/          # Loom marketing site     → dist/loom/
├── openyxdb/      # OpenYXDB marketing site → dist/openyxdb/
├── dist/          # merged build output (gitignored)
└── wrangler.jsonc # single worker, route sigilweaver.app/*
```

Each sub-site is an independent Vite project. The top-level `build` script
runs them in order, each writing to its own subpath inside the shared
`dist/`. The Cloudflare Worker serves `dist/` at the apex, and the per-site
`base: '/<project>/'` values line up asset URLs correctly.

## Dev

```sh
bun install                 # installs all three workspaces
bun run build               # builds all → dist/
bun run --cwd homepage dev  # or any individual sub-site
bun run deploy              # build + wrangler deploy
```

## Why one repo

- Shared theming can consolidate into a future `packages/theme/` without
  coordinating across repos.
- One deploy pipeline, one wrangler route at the apex.
- Project repos stay focused on code + docs, not on marketing copy.
