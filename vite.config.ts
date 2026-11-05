import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const projectRoot = import.meta.dirname;

export default defineConfig({
  root: 'src',
  publicDir: resolve(projectRoot, 'public'),
  base: '/',
  build: {
    outDir: resolve(projectRoot, 'dist'),
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        // Homepage
        main: resolve(projectRoot, 'src/index.html'),
        // Site-wide
        terms: resolve(projectRoot, 'src/terms.html'),
        privacy: resolve(projectRoot, 'src/privacy.html'),
        // Loom
        'loom/index': resolve(projectRoot, 'src/loom/index.html'),
        'loom/downloads': resolve(projectRoot, 'src/loom/downloads.html'),
        'loom/contributing': resolve(projectRoot, 'src/loom/contributing.html'),
        'loom/verify-downloads': resolve(projectRoot, 'src/loom/verify-downloads.html'),
        'loom/403': resolve(projectRoot, 'src/loom/403.html'),
        'loom/404': resolve(projectRoot, 'src/loom/404.html'),
        'loom/418': resolve(projectRoot, 'src/loom/418.html'),
        'loom/500': resolve(projectRoot, 'src/loom/500.html'),
        'loom/502': resolve(projectRoot, 'src/loom/502.html'),
        'loom/503': resolve(projectRoot, 'src/loom/503.html'),
        // OpenYXDB
        'openyxdb/index': resolve(projectRoot, 'src/openyxdb/index.html'),
        // OpenTFRaw
        'opentfraw/index': resolve(projectRoot, 'src/opentfraw/index.html'),
        // OpenTimsTDF
        'opentimstdf/index': resolve(projectRoot, 'src/opentimstdf/index.html'),
        // OpenWRaw
        'openwraw/index': resolve(projectRoot, 'src/openwraw/index.html'),
        // OpenARaw
        'openaraw/index': resolve(projectRoot, 'src/openaraw/index.html'),
        // OpenSXRaw
        'opensxraw/index': resolve(projectRoot, 'src/opensxraw/index.html'),
        // OpenMassSpec
        'openmassspec/index': resolve(projectRoot, 'src/openmassspec/index.html'),
        // SpecLance
        'speclance/index': resolve(projectRoot, 'src/speclance/index.html'),
        // OpenQBW
        'openqbw/index': resolve(projectRoot, 'src/openqbw/index.html'),
        // OpenSQLAnywhere
        'opensqlanywhere/index': resolve(projectRoot, 'src/opensqlanywhere/index.html'),
        // OpenKSpace
        'openkspace/index': resolve(projectRoot, 'src/openkspace/index.html'),
        // DICOM Atlas
        'dicom-atlas/index': resolve(projectRoot, 'src/dicom-atlas/index.html'),
        // SigilYX
        'sigilyx/index': resolve(projectRoot, 'src/sigilyx/index.html'),
        // GenoLance
        'genolance/index': resolve(projectRoot, 'src/genolance/index.html'),
        // OpenQVD
        'openqvd/index': resolve(projectRoot, 'src/openqvd/index.html'),
        // Docs hub
        'docs/index': resolve(projectRoot, 'src/docs/index.html'),
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
      '@styles': resolve(projectRoot, 'src/loom/styles'),
      '@lib': resolve(projectRoot, 'src/loom/lib'),
    },
  },
  server: {
    port: 25807,
  },
});
