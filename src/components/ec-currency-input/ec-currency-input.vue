<template>
  <div class="ec-currency-input">

    <label
      v-if="label || note"
      class="ec-currency-input__label"
      :for="id"
    >
      <span
        v-if="label"
        data-test="ec-currency-input__label-text"
        class="ec-currency-input__label-text"
      >{{ label }}</span>

      <span
        v-if="note"
        data-test="ec-currency-input__note"
        class="ec-currency-input__note"
      >{{ note }}</span>
    </label>

    <div
      ref="popperWidthReference"
      class="ec-currency-input__input-group"
    >
      <ec-dropdown
        :id="id"
        v-model="currencyModel"
        :class="{ 'ec-currency-input__currencies--is-focused': currenciesHasFocus }"
        :error-id="errorId"
        :items="currenciesItems"
        :popper-modifiers="popperModifier"
        :popover-options="popoverOptions"
        class="ec-currency-input__currencies"
        is-in-group="right"
        is-search-enabled
        :disabled="isCurrenciesDisabled"
        :is-loading="currenciesAreLoading"
        :error-message="errorMessage"
        data-test="ec-currency-input__currencies"
        @focus="currenciesHasFocus = true"
        @blur="currenciesHasFocus = false"
        @change="onChange"
      />
      <ec-amount-input
        v-model="amountModel"
        :locale="locale"
        :currency="value.currency"
        :error-id="errorId"
        :error-message="errorMessage"
        :disabled="isAmountDisabled"
        is-in-group="left"
        class="ec-currency-input__amount"
        data-test="ec-currency-input__amount"
        @change="onChange"
      />
    </div>

    <div
      :id="errorId"
      v-if="isInvalid"
      data-test="ec-currency-input__error-text"
      class="ec-currency-input__error-text"
    >{{ errorMessage }}</div>
  </div>
</template>

<script>
import EcDropdown from '../ec-dropdown';
import EcAmountInput from '../ec-amount-input';

export default {
  name: 'EcCurrencyInput',
  components: {
    EcDropdown,
    EcAmountInput,
  },
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
    errorMessage: {
      type: String,
    },
    currencies: {
      type: Array,
    },
    currenciesAreLoading: {
      type: Boolean,
      default: false,
    },
    isCurrenciesDisabled: {
      type: Boolean,
      default: false,
    },
    isAmountDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
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
      return `ec-currency-input-field-${this._uid}`;
    },
    errorId() {
      return this.isInvalid ? `ec-currency-input-field-${this._uid}` : null;
    },
    isInvalid() {
      return !!this.errorMessage;
    },
    currenciesItems() {
      return this.currencies.map(currency => ({ text: currency, value: currency, id: currency }));
    },
    currencyModel: {
      get() {
        return { text: this.value.currency };
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
    onChange(evt) {
      this.$emit('change', evt);
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/tools/index';
@import '../../scss/settings/index';

$ec-currency-input-invalid-color: $color-error !default;

.ec-currency-input {
  z-index: 0; // When in currencies dropdown is focused gets a high z-index. We set the index here of the whole component to 0 so we eliminate the chance of competing with other components

  &__input-group {
    display: flex;
    flex-direction: row;
  }

  &__currencies {
    margin-right: -1px;
    width: 104px;
  }

  &__currencies--is-focused {
    z-index: $z-index-level-1;
  }

  &__label {
    display: flex;
    flex-wrap: wrap;
  }

  &__label-text {
    @include input-label;

    flex-grow: 1;
    margin-right: 8px;
  }

  &__note {
    @include caption-text;
  }

  &__error-text {
    @include flags-text;

    color: $ec-currency-input-invalid-color;
  }
}
</style>
