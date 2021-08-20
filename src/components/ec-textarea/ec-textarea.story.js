import EcTextarea from './ec-textarea.vue';

export default {
  title: 'Textarea',
  component: EcTextarea,
};

const Template = (args, { argTypes }) => ({
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
          :is-warning="isWarning"
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

export const basic = Template.bind({});

basic.args = {
  label: 'Textarea label',
  placeholder: 'Textarea placeholder...',
  labelTooltip: 'Label tooltip',
  disabledLabel: 'Disabled textarea',
  note: 'Textarea note',
  bottomNote: 'Text area bottom note',
  errorLabel: 'Textarea with error',
  errorMessage: 'Textarea error message',
  warningLabel: 'Textarea with warning',
  isWarning: true,
};
