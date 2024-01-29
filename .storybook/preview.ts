import { withCssResources } from '@storybook/addon-cssresources';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/vue3';

import config from '../src/config';
import { inlineSvgSprites, SpriteName } from '../src/icons/browser';
// @ts-expect-error TS don't know how to handle vite's raw CSS import
import bwTheme from '../src/styles/themes/b-w.css?inline';
// @ts-expect-error TS don't know how to handle vite's raw CSS import
import greenTheme from '../src/styles/themes/green.css?inline';
// @ts-expect-error TS don't know how to handle vite's raw CSS import
import hotpinkTheme from '../src/styles/themes/hotpink.css?inline';
// @ts-expect-error TS don't know how to handle vite's raw CSS import
import redTheme from '../src/styles/themes/red.css?inline';
import { ChameleonTheme, getAllBackgrounds } from './backgrounds';

import '../src/styles/themes/blue.css';
import '../src/styles/main.css';

config.sensitiveClass = 'tw-filter tw-blur-4';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: getAllBackgrounds(ChameleonTheme.LIGHT),
    viewport: { viewports: INITIAL_VIEWPORTS },
    cssresources: [
      { id: 'green', code: `<style>\n${greenTheme}</style>`, hideCode: true },
      { id: 'red', code: `<style>\n${redTheme}</style>`, hideCode: true },
      { id: 'b&w', code: `<style>\n${bwTheme}</style>`, hideCode: true },
      { id: 'hotpink', code: `<style>\n${hotpinkTheme}</style>`, hideCode: true },
    ],
    options: {
      // we can't type this function, see comments in SB docs:
      // https://storybook.js.org/docs/writing-stories/naming-components-and-hierarchy#sorting-stories
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      storySort: (a, b) => (a.title === b.title ? 0 : a.id.localeCompare(b.id, undefined, { numeric: true })),
    },
    controls: {
      expanded: true,
    },
  },
  decorators: [withCssResources],
};

inlineSvgSprites([SpriteName.ROUNDED_ICONS, SpriteName.SIMPLE_ICONS, SpriteName.CURRENCY_FLAGS], '/img');

export default preview;
