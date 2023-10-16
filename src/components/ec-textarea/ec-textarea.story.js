import { reactive, toRefs } from 'vue';

import EcTextarea from './ec-textarea.vue';

export default {
  title: 'Textarea',
  component: EcTextarea,
};

const Template = storyArgs => ({
  components: { EcTextarea },
  setup() {
    const { modelValue: model, ...rest } = toRefs(storyArgs);
    const args = reactive(rest);

    return {
      args,
      model,
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-textarea v-bind="args" v-model="model" />
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
  modelValue: '',
};

basic.parameters = {
  visualRegressionTests: { disable: true },
};

export const all = storyArgs => ({
  components: { EcTextarea },
  setup() {
    const {
      label, disabledLabel, errorLabel, warningLabel, errorMessage, ...rest
    } = toRefs(storyArgs);
    const args = reactive(rest);

    return {
      label,
      disabledLabel,
      errorLabel,
      warningLabel,
      errorMessage,
      args,
    };
  },
  template: `
    <div class="tw-grid-container">
      <div class="tw-grid">
        <div class="tw-col-full md:tw-col-4">
          <ec-textarea
            v-bind="args"
            :label="label"
          />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-textarea
            v-bind="args"
            :label="disabledLabel"
            disabled
          />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-textarea
            v-bind="args"
            :label="warningLabel"
            is-warning
          />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-textarea
            v-bind="args"
            :label="errorLabel"
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
