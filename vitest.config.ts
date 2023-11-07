import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vitest/config';

const customElements = new Set(['ec-stub']);

export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        whitespace: 'condense',
        isCustomElement: tag => customElements.has(tag),
        comments: false,
      },
    },
  })],
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
      './tests/setup/after-env.ts',
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
