import { ref } from 'vue';

import EcCheckbox from './ec-checkbox.vue';

export default {
  title: 'Checkbox',
  component: EcCheckbox,
};

const Template = ({ checked, ...args }) => ({
  components: { EcCheckbox },
  setup() {
    const model = ref(checked);
    return { args, model };
  },
  template: `
    <div class="tw-p-24">
      <ec-checkbox v-bind="args" v-model="model" />
    </div>
  `,
});

export const basic = Template.bind({});
basic.args = {
  label: 'I accept the terms and conditions',
  disabled: false,
  checked: false,
};

basic.parameters = {
  visualRegressionTests: { disable: true },
};

export const all = ({
  valueFromPropsChecked1,
  valueFromPropsChecked2,
  valueFromPropsHasError,
  valueFromPropsLabel,
  valueFromPropsErrorMessage,
  valueFromPropsDisabled1,
  valueFromPropsDisabled2,
  args,
}) => ({
  components: { EcCheckbox },
  setup() {
    const checked1 = ref(valueFromPropsChecked1);
    const checked2 = ref(valueFromPropsChecked2);

    return {
      args,
      checked1,
      checked2,
      valueFromPropsHasError,
      valueFromPropsLabel,
      valueFromPropsErrorMessage,
      valueFromPropsDisabled1,
      valueFromPropsDisabled2,
    };
  },
  template: `
    <div class="tw-max-w-screen-sm tw-m-24">
      <h3>Not checked</h3>
      <ec-checkbox class="tw-mb-24 tw-col-12">
        <template #label>
          I accept the <a href="#" @click.stop.prevent="$emit('open-terms')"> terms and conditions </a>
        </template>
      </ec-checkbox>

      <h3>Not checked - with multiline label text</h3>
      <ec-checkbox class="tw-mb-24 tw-col-12">
        <template #label>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ullamcorper, tortor vitae elementum fringilla, risus leo hendrerit libero, vitae luctus nibh ex non neque. Duis id ligula eros.
        </template>
      </ec-checkbox>

      <h3>Checked</h3>
      <ec-checkbox
        checked
        class="tw-mb-24 tw-col-12">
        <template #label>
          I accept the <a href="#" @click.stop.prevent="$emit('open-terms')"> terms and conditions </a>
        </template>
      </ec-checkbox>

      <h3>Indeterminate</h3>
      <ec-checkbox
        indeterminate
        class="tw-mb-24 tw-col-12">
        <template #label>
          Select all
        </template>
      </ec-checkbox>

      <h3>Error</h3>
      <ec-checkbox class="tw-mb-24 tw-col-12"
        error-message="An error has occurred">
        <template #label>
          I accept the <a href="#" @click.stop.prevent="$emit('open-terms')"> terms and conditions </a>
        </template>
      </ec-checkbox>

      <h3>Error - with multiline label text</h3>
      <ec-checkbox
        error-message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eos consequatur quas reiciendis aliquid ipsam ea pariatur dolorem, molestias maiores."
        class="tw-mb-24 tw-col-12">
        <template #label>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ullamcorper, tortor vitae elementum fringilla, risus leo hendrerit libero, vitae luctus nibh ex non neque. Duis id ligula eros.
        </template>
      </ec-checkbox>

      <h3>Disabled</h3>
      <ec-checkbox class="tw-mb-24 tw-col-12"
        disabled>
        <template #label>
          I accept the <a href="#" @click.stop.prevent="$emit('open-terms')"> terms and conditions </a>
        </template>
      </ec-checkbox>

      <h3>Disabled - checked</h3>
      <ec-checkbox class="tw-mb-24 tw-col-12"
        checked
        disabled>
        <template #label>
          I accept the <a href="#" @click.stop.prevent="$emit('open-terms')"> terms and conditions </a>
        </template>
      </ec-checkbox>

      <h3>Disabled - indeterminate</h3>
      <ec-checkbox class="tw-mb-24 tw-col-12"
        indeterminate
        disabled>
        <template #label>
          Select all
        </template>
      </ec-checkbox>

      <h3>Label and Error messages coming from props</h3>
      <ec-checkbox
        v-if="!valueFromPropsHasError"
        class="tw-mb-24"
        v-model="checkbox1"
        :disabled="valueFromPropsDisabled1"
        :label="valueFromPropsLabel">
      </ec-checkbox>
      <ec-checkbox
        v-else="valueFromPropsHasError"
        class="tw-mb-24"
        v-model="checkbox1"
        :disabled="valueFromPropsDisabled1"
        :label="valueFromPropsLabel"
        :error-message="valueFromPropsErrorMessage">
      </ec-checkbox>

      <h3>Label and Error messages coming from template</h3>
      <ec-checkbox
        v-if="!valueFromPropsHasError"
        v-model="checkbox2"
        :disabled="valueFromPropsDisabled2">
        <template #label>
          I accept the <a href="#" @click.stop.prevent="$emit('open-terms')"> terms and conditions </a>
        </template>
      </ec-checkbox>
      <ec-checkbox
        v-else
        v-model="checkbox2"
        :disabled="valueFromPropsDisabled2">
        <template #label>
          I accept the <a href="#" @click.stop.prevent="$emit('open-terms')"> terms and conditions </a>
        </template>
        <template #error-message>
          An error has occurred
        </template>
      </ec-checkbox>
    </div>
  `,
});

all.args = {
  valueFromPropsChecked1: false,
  valueFromPropsChecked2: false,
  valueFromPropsHasError: false,
  valueFromPropsLabel: 'I accept the terms and conditions',
  valueFromPropsErrorMessage: 'An error has occurred',
  valueFromPropsDisabled1: false,
  valueFromPropsDisabled2: false,
};
