/* eslint-disable import/no-extraneous-dependencies */
import cssVars from 'css-vars-ponyfill';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withCssResources } from '@storybook/addon-cssresources';
import { inlineSvgSprites } from '../src/icons/browser';
import { getAllBackgrounds } from './backgrounds';

/* eslint-disable import/no-webpack-loader-syntax */
import bwTheme from '!!raw-loader!../src/styles/themes/b-w.css';
import greenTheme from '!!raw-loader!../src/styles/themes/green.css';
import redTheme from '!!raw-loader!../src/styles/themes/red.css';
import hotpinkTheme from '!!raw-loader!../src/styles/themes/hotpink.css';
/* eslint-enable */

import config from '../src/config';

import '../src/styles/themes/blue.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import '!!style-loader!css-loader!postcss-loader!../src/styles/main.css';

config.sensitiveClass = 'tw-filter tw-blur-4';

export const parameters = {
  viewMode: 'docs',
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
    storySort: (a, b) => a[1].id.localeCompare(b[1].id),
  },
};

export const decorators = [withCssResources];

cssVars();
inlineSvgSprites(['rounded-icons', 'simple-icons', 'currency-flags'], '/img');
