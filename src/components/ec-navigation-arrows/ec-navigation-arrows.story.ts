import type { Meta, StoryObj } from '@storybook/vue3';

import EcNavigationArrows from './ec-navigation-arrows.vue';

const meta: Meta<typeof EcNavigationArrows> = {
  title: 'Navigation arrows',
  component: EcNavigationArrows,
  argTypes: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onPreviousClick: { action: 'previous-click' },
    onNextClick: { action: 'next-click' },
  },
};

export default meta;

type Story = StoryObj<typeof EcNavigationArrows>;

export const Primary: Story = {
  render: args => ({
    setup() {
      return {
        args,
      };
    },
    components: { EcNavigationArrows },
    template: '<EcNavigationArrows v-bind="args"/>',
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
    template: '<EcNavigationArrows v-bind="args"/>',
  }),
  args: {
    isPreviousDisabled: true,
    isNextDisabled: true,
  },
};
