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
    props: {
      isMasked: {
        default: boolean('Is Masked', false),
      },
      locale: {
        default: select('Locale', ['en', 'es', 'de-ch', 'jp'], 'en'),
      },
      currency: {
        default: select('Currency', ['GBP', 'EUR', 'JPY', 'INR', 'USD', 'CAD'], 'GBP'),
      },
      label: {
        default: text('Label', 'Amount input'),
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
    <div class="ec-ml--24 ec-mr--24">
      <div class="ec-grid">
        <div class="ec-grid__row">
          <div class="ec-col-12">
            <div class="ec-m--24">
              <ec-amount-input v-bind="$props" v-model="value" @change="onChange" @input="onInput" />
            </div>
            <div class="ec-m--24">The input value: {{ value }} (type: {{ getValueType() }})</div>
          </div>
        </div>
      </div>
    </div>
  `,
  }));
