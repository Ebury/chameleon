import EcSyncMultipleValuesFilter from './ec-sync-multiple-values-filter.vue';
import EcCheckbox from '../ec-checkbox/ec-checkbox.vue';

export default {
  title: 'Filters/Multiple Values Filter',
  component: EcSyncMultipleValuesFilter,
};

export const basic = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EcSyncMultipleValuesFilter, EcCheckbox },
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
      :selectAllText="selectAllText"
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
  text: 'Success',
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
  value: 'Not paid vliude date not reached',
  icon: {
    name: 'rounded-euro',
    type: 'interactive',
  },
  text: 'Not paid (Value date not reached)',
}];

basic.args = {
  label: 'Status',
  value: [],
  items,
  isSelectAll: false,
  selectAllText: 'Select all',
};
