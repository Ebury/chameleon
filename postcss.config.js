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
  const shouldPurgeFile = file.basename !== 'tailwind.story.css';
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd && shouldPurgeFile) {
    // see https://purgecss.com/guides/vue.html for reference
    config.plugins['@fullhuman/postcss-purgecss'] = {
      content: ['./src/**/*.vue', './src/**/*.story.js'],
      defaultExtractor(content) {
        const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');
        return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
      },
      whitelist: [],
      whitelistPatterns: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/,
        /data-v-.*/,
        /^ec-/,
      ],
    };
  }

  return config;
};
