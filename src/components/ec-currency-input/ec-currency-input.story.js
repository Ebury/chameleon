import { storiesOf } from '@storybook/vue';
import EcCurrencyInput from './ec-currency-input.vue';

// const currencies = ['GBP', 'EUR', 'USD', 'CAD', 'JPY', 'AUD', 'NZD', 'CHF', 'SEK', 'NOK', 'AED', 'BBD', 'BGN', 'BHD', 'BSD', 'BWP', 'BZD', 'CNY', 'CZK', 'DKK', 'GHS', 'HKD', 'HRK', 'HUF', 'ILS', 'INR', 'JMD', 'KES', 'LKR', 'MUR', 'MXN', 'NGN', 'PHP', 'PKR', 'PLN', 'QAR', 'RON', 'RSD', 'RUB', 'SAR', 'SGD', 'SZL', 'THB', 'TND', 'TRY', 'TTD', 'UGX', 'XCD', 'ZAR', 'ZMW'];

const stories = storiesOf('Currency Input', module);

stories
  .add('basic', () => ({
    components: { EcCurrencyInput },
    template: `
      <div style="max-width: 600px; margin: 60px auto">
        <ec-currency-input class="ec-mt--20 ec-mb--20" />
      </div>
    `,
  }));

export default stories;
