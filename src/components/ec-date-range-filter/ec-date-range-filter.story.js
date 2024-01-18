import { action } from '@storybook/addon-actions';
import { ref, watchEffect } from 'vue';

import EcDateRangeFilter from './ec-date-range-filter.vue';

export default {
  title: 'Filters/Date Range Filter',
  component: EcDateRangeFilter,
};

const Template = storyArgs => ({
  components: { EcDateRangeFilter },
  setup() {
    const model = ref('');
    const args = ref({});

    watchEffect(() => {
      const { modelValue, ...rest } = storyArgs;
      model.value = modelValue;
      args.value = rest;
    });

    return {
      args,
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
        :popover-options="{ ...args.popoverOptions, shown: true }"
        v-on="{ change: onChange }"
      />
    </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  label: 'Due date',
  clearText: 'Clear dates',
  dateRangeErrorMessage: '',
  modelValue: {
    from: new Date(2023, 11, 1),
    to: null,
  },
  fromDatepickerOptions: {
    label: 'From',
    placeholder: 'Choose a date',
    areWeekendsDisabled: true,
    errorMessage: '',
  },
  toDatepickerOptions: {
    label: 'To',
    placeholder: 'Choose a date',
    areWeekendsDisabled: true,
    errorMessage: '',
  },
};
