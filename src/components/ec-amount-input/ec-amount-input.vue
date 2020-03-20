<template>
  <ec-input-field
    v-model="formattedValue"
    v-ec-amount="getFormattingOptions()"
    v-bind="$props"
    @change="change"
  />
</template>

<script>
import EcInputField from '../ec-input-field';
import EcAmount from '../../directives/ec-amount/ec-amount';
import { format, unFormat } from '../../directives/ec-amount/utils';

export default {
  components: { EcInputField },
  directives: { EcAmount },
  model: {
    prop: 'value',
    event: 'change',
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

          const formatted = format(newValue, this.getFormattingOptions());
          this.formattedValue = formatted;
          this.unformattedValue = newValue;
        }
      },
    },
    currency() {
      const formatted = format(this.value, this.getFormattingOptions());
      this.formattedValue = formatted;
      this.unformattedValue = +(unFormat(formatted, this.groupingSeparator, this.decimalSeparator));
    },
    locale() {
      const formatted = new Intl.NumberFormat(this.locale, { type: 'decimal', maximumFractionDigits: this.precision }).format(this.unformattedValue);
      this.formattedValue = format(formatted, this.getFormattingOptions());
    },
    unformattedValue(newValue) {
      if (!this.isMasked) {
        this.$emit('change', newValue);
      }
    },
    formattedValue(newValue) {
      if (this.isMasked) {
        this.$emit('change', newValue);
      }
    },
    isMasked() {
      this.$emit('change', this.isMasked ? this.formattedValue : this.unformattedValue);
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
    change(evt) {
      const newValue = evt.target.value;
      this.formattedValue = format(newValue, this.getFormattingOptions());
      this.unformattedValue = +(unFormat(newValue, this.groupingSeparator, this.decimalSeparator));
    },
  },
};
</script>
