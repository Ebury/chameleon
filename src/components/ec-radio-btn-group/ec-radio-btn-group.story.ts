// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import { ref } from 'vue';

import EcRadioBtn from '../ec-radio-btn';
import EcRadioBtnGroup from './ec-radio-btn-group.vue';
import type { RadioButtonGroupProps } from './types';

export default {
  title: 'Radio Button Group',
  component: EcRadioBtnGroup,
};

const basicArgs: Pick<RadioButtonGroupProps, 'options' | 'name'> = {
  options: [
    { value: 'y', label: 'Yes' },
    { value: 'n', label: 'No' },
  ],
  name: 'basic',
};

export const basic = () => ({
  components: { EcRadioBtnGroup, EcRadioBtn },
  setup() {
    const modelValue = ref<RadioButtonGroupProps['modelValue']>('');
    return {
      args: basicArgs,
      modelValue,
      onChange: action('update:modelValue'),
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-radio-btn-group @update:modelValue="onChange" v-bind="args" v-model="modelValue"/>
    </div>
  `,
});

/* export const all = () => ({
  components: { EcRadioBtnGroup },
  setup() {
    const label = ref<RadioButtonProps['label']>('Yes');
    const description = ref<RadioButtonProps['description']>('Confirm');
    const modelLabel = ref<RadioButtonProps['modelValue']>('');
    const modelSlotLabel = ref<RadioButtonProps['modelValue']>('');
    const modelDescription = ref<RadioButtonProps['modelValue']>('');
    const modelSlotDescription = ref<RadioButtonProps['modelValue']>('');
    const modelUnchecked = ref<RadioButtonProps['modelValue']>('');
    const modelChecked = ref<RadioButtonProps['modelValue']>('y');
    const modelCheckedDisabled = ref<RadioButtonProps['modelValue']>('y');
    const modelUncheckedDisabled = ref<RadioButtonProps['modelValue']>('');
    const modelInlineText = ref<RadioButtonProps['modelValue']>('y');
    const modelError = ref<RadioButtonProps['modelValue']>('');
    const hasError = ref<RadioButtonProps['hasError']>(true);
    const errorMessage = 'One of the options must be selected';

    return {
      args: basicArgs,
      modelChecked,
      modelUnchecked,
      label,
      description,
      errorMessage,
      modelLabel,
      modelSlotLabel,
      modelDescription,
      modelSlotDescription,
      modelCheckedDisabled,
      modelUncheckedDisabled,
      modelInlineText,
      modelError,
      hasError,
      onChange: action('update:modelValue'),
    };
  },
  template: `
    <div class="tw-max-w-screen-sm tw-m-24">
      <h3>Label</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @update:modelValue="onChange" v-bind="args" :label="label" v-model="modelLabel"></ec-radio-btn>
      </div>

      <h3>Slot label</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @update:modelValue="onChange" v-bind="args" v-model="modelSlotLabel">
          <template #label>
            <span class="tw-text-key-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ullamcorper, tortor vitae elementum fringilla, risus leo hendrerit libero, vitae luctus nibh ex non neque. Duis id ligula eros.
            </span>
          </template>
        </ec-radio-btn>
      </div>

      <h3>Description</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @update:modelValue="onChange" v-bind="args" :label="label" v-model="modelDescription" :description="description"></ec-radio-btn>
      </div>

      <h3>Slot Description</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @update:modelValue="onChange" v-bind="args" :label="label" v-model="modelSlotDescription">
          <template #description>
            <span class="tw-text-key-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ullamcorper, tortor vitae elementum fringilla, risus leo hendrerit libero, vitae luctus nibh ex non neque. Duis id ligula eros.
            </span>
            </template>
        </ec-radio-btn>
      </div>

      <h3>Checked</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @update:modelValue="onChange" v-bind="args" :label="label" v-model="modelChecked" />
      </div>

      <h3>Unchecked Disabled</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @update:modelValue="onChange" v-bind="args" :label="label" v-model="modelUncheckedDisabled" :is-disabled="true" />
      </div>

      <h3>Checked Disabled</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @update:modelValue="onChange" v-bind="args" :label="label" v-model="modelCheckedDisabled" :is-disabled="true" />
      </div>

      <h3>Inline Text</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @update:modelValue="onChange" v-bind="args" :label="label" v-model="modelInlineText" :is-text-inline="true" :description="description" />
      </div>

      <h3>Has Error</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @update:modelValue="onChange" v-bind="args" :label="label" v-model="modelError" :has-error="hasError" />
      </div>

      <h3>Error Message</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @update:modelValue="onChange" v-bind="args" :label="label" v-model="modelError" :error-message="errorMessage" />
      </div>

      <h3>Slot Error Message</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn @update:modelValue="onChange" v-bind="args" :label="label" v-model="modelError">
          <template #error-message>
            <span class="tw-text-key-4">An error has occurred</span>
          </template>
        </ec-radio-btn>
      </div>
    </div>
  `,
}); */
