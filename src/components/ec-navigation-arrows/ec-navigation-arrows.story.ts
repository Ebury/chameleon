import type { Meta, StoryObj } from '@storybook/vue3';

import EcNavigationArrows from './ec-navigation-arrows.vue';

export default {
  title: 'Navigation arrows',
  component: EcNavigationArrows,
  argTypes: {
    onPreviousClick: { action: 'previous-click' },
    onNextClick: { action: 'next-click' },
  },
} as Meta<typeof EcNavigationArrows>;

type Story = StoryObj<typeof EcNavigationArrows>;

export const Primary: Story = {
  render: args => ({
    setup() {
      return {
        args,
      };
    },
    components: { EcNavigationArrows },
    template: '<ec-navigation-arrows v-bind="args" />',
  }),
};

export const Disabled: Story = {
  render: args => ({
    setup() {
      return {
        args,
      };
    },
    components: { EcNavigationArrows },
    template: '<ec-navigation-arrows v-bind="args" />',
  }),
  args: {
    isPreviousDisabled: true,
    isNextDisabled: true,
  },
};
