<template>
  <ec-input-field
    v-model="formattedValue"
    v-ec-amount="getFormattingOptions()"
    v-bind="{
      ...$attrs,
      ...$props,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-amount-input` : 'ec-amount-input',
      locale: null,
      isMasked: null,
      currency: null,
    }"
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
      const formatted = new Intl.NumberFormat(this.locale, { type: 'decimal', maximumFractionDigits: this.precision }).format(this.unformattedValue);
      this.formattedValue = format(formatted, this.getFormattingOptions());
    },
    locale() {
      const formatted = new Intl.NumberFormat(this.locale, { type: 'decimal', maximumFractionDigits: this.precision }).format(this.unformattedValue);
      this.formattedValue = format(formatted, this.getFormattingOptions());
    },
    formattedValue(newValue) {
      if (newValue) {
        this.unformattedValue = +(unFormat(newValue, this.getGroupingSeparator(), this.getDecimalSeparator()));
      } else {
        this.unformattedValue = null;
      }
      this.$emit('value-change', this.isMasked ? this.formattedValue : this.unformattedValue);
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
