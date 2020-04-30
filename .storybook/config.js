/* eslint-disable import/no-extraneous-dependencies */
import { configure, addDecorator, addParameters } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withA11y } from '@storybook/addon-a11y';
import { create as createTheme } from '@storybook/theming';
import cssVars from 'css-vars-ponyfill';
import { getAllBackgrounds } from './backgrounds';
import { inlineSvgSprites } from '../src/icons/browser';

// TODO: add theme switcher
import '../src/styles/themes/blue.css';
// TODO: once the SASS is gone, import just the main.css from styles folder.
// import '../src/scss/settings/_index.scss';
import '../src/styles/settings/index.css';
import '../src/scss/tools/_index.scss';
// import '../src/styles/tools/index.css';
import '../src/scss/generic/_index.scss';
import '../src/styles/generic/index.css';
import '../src/scss/elements/_index.scss';
// import '../src/scss/objects/_index.scss';
// import '../src/styles/objects/index.css';
import '../src/scss/components/_index.scss';
import '../src/styles/components/index.css';
import '../src/scss/utilities/_index.scss';
import '../src/styles/utilities/index.css';

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
  cssVars();
  inlineSvgSprites(['rounded-icons', 'simple-icons', 'currency-flags'], '/img');
  loadStories();
}, module);
