import EcRadioBtn from './ec-radio-btn.vue';

export default {
  title: 'Radio Button',
  component: EcRadioBtn,
};

const basicArgs = {
  label: 'Select one option',
  modelValue: '',
  radios: [
    { value: 'y', label: 'Yes' },
    { value: 'n', label: 'No' },
  ],
};

export const basic = () => ({
  components: { EcRadioBtn },
  setup() {
    return { args: basicArgs };
  },
  template: `
    <div class="tw-p-24">
      <ec-radio-btn v-bind="args"/>
    </div>
  `,
});

export const checked = () => ({
  components: { EcRadioBtn },
  setup() {
    return {
      args: {
        ...basicArgs,
        modelValue: 'y',
      },
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-radio-btn v-bind="args"/>
    </div>
  `,
});

export const checkedDisabled = () => ({
  components: { EcRadioBtn },
  setup() {
    return {
      args: {
        ...basicArgs,
        modelValue: 'y',
        disabled: true,
      },
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-radio-btn v-bind="args" />
    </div>
  `,
});

export const inlineRadioGroup = () => ({
  components: { EcRadioBtn },
  setup() {
    return {
      args: {
        ...basicArgs,
        inlineRadioGroup: true,
      },
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
    return {
      args: {
        ...basicArgs,
        inlineText: true,
      },
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-radio-btn v-bind="args" />
    </div>
  `,
});

export const uncheckedDisabled = () => ({
  components: { EcRadioBtn },
  setup() {
    return {
      args: {
        ...basicArgs,
        disabled: true,
      },
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-radio-btn v-bind="args" />
    </div>
  `,
});

export const mediumIconSize = () => ({
  components: { EcRadioBtn },
  setup() {
    return {
      args: {
        ...basicArgs,
        iconSize: 24,
      },
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-radio-btn v-bind="args" />
    </div>
  `,
});

export const error = () => ({
  components: { EcRadioBtn },
  setup() {
    return {
      args: {
        ...basicArgs,
        errorMessage: 'One of the options must be selected',
      },
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-radio-btn v-bind="args" />
    </div>
  `,
});

