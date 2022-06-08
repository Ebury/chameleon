/* eslint-disable import/no-extraneous-dependencies */
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  framework: '@storybook/vue3',
  core: {
    disableTelemetry: true,
    enableCrashReports: false,
  },
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
    // enable @vue/compat for stories
    config.resolve.alias = {
      ...config.resolve.alias,
      vue$: require.resolve('@vue/compat'),
    };

    // enable @vue/compat when compiling story templates
    const vueLoaderRule = findRuleByLoader(config.module.rules, '/vue-loader/');
    if (!vueLoaderRule) {
      throw new Error('Unable to find vue loader rules in the webpack config. Configuration change?');
    }

    vueLoaderRule.options = {
      ...vueLoaderRule.options,
      compilerOptions: {
        whitespace: 'condense',
        compatConfig: {
          MODE: 2,
          RENDER_FUNCTION: true,
        },
      },
    };

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

function findRuleByLoader(rules, loaderName) {
  if (!loaderName) {
    throw new Error('Missing loader name');
  }

  return rules.find((rule) => {
    if (rule.type === loaderName) {
      return true;
    }
    if (rule.loader && rule.loader.includes(loaderName)) {
      return true;
    }
    if (rule.use && findRuleByLoader(rule.use, loaderName)) {
      return true;
    }

    return false;
  });
}
