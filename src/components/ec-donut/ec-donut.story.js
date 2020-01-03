import { storiesOf } from '@storybook/vue';
import { number, select } from '@storybook/addon-knobs';
import EcDonut from './ec-donut.vue';

const stories = storiesOf('Donut', module);

stories.add('basic', () => ({
  components: { EcDonut },
  filters: {
    currencyFormat(value, currency) {
      return new Intl.NumberFormat('gb-GB', { style: 'currency', currency, currencyDisplay: 'code' }).format(value);
    },
  },
  props: {
    used: {
      default: number('Used', 2500),
    },
    amount: {
      default: number('Amount', 10000),
    },
    currency: {
      default: select('Currency', ['GBP', 'EUR', 'USD', 'CAD'], 'GBP'),
    },
  },
  computed: {
    remaining() {
      if (this.used > this.amount) {
        return 0;
      } if (this.used <= 0) {
        return this.amount;
      }
      return this.amount - this.used;
    },
  },
  template: `
  <div style="display: flex; height: 100vh">
    <div style="margin: auto" class="ec-card">
      <div style="text-align: center;" class="ec-mb--24">Credit line: <strong>{{ amount | currencyFormat(currency) }}</strong></div>
      <ec-donut class="ec-p--8" :used="used" :amount="amount">
        <template #remaining-legend>
          <span><strong>Remaining: </strong>{{ remaining | currencyFormat(currency) }}</span>
        </template>
        <template #used-legend>
          <span><strong>Used: </strong>{{ used | currencyFormat(currency) }}</span>
        </template>
      </ec-donut>
    </div>
  </div>`,
}));

export default stories;
