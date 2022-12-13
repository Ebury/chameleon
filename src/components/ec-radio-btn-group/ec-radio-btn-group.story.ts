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

const basicArgs: Pick<RadioButtonGroupProps, 'options'> = {
  options: [
    { value: 'y', label: 'Yes' },
    { value: 'n', label: 'No' },
  ],
};

export const basic = () => ({
  components: { EcRadioBtnGroup, EcRadioBtn },
  setup() {
    const modelValue = ref<RadioButtonGroupProps['modelValue']>('');
    return {
      args: basicArgs,
      modelValue,
      name: 'basic',
      onChange: action('update:modelValue'),
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-radio-btn-group 
        name="name" 
        @update:model-value="onChange" 
        v-bind="args" 
        v-model="modelValue" />
    </div>
  `,
});

export const all = () => ({
  components: { EcRadioBtnGroup },
  setup() {
    const optionsWithDescription = ref<RadioButtonGroupProps['options']>([
      { value: 'y', label: 'Yes', description: 'Confirm' },
      { value: 'n', label: 'No', description: 'Reject' },
    ]);
    const label = ref<RadioButtonGroupProps['label']>('Select an option');
    const nameLabel = ref<RadioButtonGroupProps['name']>('labelStory');
    const slotNameLabel = ref<RadioButtonGroupProps['name']>('slotLabelStory');
    const nameDescription = ref<RadioButtonGroupProps['name']>('descriptionStory');
    const nameUnchecked = ref<RadioButtonGroupProps['name']>('uncheckedStory');
    const nameChecked = ref<RadioButtonGroupProps['name']>('checkedStory');
    const nameDisabled = ref<RadioButtonGroupProps['name']>('disabledStory');
    const nameUncheckedDisabled = ref<RadioButtonGroupProps['name']>('uncheckedDisabledStory');
    const nameInlineText = ref<RadioButtonGroupProps['name']>('inlineTextStory');
    const nameGroupInline = ref<RadioButtonGroupProps['name']>('groupInlineStory');
    const nameErrorMessage = ref<RadioButtonGroupProps['name']>('errorMessageStory');
    const nameSlotErrorMessage = ref<RadioButtonGroupProps['name']>('slotErrorMessageStory');
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
    const errorMessage = 'One of the options must be selected';

    return {
      args: basicArgs,
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
      nameChecked,
      nameDescription,
      nameDisabled,
      nameErrorMessage,
      nameSlotErrorMessage,
      nameGroupInline,
      nameInlineText,
      nameLabel,
      slotNameLabel,
      nameUnchecked,
      nameUncheckedDisabled,
      onChange: action('update:modelValue'),
    };
  },
  template: `
    <div class="tw-max-w-screen-sm tw-m-24">
      <h3>Label</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group 
          name="nameLabel" 
          @update:modelValue="onChange" 
          v-bind="args" 
          :label="label" 
          v-model="modelLabel" />
      </div>

      <h3>Slot label</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group 
          name="slotNameLabel" 
          @update:modelValue="onChange" 
          v-bind="args" 
          v-model="modelSlotLabel">
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
          name="nameDescription"
          @update:modelValue="onChange" 
          v-bind="args" 
          v-model="modelDescription" 
          :options="optionsWithDescription" />
      </div>

      <h3>Checked</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group 
          name="nameUnchecked" 
          @update:modelValue="onChange" 
          v-bind="args" 
          v-model="modelChecked" />
      </div>

      <h3>Unchecked Disabled</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group  
          name="nameUncheckedDisabled"
          @update:modelValue="onChange" 
          v-bind="args" 
          v-model="modelUncheckedDisabled" 
          :is-disabled="true" />
      </div>

      <h3>Checked Disabled</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group  
          name="nameCheckedDisabled" 
          @update:modelValue="onChange" 
          v-bind="args" 
          v-model="modelCheckedDisabled" 
          :is-disabled="true" />
      </div>

      <h3>Inline Text</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group  
          name="nameInlineText"
          @update:modelValue="onChange" 
          v-bind="args"
          v-model="modelInlineText" 
          :is-text-inline="true" 
          :options="optionsWithDescription" />
      </div>

      <h3>Group Inline</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group  
          name="nameGroupInline"
          @update:modelValue="onChange" 
          v-bind="args" 
          v-model="modelGroupInline" 
          :is-group-inline="true" />
      </div>

      <h3>Error Message</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group  
          name="nameErrorMessage"
          @update:modelValue="onChange" 
          v-bind="args" 
          v-model="modelError" 
          :error-message="errorMessage" />
      </div>

      <h3>Slot Error Message</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group  
          name="nameSlotErrorMessage"
          @update:modelValue="onChange" 
          v-bind="args" 
          v-model="modelSlotError">
          <template #error-message>
            <span class="tw-text-key-4">An error has occurred</span>
          </template>
        </ec-radio-btn-group>
      </div>
    </div>
  `,
});
