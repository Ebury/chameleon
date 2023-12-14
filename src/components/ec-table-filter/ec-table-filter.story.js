import { action } from '@storybook/addon-actions';
import { useMediaQuery } from '@vueuse/core';
import {
  markRaw, reactive, ref, toRefs, watchEffect,
} from 'vue';

import EcCurrencyFilter from '../ec-currency-filter';
import EcDateRangeFilter from '../ec-date-range-filter';
import EcSyncMultipleValuesFilter from '../ec-sync-multiple-values-filter';
import EcTextFilter from '../ec-text-filter';
import EcTableFilter from '.';

export default {
  title: 'Filters/Table Filter',
  component: EcTableFilter,
};

const useTableFiltersSetup = () => ({
  onUpdateModelValue: action('update:modelValue'),
  onChange: action('change'),
});

const BasicTemplate = storyArgs => ({
  components: {
    EcTableFilter, EcSyncMultipleValuesFilter, EcDateRangeFilter, EcCurrencyFilter,
  },
  setup() {
    const model = ref('');
    const args = ref({});

    watchEffect(() => {
      const { modelValue, ...rest } = storyArgs;
      model.value = modelValue;
      args.value = rest;
    });

    return {
      ...useTableFiltersSetup(),
      model,
      args,
    };
  },
  template: `
    <ec-table-filter
      v-bind="args"
      v-model="model"
      class="tw-flex tw-items-center"
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
    component: markRaw(EcSyncMultipleValuesFilter),
    items: [{ text: 'Paid', value: 'paid' }, { text: 'Cancelled', value: 'canceled' }, { text: 'Overdue', value: 'overdue' }],
  }, {
    label: 'Supplier',
    name: 'supplier',
    component: markRaw(EcSyncMultipleValuesFilter),
    items: [{ text: 'Supplier 1', value: 'supplier1' }, { text: 'Supplier 2', value: 'supplier2' }],
    isSearchable: true,
    isSelectAll: true,
  }, {
    label: 'Due date',
    name: 'dueDate',
    component: markRaw(EcDateRangeFilter),
  }, {
    label: 'Price',
    name: 'price',
    component: markRaw(EcCurrencyFilter),
    comparisonSymbolItems,
    currencyItems,
  }, {
    name: 'text',
    component: markRaw(EcTextFilter),
  }],
};

const AllTemplate = storyArgs => ({
  components: {
    EcTableFilter, EcSyncMultipleValuesFilter, EcDateRangeFilter, EcCurrencyFilter,
  },
  setup() {
    const { modelValue: model, filters } = toRefs(storyArgs);

    const areFiltersHidden = useMediaQuery('(max-width: 767px)');
    const someFiltersHidden = reactive([{
      label: 'Payment status',
      name: 'paymentStatus',
      component: markRaw(EcSyncMultipleValuesFilter),
      isHidden: areFiltersHidden,
      items: [{ text: 'Paid', value: 'paid' }, { text: 'Cancelled', value: 'canceled' }, { text: 'Overdue', value: 'overdue' }],
    }, {
      label: 'Supplier',
      name: 'supplier',
      component: markRaw(EcSyncMultipleValuesFilter),
      items: [{ text: 'Supplier 1', value: 'supplier1' }, { text: 'Supplier 2', value: 'supplier2' }],
      isSearchable: true,
      isSelectAll: true,
    }, {
      label: 'Due date',
      name: 'dueDate',
      component: markRaw(EcDateRangeFilter),
      isHidden: areFiltersHidden,
    }, {
      label: 'Price',
      name: 'price',
      component: markRaw(EcCurrencyFilter),
      comparisonSymbolItems,
      currencyItems,
    }, {
      name: 'text',
      component: markRaw(EcTextFilter),
    }]);
    const onlyTextFilterShownOnThreshold = reactive([{
      label: 'Payment status',
      name: 'paymentStatus',
      component: markRaw(EcSyncMultipleValuesFilter),
      isHidden: areFiltersHidden,
      items: [{ text: 'Paid', value: 'paid' }, { text: 'Cancelled', value: 'canceled' }, { text: 'Overdue', value: 'overdue' }],
    }, {
      label: 'Supplier',
      name: 'supplier',
      component: markRaw(EcSyncMultipleValuesFilter),
      isHidden: areFiltersHidden,
      items: [{ text: 'Supplier 1', value: 'supplier1' }, { text: 'Supplier 2', value: 'supplier2' }],
      isSearchable: true,
      isSelectAll: true,
    }, {
      label: 'Due date',
      name: 'dueDate',
      component: markRaw(EcDateRangeFilter),
      isHidden: areFiltersHidden,
    }, {
      label: 'Price',
      name: 'price',
      component: markRaw(EcCurrencyFilter),
      isHidden: areFiltersHidden,
      comparisonSymbolItems,
      currencyItems,
    }, {
      name: 'text',
      component: markRaw(EcTextFilter),
      isFullWidth: areFiltersHidden,
    }]);
    const onlyTextFilterShown = [{
      label: 'Payment status',
      name: 'paymentStatus',
      component: markRaw(EcSyncMultipleValuesFilter),
      isHidden: true,
      items: [{ text: 'Paid', value: 'paid' }, { text: 'Cancelled', value: 'canceled' }, { text: 'Overdue', value: 'overdue' }],
    }, {
      label: 'Supplier',
      name: 'supplier',
      component: markRaw(EcSyncMultipleValuesFilter),
      isHidden: true,
      items: [{ text: 'Supplier 1', value: 'supplier1' }, { text: 'Supplier 2', value: 'supplier2' }],
      isSearchable: true,
      isSelectAll: true,
    }, {
      label: 'Due date',
      name: 'dueDate',
      component: markRaw(EcDateRangeFilter),
      isHidden: true,
    }, {
      label: 'Price',
      name: 'price',
      component: markRaw(EcCurrencyFilter),
      isHidden: true,
      comparisonSymbolItems,
      currencyItems,
    }, {
      name: 'text',
      component: EcTextFilter,
      isFullWidth: true,
    }];
    const searchFilterFillingRemainingSpace = reactive([{
      label: 'Payment status',
      name: 'paymentStatus',
      component: markRaw(EcSyncMultipleValuesFilter),
      items: [{ text: 'Paid', value: 'paid' }, { text: 'Cancelled', value: 'canceled' }, { text: 'Overdue', value: 'overdue' }],
    }, {
      label: 'Supplier',
      name: 'supplier',
      component: markRaw(EcSyncMultipleValuesFilter),
      items: [{ text: 'Supplier 1', value: 'supplier1' }, { text: 'Supplier 2', value: 'supplier2' }],
      isSearchable: true,
      isSelectAll: true,
    }, {
      label: 'Due date',
      name: 'dueDate',
      component: markRaw(EcDateRangeFilter),
    }, {
      label: 'Price',
      name: 'price',
      component: markRaw(EcCurrencyFilter),
      comparisonSymbolItems,
      currencyItems,
    }, {
      name: 'text',
      isFullWidth: true,
      stretch: true,
      component: markRaw(EcTextFilter),
    }]);
    return {
      ...useTableFiltersSetup(),
      filters,
      model,
      areFiltersHidden,
      someFiltersHidden,
      onlyTextFilterShownOnThreshold,
      onlyTextFilterShown,
      searchFilterFillingRemainingSpace,
    };
  },
  template: `
    <h2 class="tw-m-24">Basic</h2>
    <div class="tw-flex tw-px-20">
      <div class="tw-my-auto tw-mx-20 tw-w-full ec-card">
        <ec-table-filter
          v-model="model"
          class="tw-flex tw-items-center"
          :filters="filters"
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
          v-model="model"
          class="tw-flex tw-items-center"
          :filters="someFiltersHidden"
          v-on="{
            change: onChange,
            'update:modelValue': onUpdateModelValue,
          }"
        />
      </div>
    </div>
    <h2 class="tw-m-24">Hide all filters except search on threshold</h2>
    <div class="tw-flex tw-px-20">
      <div class="tw-my-auto tw-mx-20 tw-w-full ec-card">
        <ec-table-filter
          v-model="model"
          class="tw-flex tw-items-center"
          :is-clear-filters-button-hidden="areFiltersHidden"
          :filters="onlyTextFilterShownOnThreshold"
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
          v-model="model"
          class="tw-flex tw-items-center"
          :is-clear-filters-button-hidden="true"
          :filters="onlyTextFilterShown"
          v-on="{
            change: onChange,
            'update:modelValue': onUpdateModelValue,
          }"
        />
      </div>
    </div>
    <h2 class="tw-m-24">Use stretched layout</h2>
    <div class="tw-flex tw-px-20">
      <div class="tw-my-auto tw-mx-20 tw-w-full ec-card">
        <ec-table-filter
          v-model="model"
          :filters="searchFilterFillingRemainingSpace"
          :has-stretch-filter="true"
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
