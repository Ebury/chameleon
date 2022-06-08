import { ref, watchEffect } from 'vue';

import EcCurrencyFilter from '../ec-currency-filter';
import EcDateRangeFilter from '../ec-date-range-filter';
import EcSyncMultipleValuesFilter from '../ec-sync-multiple-values-filter';
import EcTableFilter from './ec-table-filter.vue';

export default {
  title: 'Filters/Table Filter',
  component: EcTableFilter,
};

const Template = ({ value, filters }) => ({
  components: {
    EcTableFilter, EcSyncMultipleValuesFilter, EcDateRangeFilter, EcCurrencyFilter,
  },
  setup() {
    const model = ref(null);

    watchEffect(() => {
      model.value = value;
    });

    return { model, filters };
  },
  template: `
  <ec-table-filter
    class="tw-flex tw-items-center"
    :filters="filters"
    v-model="model"
  />
  `,
});

const comparisonSymbolItems = [{
  text: 'More than',
  value: '>',
}, {
  text: 'Equal to',
  value: '=',
}, {
  text: 'Less than',
  value: '<',
}];

const currencyItems = [{
  value: 'GBP',
  text: 'GBP',
}, {
  value: 'EUR',
  text: 'EUR',
}, {
  value: 'JPY',
  text: 'JPY',
}];

export const basic = Template.bind({});

basic.args = {
  value: {
    paymentStatus: [{ text: 'Paid', value: 'paid' }, { text: 'Cancelled', value: 'canceled' }],
    supplier: [{ text: 'Supplier 1', value: 'supplier1' }],
    dueDate: { from: '2021-11-11' },
    price: { comparisonSymbol: comparisonSymbolItems[1], amount: 1234.56, currencies: [currencyItems[0]] },
  },
  filters: [{
    label: 'Payment status',
    name: 'paymentStatus',
    component: EcSyncMultipleValuesFilter,
    items: [{ text: 'Paid', value: 'paid' }, { text: 'Cancelled', value: 'canceled' }, { text: 'Overdue', value: 'overdue' }],
  }, {
    label: 'Supplier',
    name: 'supplier',
    component: EcSyncMultipleValuesFilter,
    items: [{ text: 'Supplier 1', value: 'supplier1' }, { text: 'Supplier 2', value: 'supplier2' }],
    isSearchable: true,
    isSelectAll: true,
  }, {
    label: 'Due date',
    name: 'dueDate',
    component: EcDateRangeFilter,
  }, {
    label: 'Price',
    name: 'price',
    component: EcCurrencyFilter,
    comparisonSymbolItems,
    currencyItems,
  }],
};
