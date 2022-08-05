module.exports = {
  plugins: [
    'preset-default',
    {
      name: 'removeAttrs',
      params: {
        attrs: '(fill)',
      },
    },
  ],
};
