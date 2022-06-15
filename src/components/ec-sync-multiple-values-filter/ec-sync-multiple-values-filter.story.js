import { ref } from 'vue';

import EcSyncMultipleValuesFilter from './ec-sync-multiple-values-filter.vue';

export default {
  title: 'Filters/Multiple Values Filter',
  component: EcSyncMultipleValuesFilter,
};

const Template = ({ modelValue, popoverOptions, ...args }) => ({
  components: { EcSyncMultipleValuesFilter },
  setup() {
    return {
      args,
      popoverOptions,
      model: ref(modelValue),
    };
  },
  template: `
    <ec-sync-multiple-values-filter
      class="tw-flex tw-justify-center tw-items-center tw-p-20 tw-m-auto"
      v-bind="args"
      v-model="model"
      :popover-options="{ shown: true, ...popoverOptions }"
    />
  `,
});

const items = [{
  value: 'Success',
  icon: {
    name: 'rounded-check',
    type: 'success',
  },
  text: 'Success (this text should be too long to display, this is the reason why we have ellipsis)',
}, {
  value: 'Partially paid',
  icon: {
    name: 'rounded-partial',
    type: 'success',
  },
  text: 'Partially paid',
}, {
  value: 'Cancelled',
  icon: {
    name: 'rounded-cancelled',
    type: 'error',
  },
  text: 'Cancelled',
}, {
  value: 'Returned',
  icon: {
    name: 'rounded-returned',
    type: 'error',
  },
  text: 'Returned',
}, {
  value: 'Not paid',
  icon: {
    name: 'rounded-euro',
    type: 'warning',
  },
  text: 'Not paid',
}, {
  value: 'Not paid value date not reached',
  icon: {
    name: 'rounded-euro',
    type: 'interactive',
  },
  text: 'Not paid (Value date not reached)',
}];
export const basic = Template.bind({});

basic.args = {
  label: 'Status',
  items,
  isSelectAll: false,
  selectAllFiltersText: 'Select all',
};
