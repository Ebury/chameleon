import { vueRouter } from 'storybook-vue3-router';

import { DARK_THEME } from '../../../.storybook/backgrounds';
import EcNavigationLink from './ec-navigation-link.vue';

export default {
  title: 'Layout/Navigation Link',
  component: EcNavigationLink,
  decorators: [
    vueRouter(),
  ],
};

const Template = ({ ...args }) => ({
  components: { EcNavigationLink },
  setup() {
    return { args };
  },
  template: `
    <ec-navigation-link v-bind="args" />
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
