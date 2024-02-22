import type { Meta, StoryFn } from '@storybook/vue3';

import EcLoadingIcon from './ec-loading-icon.vue';

const meta: Meta = {
  title: 'Loading Icon',
  component: EcLoadingIcon,
};

export default meta;

export const basic: StoryFn<typeof EcLoadingIcon> = args => ({
  components: { EcLoadingIcon },
  setup() {
    return { args };
  },
  template: `
    <div class="tw-p-24 tw-flex tw-justify-center">
      <ec-loading-icon v-bind="args" />
    </div>
  `,
});

basic.args = {
  size: 48,
};
