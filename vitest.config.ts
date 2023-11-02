import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [vue()],
  test: {
    clearMocks: true,
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
    environment: 'jsdom',
    globals: true,
    include: [
      './src/**/*.{test,spec}.?(c|m)[jt]s?(x)',
    ],
    setupFiles: [
      './tests/setup/intl.js',
      './tests/setup/after-env.js',
      './tests/setup/chameleon-config.js',
      './tests/setup/auto-unmount.js',
      './tests/stubs/index.js',
      './tests/mocks/index.js',
    ],
    coverage: {
      100: true,
    },
  },
});
