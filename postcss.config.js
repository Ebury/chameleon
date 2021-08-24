/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
const twStoryPath = require.resolve('./src/styles/utilities/tailwind.story.css');

const purgecssFromHtmlExtractor = require('purgecss-from-html');

module.exports = ({ file }) => {
  const config = {
    plugins: [
      require('postcss-import'),
      require('postcss-mixins'),
      require('tailwindcss'),
      require('postcss-nested'),
    ],
  };

  // Don't purge the story for TailwindCSS, otherwise it won't be able to get the full list of available utility classes.
  const shouldPurgeFile = file !== twStoryPath;
  const isProd = process.env.NODE_ENV === 'production';
  if (isProd && shouldPurgeFile) {
    // see https://purgecss.com/guides/vue.html for reference
    const purgecss = require('@fullhuman/postcss-purgecss')({
      content: [
        './src/**/*.vue',
        './src/**/*.story.js',
        './src/**/*.svg',
        './.storybook/*.js',
      ],
      defaultExtractor(content) {
        const contentWithoutStyleBlocks = content.replace(/<style[^]+?<\/style>/gi, '');
        return contentWithoutStyleBlocks.match(/[A-Za-z0-9-_/:]*[A-Za-z0-9-_/]+/g) || [];
      },
      extractors: [
        {
          extensions: ['svg'],
          extractor: (content) => {
            const result = purgecssFromHtmlExtractor(content);
            if (result && result.classes) {
              // when parsing SVG, the result will contain lots of noise like SVG tags, paths and graphics.
              // just remove them, we are only interested in strings found in class attributes.
              return result.classes;
            }
            return [];
          },
        },
      ],
      safelist: {
        standard: [
          /-(leave|enter|appear)(|-(to|from|active))$/,
          /^(?!(|.*?:)cursor-move).+-move$/,
          /^router-link(|-exact)-active$/,
          /data-v-.*/,
          /^ec-/,
          /^ebo-/,
        ],
        deep: [
          /^ec-/,
          /^ebo-/,
        ],
        greedy: [],
        keyframes: [],
        variables: [],
      },
    });

    if (purgecss.Once && !purgecss.OnceExit) {
      // apply the fix for interacting with postcss-nested from PR: https://github.com/FullHuman/purgecss/pull/647
      // this PR has been merged in April 2021 but still hasn't released in August!!!
      purgecss.OnceExit = purgecss.Once;
      delete purgecss.Once;
    }

    config.plugins.push(purgecss);
  }

  return config;
};
