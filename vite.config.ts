import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { generatedPages, pageFile, sitePages } from './src/site/vite-plugin.ts';

const projectRoot = import.meta.dirname;
const srcRoot = resolve(projectRoot, 'src');

// Hand-written pages. The homepage, docs hub and project pages are
// generated from src/site/projects.ts by the sitePages plugin.
const handWritten: Record<string, string> = {
  terms: 'terms.html',
  privacy: 'privacy.html',
  'loom/index': 'loom/index.html',
  'loom/downloads': 'loom/downloads.html',
  'loom/contributing': 'loom/contributing.html',
  'loom/verify-downloads': 'loom/verify-downloads.html',
  'loom/403': 'loom/403.html',
  'loom/404': 'loom/404.html',
  'loom/418': 'loom/418.html',
  'loom/500': 'loom/500.html',
  'loom/502': 'loom/502.html',
  'loom/503': 'loom/503.html',
};

const input: Record<string, string> = Object.fromEntries([
  ...generatedPages().map((page) => [page.name, pageFile(srcRoot, page)]),
  ...Object.entries(handWritten).map(([name, file]) => [name, resolve(srcRoot, file)]),
]);

export default defineConfig({
  root: srcRoot,
  publicDir: resolve(projectRoot, 'public'),
  base: '/',
  plugins: [sitePages(srcRoot)],
  build: {
    outDir: resolve(projectRoot, 'dist'),
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input,
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  resolve: {
    alias: {
      '@styles': resolve(srcRoot, 'loom/styles'),
      '@lib': resolve(srcRoot, 'loom/lib'),
    },
  },
  server: {
    port: 25807,
  },
});
