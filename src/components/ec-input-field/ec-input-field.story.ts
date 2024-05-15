
import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';
import { toRefs } from 'vue';

import type { Maybe } from '../../../global';
import { IconName } from '../ec-icon/icon-names';
import { IconType } from '../ec-icon/types';
import EcInputField from './ec-input-field.vue';
import { type InputFieldProps, InputFieldType } from './types';

export default {
  title: 'Input Field',
  component: EcInputField,
  argTypes: {
    type: {
      options: Object.values(InputFieldType),
      control: { type: 'select' },
    },
    isInGroup: {
      options: ['left', 'right'],
      control: { type: 'select' },
    },
    iconType: {
      options: Object.values(IconType),
      control: { type: 'select' },
    },
    icon: {
      options: Object.values(IconName),
      control: { type: 'select' },
    },
    leftIconType: {
      options: Object.values(IconType),
      control: { type: 'select' },
    },
    leftIcon: {
      options: Object.values(IconName),
      control: { type: 'select' },
    },
  },
} as Meta<typeof EcInputField>;

type EcInputFieldStory = StoryFn<InputFieldProps & { placeholder:string }>;

const Template: EcInputFieldStory = args => ({
  components: { EcInputField },
  setup() {
    return {
      args,
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
basic.args = {
  label: 'Username',
  modelValue: '',
  placeholder: 'My input',
  bottomNote: 'Your email',
  icon: IconName.SIMPLE_CHECK,
  leftIcon: IconName.SIMPLE_SEARCH,
  note: 'Max 80 chars.',
};
basic.parameters = {
  visualRegressionTests: { disable: true },
};

type AllInputFieldStory = StoryFn<InputFieldProps & {
  valueNumber: number,
  labelNumber: string,
  noteNumber: string,
  errorMessageNumber: string,
  iconNumber: Maybe<IconName>,
  valueText: string,
  labelText: string,
  noteText: string,
  bottomNoteText: string,
  errorMessageText: string,
  iconText: Maybe<IconName>,
  valueDate: string,
  labelDate: string,
  noteDate: string,
  errorMessageDate: string,
  iconDate: Maybe<IconName>,
}>;

export const all: AllInputFieldStory = storyArgs => ({
  components: { EcInputField },
  setup() {
    const {
      isSensitive,
      isWarning,
      labelTooltip,
      isInGroup,

      valueNumber,
      valueText,
      valueDate,

      labelNumber,
      labelText,
      labelDate,

      noteNumber,
      noteText,
      noteDate,

      errorMessageNumber,
      errorMessageText,
      errorMessageDate,

      iconNumber,
      iconText,
      iconDate,

      bottomNoteText,
    } = toRefs(storyArgs);

    return {
      isSensitive,
      isWarning,
      labelTooltip,
      isInGroup,
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
    <div class="tw-flex-grid-container">
      <div class="tw-flex-grid">
        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-input-field v-model.number="valueNumber" type="number" min="5" max="10" :note="noteNumber" :label="labelNumber" :error-message="errorMessageNumber" :icon="iconNumber" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-input-field v-model="valueText" type="text" placeholder="My input" :note="noteText" :label="labelText" :error-message="errorMessageText" :icon="iconText" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-input-field v-model="valueDate" type="date" placeholder="My input" :note="noteDate" :label="labelDate" :error-message="errorMessageDate" :icon="iconDate" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-input-field v-model="valueText" disabled placeholder="My disabled input" label="Disabled input" :icon="iconText" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-input-field v-model="valueText" disabled placeholder="My disabled input" label="Disabled input" error-message="Disabled with error" :icon="iconText" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-input-field v-model="valueText" placeholder="My input" left-icon="${IconName.SIMPLE_SEARCH}" icon="${IconName.SIMPLE_INFO}" label="Input with icons" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-input-field readonly placeholder="My input" value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eos consequatur quas reiciendis aliquid ipsam ea pariatur dolorem, molestias maiores." label="Read only input with long text" :icon="iconText" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-input-field v-model="valueText" placeholder="Another input" label="Input tooltip on the label" :is-in-group="isInGroup" :is-sensitive="isSensitive" :label-tooltip="labelTooltip" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-input-field v-model="valueText" placeholder="My input" left-icon="${IconName.SIMPLE_SEARCH}" icon="${IconName.SIMPLE_INFO}" label="Short label" :is-in-group="isInGroup" :is-sensitive="isSensitive" :label-tooltip="labelTooltip" :note="noteText" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-input-field v-model="valueText" placeholder="My input" icon="${IconName.SIMPLE_INFO}" label="Input with bottom note" :is-in-group="isInGroup" :is-sensitive="isSensitive" :bottom-note="bottomNoteText" :is-warning="isWarning" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-input-field v-model="valueText" placeholder="My input" left-icon-type="${IconType.SUCCESS}" left-icon="${IconName.SIMPLE_CHEVRON_RIGHT}" icon="${IconName.SIMPLE_CHECK}" icon-type="${IconType.SUCCESS}" label="Input with success green icon" :is-in-group="isInGroup" :is-sensitive="isSensitive" :bottom-note="bottomNoteText" :is-warning="isWarning" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-input-field readonly placeholder="My input" left-icon="${IconName.SIMPLE_SEARCH}" :model-value="valueText" label="Input with loading icon" :is-in-group="isInGroup" :is-sensitive="isSensitive" :is-loading="true" />
        </div>

        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-input-field placeholder="My input" :model-value="valueText" label="Input in light mode" :is-in-group="isInGroup" :is-sensitive="isSensitive" :is-in-light-mode="true" />
        </div>

        <div class="tw-flex-col-full" />

        <div class="tw-flex-col-full md:tw-flex-col-4">
          Model value number: {{ valueNumber }}
        </div>

        <div class="tw-flex-col-full md:tw-flex-col-4">
          Model value text: {{ valueText }}
        </div>

        <div class="tw-flex-col-full md:tw-flex-col-4">
          Model value date: {{ valueDate }}
        </div>
      </div>
    </div>
  `,
});

all.args = {
  isSensitive: false,
  isWarning: false,
  labelTooltip: 'Tooltip text',

  // number input
  valueNumber: 0,
  labelNumber: 'Number input',
  noteNumber: 'Max 80 chars',
  errorMessageNumber: 'error message',
  iconNumber: null,

  // text input
  valueText: '',
  labelText: 'Text input',
  noteText: 'Max 80 chars',
  bottomNoteText: 'Random bottom note text',
  errorMessageText: 'error message',
  iconText: null,

  // date input
  valueDate: '',
  labelDate: 'Date input',
  noteDate: 'Max 80 chars',
  errorMessageDate: 'error message',
  iconDate: null,
};
all.argTypes = {
  iconNumber: {
    options: Object.values(IconName),
    control: { type: 'select' },
  },
  iconText: {
    options: Object.values(IconName),
    control: { type: 'select' },
  },
  iconDate: {
    options: Object.values(IconName),
    control: { type: 'select' },
  },
};
