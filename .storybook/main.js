/* eslint-disable import/no-extraneous-dependencies */
const vueJsx = require('@vitejs/plugin-vue-jsx');
const {
  mergeConfig
} = require('vite');
module.exports = {
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  core: {
    disableTelemetry: true,
    enableCrashReports: false
  },
  staticDirs: ['../public', '../src/assets', {
    from: '../node_modules/svg-country-flags/png100px/',
    to: '/icons/country-flags/100'
  }],
  stories: ['../src/**/*.story.mdx', '../src/**/*.story.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-cssresources', '@storybook/addon-essentials', '@storybook/addon-links', {
    name: '@storybook/addon-postcss',
    options: {
      postcssLoaderOptions: {
        // eslint-disable-next-line global-require
        implementation: require('postcss')
      }
    }
  }],
  docs: {
    autodocs: true
  }
};