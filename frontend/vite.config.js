import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import stdLibBrowser from 'vite-plugin-node-stdlib-browser';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), stdLibBrowser()],
  resolve: {
    alias: {
      global: 'globalThis',
      events: 'node-stdlib-browser/events',
      util: 'node-stdlib-browser/util',
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
    include: ['node-stdlib-browser'],
  },
});