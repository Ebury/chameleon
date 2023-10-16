import { action } from '@storybook/addon-actions';
import { reactive, toRefs } from 'vue';

import EcDateRangeFilter from './ec-date-range-filter.vue';

export default {
  title: 'Filters/Date Range Filter',
  component: EcDateRangeFilter,
};

const Template = storyArgs => ({
  components: { EcDateRangeFilter },
  setup() {
    const { modelValue: model, popoverOptions, ...rest } = toRefs(storyArgs);
    const args = reactive(rest);

    return {
      args,
      popoverOptions,
      model,
      onChange: action('change'),
    };
  },
  template: `
    <div style="min-height: 350px;">
      <ec-date-range-filter
        v-bind="args"
        v-model="model"
        class="tw-flex tw-justify-center tw-items-center tw-p-20 tw-m-auto"
        :popover-options="{ ...popoverOptions, shown: true }"
        v-on="{ change: onChange }"
      />
    </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  label: 'Due date',
  fromLabelText: 'From',
  toLabelText: 'To',
  clearText: 'Clear dates',
  fromErrorMessage: '',
  toErrorMessage: '',
  dateRangeErrorMessage: '',
  modelValue: { from: '2020-03-14', to: null },
};
