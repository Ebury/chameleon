import { storiesOf } from '@storybook/vue';
import { select, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import EcAmountInput from './ec-amount-input.vue';

const stories = storiesOf('Input Amount', module);

stories
  .add('basic', () => ({
    components: { EcAmountInput },
    data() {
      return {
        value: null,
      };
    },
    watch: {
      valueFromProps: {
        immediate: true,
        handler(newValue) {
          this.value = newValue;
        },
      },
    },
    props: {
      isMasked: {
        default: boolean('Is Masked', false),
      },
      locale: {
        default: select('Locale', ['en', 'es', 'de-ch', 'jp', 'sv'], 'en'),
      },
      currency: {
        default: select('Currency', ['GBP', 'EUR', 'JPY', 'INR', 'USD', 'CAD'], 'GBP'),
      },
      label: {
        default: text('Label', 'Amount input'),
      },
      valueFromProps: {
        default: text('Value', ''),
      },
    },
    methods: {
      getValueType() {
        return typeof this.value;
      },
      onChange: action('change'),
      onInput: action('input'),
    },
    template: `
      <div class="tw-grid-container">
        <div class="tw-grid">
          <div class="tw-col-12">
            <div>
              <ec-amount-input v-bind="$props" v-model="value" @change="onChange" @input="onInput" />
            </div>
            <div class="tw-mt-24">The input value: {{ value }} (type: {{ getValueType() }})</div>
          </div>
        </div>
      </div>
    `,
  }), {
    visualRegressionTests: {
      knobs: {
        'with-value': { Value: '1234567.89' },
        'with-masked-value': { Value: '1234567.89', 'Is Masked': true },
        'locale-with-no-decimals': { Value: '1234567.89', Locale: 'de-ch', Currency: 'JPY' },
      },
    },
  });
