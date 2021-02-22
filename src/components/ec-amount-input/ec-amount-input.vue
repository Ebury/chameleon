<template>
  <ec-input-field
    v-model="inputModel"
    v-ec-amount="getFormattingOptions()"
    v-bind="{
      ...$attrs,
      ...$props,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-amount-input` : 'ec-amount-input',
      locale: null,
      isMasked: null,
      currency: null,
    }"
    :is-sensitive="isSensitive"
    v-on="{ ...$listeners, 'value-change': null }"
  />
</template>

<script>
import EcInputField from '../ec-input-field';
import EcAmount from '../../directives/ec-amount/ec-amount';
import { format, unFormat } from '../../directives/ec-amount/utils';
import { getDecimalSeparator, getGroupingSeparator } from '../../utils/number-format';

export default {
  components: { EcInputField },
  directives: { EcAmount },
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'value-change',
  },
  props: {
    ...EcInputField.props,
    value: {
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
          // the new value is exactly the same as the curent value, skip the assignment so it will not trigger other
          // setters and watchers.
          return;
        }

        this.formattedValue = newValue;
      },
    },
  },
  watch: {
    value: {
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
              this.formattedValue = new Intl.NumberFormat(this.locale, { type: 'decimal', maximumFractionDigits: this.precision }).format(this.value);
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
          this.$emit('value-change', this.formattedValue);
        } else {
          if (Number.isNaN(unformattedValue) || !hasUnformattedValueChanged) {
            // prevent emitting change events for NaN values or if the unformatted values hasn't changed.
            // this can happen in cases like:
            // 1. user types "-" into the input field -> unformattedValue will be NaN
            // 2. user typed "1", then "1.", then "1.0" -> unformattedValue is always the same, only the formattedValue changes.
            return;
          }
          this.$emit('value-change', this.unformattedValue);
        }
      } else {
        this.unformattedValue = null;
        this.$emit('value-change', this.isMasked ? this.formattedValue : this.unformattedValue);
      }
    },
    isMasked() {
      this.$emit('value-change', this.isMasked ? this.formattedValue : this.unformattedValue);
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
