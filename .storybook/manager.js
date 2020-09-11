/* eslint-disable import/no-extraneous-dependencies */
import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'Chameleon components',
  brandUrl: 'https://company-160717.frontify.com/document/271391',
  brandImage: '/ebury-chameleon-logo.png',
});

addons.setConfig({
  theme,
});
