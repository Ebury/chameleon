<template>
  <div
    class="ec-currency-filter"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-currency-filter` : 'ec-currency-filter'"
  >
    <ec-filter-popover
      :popover-options="getPopoverOptions"
      :label="label"
      :number-of-selected-filters="numberOfSelectedFilters"
      data-test="ec-currency-filter__trigger"
      is-full-height
    >
      <template #filter>
        <ec-submenu
          v-model="activeTabIndex"
          :submenu="submenu"
          is-full-width
        >
          <template #currency>
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
          </template>

          <template #amount>
            <div class="tw-px-16">
              <ec-amount-filter-input
                v-model="amountModel"
                :comparison-symbol-items="comparisonSymbolItems"
                :locale="locale"
                :is-sensitive="isSensitive"
                :amount-placeholder="amountPlaceholder"
                :error-message="errorMessage"
                class="tw-pt-4 tw-pb-24"
                @open="disableAutoHide = true"
                @close="disableAutoHide = false"
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
          </template>
        </ec-submenu>

      </template>
    </ec-filter-popover>
  </div>
</template>

<script>
import EcSubmenu from '../ec-submenu';
import EcMultipleValuesSelection from '../ec-multiple-values-selection';
import EcFilterPopover from '../ec-filter-popover';
import EcAmountFilterInput from '../ec-amount-filter-input';

export default {
  name: 'EcCurrencyFilter',
  components: {
    EcAmountFilterInput,
    EcFilterPopover,
    EcMultipleValuesSelection,
    EcSubmenu,
  },
  model: {
    prop: 'value',
    event: 'change',
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
    value: {
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
    getPopoverOptions() {
      return {
        autoHide: this.disableAutoHide, // autoHide of the ec-filter-popover should be disabled while the dropdown in ec-amount-filter-input is open, otherwise selecting value in the dropdown will close this popover too.
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
      let number = this.value.currencies?.length ?? 0;

      if (this.hasAmount) {
        number++;
      }

      return number;
    },
    hasAmount() {
      return typeof this.value.amount === 'number';
    },
    selectedCurrenciesModel: {
      get() {
        return this.value.currencies;
      },
      set(value) {
        this.$emit('change', {
          ...this.value,
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
    value: {
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
      this.$emit('change', {
        ...this.value,
        ...this.internalAmountModel,
      });
    },
    onComparisonSymbolChanged() {
      // it doesn't make sense to trigger the change event only if comparison symbol is set
      // and there is no amount set by the user yet.
      if (typeof this.internalAmountModel.amount === 'number') {
        this.$emit('change', {
          ...this.value,
          ...this.internalAmountModel,
        });
      }
    },
    onClearAmount() {
      this.$emit('change', {
        ...this.value,
        comparisonSymbol: null,
        amount: null,
      });
    },
  },
};
</script>

<style>
@import '../../styles/tools/typography.css';

.ec-currency-filter {
  &__clear-amount {
    @mixin ec-body-link;

    @apply tw-border-none;
    @apply tw-bg-transparent;

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
