<template>
  <ec-input-field
    v-bind="{
      ...$attrs,
      ...$props,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-amount-input` : 'ec-amount-input',
      locale: null,
      isMasked: null,
      currency: null,
    }"
    v-model="inputModel"
    v-ec-amount="getFormattingOptions()"
    v-on="{ ...$listeners, 'update:modelValue': null }"
  />
</template>

<script>
import EcAmount from '../../directives/ec-amount/ec-amount';
import { format, unFormat } from '../../directives/ec-amount/utils';
import { getDecimalSeparator, getGroupingSeparator } from '../../utils/number-format';
import EcInputField from '../ec-input-field';

export default {
  name: 'EcAmountInput',
  compatConfig: {
    COMPONENT_V_MODEL: false,
  },
  components: { EcInputField },
  directives: { EcAmount },
  inheritAttrs: false,
  props: {
    ...EcInputField.props,
    modelValue: {
      validator: prop => typeof prop === 'number' || typeof prop === 'string' || prop === null,
      required: true,
      default: null,
    },
    isMasked: {
      type: Boolean,
      default: false,
    },
    locale: {
      type: String,
      default: 'en',
    },
    currency: {
      type: String,
    },
    isSensitive: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  data() {
    return {
      formattedValue: '',
      unformattedValue: null,
    };
  },
  computed: {
    precision() {
      // Precision may vary because of locale and currency
      // If currency is not given, use only locale and pass non existent currency, e.g. EN -> 2
      // If currency is present, we might get different result, e.g. precision for EN with GBP is 2,
      // but EN with JPY is 0.
      const options = new Intl.NumberFormat(this.locale, { style: 'currency', currency: this.currency || 'XYZ' }).resolvedOptions();
      return options.maximumFractionDigits;
    },
    inputModel: {
      get() {
        return this.formattedValue;
      },
      set(newValue) {
        const newValueFormatted = format(newValue, this.getFormattingOptions());
        if (newValueFormatted !== newValue) {
          // it seems that ec-amount directive didn't have chance to format the newValue yet.
          // so ignore this attempt to set invalid/unprocessed value
          return;
        }

        if (newValue === this.formattedValue) {
          // the new value is exactly the same as the current value, skip the assignment so it will not trigger other
          // setters and watchers.
          return;
        }

        this.formattedValue = newValue;
      },
    },
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(newValue) {
        if (this.isMasked) {
          if (newValue === this.formattedValue) {
            return;
          }

          this.formattedValue = newValue;
          this.unformattedValue = +(unFormat(newValue, this.getGroupingSeparator(), this.getDecimalSeparator()));
        } else {
          if (newValue === this.unformattedValue) {
            return;
          }

          if (!Number.isNaN(newValue) && this.formattedValue !== '-') {
            if (typeof newValue === 'number') {
              this.formattedValue = new Intl.NumberFormat(this.locale, { type: 'decimal', maximumFractionDigits: this.precision }).format(this.modelValue);
            } else {
              this.formattedValue = format(newValue, this.getFormattingOptions());
            }
          }
          this.unformattedValue = newValue;
        }
      },
    },
    currency() {
      if (this.formattedValue) {
        const formatted = new Intl.NumberFormat(this.locale, { type: 'decimal', maximumFractionDigits: this.precision }).format(this.unformattedValue);
        this.formattedValue = format(formatted, this.getFormattingOptions());
      }
    },
    locale() {
      if (this.formattedValue) {
        const formatted = new Intl.NumberFormat(this.locale, { type: 'decimal', maximumFractionDigits: this.precision }).format(this.unformattedValue);
        this.formattedValue = format(formatted, this.getFormattingOptions());
      }
    },
    formattedValue(newValue) {
      if (newValue) {
        const unformattedValue = +(unFormat(newValue, this.getGroupingSeparator(), this.getDecimalSeparator()));
        const hasUnformattedValueChanged = this.unformattedValue !== unformattedValue;
        this.unformattedValue = unformattedValue;
        if (this.isMasked) {
          this.$emit('update:modelValue', this.formattedValue);
        } else {
          if (Number.isNaN(unformattedValue) || !hasUnformattedValueChanged) {
            // prevent emitting change events for NaN values or if the unformatted values hasn't changed.
            // this can happen in cases like:
            // 1. user types "-" into the input field -> unformattedValue will be NaN
            // 2. user typed "1", then "1.", then "1.0" -> unformattedValue is always the same, only the formattedValue changes.
            return;
          }
          this.$emit('update:modelValue', this.unformattedValue);
        }
      } else {
        this.unformattedValue = null;
        this.$emit('update:modelValue', this.isMasked ? this.formattedValue : this.unformattedValue);
      }
    },
    isMasked() {
      this.$emit('update:modelValue', this.isMasked ? this.formattedValue : this.unformattedValue);
    },
  },
  methods: {
    getFormattingOptions() {
      return {
        precision: this.precision,
        decimalSeparator: this.getDecimalSeparator(),
        groupingSeparator: this.getGroupingSeparator(),
      };
    },
    getGroupingSeparator() {
      return getGroupingSeparator(this.locale);
    },
    getDecimalSeparator() {
      return getDecimalSeparator(this.locale);
    },
  },
};
</script>
