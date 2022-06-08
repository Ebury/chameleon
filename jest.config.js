module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue',
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(svg-country-flags)/)',
  ],
  snapshotSerializers: [
    'jest-serializer-vue',
  ],
  testMatch: [
    '<rootDir>/src/**/*.spec.(js|jsx|ts|tsx)',
  ],
  testURL: 'http://localhost/',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
  setupFiles: [
    '<rootDir>/tests/setup/intl.js',
  ],
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup/after-env.js',
    '<rootDir>/tests/setup/chameleon-config.js',
    '<rootDir>/tests/setup/auto-destroy.js',
    '<rootDir>/tests/stubs/index.js',
    '<rootDir>/tests/mocks/index.js',
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!src/**/*.story.js',
    '!src/**/index.js',
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
  globals: {
    'vue-jest': {
      compilerOptions: {
        whitespace: 'condense',
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
