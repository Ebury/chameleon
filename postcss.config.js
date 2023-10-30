/* eslint-disable global-require, import/no-extraneous-dependencies */
const postcss = require('postcss');

module.exports = () => {
  const config = {
    plugins: [
      // postcss-mixins must be executed before tailwind, otherwise the nesting won't work, see the problem and solution
      // proposed by the maintainers:
      // https://github.com/tailwindlabs/tailwindcss/issues/4114#issuecomment-989931186
      {
        postcssPlugin: 'grouped',
        Once(root, { result }) {
          return postcss([
            require('postcss-import'),
            require('postcss-mixins'),
          ]).process(root, result.opts);
        },
      },
      require('tailwindcss/nesting'),
      require('tailwindcss'),
      require('autoprefixer'),
    ],
  };

  return config;
};
