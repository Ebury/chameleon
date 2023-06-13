/* eslint-disable import/no-extraneous-dependencies */
import cssVariablesTheme from '@etchteam/storybook-addon-css-variables-theme';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import config from '../src/config';
import { inlineSvgSprites } from '../src/icons/browser';
import bwTheme from '../src/styles/themes/b-w.css';
import blueTheme from '../src/styles/themes/blue.css';
import greenTheme from '../src/styles/themes/green.css';
import hotpinkTheme from '../src/styles/themes/hotpink.css';
import redTheme from '../src/styles/themes/red.css';
import { getAllBackgrounds } from './backgrounds';

import '../src/styles/main.css';
/* eslint-enable */

config.sensitiveClass = 'tw-filter tw-blur-4';

// Since style-loader syntax does not work with Vite we need to load
// our themes styles manually for the css-variable-theme addon to work.
// The following function create one style tag for each theme.
// More info here: https://github.com/etchteam/storybook-addon-css-variables-theme/issues/20#issuecomment-1555243720
const makeCssFiles = (themes) => {
  const styleTag = document.createElement('style');
  document.body.appendChild(styleTag);

  const use = name => () => {
    const { [name]: styles } = themes;
    styleTag.innerHTML = styles;
  };

  return Object.fromEntries(
    Object.keys(themes).map(name => [name, { use: use(name), unuse: () => null }]),
  );
};

export const decorators = [
  cssVariablesTheme,
];

export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: getAllBackgrounds('light'),
  viewport: { viewports: INITIAL_VIEWPORTS },
  cssVariables: {
    files: makeCssFiles({
      Default: blueTheme,
      '#b&w': bwTheme,
      '#green': greenTheme,
      '#hotpink': hotpinkTheme,
      '#red': redTheme,
    }),
    defaultTheme: 'Default',
  },
  options: {
    storySort: (a, b) => (a.title === b.title ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true })),
  },
  controls: {
    expanded: true,
  },
};

if (process.env.NODE_ENV === 'production') {
  parameters.viewMode = 'docs';
}

inlineSvgSprites(['rounded-icons', 'simple-icons', 'currency-flags'], '/img');
