import { action } from '@storybook/addon-actions';
import EcCurrencyFilter from './ec-currency-filter.vue';

export default {
  title: 'Filters/Currency Filter',
  component: EcCurrencyFilter,
  argTypes: {
    locale: {
      control: {
        type: 'select',
        options: ['en', 'es', 'de-ch', 'jp', 'sv'],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EcCurrencyFilter },
  data() {
    return {
      valueFromProps: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        this.valueFromProps = newValue;
      },
    },
  },
  template: `
    <ec-currency-filter
      class="tw-flex tw-justify-center tw-items-center tw-p-20 tw-m-auto"
      v-model="valueFromProps"
      v-bind="$props"
      @change="onChanged"
    />
  `,
  methods: {
    onChanged: action('change'),
  },
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
