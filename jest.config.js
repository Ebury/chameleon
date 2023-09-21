const customElements = new Set(['ec-stub']);

module.exports = {
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    customExportConditions: ['node'],
  },
  moduleFileExtensions: [
    'js',
    'jsx',
    'tsx',
    'ts',
    'json',
    'vue',
  ],
  errorOnDeprecated: true,
  maxWorkers: '100%',
  transform: {
    '^.+\\.vue$': './vue3-jest.js',
    '^.+\\.(j|t)sx?$': '@swc/jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(svg-country-flags)/)',
  ],
  testMatch: [
    '<rootDir>/src/**/*.spec.(js|jsx|ts|tsx)',
  ],
  snapshotSerializers: [
    'jest-serializer-vue',
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
  moduleNameMapper: {
    '@vueuse/integrations/': '<rootDir>/node_modules/@vueuse/integrations',
  },
  collectCoverage: true,
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/**/*.{ts,js,vue}',
    '!src/main.{ts,js}',
    '!src/**/types.ts',
    '!src/**/*.story.{ts,js,jsx}',
    '!src/**/index.{ts,js}',
    '!src/**/.eslintrc.js',
    '!src/icons/**',
    '!src/assets/**',
    '!src/directives/ec-tooltip/ec-tooltip.ts',
    '!src/shims-vue.d.ts',
    '!src/enums/tooltip-placement.js',
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
      },
    },
  },
};
