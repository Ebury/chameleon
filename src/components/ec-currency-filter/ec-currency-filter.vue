<template>
  <div
    class="ec-currency-filter"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-currency-filter` : 'ec-currency-filter'"
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
              @open="disableAutoHide = true"
              @after-close="disableAutoHide = false"
              @amount-change="onAmountChanged"
              @comparison-symbol-change="onComparisonSymbolChanged"
            />

            <button
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

<script>
import EcAmountFilterInput from '../ec-amount-filter-input';
import EcFilterPopover from '../ec-filter-popover';
import EcMultipleValuesSelection from '../ec-multiple-values-selection';
import EcSubmenu from '../ec-submenu';

export default {
  name: 'EcCurrencyFilter',
  components: {
    EcAmountFilterInput,
    EcFilterPopover,
    EcMultipleValuesSelection,
    EcSubmenu,
  },
  props: {
    label: {
      type: String,
      required: true,
      default: '',
    },
    popoverOptions: {
      type: Object,
    },
    modelValue: {
      type: Object,
      default: () => ({
        currencies: [],
        comparisonSymbol: null,
        amount: null,
      }),
    },
    currencyItems: {
      type: Array,
      required: true,
      default: () => ([]),
    },
    isLoadingCurrencies: {
      type: Boolean,
      default: false,
    },
    currenciesEmptyMessage: {
      type: String,
    },
    currenciesErrorMessage: {
      type: String,
    },
    selectAllCurrenciesText: {
      type: String,
      default: 'Select all',
    },
    currencyTabHeaderText: {
      type: String,
      default: 'Currency',
    },
    comparisonSymbolItems: {
      type: Array,
      required: true,
      default: () => ([]),
    },
    amountTabHeaderText: {
      type: String,
      default: 'Amount',
    },
    amountPlaceholder: {
      type: String,
      default: 'Enter an amount...',
    },
    clearAmountText: {
      type: String,
      default: 'Clear amount',
    },
    locale: {
      type: String,
      default: 'en',
    },
    isSensitive: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
    },
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      activeTabIndex: 0,
      disableAutoHide: false,
      internalAmountModel: {
        comparisonSymbol: null,
        amount: null,
      },
    };
  },
  computed: {
    allPopoverOptions() {
      return {
        autoHide: !this.disableAutoHide, // autoHide of the ec-filter-popover should be disabled while the dropdown in ec-amount-filter-input is open, otherwise selecting value in the dropdown will close this popover too.
        ...this.popoverOptions,
      };
    },
    submenu() {
      return [{
        headerTitle: this.currencyTabHeaderText,
        slotName: 'currency',
      }, {
        headerTitle: this.amountTabHeaderText,
        slotName: 'amount',
      }];
    },
    numberOfSelectedFilters() {
      let number = this.modelValue?.currencies?.length ?? 0;

      if (this.hasAmount) {
        number++;
      }

      return number;
    },
    hasAmount() {
      return typeof this.modelValue?.amount === 'number';
    },
    selectedCurrenciesModel: {
      get() {
        return this.modelValue?.currencies;
      },
      set(value) {
        this.update({
          currencies: value,
        });
      },
    },
    amountModel: {
      get() {
        return {
          comparisonSymbol: this.internalAmountModel.comparisonSymbol,
          amount: this.internalAmountModel.amount,
        };
      },
      set(value) {
        // the amount and the comparison symbol are stored internally in the local state
        // and they are not emitted to the parent until the amount input triggers the
        // change event.
        //
        // we don't want the filter to be updating the parent model value each time a key is
        // pressed because that would trigger lots of AJAX requests.
        //
        // what we will do instead is to store the value in the local state and emit its values
        // when user changes focus and the amount input is no longer focused -> that will trigger
        // change event.
        this.internalAmountModel = {
          ...this.internalAmountModel,
          ...value,
        };
      },
    },
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(newValue) {
        this.internalAmountModel = {
          comparisonSymbol: newValue?.comparisonSymbol,
          amount: newValue?.amount,
        };
      },
    },
  },
  methods: {
    onAmountChanged() {
      this.update({ ...this.internalAmountModel });
    },
    onComparisonSymbolChanged() {
      // it doesn't make sense to trigger the change event only if comparison symbol is set
      // and there is no amount set by the user yet.
      if (typeof this.internalAmountModel.amount === 'number') {
        this.update({ ...this.internalAmountModel });
      }
    },
    onClearAmount() {
      this.update({
        comparisonSymbol: null,
        amount: null,
      });
    },
    update(value) {
      let newValue = {
        currencies: [],
        amount: null,
        comparisonSymbol: null,
        ...this.modelValue,
        ...value,
      };

      // if there are no selected currencies and no amount is selected, then emit null value.
      // ec-table-filter must be able to determine where the filter is empty or not
      // in order to show/hide clear filters functionality.
      //
      // we don't want every complicated filter polluting the logic inside its parent implementation
      // so we rather sort it here.
      if (newValue.currencies.length === 0 && typeof newValue.amount !== 'number') {
        newValue = null;
      }

      this.$emit('update:modelValue', newValue);
      this.$emit('change', newValue);
    },
  },
};
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
