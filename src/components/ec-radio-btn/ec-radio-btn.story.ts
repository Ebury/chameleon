// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import { ref } from 'vue';

import EcRadioBtn from './ec-radio-btn.vue';
import type { RadioButtonProps } from './types';

export default {
  title: 'Radio Button',
  component: EcRadioBtn,
};

const basicArgs: Pick<RadioButtonProps, 'value' | 'label'> = {
  value: 'y',
  label: 'Yes',
};

export const basic = () => ({
  components: { EcRadioBtn },
  setup() {
    const modelValue = ref<RadioButtonProps['modelValue']>('');
    return {
      args: basicArgs,
      modelValue,
      onChange: action('change'),
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-radio-btn @update:modelValue="onChange" v-bind="args" :label="label" v-model="modelValue"/>
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
    const modelInlineText = ref<RadioButtonProps['modelValue']>('y');
    const modelError = ref<RadioButtonProps['modelValue']>('');
    const description = ref<RadioButtonProps['description']>('Confirm');
    const hasError = ref<RadioButtonProps['hasError']>(true);
    const errorMessage = 'One of the options must be selected';

    return {
      args: basicArgs,
      modelChecked,
      modelUnchecked,
      description,
      errorMessage,
      modelDescription,
      modelCheckedDisabled,
      modelUncheckedDisabled,
      modelInlineText,
      modelError,
      hasError,
      onChange: action('change'),
    };
  },
  template: `
    <div class="tw-max-w-screen-sm tw-m-24">
      <h3>Slot label</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @update:modelValue="onChange" v-bind="args" v-model="modelDescription" :description="description">
          <template #label>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ullamcorper, tortor vitae elementum fringilla, risus leo hendrerit libero, vitae luctus nibh ex non neque. Duis id ligula eros.
          </template>
        </ec-radio-btn>
      </div>

      <h3>Slot Description</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @update:modelValue="onChange" v-bind="args" v-model="modelDescription" :description="description">
          <template #description>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ullamcorper, tortor vitae elementum fringilla, risus leo hendrerit libero, vitae luctus nibh ex non neque. Duis id ligula eros.
          </template>
        </ec-radio-btn>
      </div>

      <h3>Checked</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @update:modelValue="onChange" v-bind="args" v-model="modelChecked" />
      </div>

      <h3>Unchecked Disabled</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @update:modelValue="onChange" v-bind="args" v-model="modelUncheckedDisabled" :is-disabled="true" />
      </div>

      <h3>Checked Disabled</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @update:modelValue="onChange" v-bind="args" v-model="modelCheckedDisabled" :is-disabled="true" />
      </div>

      <h3>Inline Text</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @update:modelValue="onChange" v-bind="args" v-model="modelInlineText" :is-text-inline="true" :description="description" />
      </div>

      <h3>Has Error</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @update:modelValue="onChange" v-bind="args" v-model="modelError" :has-error="hasError" />
      </div>

      <h3>Error Message</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @update:modelValue="onChange" v-bind="args" v-model="modelError" :error-message="errorMessage" />
      </div>

      <h3>Slot Error Message</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @update:modelValue="onChange" v-bind="args" v-model="modelError" :error-message="errorMessage">
          <template #error-message>
            An error has occurred
          </template>
        </ec-radio-btn>
      </div>
    </div>
  `,
});
