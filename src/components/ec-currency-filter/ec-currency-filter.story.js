import { action } from '@storybook/addon-actions';
import EcCurrencyFilter from './ec-currency-filter.vue';

export default {
  title: 'Filters/Currency Filter',
  component: EcCurrencyFilter,
  argTypes: {
    locale: {
      options: ['en', 'es', 'de-ch', 'jp', 'sv'],
      control: { type: 'select' },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EcCurrencyFilter },
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
    onChange: action('change'),
  },
  template: `
    <div style="min-height: 450px;">
      <ec-currency-filter
        class="tw-flex tw-justify-center tw-items-center tw-p-20 tw-m-auto"
        v-model="model"
        v-bind="$props"
        v-on="{ change: onChange }"
      />
    </div>
  `,
});

export const basic = Template.bind({});

const currencyItems = [{
  value: 'GBP',
  text: 'GBP',
}, {
  value: 'EUR',
  text: 'EUR',
}, {
  value: 'JPY',
  text: 'JPY',
}, {
  value: 'CAD',
  text: 'CAD',
}, {
  value: 'USD',
  text: 'USD',
}, {
  value: 'NZD',
  text: 'NZD',
}, {
  value: 'BDD',
  text: 'BDD',
}, {
  value: 'CZK',
  text: 'CZK',
}, {
  value: 'NOK',
  text: 'NOK',
}, {
  value: 'CNY',
  text: 'CNY',
}];

const comparisonSymbolItems = [{
  text: 'More than',
  value: '>',
}, {
  text: 'Equal to',
  value: '=',
}, {
  text: 'Less than',
  value: '<',
}];

basic.args = {
  label: 'Price',
  value: {
    currencies: [],
    comparisonSymbol: comparisonSymbolItems[1],
    amount: null,
  },
  locale: 'en',
  currencyItems,
  comparisonSymbolItems,
  popoverOptions: { open: true },
};
