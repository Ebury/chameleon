import EcDonut from './ec-donut.vue';

export default {
  title: 'Donut',
  component: EcDonut,
};

export const basic = (args, { argTypes }) => ({
  components: { EcDonut },
  props: Object.keys(argTypes),
  filters: {
    currencyFormat(value, currency) {
      return new Intl.NumberFormat('en-GB', { style: 'currency', currency, currencyDisplay: 'code' }).format(value);
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
  <div class="tw-flex tw-h-screen">
    <div class="tw-m-auto ec-card">
      <div class="tw-text-center tw-mb-24">Credit line: <strong>{{ amount | currencyFormat(currency) }}</strong></div>
      <ec-donut class="tw-p-8" :used="used" :amount="amount">
        <template #remaining-legend>
          <span><strong>Remaining: </strong>{{ remaining | currencyFormat(currency) }}</span>
        </template>
        <template #used-legend>
          <span><strong>Used: </strong>{{ used | currencyFormat(currency) }}</span>
        </template>
      </ec-donut>
    </div>
  </div>`,
});

basic.argTypes = {
  currency: {
    options: ['GBP', 'EUR', 'USD', 'CAD'],
    control: { type: 'select' },
  },
};

basic.args = {
  used: 2500,
  amount: 10000,
  currency: 'GBP',
};
