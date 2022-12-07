import { action } from '@storybook/addon-actions';
import { ref } from 'vue';

import EcRadioBtn from './ec-radio-btn.vue';
import type { RadioButtonProps } from './types';

export default {
  title: 'Radio Button',
  component: EcRadioBtn,
};

const basicArgs: Pick<RadioButtonProps, 'options'> = {
  options: [
    { value: 'y', label: 'Yes' },
    { value: 'n', label: 'No' },
  ],
};

export const basic = () => ({
  components: { EcRadioBtn },
  setup() {
    const modelValue = ref<RadioButtonProps['modelValue']>('');
    return {
      args: basicArgs,
      label: 'Select one options',
      modelValue,
      onChange: action('change'),
    };
  },
  template: `
    <div class="tw-px-24 tw-pt-4 tw-pb-24">
      <ec-radio-btn @change="onChange" v-bind="args" :label="label" v-model="modelValue"/>
    </div>
  `,
});

export const all = () => ({
  components: { EcRadioBtn },
  setup() {
    const modelUnchecked = ref<RadioButtonProps['modelValue']>('');
    const modelChecked = ref<RadioButtonProps['modelValue']>('y');
    const modelDescription = ref<RadioButtonProps['modelValue']>('');
    const modelCheckedDisabled = ref<RadioButtonProps['modelValue']>('y');
    const modelUncheckedDisabled = ref<RadioButtonProps['modelValue']>('y');
    const modelInlineRadioGroup = ref<RadioButtonProps['modelValue']>('y');
    const modelInlineText = ref<RadioButtonProps['modelValue']>('y');
    const modelError = ref<RadioButtonProps['modelValue']>('');
    const optionsWithDescription: RadioButtonProps['options'] = [
      { value: 'y', label: 'Yes', description: 'Confirm' },
      { value: 'n', label: 'No', description: 'Dismiss' },
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
        <ec-radio-btn @change="onChange" v-bind="args" v-model="modelDescription" :options="optionsWithDescription" />
      </div>

      <h3>Checked</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @change="onChange" v-bind="args" v-model="modelChecked" />
      </div>

      <h3>Unchecked Disabled</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @change="onChange" v-bind="args" v-model="modelUncheckedDisabled" :is-disabled="true" />
      </div>

      <h3>Checked Disabled</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @change="onChange" v-bind="args" v-model="modelCheckedDisabled" :is-disabled="true" />
      </div>

      <h3>Inline Radio Group</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @change="onChange" v-bind="args" v-model="modelInlineRadioGroup" :is-group-inline="true" />
      </div>

      <h3>Inline Text</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @change="onChange" v-bind="args" v-model="modelInlineText" :is-text-inline="true" :options="optionsWithDescription" />
      </div>

      <h3>Error</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @change="onChange" v-bind="args" v-model="modelError" :error-message="errorMessage" />
      </div>
    </div>
  `,
});
