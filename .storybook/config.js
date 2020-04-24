/* eslint-disable import/no-extraneous-dependencies */
import { configure, addDecorator, addParameters } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withA11y } from '@storybook/addon-a11y';
import { create as createTheme } from '@storybook/theming';
import { getAllBackgrounds } from './backgrounds';
import { inlineSvgSprites } from '../src/icons/browser';
import '../src/styles';

addDecorator(withKnobs);

addDecorator(withA11y);

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

const loadStories = () => {
  const req = require.context(
    '../src/',
    true,
    /\.story\.js$/,
  );

  req.keys().forEach(fileName => req(fileName));
};

configure(() => {
  inlineSvgSprites(['rounded-icons', 'simple-icons', 'currency-flags'], '/img');
  loadStories();
}, module);
