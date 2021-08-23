/* eslint-disable import/no-extraneous-dependencies */
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  stories: [
    '../src/**/*.story.mdx',
    '../src/**/*.story.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-cssresources',
    '@storybook/addon-essentials',
    '@storybook/addon-knobs',
    '@storybook/addon-links',
    '@storybook/addon-postcss',
  ],
  webpackFinal: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    };
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
    return config;
  },
};
