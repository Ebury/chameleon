// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';
import { ref, watchEffect } from 'vue';

import EcRadioBtnGroup from './ec-radio-btn-group.vue';
import type { RadioButtonGroupProps } from './types';

export default {
  title: 'Radio Button Group',
  component: EcRadioBtnGroup,
} as Meta<typeof EcRadioBtnGroup>;

type EcRadioBtnGroupStory = StoryFn<typeof EcRadioBtnGroup>;

export const basic: EcRadioBtnGroupStory = storyArgs => ({
  components: { EcRadioBtnGroup },
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
      <ec-radio-btn-group
        @update:model-value="onChange"
        v-bind="args"
        v-model="model"
      />
    </div>
  `,
});
basic.args = {
  modelValue: 'y',
  options: [
    { value: 'y', label: 'Yes' },
    { value: 'n', label: 'No' },
  ],
};

export const all: EcRadioBtnGroupStory = storyArgs => ({
  components: { EcRadioBtnGroup },
  setup() {
    const optionsWithDescription = ref<RadioButtonGroupProps['options']>([
      { value: 'y', label: 'Yes', description: 'Confirm' },
      { value: 'n', label: 'No', description: 'Reject' },
    ]);
    const modelLabel = ref<RadioButtonGroupProps['modelValue']>('');
    const modelSlotLabel = ref<RadioButtonGroupProps['modelValue']>('');
    const modelDescription = ref<RadioButtonGroupProps['modelValue']>('');
    const modelUnchecked = ref<RadioButtonGroupProps['modelValue']>('');
    const modelChecked = ref<RadioButtonGroupProps['modelValue']>('y');
    const modelCheckedDisabled = ref<RadioButtonGroupProps['modelValue']>('y');
    const modelUncheckedDisabled = ref<RadioButtonGroupProps['modelValue']>('');
    const modelInlineText = ref<RadioButtonGroupProps['modelValue']>('y');
    const modelGroupInline = ref<RadioButtonGroupProps['modelValue']>('y');
    const modelError = ref<RadioButtonGroupProps['modelValue']>('');
    const modelSlotError = ref<RadioButtonGroupProps['modelValue']>('');

    const errorMessage = ref('');
    const label = ref('');
    const args = ref({});

    watchEffect(() => {
      const { errorMessage: errorMessageFromArgs, label: labelFromArgs, ...rest } = storyArgs;
      errorMessage.value = errorMessageFromArgs ?? '';
      label.value = labelFromArgs ?? '';
      args.value = rest;
    });

    return {
      args,
      label,
      optionsWithDescription,
      errorMessage,
      modelChecked,
      modelUnchecked,
      modelLabel,
      modelSlotLabel,
      modelDescription,
      modelCheckedDisabled,
      modelUncheckedDisabled,
      modelInlineText,
      modelGroupInline,
      modelError,
      modelSlotError,
      onChange: action('update:modelValue'),
    };
  },
  template: `
    <div class="tw-max-w-screen-sm tw-m-24">
      <h3>Label</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group
          v-bind="args"
          v-model="modelLabel"
          :label="label"
          @update:model-value="onChange"
        />
      </div>

      <h3>Slot label</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group
          v-bind="args"
          v-model="modelSlotLabel"
          @update:model-value="onChange"
        >
          <template #label>
            <span class="tw-text-key-4">
              Select an option
            </span>
          </template>
        </ec-radio-btn-group>
      </div>

      <h3>Description</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group
          v-bind="args"
          v-model="modelDescription"
          :options="optionsWithDescription"
          @update:model-value="onChange"
        />
      </div>

      <h3>Checked</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group
          v-bind="args"
          v-model="modelChecked"
          @update:model-value="onChange"
        />
      </div>

      <h3>Unchecked Disabled</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group
          v-bind="args"
          v-model="modelUncheckedDisabled"
          :is-disabled="true"
          @update:model-value="onChange"
        />
      </div>

      <h3>Checked Disabled</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group
          v-bind="args"
          v-model="modelCheckedDisabled"
          :is-disabled="true"
          @update:model-value="onChange"
        />
      </div>

      <h3>Inline Text</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group
          v-bind="args"
          v-model="modelInlineText"
          :is-text-inline="true"
          :options="optionsWithDescription"
          @update:model-value="onChange"
        />
      </div>

      <h3>Group Inline</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group
          v-bind="args"
          v-model="modelGroupInline"
          :is-group-inline="true"
          @update:model-value="onChange"
        />
      </div>

      <h3>Error Message</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group
          v-bind="args"
          v-model="modelError"
          :error-message="errorMessage"
          @update:model-value="onChange"
        />
      </div>

      <h3>Slot Error Message</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group
          v-bind="args"
          v-model="modelSlotError"
          @update:model-value="onChange"
        >
          <template #error-message>
            <span class="tw-text-key-4">An error has occurred</span>
          </template>
        </ec-radio-btn-group>
      </div>
    </div>
  `,
});
all.args = {
  label: 'Select an option',
  options: [
    { value: 'y', label: 'Yes' },
    { value: 'n', label: 'No' },
  ],
  errorMessage: 'One of the options must be selected',
};
