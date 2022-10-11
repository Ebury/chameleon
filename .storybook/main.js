module.exports = {
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
    enableCrashReports: false,
  },
  staticDirs: ['../public', '../src/assets', { from: '../node_modules/svg-country-flags/png100px/', to: '/icons/country-flags/100' }],
  stories: [
    '../src/**/*.story.mdx',
    '../src/**/*.story.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-cssresources',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          // eslint-disable-next-line global-require
          implementation: require('postcss'),
        },
      },
    },
  ],
};
