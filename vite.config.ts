import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => ({
  base: loadEnv(mode, process.cwd(), '').VITE_BASE_PATH || '/beyond-the-horizon/',
  plugins: [react(), tailwindcss()],
  server: { host: '0.0.0.0' },
  build: { outDir: loadEnv(mode, process.cwd(), '').VITE_OUTPUT_DIR || 'dist', rollupOptions: { output: { manualChunks(id) {
    if (id.includes('node_modules')) {
      if (/\/react(?:-dom)?\/|\/scheduler\//.test(id)) return 'react-vendor';
      if (/\/framer-motion\/|\/motion-dom\/|\/motion-utils\//.test(id)) return 'motion';
    }
  } } } },
}));
