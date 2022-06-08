const customElements = new Set(['ec-stub']);

module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/default',
  errorOnDeprecated: true,
  transformIgnorePatterns: [
    'node_modules/(?!(svg-country-flags)/)',
  ],
  testMatch: [
    '<rootDir>/src/**/*.spec.(js|jsx|ts|tsx)',
  ],
  setupFiles: [
    '<rootDir>/tests/setup/intl.js',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup/after-env.js',
    '<rootDir>/tests/setup/chameleon-config.js',
    '<rootDir>/tests/setup/auto-unmount.js',
    '<rootDir>/tests/stubs/index.js',
    '<rootDir>/tests/mocks/index.js',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/**/*.story.js',
    '!src/**/index.js',
    '!src/**/.eslintrc.js',
    '!src/icons/**',
    '!src/assets/**',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  clearMocks: true,
  restoreMocks: true,
  globals: {
    'vue-jest': {
      compilerOptions: {
        whitespace: 'condense',
        isCustomElement: tag => customElements.has(tag),
        comments: false,
        compatConfig: {
          MODE: 2,
          RENDER_FUNCTION: true,
        },
      },
    },
  },
  moduleNameMapper: { '^vue$': '@vue/compat' },
};
