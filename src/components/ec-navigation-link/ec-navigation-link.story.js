import storyRouter from 'storybook-vue-router';
import EcNavigationLink from './ec-navigation-link.vue';
import { DARK_THEME } from '../../../.storybook/backgrounds';

export default {
  title: 'Layout/Navigation Link',
  component: EcNavigationLink,
  decorators: [
    storyRouter(),
  ],
};

const Template = (args, { argTypes }) => ({
  components: { EcNavigationLink },
  props: Object.keys(argTypes),
  template: `
    <ec-navigation-link v-bind="$props" />
  `,
});

export const basic = Template.bind({});

basic.args = {
  text: 'Trade Finance',
  iconName: 'simple-trade-finance',
  iconSize: 30,
  url: '/trade-finance',
};

basic.parameters = {
  backgrounds: { default: DARK_THEME.name, values: [DARK_THEME] },
};
