// eslint-disable-next-line import/no-extraneous-dependencies
const vueJsx = require('@vitejs/plugin-vue-jsx');

module.exports = {
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-vite',
    disableTelemetry: true,
    enableCrashReports: false,
  },
  staticDirs: [
    '../public',
    '../src/assets',
    {
      from: '../node_modules/svg-country-flags/png100px/',
      to: '/icons/country-flags/100',
    },
  ],
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
          // eslint-disable-next-line global-require,import/no-extraneous-dependencies
          implementation: require('postcss'),
        },
      },
    },
  ],
  viteFinal: (config) => {
    const pluginsWithoutReact = config.plugins.filter(plugin => !Array.isArray(plugin));
    const vueJsxPlugin = vueJsx();

    const plugins = [
      ...pluginsWithoutReact,
      vueJsxPlugin,
    ];

    return {
      ...config,
      plugins,
    };
  },
};
