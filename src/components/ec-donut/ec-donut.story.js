import { computed, toRefs } from 'vue';

import EcDonut from './ec-donut.vue';

export default {
  title: 'Donut',
  component: EcDonut,
};

export const basic = args => ({
  components: { EcDonut },
  setup() {
    const {
      used,
      amount,
      currency,
    } = toRefs(args);

    const remaining = computed(() => {
      if (used.value > amount.value) {
        return 0;
      }
      if (used.value <= 0) {
        return amount.value;
      }
      return amount.value - used.value;
    });

    function currencyFormat(value) {
      return new Intl.NumberFormat('en-GB', { style: 'currency', currency: currency.value, currencyDisplay: 'code' }).format(value);
    }

    return {
      currency,
      used,
      amount,
      remaining,
      currencyFormat,
      args,
    };
  },
  template: `
    <div class="tw-flex tw-h-screen">
      <div class="tw-m-auto ec-card">
        <div class="tw-text-center tw-mb-24">Credit line: <strong>{{ currencyFormat(amount) }}</strong></div>
        <ec-donut class="tw-p-8" :used="used" :amount="amount">
          <template #remaining-legend>
            <span><strong>Remaining: </strong>{{ currencyFormat(remaining) }}</span>
          </template>
          <template #used-legend>
            <span><strong>Used: </strong>{{ currencyFormat(used) }}</span>
          </template>
        </ec-donut>
      </div>
    </div>
  `,
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
