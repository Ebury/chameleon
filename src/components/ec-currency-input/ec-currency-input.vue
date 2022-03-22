<template>
  <div class="ec-currency-input">

    <label
      v-if="label || note"
      class="ec-currency-input__label"
      :for="id"
    >
      <span
        v-if="label"
        :data-test="prefixedDataTest('label-text')"
        class="ec-currency-input__label-text"
      >{{ label }}</span>

      <span
        v-if="note"
        :data-test="prefixedDataTest('note')"
        class="ec-currency-input__note"
      >{{ note }}</span>
    </label>

    <div
      ref="popperWidthReference"
      class="ec-currency-input__input-group"
    >
      <div
        v-if="isCurrenciesDisabled"
        v-ec-tooltip="currenciesTooltipOptions"
        class="ec-currency-input__currencies ec-currency-input__currencies--is-disabled"
        :class="{ 'ec-currency-input__currencies--is-disabled-and-has-error': isInvalid }"
        :data-test="prefixedDataTest('currencies')"
      >{{ currencyModel && currencyModel.text }}</div>
      <ec-dropdown
        :id="id"
        v-else
        v-model="currencyModel"
        :class="{ 'ec-currency-input__currencies--is-focused': currenciesHasFocus }"
        :error-id="errorId"
        :items="currenciesItems"
        :popper-modifiers="popperModifier"
        :popover-options="popoverOptions"
        :search-placeholder="searchCurrencyPlaceholder"
        :no-results-text="noCurrenciesText"
        class="ec-currency-input__currencies"
        is-in-group="right"
        is-search-enabled
        :is-loading="currenciesAreLoading"
        :is-sensitive="isSensitive"
        :error-message="errorMessage"
        :data-test="prefixedDataTest('currencies')"
        :list-data-test="prefixedDataTest('currencies-list')"
        @focus="onFocusCurrency"
        @blur="currenciesHasFocus = false"
        @change="onCurrencyChange"
        @open="$emit('open')"
        @after-open="$emit('after-open')"
      />
      <ec-amount-input
        v-model="amountModel"
        :locale="locale"
        :currency="value.currency"
        :error-id="errorId"
        :error-message="errorMessage"
        :disabled="isAmountDisabled"
        :is-sensitive="isSensitive"
        :placeholder="amountPlaceholder"
        is-in-group="left"
        class="ec-currency-input__amount"
        :data-test="prefixedDataTest('amount')"
        @change="onAmountChange"
        @focus="$emit('focus')"
      />
    </div>

    <div
      :id="errorId"
      v-if="isInvalid"
      :data-test="prefixedDataTest('error-text')"
      class="ec-currency-input__error-text"
    >
      <span>{{ errorMessage }}</span>
      <ec-icon
        v-if="isInvalid && errorTooltipMessage"
        v-ec-tooltip="{ content: errorTooltipMessage }"
        class="ec-currency-input__error-tooltip"
        :data-test="prefixedDataTest('error-tooltip')"
        type="error"
        name="simple-error"
        :size="14"
      />
    </div>

    <div
      v-else-if="bottomNote"
      :data-test="prefixedDataTest('bottom-note')"
      class="ec-currency-input__bottom-note"
      :class="{ 'ec-currency-input__bottom-note--is-warning': isWarning }"
    >
      <span>{{ bottomNote }}</span>
      <ec-icon
        v-if="isWarning && warningTooltipMessage"
        v-ec-tooltip="{ content: warningTooltipMessage }"
        class="ec-currency-input__warning-tooltip"
        :data-test="prefixedDataTest('warning-tooltip')"
        type="warning"
        name="simple-error"
        :size="14"
      />
    </div>
  </div>
</template>

<script>
import EcAmountInput from '../ec-amount-input';
import EcDropdown from '../ec-dropdown';
import EcIcon from '../ec-icon';
import EcTooltip from '../../directives/ec-tooltip';
import { getUid } from '../../utils/uid';

