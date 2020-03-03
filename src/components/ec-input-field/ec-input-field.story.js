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
      noteNumber: {
        default: text('note', 'Max 80 char', GROUPS.NUMBER),
      },
      errorMessageNumber: {
        default: text('errorMessage', '', GROUPS.NUMBER),
      },
      iconNumber: {
        default: text('icon', '', GROUPS.NUMBER),
      },
      valueFromPropsText: {
        default: text('value', '', GROUPS.TEXT),
      },
      labelText: {
        default: text('label', 'Text input', GROUPS.TEXT),
      },
      noteText: {
        default: text('note', 'Max 80 char', GROUPS.TEXT),
      },
      errorMessageText: {
        default: text('errorMessage', '', GROUPS.TEXT),
      },
      iconText: {
        default: text('icon', '', GROUPS.TEXT),
      },
      valueFromPropsDate: {
        default: text('value', '', GROUPS.DATE),
      },
      labelDate: {
        default: text('label', 'Date input', GROUPS.DATE),
      },
      noteDate: {
        default: text('note', 'Max 80 char', GROUPS.DATE),
      },
      errorMessageDate: {
        default: text('errorMessage', '', GROUPS.DATE),
      },
      iconDate: {
        default: text('icon', '', GROUPS.DATE),
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
              <ec-input-field type="number" min="5" max="10" v-model.number="valueNumber" :note="noteNumber" :label="labelNumber" :error-message="errorMessageNumber" :icon="iconNumber" />
            </div>
          </div>

          <div class="ec-col-4">
            <div class="ec-m--24">
              <ec-input-field type="text" placeholder="My input" v-model="valueText" :note="noteText" :label="labelText" :error-message="errorMessageText" :icon="iconText" />
            </div>
          </div>

          <div class="ec-col-5">
            <div class="ec-m--24">
              <ec-input-field type="date" placeholder="My input" v-model="valueDate" :note="noteDate" :label="labelDate" :error-message="errorMessageDate" :icon="iconDate" />
            </div>
          </div>

          <div class="ec-col-6">
            <div class="ec-m--24">
              <ec-input-field disabled placeholder="My input disabled" v-model="valueText" label="Input disabled" :icon="iconText" />
            </div>
          </div>

          <div class="ec-col-6">
            <div class="ec-m--24">
              <ec-input-field disabled placeholder="My input disabled" v-model="valueText" label="Input disabled" error-message="Disabled with error" :icon="iconText" />
            </div>
          </div>

          <div class="ec-col-3 ec-p--24">
            <ec-input-field placeholder="My input" icon="simple-info" v-model="valueText" label="Input with icon" />
          </div>

          <div class="ec-col-4 ec-p--24">
            <ec-input-field readonly placeholder="My input" value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eos consequatur quas reiciendis aliquid ipsam ea pariatur dolorem, molestias maiores." label="Read only input with long text" :icon="iconText" />
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
