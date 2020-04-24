module.exports = ({ file }) => {
  // TODO: add purgecss and purge every file except tailwind.story.css
  // eslint-disable-next-line no-unused-vars
  const purgeFile = file.basename !== 'tailwind.story.css';
  return {
    plugins: {
      'postcss-import': {},
      'postcss-mixins': {},
      'postcss-nested': {},
      'postcss-preset-env': {},
      'postcss-color-function': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  };
};
