// eslint-disable-next-line import/no-extraneous-dependencies
const isCI = require('is-ci');

module.exports = {
  browser: [
    { width: 1280, height: 768, name: 'firefox' },
    { width: 1280, height: 768, name: 'chrome' },
    { width: 1280, height: 768, name: 'ie11' },
    { deviceName: 'Galaxy S5' },
    { deviceName: 'iPad' },
  ],
  runInDocker: isCI,
  puppeteerOptions: {
    executablePath: '/usr/bin/chromium-browser',
  },
};
