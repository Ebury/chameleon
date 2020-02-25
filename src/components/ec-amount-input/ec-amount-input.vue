<template>
  <ec-input-field
    v-model="formattedValue"
    v-ec-money="getFormattingOptions()"
    v-bind="$props"
    @change="change"
  />
</template>

<script>
import EcInputField from '../ec-input-field';
import EcMoney from '../../directives/ec-money/ec-money';
import { format, unFormat } from '../../directives/ec-money/utils';

export default {
  components: { EcInputField },
  directives: { EcMoney },
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
    masked: {
      type: Boolean,
      default: false,
    },
    locale: {
      type: String,
      default: 'en',
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
      // we use GBP only because Intl requires it in constructor, but we don't use it in the implementation, so it can be hard coded.
      const options = new Intl.NumberFormat(this.locale, { style: 'currency', currency: 'GBP' }).resolvedOptions();
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
        if (this.masked) {
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
    locale() {
      const formatted = new Intl.NumberFormat(this.locale, { type: 'decimal', maximumFractionDigits: this.precision }).format(this.unformattedValue);
      this.formattedValue = format(formatted, this.getFormattingOptions());
    },
    unformattedValue(newValue) {
      if (!this.masked) {
        this.$emit('change', newValue);
      }
    },
    formattedValue(newValue) {
      if (this.masked) {
        this.$emit('change', newValue);
      }
    },
    masked() {
      this.$emit('change', this.masked ? this.formattedValue : this.unformattedValue);
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
