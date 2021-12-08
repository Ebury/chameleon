import { action } from '@storybook/addon-actions';
import EcAmountInput from './ec-amount-input.vue';

export default {
  title: 'Input Amount',
  component: EcAmountInput,
  argTypes: {
    locale: {
      options: ['en', 'es', 'de-ch', 'jp', 'sv'],
      control: { type: 'select' },
    },
    currency: {
      options: ['GBP', 'EUR', 'JPY', 'INR', 'USD', 'CAD'],
      control: { type: 'select' },
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { EcAmountInput },
  props: Object.keys(argTypes),
  data() {
    return {
      model: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) { this.model = newValue; },
    },
  },
  methods: {
    getModelType() {
      return typeof this.model;
    },
    onChange: action('change'),
    onInput: action('input'),
  },
  template: `
    <div class="tw-p-24">
      <div>
        <ec-amount-input v-bind="$props" v-on="{ change: onChange, input: onInput }" v-model="model" />
      </div>
      <div class="tw-mt-24">The input value: {{ model }} (type: {{ getModelType() }})</div>
    </div>
  `,
});

export const basic = Template.bind({});
basic.args = {
  isMasked: false,
  locale: 'en',
  currency: 'GBP',
  label: 'Amount input',
  value: '',
  isSensitive: false,
};

basic.parameters = {
  visualRegressionTests: {
    controls: {
      'with-value': { value: '1234567.89' },
      'with-masked-value': { value: '1234567.89', isMasked: true },
      'locale-with-no-decimals': { value: '1234567.89', locale: 'de-ch', currency: 'JPY' },
    },
  },
};
