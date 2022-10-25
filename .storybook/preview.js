/* eslint-disable import/no-extraneous-dependencies */
import { withCssResources } from '@storybook/addon-cssresources';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import config from '../src/config';
import { inlineSvgSprites } from '../src/icons/browser';
import bwTheme from '../src/styles/themes/b-w.css';
import greenTheme from '../src/styles/themes/green.css';
import hotpinkTheme from '../src/styles/themes/hotpink.css';
import redTheme from '../src/styles/themes/red.css';
import { getAllBackgrounds } from './backgrounds';

import '../src/styles/themes/blue.css';
import '../src/styles/main.css';
/* eslint-enable */

config.sensitiveClass = 'tw-filter tw-blur-4';

export const parameters = {
  layout: 'fullscreen',
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: getAllBackgrounds('light'),
  viewport: { viewports: INITIAL_VIEWPORTS },
  cssresources: [
    { id: 'green', code: `<style>\n${greenTheme}</style>`, hideCode: true },
    { id: 'red', code: `<style>\n${redTheme}</style>`, hideCode: true },
    { id: 'b&w', code: `<style>\n${bwTheme}</style>`, hideCode: true },
    { id: 'hotpink', code: `<style>\n${hotpinkTheme}</style>`, hideCode: true },
  ],
  options: {
    storySort: (a, b) => (a[1].kind === b[1].kind ? 0 : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })),
  },
  controls: {
    expanded: true,
  },
};

if (process.env.NODE_ENV === 'production') {
  parameters.viewMode = 'docs';
}

export const decorators = [withCssResources];

inlineSvgSprites(['rounded-icons', 'simple-icons', 'currency-flags'], '/img');
