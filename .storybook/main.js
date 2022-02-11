/* eslint-disable import/no-extraneous-dependencies */
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  staticDirs: ['../public', '../src/assets'],
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
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.story\.jsx?$/,
      loaders: [require.resolve('@storybook/source-loader')],
      enforce: 'pre',
    });
    config.plugins.push(new StyleLintPlugin({
      files: ['**/*.{vue,htm,html,css}'],
      emitError: true,
      emitWarning: true,
    }));
    const babelRule = config.module.rules[0];
    babelRule.exclude = /node_modules\/(?!(css-tree|color)\/).*/;

    const fileLoaderRule = config.module.rules.find(rule => rule.loader?.includes('/file-loader/'));
    if (!fileLoaderRule) {
      throw new Error('Unable to find file loader rules in the webpack config. Configuration change?');
    }
    const fileLoaderOutputName = fileLoaderRule.options.name;
    if (!fileLoaderOutputName) {
      throw new Error('Unable to find file loader output name in the webpack config. Configuration change?');
    }
    fileLoaderRule.options = {
      ...fileLoaderRule.options,
      name(resourcePath) {
        const match = resourcePath.match(/\/svg-country-flags\/png(?<size>[0-9]+)px\//);
        if (match) {
          return `icons/country-flags/${match.groups.size}/[name].[ext]`;
        }
        return fileLoaderOutputName;
      },
    };
    return config;
  },
};
