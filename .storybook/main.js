/* eslint-disable import/no-extraneous-dependencies */
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  framework: '@storybook/vue3',
  core: {
    builder: {
      name: 'webpack5',
      options: {
        lazyCompilation: true,
        fsCache: true,
      },
    },
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
  webpackFinal: (config, { configType }) => {
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
          COMPONENT_V_MODEL: false,
        },
      },
    };

    // add stylelint (https://vue-loader.vuejs.org/guide/linting.html#stylelint)
    config.plugins.push(new StyleLintPlugin({
      files: ['**/*.{vue,css}'],
    }));

    // make sure babel will transpile native ES6 modules
    const babelRule = findRuleByLoader(config.module.rules, 'babel-loader');
    if (!babelRule) {
      throw new Error('Unable to find babel loader rules in the webpack config. Configuration change?');
    }
    babelRule.exclude = /node_modules\/(?!(css-tree|color)\/).*/;

    // extract country flags from node_modules to icons folder
    const resourceAssetsRule = findRuleByLoader(config.module.rules, 'asset/resource');
    if (!resourceAssetsRule) {
      throw new Error('Unable to find resource rules in the webpack config. Configuration change?');
    }
    const resourceAssetsFilename = resourceAssetsRule.generator.filename;
    if (!resourceAssetsFilename) {
      throw new Error('Unable to find resource output name in the webpack config. Configuration change?');
    }

    resourceAssetsRule.generator.filename = function filename(resourcePath) {
      const match = resourcePath.module.context.match(/\/svg-country-flags\/png(?<size>[0-9]+)px\//);
      if (match) {
        return `icons/country-flags/${match.groups.size}/[name].[ext]`;
      }
      return resourceAssetsFilename;
    };

    if (configType === 'PRODUCTION') {
      config.cache = false;
      babelRule.use[0].options.cacheDirectory = false;
    }

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
