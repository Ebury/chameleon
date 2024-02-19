<template>
  <div
    class="ec-currency-filter"
    v-bind="{
      ...$attrs,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-currency-filter` : 'ec-currency-filter',
    }"
  >
    <ec-filter-popover
      :popover-options="allPopoverOptions"
      :label="label"
      :number-of-selected-filters="numberOfSelectedFilters"
      data-test="ec-currency-filter__trigger"
      is-full-height
    >
      <template #filter>
        <div class="ec-currency-filter__content-wrapper">
          <ec-submenu
            v-model:activeIndex="activeTabIndex"
            class="ec-currency-filter__submenu"
            :submenu="submenu"
            is-full-width
            :has-header-gap="false"
          />
          <div
            v-show="activeTabIndex === 0"
            class="ec-currency-filter__tab"
            data-test="ec-currency-filter__tab ec-currency-filter__tab--0"
          >
            <ec-multiple-values-selection
              v-model="selectedCurrenciesModel"
              :items="currencyItems"
              :is-searchable="false"
              :is-select-all="true"
              :is-loading="isLoadingCurrencies"
              :select-all-filters-text="selectAllCurrenciesText"
              :error-message="currenciesErrorMessage"
              :empty-message="currenciesEmptyMessage"
            />
          </div>

          <div
            v-show="activeTabIndex === 1"
            class="tw-p-16 ec-currency-filter__tab"
            data-test="ec-currency-filter__tab ec-currency-filter__tab--1"
          >
            <ec-amount-filter-input
              v-model="amountModel"
              :comparison-symbol-items="comparisonSymbolItems"
              :locale="locale"
              :is-sensitive="isSensitive"
              :amount-placeholder="amountPlaceholder"
              :error-message="errorMessage"
              @open="/* c8 ignore next */ disableAutoHide = true"
              @after-close="/* c8 ignore next */ disableAutoHide = false"
              @amount-change="onAmountChanged"
              @comparison-symbol-change="onComparisonSymbolChanged"
            />

            <button
              type="button"
              data-test="ec-currency-filter__clear-amount"
              class="ec-currency-filter__clear-amount"
              :disabled="!hasAmount"
              @click.prevent="onClearAmount()"
            >{{ clearAmountText }}</button>
          </div>
        </div>

      </template>
    </ec-filter-popover>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';

import EcAmountFilterInput from '../ec-amount-filter-input';
import EcFilterPopover from '../ec-filter-popover';
import EcMultipleValuesSelection from '../ec-multiple-values-selection';
import type { PopoverProps } from '../ec-popover/types';
import EcSubmenu from '../ec-submenu';
import type { CurrencyFilterModel, CurrencyFilterProps } from './types';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<CurrencyFilterProps>(), {
  label: '',
  modelValue: () => ({
    currencies: [],
    comparisonSymbol: undefined,
    amount: undefined,
  }),
  currencyItems: () => ([]),
  selectAllCurrenciesText: 'Select all',
  currencyTabHeaderText: 'Currency',
  comparisonSymbolItems: () => ([]),
  amountTabHeaderText: 'Amount',
  amountPlaceholder: 'Enter an amount...',
  clearAmountText: 'Clear amount',
  locale: 'en',
});

const emit = defineEmits<{
  'update:modelValue': [value: CurrencyFilterModel | undefined],
  'change': [value: CurrencyFilterModel | undefined],
}>();

const activeTabIndex = ref(0);
const disableAutoHide = ref(false);

const allPopoverOptions = computed<PopoverProps>(() => ({
  autoHide: !disableAutoHide.value, // autoHide of the ec-filter-popover should be disabled while the dropdown in ec-amount-filter-input is open, otherwise selecting value in the dropdown will close this popover too.
  ...props.popoverOptions,
}));

const submenu = computed(() => [{
  headerTitle: props.currencyTabHeaderText,
  slotName: 'currency',
}, {
  headerTitle: props.amountTabHeaderText,
  slotName: 'amount',
}]);

// model updating
const numberOfSelectedFilters = computed(() => {
  let number = props.modelValue?.currencies?.length ?? 0;

  if (hasAmount.value) {
    number++;
  }

  return number;
});
const hasAmount = computed(() => typeof props.modelValue?.amount === 'number');
const selectedCurrenciesModel = computed({
  get() {
    return props.modelValue?.currencies;
  },
  set(value) {
    update({
      currencies: value,
    });
  },
});
const internalAmountModel = ref<Omit<CurrencyFilterModel, 'currencies'>>({
  comparisonSymbol: undefined,
  amount: undefined,
});
const amountModel = computed({
  get() {
    return {
      comparisonSymbol: internalAmountModel.value.comparisonSymbol,
      amount: internalAmountModel.value.amount,
    };
  },
  set(value) {
    internalAmountModel.value = {
      ...internalAmountModel.value,
      ...value,
    };
  },
});
function onAmountChanged() {
  update({ ...internalAmountModel.value });
}
function onComparisonSymbolChanged() {
  // it doesn't make sense to trigger the change event only if comparison symbol is set
  // and there is no amount set by the user yet.
  if (typeof internalAmountModel.value.amount === 'number') {
    update({ ...internalAmountModel.value });
  }
}
function onClearAmount() {
  update({
    comparisonSymbol: undefined,
    amount: undefined,
  });
}
function update(value: Partial<CurrencyFilterModel>) {
  let newValue: CurrencyFilterModel | undefined = {
    currencies: [],
    amount: undefined,
    comparisonSymbol: undefined,
    ...props.modelValue,
    ...value,
  };

  // if there are no selected currencies and no amount is selected, then emit null value.
  // ec-table-filter must be able to determine where the filter is empty or not
  // in order to show/hide clear filters functionality.
  //
  // we don't want every complicated filter polluting the logic inside its parent implementation
  // so we rather sort it here.
  if ((!Array.isArray(newValue.currencies) || newValue.currencies.length === 0) && typeof newValue.amount !== 'number') {
    newValue = undefined;
  }

  emit('update:modelValue', newValue);
  emit('change', newValue);
}
watchEffect(() => {
  internalAmountModel.value = {
    comparisonSymbol: props.modelValue?.comparisonSymbol,
    amount: props.modelValue?.amount,
  };
});
</script>

<style>
@import '../../styles/tools/typography.css';

.ec-currency-filter {
  &__content-wrapper {
    @apply tw-flex tw-flex-col;
    @apply tw-max-h-full tw-h-full;
  }

  &__submenu {
    @apply tw-flex-shrink-0 tw-flex-grow-0;
  }

  &__tab {
    @apply tw-flex-1 tw-flex tw-flex-col;
    @apply tw-min-h-0;
  }

  &__clear-amount {
    @mixin ec-body-link;

    @apply tw-border-none;
    @apply tw-bg-transparent;
    @apply tw-mt-24;
    @apply tw-self-start;

    &:disabled {
      @apply tw-text-gray-5;
      @apply tw-pointer-events-none;
    }

    &:hover {
      @apply tw-cursor-pointer;
    }
  }
}
</style>
