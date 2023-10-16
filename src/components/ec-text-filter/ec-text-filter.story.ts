import type { Meta, StoryObj } from '@storybook/vue3';
import { ref } from 'vue';

import EcTextFilter from './ec-text-filter.vue';
import type { TextFilterEvent, TextFilterEvents } from './types';

export default {
  title: 'Filters/Text filter',
  component: EcTextFilter,
  argTypes: {
    onChange: { action: 'change' },
  },
} as Meta<typeof EcTextFilter>;

type EcTextFilterStory = StoryObj<typeof EcTextFilter>;

export const Basic: EcTextFilterStory = {
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
          :model-value="modelValue"
          @change="handleChange"
        />
      </div>
    `,
  }),
  args: {
    modelValue: 'Some text',
  },
};
