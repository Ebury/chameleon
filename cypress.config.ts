import { defineConfig } from 'cypress';

export default defineConfig({
  screenshotsFolder: 'tests/integration/screenshots/',
  videosFolder: 'tests/integration/videos/',
  video: false,
  videoCompression: false,
  trashAssetsBeforeRuns: true,
  fixturesFolder: 'tests/integration/fixtures/',
  viewportWidth: 1280,
  viewportHeight: 720,
  watchForFileChanges: true,
  pageLoadTimeout: 15000,
  taskTimeout: 3000,
  responseTimeout: 10000,
  execTimeout: 3000,
  defaultCommandTimeout: 3000,
  modifyObstructiveCode: false,
  numTestsKeptInMemory: 1,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'tests/integration/reports/junit.[hash].xml',
    includePending: true,
    useFullSuiteTitle: true,
    testsuitesTitle: 'Chameleon integration tests',
    jenkinsMode: false,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // eslint-disable-next-line global-require
      return require('./tests/integration/plugins')(on, config);
    },
    baseUrl: 'http://localhost:42475',
    specPattern: 'tests/integration/specs//**/*.spec.js',
    excludeSpecPattern: [
      'tests/integration/snapshots/**/*',
      'tests/integration/**/__snapshots__/**/*',
      'tests/integration/**/__image_snapshots__/**/*',
    ],
    supportFile: 'tests/integration/support/index.js',
  },
});
