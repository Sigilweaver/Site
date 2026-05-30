import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  publicDir: resolve(__dirname, 'public'),
  base: '/',
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        // Homepage
        main: resolve(__dirname, 'src/index.html'),
        // Site-wide
        terms: resolve(__dirname, 'src/terms.html'),
        privacy: resolve(__dirname, 'src/privacy.html'),
        // Loom
        'loom/index': resolve(__dirname, 'src/loom/index.html'),
        'loom/downloads': resolve(__dirname, 'src/loom/downloads.html'),
        'loom/contributing': resolve(__dirname, 'src/loom/contributing.html'),
        'loom/verify-downloads': resolve(__dirname, 'src/loom/verify-downloads.html'),
        'loom/403': resolve(__dirname, 'src/loom/403.html'),
        'loom/404': resolve(__dirname, 'src/loom/404.html'),
        'loom/418': resolve(__dirname, 'src/loom/418.html'),
        'loom/500': resolve(__dirname, 'src/loom/500.html'),
        'loom/502': resolve(__dirname, 'src/loom/502.html'),
        'loom/503': resolve(__dirname, 'src/loom/503.html'),
        // OpenYXDB
        'openyxdb/index': resolve(__dirname, 'src/openyxdb/index.html'),
        'openyxdb/docs': resolve(__dirname, 'src/openyxdb/docs.html'),
        // OpenTFRaw
        'opentfraw/index': resolve(__dirname, 'src/opentfraw/index.html'),
        // OpenTimsTDF
        'opentimstdf/index': resolve(__dirname, 'src/opentimstdf/index.html'),
        // OpenWRaw
        'openwraw/index': resolve(__dirname, 'src/openwraw/index.html'),
        // OpenProteo
        'openproteo/index': resolve(__dirname, 'src/openproteo/index.html'),
        // OpenQBW
        'openqbw/index': resolve(__dirname, 'src/openqbw/index.html'),
        // OpenSQLAnywhere
        'opensqlanywhere/index': resolve(__dirname, 'src/opensqlanywhere/index.html'),
        // Docs hub
        'docs/index': resolve(__dirname, 'src/docs/index.html'),
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  resolve: {
    alias: {
      '@styles': resolve(__dirname, 'src/loom/styles'),
      '@lib': resolve(__dirname, 'src/loom/lib'),
    },
  },
  server: {
    port: 25807,
  },
});
