import { action } from '@storybook/addon-actions';
import { ref } from 'vue';

import EcDateRangeFilter from './ec-date-range-filter.vue';

export default {
  title: 'Filters/Date Range Filter',
  component: EcDateRangeFilter,
};

const Template = ({ value, popoverOptions, ...args }) => ({
  components: { EcDateRangeFilter },
  setup() {
    const model = ref(value);
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
        class="tw-flex tw-justify-center tw-items-center tw-p-20 tw-m-auto"
        v-bind="args"
        v-on="{ change: onChange }"
        v-model="model"
        :popover-options="{ ...popoverOptions, shown: true }"
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
  value: { from: '2020-03-14', to: null },
};
