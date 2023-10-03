import { action } from '@storybook/addon-actions';
import { ref, watchEffect } from 'vue';

import EcCurrencyFilter from '../ec-currency-filter';
import EcDateRangeFilter from '../ec-date-range-filter';
import EcSyncMultipleValuesFilter from '../ec-sync-multiple-values-filter';
import EcTextFilter from '../ec-text-filter';
import EcTableFilter from '.';

export default {
  title: 'Filters/Table Filter',
  component: EcTableFilter,
};

const useTableFiltersSetup = (modelValue, filters) => {
  const model = ref(null);

  watchEffect(() => {
    model.value = modelValue;
  });

  return {
    model,
    filters,
    onUpdateModelValue: action('update:modelValue'),
    onChange: action('change'),
  };
};

const BasicTemplate = ({ modelValue, filters }) => ({
  components: {
    EcTableFilter, EcSyncMultipleValuesFilter, EcDateRangeFilter, EcCurrencyFilter,
  },
  setup() {
    return { ...useTableFiltersSetup(modelValue, filters) };
  },
  template: `
  <ec-table-filter
    class="tw-flex tw-items-center"
    :filters="filters"
    v-model="model"
    v-on="{
      change: onChange,
      'update:modelValue': onUpdateModelValue,
    }"
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

export const basic = BasicTemplate.bind({});

basic.args = {
  modelValue: {
    paymentStatus: [{ text: 'Paid', value: 'paid' }, { text: 'Cancelled', value: 'canceled' }],
    supplier: [{ text: 'Supplier 1', value: 'supplier1' }],
    dueDate: { from: '2021-11-11' },
    price: { comparisonSymbol: comparisonSymbolItems[1], amount: 1234.56, currencies: [currencyItems[0]] },
    text: 'Some text',
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
  }, {
    name: 'text',
    component: EcTextFilter,
  }],
};

const AllTemplate = ({ modelValue, filters }) => ({
  components: {
    EcTableFilter, EcSyncMultipleValuesFilter, EcDateRangeFilter, EcCurrencyFilter,
  },
  setup() {
    return { ...useTableFiltersSetup(modelValue, filters) };
  },
  template: `
  <h2 class="tw-m-24">Basic</h2>
    <div class="tw-flex tw-px-20">
      <div class="tw-my-auto tw-mx-20 tw-w-full ec-card">
      <ec-table-filter
        class="tw-flex tw-items-center"
        :filters="filters"
        v-model="model"
        v-on="{
          change: onChange,
          'update:modelValue': onUpdateModelValue,
        }"
      />
    </div>
  </div>
  <h2 class="tw-m-24">Hide some filters on threshold</h2>
    <div class="tw-flex tw-px-20">
      <div class="tw-my-auto tw-mx-20 tw-w-full ec-card">
      <ec-table-filter
        class="tw-flex tw-items-center"
        :filters="filters"
        :hiddenFiltersNames="['paymentStatus', 'dueDate']"
        v-model="model"
        v-on="{
          change: onChange,
          'update:modelValue': onUpdateModelValue,
        }"
      />
    </div>
  </div>
  <h2 class="tw-m-24">Always hidden filters</h2>
  <div class="tw-flex tw-px-20">
      <div class="tw-my-auto tw-mx-20 tw-w-full ec-card">
      <ec-table-filter
        class="tw-flex tw-items-center"
        :areFiltersHidden="true"
        :filters="filters"
        :hiddenFiltersNames="['paymentStatus', 'dueDate']"
        v-model="model"
        v-on="{
          change: onChange,
          'update:modelValue': onUpdateModelValue,
        }"
      />
    </div>
  </div>
  <h2 class="tw-m-24">Hide all filters except search</h2>
  <div class="tw-flex tw-px-20">
      <div class="tw-my-auto tw-mx-20 tw-w-full ec-card">
      <ec-table-filter
        class="tw-flex tw-items-center"
        :areFiltersHidden="true"
        :filters="filters"
        :hiddenFiltersNames="['paymentStatus', 'supplier', 'dueDate', 'price']"
        v-model="model"
        v-on="{
          change: onChange,
          'update:modelValue': onUpdateModelValue,
        }"
      />
    </div>
  </div>
  `,
});

export const all = AllTemplate.bind({});

all.args = {
  ...basic.args,
};
