import { storiesOf } from '@storybook/vue';
import { text, select } from '@storybook/addon-knobs';
import EcTextField from './ec-text-field.vue';

const stories = storiesOf('TextField', module);

stories
  .add('basic', () => ({
    components: { EcTextField },
    props: {
      value: {
        default: text('value', ''),
      },
      label: {
        default: text('label', 'Label'),
      },
      errorMessage: {
        default: text('errorMessage', 'This is the error'),
      },
      state: {
        default: select('state', ['', 'error'], ''),
      },
      type: {
        default: select('type', ['text', 'number', 'date'], 'text'),
      },
    },
    template: `
    <div class="ec-ml--24 ec-mr--24">
      <div class="ec-grid">
        <div class="ec-grid__row">
          <div class="ec-col-3">
            <div class="ec-m--24">
              <ec-text-field v-model="value" :label="label" :error-message="errorMessage" :state="state" :type="type">
              </ec-text-field>
            </div>
          </div>
          <div class="ec-col-4">
            <div class="ec-m--24">
              <ec-text-field v-model="value" :label="label" :error-message="errorMessage" :state="state" :type="type">
              </ec-text-field>
            </div>
          </div>
          <div class="ec-col-5">
            <div class="ec-m--24">
              <ec-text-field v-model="value" :label="label" :error-message="errorMessage" :state="state" :type="type">
              </ec-text-field>
            </div>
          </div>
        </div>
      </div>
    </div>
    `,
  }));
