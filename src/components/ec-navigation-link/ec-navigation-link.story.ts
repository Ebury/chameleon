import type { Meta, StoryFn } from '@storybook/vue3';
import { vueRouter } from 'storybook-vue3-router';

import { DARK_THEME } from '../../../.storybook/backgrounds';
import { IconName } from '../ec-icon/icon-names';
import EcNavigationLink from './ec-navigation-link.vue';

export default {
  title: 'Layout/Navigation Link',
  component: EcNavigationLink,
  decorators: [
    vueRouter(),
  ],
} as Meta<typeof EcNavigationLink>;

const Template: StoryFn<typeof EcNavigationLink> = args => ({
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
  iconName: IconName.SIMPLE_TRADE_FINANCE,
  iconSize: 30,
  url: '/trade-finance',
};

basic.parameters = {
  backgrounds: { default: DARK_THEME.name, values: [DARK_THEME] },
};
