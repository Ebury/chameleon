import { ref, watchEffect } from 'vue';

import EcTextarea from './ec-textarea.vue';

export default {
  title: 'Textarea',
  component: EcTextarea,
};

const Template = storyArgs => ({
  components: { EcTextarea },
  setup() {
    const model = ref('');
    const args = ref({});

    watchEffect(() => {
      const { modelValue, ...rest } = storyArgs;
      model.value = modelValue;
      args.value = rest;
    });

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
    const disabledLabel = ref('');
    const errorLabel = ref('');
    const warningLabel = ref('');
    const errorMessage = ref('');
    const args = ref({});

    watchEffect(() => {
      const {
        disabledLabel: disabledLabelFromArgs,
        errorLabel: errorLabelFromArgs,
        warningLabel: warningLabelFromArgs,
        errorMessage: errorMessageFromArgs,
        ...rest
      } = storyArgs;
      disabledLabel.value = disabledLabelFromArgs;
      errorLabel.value = errorLabelFromArgs;
      warningLabel.value = warningLabelFromArgs;
      errorMessage.value = errorMessageFromArgs;
      args.value = rest;
    });

    return {
      args,
      disabledLabel,
      errorLabel,
      warningLabel,
      errorMessage,
    };
  },
  template: `
    <div class="tw-flex-grid-container">
      <div class="tw-flex-grid">
        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-textarea v-bind="args" />
        </div>

        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-textarea
            v-bind="args"
            :label="disabledLabel"
            disabled
          />
        </div>

        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-textarea
            v-bind="args"
            :label="warningLabel"
            is-warning
          />
        </div>

        <div class="tw-flex-col-full md:tw-flex-col-4">
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
