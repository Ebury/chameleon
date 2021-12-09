import { action } from '@storybook/addon-actions';
import EcInputField from './ec-input-field.vue';

export default {
  title: 'Input Field',
  component: EcInputField,
  argTypes: {
    isInGroup: {
      options: ['left', 'right'],
      control: { type: 'select' },
    },
  },
};

const Template = (args, { argTypes }) => ({
  components: { EcInputField },
  props: Object.keys(argTypes),
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
    onInput: action('input'),
    onChange: action('change'),
  },
  template: `
    <div class="tw-p-24">
      <ec-input-field
        v-bind="$props"
        v-on="{
          input: onInput,
          change: onChange,
        }"
        v-model="model"
      />
    </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  label: 'Username',
  value: null,
  placeholder: 'My input',
  bottomNote: 'Your email',
  icon: 'simple-check',
  note: 'Max 80 chars.',
};

basic.parameters = {
  visualRegressionTests: { disable: true },
};

export const all = (args, { argTypes }) => ({
  components: { EcInputField },
  props: Object.keys(argTypes),
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
  methods: {
    onInput: action('input'),
    onChange: action('change'),
  },
  template: `
    <div class="tw-grid-container">
      <div class="tw-grid">
        <div class="tw-col-full md:tw-col-4">
          <ec-input-field type="number" min="5" max="10" v-model.number="valueNumber" :note="noteNumber" :label="labelNumber" :error-message="errorMessageNumber" :icon="iconNumber"  :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field type="text" placeholder="My input" v-model="valueText" :note="noteText" :label="labelText" :error-message="errorMessageText" :icon="iconText" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field type="date" placeholder="My input" v-model="valueDate" :note="noteDate" :label="labelDate" :error-message="errorMessageDate" :icon="iconDate" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field disabled placeholder="My disabled input" v-model="valueText" label="Disabled input" :icon="iconText" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field disabled placeholder="My disabled input" v-model="valueText" label="Disabled input" error-message="Disabled with error" :icon="iconText" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field placeholder="My input" icon="simple-info" v-model="valueText" label="Input with icon" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field readonly placeholder="My input" value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eos consequatur quas reiciendis aliquid ipsam ea pariatur dolorem, molestias maiores." label="Read only input with long text" :icon="iconText" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field placeholder="An other input" v-model="valueText" label="Input tooltip on the label" :is-in-group="isInGroup" :is-sensitive="isSensitive" :label-tooltip="labelTooltip" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field placeholder="My input" icon="simple-info" v-model="valueText" label="Short Label" :is-in-group="isInGroup" :is-sensitive="isSensitive" :label-tooltip="labelTooltip" :note="noteText" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field placeholder="My input" icon="simple-info" v-model="valueText" label="Input with bottom note" :is-in-group="isInGroup" :is-sensitive="isSensitive" :bottom-note="bottomNoteText" :is-warning="isWarning" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field readonly placeholder="My input" :value="valueText" label="Input with loading icon" :is-in-group="isInGroup" :is-sensitive="isSensitive" :is-loading="true" />
        </div>

        <div class="tw-col-full"></div>

        <div class="tw-col-full md:tw-col-4">
          Model value number: {{ valueNumber }}
        </div>

        <div class="tw-col-full md:tw-col-4">
          Model value text: {{ valueText }}
        </div>

        <div class="tw-col-full md:tw-col-4">
          Model value date: {{ valueDate }}
        </div>
      </div>
    </div>
  `,
});

all.args = {
  isSensitive: false,
  isWarning: false,
  labelTooltip: 'Tooltip text',

  // number input
  valueFromPropsNumber: '',
  labelNumber: 'Number input',
  noteNumber: 'Max 80 chars',
  errorMessageNumber: 'error message',
  iconNumber: '',

  // text input
  valueFromPropsText: '',
  labelText: 'Text input',
  noteText: 'Max 80 chars',
  bottomNoteText: 'Random bottom note text',
  errorMessageText: 'error message',
  iconText: '',

  // date input
  valueFromPropsDate: '',
  labelDate: 'Date input',
  noteDate: 'Max 80 chars',
  errorMessageDate: 'error message',
  iconDate: '',
};
