import EcTextarea from './ec-textarea.vue';

export default {
  title: 'Textarea',
  component: EcTextarea,
};

const Template = (args, { argTypes }) => ({
  components: { EcTextarea },
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
  template: `
    <div class="tw-p-24">
      <ec-textarea v-bind="$props" v-model="model" />
    </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  label: 'Textarea label',
  placeholder: 'Textarea placeholder...',
  labelTooltip: 'Label tooltip',
  note: 'Textarea note',
  bottomNote: 'Text area bottom note',
  errorMessage: 'Textarea error message',
  value: '',
};

basic.parameters = {
  visualRegressionTests: { disable: true },
};

export const all = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    EcTextarea,
  },
  template: `
  <div class="tw-grid-container">
    <div class="tw-grid">
      <div class="tw-col-full md:tw-col-4">
        <ec-textarea
          :label="label"
          :placeholder="placeholder"
          :note="note"
          :bottom-note="bottomNote"
          :label-tooltip="labelTooltip"
        />
      </div>

      <div class="tw-col-full md:tw-col-4">
        <ec-textarea
          :label="disabledLabel"
          :placeholder="placeholder"
          :note="note"
          :label-tooltip="labelTooltip"
          :bottom-note="bottomNote"
          disabled
        />
      </div>

      <div class="tw-col-full md:tw-col-4">
        <ec-textarea
          :label="warningLabel"
          :placeholder="placeholder"
          :note="note"
          :label-tooltip="labelTooltip"
          :bottom-note="bottomNote"
          :is-warning="true"
        />
      </div>

      <div class="tw-col-full md:tw-col-4">
        <ec-textarea
          :label="errorLabel"
          :placeholder="placeholder"
          :note="note"
          :label-tooltip="labelTooltip"
          :error-message="errorMessage"
        />
      </div>
    </div>
  </div>
  `,
});

all.args = {
  ...basic.args,
  disabledLabel: 'Disabled textarea',
  errorLabel: 'Textarea with error',
  warningLabel: 'Textarea with warning',
};
