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
      {{modelValue}}
      <ec-radio-btn-group @update:model-value="onChange" v-bind="args" v-model="modelValue"/>
    </div>
  `,
});

export const all = () => ({
  components: { EcRadioBtnGroup },
  setup() {
    const label = ref<RadioButtonGroupProps['label']>('Select an option');
    const modelLabel = ref<RadioButtonGroupProps['modelValue']>('');
    const modelSlotLabel = ref<RadioButtonGroupProps['modelValue']>('');
    const optionsWithDescription = ref<RadioButtonGroupProps['options']>([
      { value: 'y', label: 'Yes', description: 'Confirm' },
      { value: 'n', label: 'No', description: 'Reject' },
    ]);
    const modelDescription = ref<RadioButtonGroupProps['modelValue']>('');
    const modelUnchecked = ref<RadioButtonGroupProps['modelValue']>('');
    const modelChecked = ref<RadioButtonGroupProps['modelValue']>('y');
    const modelCheckedDisabled = ref<RadioButtonGroupProps['modelValue']>('y');
    const modelUncheckedDisabled = ref<RadioButtonGroupProps['modelValue']>('');
    const modelInlineText = ref<RadioButtonGroupProps['modelValue']>('y');
    const modelGroupInlineText = ref<RadioButtonGroupProps['modelValue']>('y');
    const modelError = ref<RadioButtonGroupProps['modelValue']>('');
    const errorMessage = 'One of the options must be selected';

    return {
      args: basicArgs,
      modelChecked,
      modelUnchecked,
      label,
      errorMessage,
      optionsWithDescription,
      modelLabel,
      modelSlotLabel,
      modelDescription,
      modelCheckedDisabled,
      modelUncheckedDisabled,
      modelInlineText,
      modelGroupInlineText,
      modelError,
      onChange: action('update:modelValue'),
    };
  },
  template: `
    <div class="tw-max-w-screen-sm tw-m-24">
      <h3>Label</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group @update:modelValue="onChange" v-bind="args" :label="label" v-model="modelLabel"></ec-radio-btn-group>
      </div>

      <h3>Slot label</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group @update:modelValue="onChange" v-bind="args" v-model="modelSlotLabel">
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
          @update:modelValue="onChange" 
          v-bind="args" 
          v-model="modelDescription" 
          :options="optionsWithDescription" />
      </div>

      <h3>Checked</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group @update:modelValue="onChange" v-bind="args" v-model="modelChecked" />
      </div>

      <h3>Unchecked Disabled</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group @update:modelValue="onChange" v-bind="args" v-model="modelUncheckedDisabled" :is-disabled="true" />
      </div>

      <h3>Checked Disabled</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group @update:modelValue="onChange" v-bind="args" v-model="modelCheckedDisabled" :is-disabled="true" />
      </div>

      <h3>Inline Text</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group 
          @update:modelValue="onChange" 
          v-bind="args"
          v-model="modelInlineText" 
          :is-text-inline="true" 
          :options="optionsWithDescription" />
      </div>

      <h3>Group Inline</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group 
          @update:modelValue="onChange" 
          v-bind="args" 
          v-model="modelInlineText" 
          :is-group-inline="true" 
          :options="optionsWithDescription" />
      </div>

      <h3>Error Message</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group @update:modelValue="onChange" v-bind="args" v-model="modelError" :error-message="errorMessage" />
      </div>

      <h3>Slot Error Message</h3>
      <div class="tw-px-24 tw-pt-4 tw-pb-24">
        <ec-radio-btn-group @update:modelValue="onChange" v-bind="args" v-model="modelError">
          <template #error-message>
            <span class="tw-text-key-4">An error has occurred</span>
          </template>
        </ec-radio-btn-group>
      </div>
    </div>
  `,
});
