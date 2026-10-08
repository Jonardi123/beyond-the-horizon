import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { host: '0.0.0.0' },
  build: { rollupOptions: { output: { manualChunks(id) {
    if (id.includes('node_modules')) {
      if (/\/react(?:-dom)?\/|\/scheduler\//.test(id)) return 'react-vendor';
      if (/\/framer-motion\/|\/motion-dom\/|\/motion-utils\//.test(id)) return 'motion';
    }
  } } } },
});
