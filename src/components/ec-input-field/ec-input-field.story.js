import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs';
import EcInputField from './ec-input-field.vue';

const stories = storiesOf('Input Field', module);

const GROUPS = {
  NUMBER: 'Number input props',
  TEXT: 'Text input props',
  DATE: 'Date input props',
};

stories
  .add('basic', () => ({
    components: { EcInputField },
    props: {
      valueFromPropsNumber: {
        default: text('value', '', GROUPS.NUMBER),
      },
      labelNumber: {
        default: text('label', 'Number input', GROUPS.NUMBER),
      },
      errorMessageNumber: {
        default: text('errorMessage', '', GROUPS.NUMBER),
      },
      valueFromPropsText: {
        default: text('value', '', GROUPS.TEXT),
      },
      labelText: {
        default: text('label', 'Text input', GROUPS.TEXT),
      },
      errorMessageText: {
        default: text('errorMessage', '', GROUPS.TEXT),
      },
      valueFromPropsDate: {
        default: text('value', '', GROUPS.DATE),
      },
      labelDate: {
        default: text('label', 'Date input', GROUPS.DATE),
      },
      errorMessageDate: {
        default: text('errorMessage', '', GROUPS.DATE),
      },
    },
    watch: {
      valueFromPropsNumber: {
        immediate: true,
        handler(newValue) {
          this.valueNumber = newValue;
        },
      },
      valueFromPropsText: {
        immediate: true,
        handler(newValue) {
          this.valueText = newValue;
        },
      },
      valueFromPropsDate: {
        immediate: true,
        handler(newValue) {
          this.valueDate = newValue;
        },
      },
    },
    data() {
      return {
        valueNumber: null,
        valueText: '',
        valueDate: null,
      };
    },
    template: `
    <div class="ec-ml--24 ec-mr--24">
      <div class="ec-grid">
        <div class="ec-grid__row">
          <div class="ec-col-3">
            <div class="ec-m--24">
              <ec-input-field type="number" min="5" max="10" v-model.number="valueNumber" :label="labelNumber" :error-message="errorMessageNumber">
              </ec-input-field>
            </div>
          </div>

          <div class="ec-col-4">
            <div class="ec-m--24">
              <ec-input-field type="text" placeholder="My input" v-model="valueText" :label="labelText" :error-message="errorMessageText">
              </ec-input-field>
            </div>
          </div>

          <div class="ec-col-5">
            <div class="ec-m--24">
              <ec-input-field type="date" placeholder="My input" v-model="valueDate" :label="labelDate" :error-message="errorMessageDate">
              </ec-input-field>
            </div>
          </div>
         
        </div>
        <div class="ec-grid__row">
          <div class="ec-col-3">
            Model value number: {{ valueNumber }}
          </div>
          <div class="ec-col-4">
            Model value text: {{ valueText }}
          </div>
          <div class="ec-col-5">
            Model value date: {{ valueDate }}
          </div>
        </div>  
      </div>
    </div>
    `,
  }));
