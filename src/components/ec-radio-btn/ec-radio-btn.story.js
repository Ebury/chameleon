import { ref } from 'vue';

import EcRadioBtn from './ec-radio-btn.vue';

export default {
  title: 'Radio Button',
  component: EcRadioBtn,
};

const basicArgs = {
  label: 'Select one option',
  options: [
    { value: 'y', label: 'Yes' },
    { value: 'n', label: 'No' },
  ],
};

export const basic = () => ({
  components: { EcRadioBtn },
  setup() {
    const model = ref('');
    return { args: basicArgs, model };
  },
  template: `
    <div class="tw-p-24">
      <ec-radio-btn v-bind="args" v-model="model"/>
    </div>
  `,
});

export const description = () => ({
  components: { EcRadioBtn },
  setup() {
    const model = ref('');
    return {
      args: {
        ...basicArgs,
        options: [
          { value: 'y', label: 'Yes', description: 'Confirm option' },
          { value: 'n', label: 'No', description: 'Reject option' },
        ],
      },
      model,
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-radio-btn v-bind="args" v-model="model" />
    </div>
  `,
});

export const checked = () => ({
  components: { EcRadioBtn },
  setup() {
    const model = ref('y');
    return {
      args: {
        ...basicArgs,
      },
      model,
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-radio-btn v-bind="args" v-model="model" />
    </div>
  `,
});

export const checkedDisabled = () => ({
  components: { EcRadioBtn },
  setup() {
    const model = ref('y');
    return {
      args: {
        ...basicArgs,
        modelValue: 'y',
        disabled: true,
      },
      model,
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-radio-btn v-bind="args" v-model="model" />
    </div>
  `,
});

export const inlineRadioGroup = () => ({
  components: { EcRadioBtn },
  setup() {
    const model = ref('y');
    return {
      args: {
        ...basicArgs,
        isGroupInline: true,
      },
      model,
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-radio-btn v-bind="args" v-model="model" />
    </div>
  `,
});

export const inlineText = () => ({
  components: { EcRadioBtn },
  setup() {
    const model = ref('y');
    return {
      args: {
        ...basicArgs,
        options: [
          { value: 'y', label: 'Yes', description: '(Confirm)' },
          { value: 'n', label: 'No', description: '(Reject)' },
        ],
        isTextInline: true,
      },
      model,
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-radio-btn v-bind="args" v-model="model" />
    </div>
  `,
});

export const uncheckedDisabled = () => ({
  components: { EcRadioBtn },
  setup() {
    const model = ref('y');
    return {
      args: {
        ...basicArgs,
        disabled: true,
      },
      model,
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-radio-btn v-bind="args" v-model="model" />
    </div>
  `,
});

export const error = () => ({
  components: { EcRadioBtn },
  setup() {
    const model = ref('');
    return {
      args: {
        ...basicArgs,
        errorMessage: 'One of the options must be selected',
      },
      model,
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-radio-btn v-bind="args" v-model="model" />
    </div>
  `,
});

