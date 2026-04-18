# openyxdb site

Static landing + docs stub served at `https://sigilweaver.app/openyxdb/` and
`https://sigilweaver.app/openyxdb/docs/`.

Same stack as the hub and Loom sites (Vite + TypeScript + Tailwind) so theming
can consolidate later if we pull hero/theme code into a shared package.

## Dev

```sh
bun install
bun run dev    # localhost:25806
bun run build  # → dist/
bunx wrangler deploy
```

The canonical API reference lives in the Python package docstrings and the
repo README. This site only exists so `/openyxdb` isn't blank and so there is
a place to grow full docs into.
