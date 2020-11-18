import EcCurrencyInput from './ec-currency-input.vue';

const bottomNote = 'On balance: EUR 300.00';
const currencies = ['GBP', 'EUR', 'USD', 'CAD', 'JPY', 'AUD', 'NZD', 'CHF', 'SEK', 'NOK', 'AED', 'BBD', 'BGN', 'BHD', 'BSD', 'BWP', 'BZD', 'CNY', 'CZK', 'DKK', 'GHS', 'HKD', 'HRK', 'HUF', 'ILS', 'INR', 'JMD', 'KES', 'LKR', 'MUR', 'MXN', 'NGN', 'PHP', 'PKR', 'PLN', 'QAR', 'RON', 'RSD', 'RUB', 'SAR', 'SGD', 'SZL', 'THB', 'TND', 'TRY', 'TTD', 'UGX', 'XCD', 'ZAR', 'ZMW'];
const label = 'Currency input';
const note = 'Select currency and set amount';
const warningTooltipMessage = 'Currently there is not enough EUR balance to cover the transaction amount, ensure you add funds to your balance after finishing.';

export default {
  title: 'Currency Input',
  component: EcCurrencyInput,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    EcCurrencyInput,
  },
  data() {
    return {
      value: {},
    };
  },
  template: `
  <div class="tw-my-64 tw-mx-auto tw-max-w-screen-sm">
    <ec-currency-input
      v-bind="$props"
      v-model="value"
      class="tw-mb-20"
    />
    Value Object: {{ value }}
  </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  bottomNote,
  currencies,
  isWarning: true,
  label,
  note,
  warningTooltipMessage,
};
