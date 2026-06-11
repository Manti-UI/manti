import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Keep modern CSS (`light-dark()`, nesting) intact so Manti UI theming works in
// both dev and production builds. See packages/styles/vite.config.ts.
const evergreen = {
  chrome: 123 << 16,
  edge: 123 << 16,
  firefox: 120 << 16,
  safari: (17 << 16) | (5 << 8),
};

export default defineConfig({
  plugins: [react()],
  css: {
    transformer: 'lightningcss',
    lightningcss: { targets: evergreen },
  },
  build: {
    cssTarget: 'chrome123',
    cssMinify: 'lightningcss',
  },
});
