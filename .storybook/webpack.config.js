/* eslint-disable import/no-extraneous-dependencies */
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = async ({ config }) => {
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
  babelRule.exclude = /node_modules\/(?!(css-tree)\/).*/;

  return config;
};
