import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'Chameleon components',
  brandUrl: 'https://labs.ebury.rocks/',
  brandImage: '/ebury-chameleon-logo.png',
});

addons.setConfig({
  theme,
});
