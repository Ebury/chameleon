import EcSyncMultipleValuesFilter from './ec-sync-multiple-values-filter.vue';

export default {
  title: 'Filters/Multiple Values Filter',
  component: EcSyncMultipleValuesFilter,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EcSyncMultipleValuesFilter },
  data() {
    return {
      valueFromProps: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        this.valueFromProps = newValue;
      },
    },
  },
  template: `
    <ec-sync-multiple-values-filter
      class="tw-flex tw-justify-center tw-items-center tw-p-20 tw-m-auto"
      v-model="valueFromProps"
      :label="label"
      :items="items"
      :is-searchable="false"
      :is-select-all="isSelectAll"
      :select-all-filters-text="selectAllFiltersText"
      :popover-options="{ open: true }"
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
  text: 'Name two',
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
  value: [],
  items,
  isSelectAll: false,
  selectAllFiltersText: 'Select all',
};
