import EcTableFilter from './ec-table-filter.vue';
import EcSyncMultipleValuesFilter from '../ec-sync-multiple-values-filter';
import EcDateRangeFilter from '../ec-date-range-filter';

export default {
  title: 'Filters/Table Filter',
  component: EcTableFilter,
};

export const basic = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EcTableFilter, EcSyncMultipleValuesFilter, EcDateRangeFilter },
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
  <ec-table-filter
    class="tw-flex tw-items-center"
    :filters="filters"
    v-model="valueFromProps"
  />
  `,
});

basic.args = {
  value: { dueDate: { from: null, to: null }, paymentStatus: [{ text: 'Paid', value: 'paid' }, { text: 'Cancelled', value: 'canceled' }], feeType: [{ text: 'Invoiced', value: 'invoiced' }] },
  filters: [{
    label: 'Payment status', // remember this needs to be translated
    name: 'paymentStatus',
    component: EcSyncMultipleValuesFilter,
    items: [{ text: 'Paid', value: 'paid' }, { text: 'Cancelled', value: 'canceled' }, { text: 'Overdue', value: 'overdue' }],
    isSearchable: false,
    isSelectAll: false,
    selectAllFiltersText: '',
  }, {
    label: 'Fee type', // remember this needs to be translated
    name: 'feeType',
    component: EcSyncMultipleValuesFilter,
    items: [{ text: 'Invoiced', value: 'invoiced' }, { text: 'Other type', value: 'other type' }],
    isSearchable: false,
    isSelectAll: false,
    selectAllFiltersText: '',
  }, {
    label: 'Due date',
    name: 'dueDate',
    component: EcDateRangeFilter,
    fromLabelText: 'From',
    toLabelText: 'To',
    clearText: 'Clear dates', // remember this needs to be translated
    errorMessage: '',
  }],
};
