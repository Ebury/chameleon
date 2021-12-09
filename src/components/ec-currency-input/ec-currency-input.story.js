import { action } from '@storybook/addon-actions';
import EcCurrencyInput from './ec-currency-input.vue';

export default {
  title: 'Currency Input',
  component: EcCurrencyInput,
  argTypes: {
    locale: {
      options: ['en', 'es', 'de-ch', 'jp', 'sv'],
      control: { type: 'select' },
    },
  },
};

export const basic = (args, { argTypes }) => ({
  components: { EcCurrencyInput },
  props: Object.keys(argTypes),
  data() {
    return {
      model: {},
    };
  },
  methods: {
    onOpen: action('open'),
    onFocus: action('focus'),
    onChange: action('change'),
    onAmountChange: action('amount-change'),
    onCurrencyChange: action('currency-change'),
  },
  template: `
    <div class="tw-my-64 tw-mx-auto tw-max-w-screen-sm">
      <ec-currency-input
        v-bind="$props"
        v-on="{
          open: onOpen,
          focus: onFocus,
          change: onChange,
          'amount-change': onAmountChange,
          'currency-change': onCurrencyChange
        }"
        v-model="model"
        class="tw-mb-20"
      />
      Value: {{ model }}
    </div>
  `,
});

basic.args = {
  bottomNote: 'On balance: EUR 300.00',
  currencies: ['GBP', 'EUR', 'USD', 'CAD', 'JPY', 'AUD', 'NZD', 'CHF', 'SEK', 'NOK', 'AED', 'BBD', 'BGN', 'BHD', 'BSD', 'BWP', 'BZD', 'CNY', 'CZK', 'DKK', 'GHS', 'HKD', 'HRK', 'HUF', 'ILS', 'INR', 'JMD', 'KES', 'LKR', 'MUR', 'MXN', 'NGN', 'PHP', 'PKR', 'PLN', 'QAR', 'RON', 'RSD', 'RUB', 'SAR', 'SGD', 'SZL', 'THB', 'TND', 'TRY', 'TTD', 'UGX', 'XCD', 'ZAR', 'ZMW'],
  isWarning: true,
  label: 'Currency input',
  note: 'Select currency and set amount',
  warningTooltipMessage: 'Currently there is not enough EUR balance to cover the transaction amount, ensure you add funds to your balance after finishing.',
};
