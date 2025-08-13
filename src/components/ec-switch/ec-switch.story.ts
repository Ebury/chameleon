
import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';
import { ref, toRefs, watchEffect } from 'vue';

import EcSwitch from './ec-switch.vue';
import type { SwitchProps } from './types';

export default {
  title: 'Switch',
  component: EcSwitch,
} as Meta<typeof EcSwitch>;

type EcSwitchStory = StoryFn<typeof EcSwitch>;
type StoryArgs = SwitchProps & { hasError: boolean };

const Template: EcSwitchStory = storyArgs => ({
  components: { EcSwitch },
  setup() {
    const model = ref();
    const args = ref({});

    watchEffect(() => {
      const { modelValue, ...rest } = storyArgs;
      model.value = modelValue;
      args.value = rest;
    });

    return { args, model };
  },
  template: `
    <div class="tw-p-24">
      <ec-switch class="tw-mb-24 tw-mt-12" v-bind="args" v-model="model" />
    </div>
  `,
});

export const basic = Template.bind({});
basic.args = {
  label: 'I accept the terms and conditions',
  disabled: false,
  modelValue: false,
};

basic.parameters = {
  visualRegressionTests: { disable: true },
};

export const all: StoryFn<StoryArgs & { hasError: boolean }> = storyArgs => ({
  components: { EcSwitch },
  setup() {
    const switch1 = ref(false);
    const switch2 = ref(false);

    const {
      label,
      errorMessage,
      hasError,
      disabled,
    } = toRefs(storyArgs);

    return {
      switch1,
      switch2,
      hasError,
      label,
      errorMessage,
      disabled,
      onAction: action('open-terms'),
    };
  },
  template: `
    <div class="tw-max-w-screen-sm tw-m-24">
      <h3>Not checked</h3>
      <div class="te-relative">
        <ec-switch>
          <template #label>
            I accept the <a href="#" @click.stop.prevent="onAction"> terms and conditions </a>
          </template>
        </ec-switch>
      <div>

      <h3>Not checked - with multiline label text</h3>
      <ec-switch class="tw-mb-24 tw-mt-12">
        <template #label>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ullamcorper, tortor vitae elementum fringilla, risus leo hendrerit libero, vitae luctus nibh ex non neque. Duis id ligula eros.
        </template>
      </ec-switch>

      <h3>Checked</h3>
      <ec-switch
        :model-value="true"
        class="tw-mb-24 tw-mt-12"
      >
        <template #label>
          I accept the <a href="#" @click.stop.prevent="onAction"> terms and conditions </a>
        </template>
      </ec-switch>

      <h3>Error</h3>
      <ec-switch
        class="tw-mb-24 tw-mt-12"
        error-message="An error has occurred"
      >
        <template #label>
          I accept the <a href="#" @click.stop.prevent="onAction"> terms and conditions </a>
        </template>
      </ec-switch>

      <h3>Error - with multiline label text</h3>
      <ec-switch
        error-message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eos consequatur quas reiciendis aliquid ipsam ea pariatur dolorem, molestias maiores."
        class="tw-mb-24 tw-mt-12"
      >
        <template #label>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ullamcorper, tortor vitae elementum fringilla, risus leo hendrerit libero, vitae luctus nibh ex non neque. Duis id ligula eros.
        </template>
      </ec-switch>

      <h3>Disabled</h3>
      <ec-switch
        class="tw-mb-24 tw-mt-12"
        disabled
      >
        <template #label>
          I accept the <a href="#" @click.stop.prevent="onAction"> terms and conditions </a>
        </template>
      </ec-switch>

      <h3>Disabled - checked</h3>
      <ec-switch
        class="tw-mb-24 tw-mt-12"
        :model-value="true"
        disabled
      >
        <template #label>
          I accept the <a href="#" @click.stop.prevent="onAction"> terms and conditions </a>
        </template>
      </ec-switch>
    </div>
  `,
});

all.args = {
  label: 'I accept the terms and conditions',
  hasError: false,
  errorMessage: 'An error has occurred',
  disabled: false,
};
