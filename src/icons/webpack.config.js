/* eslint-disable no-use-before-define */
const path = require('path');
const SvgSpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
  context: path.resolve(__dirname, '..'),
  output: {
    path: path.resolve(__dirname, '../assets'),
  },
  entry: {
    'svg-sprites': ['./icons/build.js'],
  },
  module: {
    rules: [
      {
        test: /\.(svg)(\?.*)?$/,
        include: [
          /\/icons\//,
        ],
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename(svgPath) {
                if (svgPath.includes('/icons/rounded/')) {
                  return 'img/rounded-icons.svg';
                }
                if (svgPath.includes('/icons/simple/')) {
                  return 'img/simple-icons.svg';
                }
                if (svgPath.includes('/icons/flags/')) {
                  return 'img/flag-icons.svg';
                }

                throw new Error(`Unsupported icon sprite for path ${svgPath}.`);
              },
              runtimeCompat: true,
              symbolId(filePath) {
                return [
                  'ec', // icon prefix
                  getIconDirectoryName(filePath),
                  getIconFileName(filePath),
                ].join('-');
              },
            },
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeAttrs: { attrs: '(fill)' } },
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new SvgSpriteLoaderPlugin({ plainSprite: true }),
  ],
};

function getIconDirectoryName(iconPath) {
  return path.dirname(iconPath).split(path.sep).pop().toLowerCase();
}

function getIconFileName(iconPath) {
  return path.basename(iconPath.toLowerCase(), '.svg').replace(/\s/g, '-');
}
