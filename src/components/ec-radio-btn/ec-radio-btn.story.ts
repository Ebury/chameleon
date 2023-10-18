// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';
import { ref, watchEffect } from 'vue';

import EcRadioBtn from './ec-radio-btn.vue';
import type { RadioButtonProps } from './types';

export default {
  title: 'Radio Button',
  component: EcRadioBtn,
} as Meta<typeof EcRadioBtn>;

type EcRadioBtnStory = StoryFn<typeof EcRadioBtn>;

export const basic: EcRadioBtnStory = storyArgs => ({
  components: { EcRadioBtn },
  setup() {
    const model = ref('');
    const args = ref({});

    watchEffect(() => {
      const { modelValue, ...rest } = storyArgs;
      model.value = modelValue ?? '';
      args.value = rest;
    });

    return {
      args,
      model,
      onChange: action('update:modelValue'),
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-radio-btn @update:modelValue="onChange" v-bind="args" v-model="model" />
    </div>
  `,
});
basic.args = {
  value: 'y',
  modelValue: 'y',
  label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
};

export const all: EcRadioBtnStory = storyArgs => ({
  components: { EcRadioBtn },
  setup() {
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
    const modelErrorMessage = ref<RadioButtonProps['modelValue']>('');
    const modelSlotErrorMessage = ref<RadioButtonProps['modelValue']>('');

    const description = ref('');
    const errorMessage = ref('');
    const args = ref({});

    watchEffect(() => {
      const {
        description: descriptionFromArgs,
        errorMessage: errorMessageFromArgs,
        ...rest
      } = storyArgs;
      description.value = descriptionFromArgs ?? '';
      errorMessage.value = errorMessageFromArgs ?? '';
      args.value = rest;
    });

    return {
      args,
      modelLabel,
      modelChecked,
      modelUnchecked,
      description,
      errorMessage,
      modelSlotLabel,
      modelDescription,
      modelSlotDescription,
      modelCheckedDisabled,
      modelUncheckedDisabled,
      modelInlineText,
      modelError,
      modelErrorMessage,
      modelSlotErrorMessage,
      onChange: action('update:modelValue'),
    };
  },
  template: `
    <div class="tw-max-w-screen-sm tw-m-24">
      <h3>Label</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn v-bind="args" v-model="modelLabel" @update:modelValue="onChange" />
      </div>

      <h3>Slot label</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn v-bind="args" v-model="modelSlotLabel" @update:modelValue="onChange">
          <template #label>
            <span class="tw-text-key-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ullamcorper, tortor vitae elementum fringilla, risus leo hendrerit libero, vitae luctus nibh ex non neque. Duis id ligula eros.
            </span>
          </template>
        </ec-radio-btn>
      </div>

      <h3>Description</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn v-bind="args" v-model="modelDescription" :description="description" @update:modelValue="onChange" />
      </div>

      <h3>Slot Description</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn v-bind="args" v-model="modelSlotDescription" @update:modelValue="onChange">
          <template #description>
            <span class="tw-text-key-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ullamcorper, tortor vitae elementum fringilla, risus leo hendrerit libero, vitae luctus nibh ex non neque. Duis id ligula eros.
            </span>
          </template>
        </ec-radio-btn>
      </div>

      <h3>Checked</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn v-bind="args" v-model="modelChecked" @update:modelValue="onChange" />
      </div>

      <h3>Unchecked Disabled</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn v-bind="args" v-model="modelUncheckedDisabled" :is-disabled="true" @update:modelValue="onChange" />
      </div>

      <h3>Checked Disabled</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn v-bind="args" v-model="modelCheckedDisabled" :is-disabled="true" @update:modelValue="onChange" />
      </div>

      <h3>Inline Text</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn v-bind="args" v-model="modelInlineText" :is-text-inline="true" :description="description" @update:modelValue="onChange" />
      </div>

      <h3>Has Error</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn v-bind="args" v-model="modelError" :has-error="true" @update:modelValue="onChange" />
      </div>

      <h3>Error Message</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn v-bind="args" v-model="modelErrorMessage" :has-error="true" :error-message="errorMessage" @update:modelValue="onChange" />
      </div>

      <h3>Slot Error Message</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn v-bind="args" v-model="modelSlotErrorMessage" @update:modelValue="onChange">
          <template #error-message>
            <span class="tw-text-key-4">An error has occurred</span>
          </template>
        </ec-radio-btn>
      </div>
    </div>
  `,
});

all.args = {
  value: 'y',
  label: 'Yes',
  description: 'Confirm',
  errorMessage: 'One of the options must be selected',
};
