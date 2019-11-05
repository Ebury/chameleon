const path = require('path');

const loader = require.resolve('@storybook/addon-storysource/loader');

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.scss$/,
    sideEffects: true,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });
  config.module.rules.push({
    sideEffects: true,
    test: /\.sass$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    include: path.resolve(__dirname, '../'),
  });
  // eslint-disable-next-line no-param-reassign
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': path.resolve(__dirname, '..', 'src'),
  };
  config.module.rules.push({
    test: /\.story\.jsx?$/,
    loaders: [loader],
    enforce: 'pre',
  });

  return config;
};