export default {
  name: 'EcCurrencyInput',
  components: {
    EcAmountInput,
    EcDropdown,
    EcIcon,
  },
  directives: { EcTooltip },
  model: {
    prop: 'value',
    event: 'value-change',
  },
  props: {
    value: {
      type: Object,
    },
    locale: {
      type: String,
      default: 'en',
    },
    label: {
      type: String,
    },
    note: {
      type: String,
    },
    bottomNote: {
      type: String,
    },
    warningTooltipMessage: {
      type: String,
    },
    isWarning: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
    },
    errorTooltipMessage: {
      type: String,
    },
    currencies: {
      type: Array,
    },
    currenciesAreLoading: {
      type: Boolean,
      default: false,
    },
    disabledCurrenciesTooltip: {
      type: Object,
    },
    isCurrenciesDisabled: {
      type: Boolean,
      default: false,
    },
    isAmountDisabled: {
      type: Boolean,
      default: false,
    },
    isSensitive: {
      type: Boolean,
      default: false,
    },
    amountPlaceholder: {
      type: String,
    },
    searchCurrencyPlaceholder: {
      type: String,
      default: 'Search...',
    },
    noCurrenciesText: {
      type: String,
      default: 'No results found',
    },
  },
  data() {
    return {
      uid: getUid(),
      currenciesHasFocus: false,
      popperModifier: {
        setPopperWidth: {
          enabled: true,
          order: 841,
          fn: /* istanbul ignore next */ (data) => {
            data.styles.width = this.$refs.popperWidthReference.offsetWidth;
            return data;
          },
        },
      },
      popoverOptions: {
        placement: 'bottom-end',
      },
    };
  },
  computed: {
    id() {
      return `ec-currency-input-field-${this.uid}`;
    },
    errorId() {
      return this.isInvalid ? `ec-currency-input-field-${this.uid}` : null;
    },
    isInvalid() {
      return !!this.errorMessage;
    },
    currenciesItems() {
      return this.currencies.map(currency => ({ text: currency, value: currency, id: currency }));
    },
    currenciesTooltipOptions() {
      const { content, placement = 'top' } = this.disabledCurrenciesTooltip || {};
      if (!content) {
        return null;
      }
      return { content, placement };
    },
    currencyModel: {
      get() {
        return this.currenciesItems.find(item => item.value === this.value.currency);
      },
      set(item) {
        this.$emit('value-change', { ...this.value, currency: item.value });
      },
    },
    amountModel: {
      get() {
        return this.value.amount;
      },
      set(value) {
        this.$emit('value-change', { ...this.value, amount: value });
      },
    },
  },
  methods: {
    onAmountChange(evt) {
      this.$emit('change', evt);
      this.$emit('amount-change', evt);
    },
    onCurrencyChange(evt) {
      this.currenciesHasFocus = true;
      this.$emit('change', evt);
      this.$emit('currency-change', evt);
    },
    onFocusCurrency() {
      this.currenciesHasFocus = true;
      this.$emit('focus');
    },
    prefixedDataTest(dataTestSuffix) {
      const dataTestPrefix = this.$attrs['data-test'];
      if (dataTestPrefix) {
        const dataTestPrefixes = [...dataTestPrefix.split(' '), 'ec-currency-input'];
        return dataTestPrefixes.map(dataTest => `${dataTest}__${dataTestSuffix}`).join(' ');
      }

      return `ec-currency-input__${dataTestSuffix}`;
    },
  },
};
</script>

<style>
:root {
  --ec-currency-input-currencies-width: 104px;
}

.ec-currency-input {
  @apply tw-z-0; /* When currencies dropdown is focused, it gets a high z-index. We set the index here of the whole component to 0 so we eliminate the chance of competing with other components */

  &__input-group {
    @apply tw-flex tw-flex-row;
  }

  &__currencies {
    width: var(--ec-currency-input-currencies-width);

    @apply tw--mr-1;
    @apply tw-flex-shrink-0;

    &--is-disabled {
      @apply tw-rounded;
      @apply tw-w-auto;
      @apply tw-flex-grow-0;
      @apply tw-min-w-48;
      @apply tw-py-8 tw-px-12;
      @apply tw-border tw-border-solid tw-border-gray-6;
      @apply tw-rounded-r-none;
      @apply tw-bg-gray-6;

      max-width: var(--ec-currency-input-currencies-width);
    }

    &--is-disabled-and-has-error {
      @apply tw-border tw-border-solid tw-border-error;
    }
  }

  &__currencies--is-focused {
    @apply tw-z-level-1;
  }

  &__label {
    @apply tw-flex tw-flex-wrap;
  }

  &__label-text {
    @apply tw-input-label;
    @apply tw-flex-grow;
    @apply tw-mr-8;
  }

  &__note {
    @apply tw-caption-text;
  }

  &__error-text {
    @apply tw-flex tw-items-start;
    @apply tw-help-text tw-text-error;
    @apply tw-mt-4;
  }

  &__bottom-note {
    @apply tw-flex tw-items-start;
    @apply tw-help-text;
    @apply tw-mt-4;

    &--is-warning {
      @apply tw-text-warning-dark;
    }
  }

  &__error-tooltip,
  &__warning-tooltip {
    @apply tw-flex-shrink-0;
    @apply tw-ml-1 tw-mt-1;
    @apply tw-outline-none;
  }
}
</style>
