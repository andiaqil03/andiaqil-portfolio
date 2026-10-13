import { fileURLToPath } from 'node:url';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  define: {
    // Same value in the prerendered HTML and the client bundle (footer copyright).
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./app', import.meta.url)),
    },
  },
});
