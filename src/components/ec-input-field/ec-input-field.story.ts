// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import { ref, watchEffect } from 'vue';

import { IconName } from '../ec-icon/icon-names';
import { IconType } from '../ec-icon/types';
import EcInputField from './ec-input-field.vue';
import type { InputFieldProps } from './types';
import { InputFieldType } from './types';

export default {
  title: 'Input Field',
  component: EcInputField,
  argTypes: {
    type: {
      options: InputFieldType,
      control: { type: 'select' },
    },
    isInGroup: {
      options: ['left', 'right'],
      control: { type: 'select' },
    },
    iconType: {
      options: IconType,
      control: { type: 'select' },
    },
    icon: {
      options: IconName,
      control: { type: 'select' },
    },
    leftIconType: {
      options: IconType,
      control: { type: 'select' },
    },
    leftIcon: {
      options: IconName,
      control: { type: 'select' },
    },
  },
};

const Template = (args: InputFieldProps) => ({
  components: { EcInputField },
  setup() {
    const baseArgs = {
      label: 'Username',
      modelValue: '',
      placeholder: 'My input',
      bottomNote: 'Your email',
      icon: IconName.SimpleCheck,
      leftIcon: IconName.SimpleSearch,
      note: 'Max 80 chars.',
      ...args,
    } as InputFieldProps;

    return {
      args: baseArgs,
      onInput: action('input'),
      onChange: action('change'),
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-input-field
        v-bind="args"
        v-on="{
          input: onInput,
          change: onChange,
        }"
      />
    </div>
  `,
});

export const basic = Template.bind({});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
basic.parameters = {
  visualRegressionTests: { disable: true },
};

export const all = () => ({
  components: { EcInputField },
  setup() {
    const valueNumber = ref(0);
    const valueText = ref('');
    const valueDate = ref('');

    const isSensitive = false;
    const isWarning = false;
    const labelTooltip = 'Tooltip text';

    // number input
    const valueFromPropsNumber = 0;
    const labelNumber = 'Number input';
    const noteNumber = 'Max 80 chars';
    const errorMessageNumber = 'error message';
    const iconNumber = '';

    // text input
    const valueFromPropsText = '';
    const labelText = 'Text input';
    const noteText = 'Max 80 chars';
    const bottomNoteText = 'Random bottom note text';
    const errorMessageText = 'error message';
    const iconText = '';

    // date input
    const valueFromPropsDate = '';
    const labelDate = 'Date input';
    const noteDate = 'Max 80 chars';
    const errorMessageDate = 'error message';
    const iconDate = '';

    watchEffect(() => {
      valueNumber.value = valueFromPropsNumber;
      valueText.value = valueFromPropsText;
      valueDate.value = valueFromPropsDate;
    });

    return {
      isSensitive,
      isWarning,
      labelTooltip,
      valueNumber,
      labelNumber,
      noteNumber,
      errorMessageNumber,
      iconNumber,
      valueText,
      labelText,
      noteText,
      bottomNoteText,
      errorMessageText,
      iconText,
      valueDate,
      labelDate,
      noteDate,
      errorMessageDate,
      iconDate,
      onInput: action('input'),
      onChange: action('change'),
    };
  },
  template: `
    <div class="tw-grid-container">
      <div class="tw-grid">
        <div class="tw-col-full md:tw-col-4">
          <ec-input-field type="number" min="5" max="10" v-model.number="valueNumber" :note="noteNumber" :label="labelNumber" :error-message="errorMessageNumber" :icon="iconNumber" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field type="text" placeholder="My input" v-model="valueText" :note="noteText" :label="labelText" :error-message="errorMessageText" :icon="iconText" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field type="date" placeholder="My input" v-model="valueDate" :note="noteDate" :label="labelDate" :error-message="errorMessageDate" :icon="iconDate" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field disabled placeholder="My disabled input" v-model="valueText" label="Disabled input" :icon="iconText" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field disabled placeholder="My disabled input" v-model="valueText" label="Disabled input" error-message="Disabled with error" :icon="iconText" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field placeholder="My input" left-icon="${IconName.SimpleSearch}" icon="${IconName.SimpleInfo}" v-model="valueText" label="Input with icons" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field readonly placeholder="My input" value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eos consequatur quas reiciendis aliquid ipsam ea pariatur dolorem, molestias maiores." label="Read only input with long text" :icon="iconText" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field placeholder="An other input" v-model="valueText" label="Input tooltip on the label" :is-in-group="isInGroup" :is-sensitive="isSensitive" :label-tooltip="labelTooltip" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field placeholder="My input" left-icon="${IconName.SimpleSearch}" icon="${IconName.SimpleInfo}" v-model="valueText" label="Short label" :is-in-group="isInGroup" :is-sensitive="isSensitive" :label-tooltip="labelTooltip" :note="noteText" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field placeholder="My input" icon="${IconName.SimpleInfo}" v-model="valueText" label="Input with bottom note" :is-in-group="isInGroup" :is-sensitive="isSensitive" :bottom-note="bottomNoteText" :is-warning="isWarning" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field placeholder="My input" left-icon-type="${IconType.SUCCESS}" left-icon="${IconName.SimpleChevronRight}" icon="${IconName.SimpleCheck}" iconType="${IconType.SUCCESS}" v-model="valueText" label="Input with success green icon" :is-in-group="isInGroup" :is-sensitive="isSensitive" :bottom-note="bottomNoteText" :is-warning="isWarning" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field readonly placeholder="My input" left-icon="${IconName.SimpleSearch}" :model-value="valueText" label="Input with loading icon" :is-in-group="isInGroup" :is-sensitive="isSensitive" :is-loading="true" />
        </div>

        <div class="tw-col-full"></div>

        <div class="tw-col-full md:tw-col-4">
          Model value number: {{ valueNumber }}
        </div>

        <div class="tw-col-full md:tw-col-4">
          Model value text: {{ valueText }}
        </div>

        <div class="tw-col-full md:tw-col-4">
          Model value date: {{ valueDate }}
        </div>
      </div>
    </div>
  `,
});
