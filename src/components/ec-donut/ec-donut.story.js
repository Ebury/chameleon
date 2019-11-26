import { storiesOf } from '@storybook/vue';
import { number, text } from '@storybook/addon-knobs';
import EcDonut from './ec-donut.vue';

const stories = storiesOf('Donut chart', module);

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
      default: text('Currency', 'GBP'),
    },
  },
  template: `
  <div style="display: flex; height: 100vh">
    <div style="margin: auto" class="ec-card">
      <div class="ec-mb--24">Credit line: <strong>{{ amount,currency | currencyFormat }}</strong></div>
      <ec-donut class="ec-p--8" :used="used" :amount="amount">
        <template #reminder-legend>
          <span><strong>Reminder: </strong>{{ amount - used,currency | currencyFormat }}</span>
        </template>
        <template #used-legend>
          <span><strong>Used: </strong>{{ used,currency | currencyFormat }}</span>
        </template>
      </ec-donut>
    </div>
  </div>`,
}));

export default stories;
