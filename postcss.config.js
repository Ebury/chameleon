const twStoryPath = require.resolve('./src/styles/utilities/tailwind.story.css');

module.exports = ({ file }) => {
  const config = {
    plugins: {
      'postcss-import': {},
      'postcss-mixins': {},
      tailwindcss: require.resolve('./tailwind.config.js'),
      'postcss-nested': {},
      'postcss-preset-env': {},
    },
  };

  // Don't purge the story for TailwindCSS, otherwise it won't be able to get the full list of available utility classes.
  const shouldPurgeFile = file !== twStoryPath;
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd && shouldPurgeFile) {
    // see https://purgecss.com/guides/vue.html for reference
    config.plugins['@fullhuman/postcss-purgecss'] = {
      content: [
        './src/**/*.vue',
        './src/**/*.story.js',
        './src/**/*.svg',
        './.storybook/*.js'],
      defaultExtractor(content) {
        const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');
        return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
      },
      safelist: {
        standard: [
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!(|.*?:)cursor-move).+-move$/,
          /^router-link(|-exact)-active$/,
          /data-v-.*/,
          /^ec-/,
        ],
        deep: [
          /^ec-/,
        ],
        greedy: [],
        keyframes: [],
        variables: [],
      },
    };
  }

  return config;
};
