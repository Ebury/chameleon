import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import EcTextFilter from './ec-text-filter.vue';
import type { TextFilterEvent, TextFilterEvents } from './types';

const meta: Meta<typeof EcTextFilter> = {
  title: 'Filters/Text filter',
  component: EcTextFilter,
  argTypes: {
    onChange: { action: 'change' },
  },
};

export default meta;

type Story = StoryObj<typeof EcTextFilter>;

export const Basic: Story = {
  render: args => ({
    setup() {
      const modelValue = ref(args.modelValue);

      function handleChange(event: TextFilterEvents[TextFilterEvent.CHANGE]) {
        modelValue.value = event;
      }

      return {
        args,
        modelValue,
        handleChange,
      };
    },
    components: { EcTextFilter },
    template: `
      <div class="tw-my-64 tw-mx-auto tw-max-w-screen-sm">
        <ec-text-filter
            v-bind="args"
            v-bind:model-value="modelValue"
            @change="handleChange"
        />
      </div>`,
  }),
  args: {
    modelValue: 'Some text',
  },
};
