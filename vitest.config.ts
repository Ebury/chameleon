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
      './tests/setup/intl.ts',
      './tests/setup/after-env.js',
      './tests/setup/chameleon-config.ts',
      './tests/setup/auto-unmount.ts',
      './tests/stubs/index.ts',
      './tests/mocks/index.ts',
    ],
    coverage: {
      100: true,
    },
  },
});
