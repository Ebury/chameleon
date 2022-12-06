import { ref } from 'vue';

import EcRadioBtn from './ec-radio-btn.vue';
import type { RadioBtnProps } from './types';

export default {
  title: 'Radio Button',
  component: EcRadioBtn,
};

const basicArgs: Pick<RadioBtnProps, 'options'> = {
  options: [
    { value: 'y', label: 'Yes' },
    { value: 'n', label: 'No' },
  ],
};

export const basic = () => ({
  components: { EcRadioBtn },
  setup() {
    const model = ref('');
    return {
      args: basicArgs,
      label: 'Select one options',
      model,
    };
  },
  template: `
    <div class="tw-px-24 tw-pt-4 tw-pb-24">
      <ec-radio-btn v-bind="args" :label="label" v-model="model"/>
    </div>
  `,
});

export const all = () => ({
  components: { EcRadioBtn },
  setup() {
    const modelUnchecked = ref('');
    const modelChecked = ref('y');
    const modelDescription = ref('');
    const modelCheckedDisabled = ref('y');
    const modelUncheckedDisabled = ref('y');
    const modelInlineRadioGroup = ref('y');
    const modelInlineText = ref('y');
    const modelError = ref('');
    const optionsWithDescription = [
      { value: 'y', label: 'Yes', description: 'Confirm' },
      { value: 'n', label: 'No', description: 'Reject' },
    ];
    const errorMessage = 'One of the options must be selected';

    return {
      args: basicArgs,
      modelChecked,
      modelUnchecked,
      optionsWithDescription,
      errorMessage,
      modelDescription,
      modelCheckedDisabled,
      modelUncheckedDisabled,
      modelInlineRadioGroup,
      modelInlineText,
      modelError,
    };
  },
  template: `
    <div class="tw-max-w-screen-sm tw-m-24">
      <h3>Description</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn v-bind="args" v-model="modelDescription" :options="optionsWithDescription" />
      </div>

      <h3>Checked</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn v-bind="args" v-model="modelChecked" />
      </div>

      <h3>Unchecked Disabled</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn v-bind="args" v-model="modelUncheckedDisabled" :disabled="true" />
      </div>

      <h3>Checked Disabled</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn v-bind="args" v-model="modelCheckedDisabled" :disabled="true" />
      </div>

      <h3>Inline Radio Group</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn v-bind="args" v-model="modelInlineRadioGroup" :is-group-inline="true" />
      </div>

      <h3>Inline Text</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn v-bind="args" v-model="modelInlineText" :is-text-inline="true" :options="optionsWithDescription" />
      </div>

      <h3>Error</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn v-bind="args" v-model="modelError" :error-message="errorMessage" />
      </div>
    </div>
  `,
});
