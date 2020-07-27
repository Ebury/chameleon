/* eslint-disable import/no-extraneous-dependencies */
import { configure, addDecorator, addParameters } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withA11y } from '@storybook/addon-a11y';
import { create as createTheme } from '@storybook/theming';
import { withCssResources } from '@storybook/addon-cssresources';
import cssVars from 'css-vars-ponyfill';
import { getAllBackgrounds } from './backgrounds';
import { inlineSvgSprites } from '../src/icons/browser';

/* eslint-disable import/no-webpack-loader-syntax */
import bwTheme from '!!raw-loader!../src/styles/themes/b-w.css';
import greenTheme from '!!raw-loader!../src/styles/themes/green.css';
import redTheme from '!!raw-loader!../src/styles/themes/red.css';
import hotpinkTheme from '!!raw-loader!../src/styles/themes/hotpink.css';
/* eslint-enable */

import '../src/styles/themes/blue.css';
import '../src/styles/main.css';

const supportsCssVariables = !!(window.CSS && window.CSS.supports('color', 'var(--test)'));

addDecorator(withKnobs);

addDecorator(withA11y);

if (supportsCssVariables) {
  addDecorator(withCssResources);
}

addParameters({
  backgrounds: getAllBackgrounds('light'),
});

addParameters({
  viewport: { viewports: INITIAL_VIEWPORTS },
});

addParameters({
  options: {
    theme: createTheme({
      base: 'light',
      brandTitle: 'Chameleon components',
      brandUrl: 'https://company-160717.frontify.com/document/271391',
      brandImage: '/ebury-chameleon-logo.png',
    }),
  },
});

addParameters({
  options: {
    storySort: (a, b) => a[1].id.localeCompare(b[1].id),
  },
});

if (supportsCssVariables) {
  addParameters({
    cssresources: [
      { id: 'green', code: `<style>\n${greenTheme}</style>`, hideCode: true },
      { id: 'red', code: `<style>\n${redTheme}</style>`, hideCode: true },
      { id: 'b&w', code: `<style>\n${bwTheme}</style>`, hideCode: true },
      { id: 'hotpink', code: `<style>\n${hotpinkTheme}</style>`, hideCode: true },
    ],
  });
}

const loadStories = () => {
  const req = require.context(
    '../src/',
    true,
    /\.story\.js$/,
  );

  req.keys().forEach(fileName => req(fileName));
};

configure(() => {
  cssVars();
  inlineSvgSprites(['rounded-icons', 'simple-icons', 'currency-flags'], '/img');
  loadStories();
}, module);
