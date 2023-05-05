/* eslint-disable import/no-extraneous-dependencies */
const vueJsx = require('@vitejs/plugin-vue-jsx');
const { mergeConfig } = require('vite');

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
          // eslint-disable-next-line global-require
          implementation: require('postcss'),
        },
      },
    },
  ],
  viteFinal: (config) => {
    const reactPluginNameRegex = /^vite:react-/;
    const reactPluginsArrayIndex = config.plugins.findIndex(plugin => Array.isArray(plugin) && plugin.every(p => p.name.match(reactPluginNameRegex)));

    if (reactPluginsArrayIndex === -1) {
      throw new Error('Unable to patch plugins - cannot find vite:react plugins. Is this fix still necessary?');
    }

    // remove react plugins and replace them with vue plugins
    // see https://github.com/storybookjs/storybook/issues/21681
    // remove after migrating to SB 7
    const pluginsWithoutReact = config.plugins.filter((_, index) => index !== reactPluginsArrayIndex);
    return mergeConfig({
      ...config,
      plugins: [
        ...pluginsWithoutReact,
        vueJsx(),
      ],
    });
  },
};
