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
      unformattedValue: 0,
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
    groupingSeparator() {
      return this.getSeparator('group');
    },
    decimalSeparator() {
      return this.getSeparator('decimal');
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
          this.unformattedValue = +(unFormat(newValue, this.groupingSeparator, this.decimalSeparator));
        } else {
          if (newValue === this.unformattedValue) {
            return;
          }

          if (!Number.isNaN(newValue) && this.formattedValue !== '-') {
            const formatted = format(newValue, this.getFormattingOptions());
            this.formattedValue = formatted;
          }
          this.unformattedValue = newValue;
        }
      },
    },
    currency() {
      const formatted = format(this.value, this.getFormattingOptions());
      this.formattedValue = formatted;
    },
    locale() {
      const formatted = new Intl.NumberFormat(this.locale, { type: 'decimal', maximumFractionDigits: this.precision }).format(this.unformattedValue);
      this.formattedValue = format(formatted, this.getFormattingOptions());
    },
    formattedValue(newValue) {
      this.unformattedValue = +(unFormat(newValue, this.groupingSeparator, this.decimalSeparator));
      this.$emit('value-change', this.isMasked ? this.formattedValue : this.unformattedValue);
    },
    isMasked() {
      this.$emit('value-change', this.isMasked ? this.formattedValue : this.unformattedValue);
    },
  },
  methods: {
    getSeparator(type) {
      const numberWithDecimalSeparator = 11111.1;
      return new Intl.NumberFormat(this.locale)
        .formatToParts(numberWithDecimalSeparator)
        .find(part => part.type === type)
        .value;
    },
    getFormattingOptions() {
      return {
        precision: this.precision,
        decimalSeparator: this.decimalSeparator,
        groupingSeparator: this.groupingSeparator,
      };
    },
  },
};
</script>
