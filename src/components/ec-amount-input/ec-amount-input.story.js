import { storiesOf } from '@storybook/vue';
import { select, boolean } from '@storybook/addon-knobs';
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
        default: select('Locale', ['en', 'es', 'de-ch'], 'en'),
      },

    },
    template: `
    <div class="ec-ml--24 ec-mr--24">
      <div class="ec-grid">
        <div class="ec-grid__row">
          <div class="ec-col-12">
            <div class="ec-m--24">
              <ec-amount-input v-bind="$props" label="Amount input" v-model="value" />
            </div>
            <div class="ec-m--24">The input value: {{ value }} (type: {{ typeof value }})</div>
          </div>
        </div>
      </div>
    </div>       
  `,
  }));
