<template>
  <div class="ec-currency-input">

    <label
      v-if="label || note"
      class="ec-currency-input__label"
      :for="id"
    >
      <span
        v-if="label"
        class="ec-currency-input__label-text"
      >{{ label }}</span>

      <span
        v-if="note"
        class="ec-currency-input__note"
      >{{ note }}</span>
    </label>

    <div
      ref="popperWidthReference"
      class="ec-currency-input__input-group"
    >
      <ec-dropdown
        v-model="inputModel.currency"
        :class="{'ec-currency-input__currencies--on-focus': currenciesOnFocus}"
        :id-from-parent="id"
        :items="currencies"
        :popper-modifiers="popperModifier"
        :popover-options="popoverOptions"
        class="ec-currency-input__currencies"
        is-in-group="right"
        is-search-enabled
        :error-message="errorMessage"
        @onFocus="(value) => currenciesOnFocus = value"
      />
      <ec-amount-input
        v-model="inputModel.amount"
        :locale="locale"
        is-in-group="left"
        :error-message="errorMessage"
        class="ec-currency-input__amount"
      />
    </div>

    <div
      :id="errorId"
      v-if="isInvalid"
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
    event: 'change',
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
  },
  data() {
    return {
      currenciesOnFocus: false,
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
    inputModel: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('change', value);
      },
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/tools/index';
@import '../../scss/settings/index';

$ec-currency-input-invalid-color: $color-error !default;

.ec-currency-input {
  &__input-group {
    display: flex;
    flex-direction: row;
  }

  &__currencies {
    margin-right: -1px;
    min-width: 100px;
    max-width: 20%;
  }

  &__currencies--on-focus {
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
