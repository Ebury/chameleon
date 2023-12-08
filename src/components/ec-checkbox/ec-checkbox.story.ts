// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';
import { ref, toRefs, watchEffect } from 'vue';

import EcCheckbox from './ec-checkbox.vue';
import type { CheckboxProps } from './types';

export default {
  title: 'Checkbox',
  component: EcCheckbox,
} as Meta<typeof EcCheckbox>;

type EcCheckboxStory = StoryFn<typeof EcCheckbox>;
type StoryArgs = CheckboxProps & { hasError: boolean };

const Template: EcCheckboxStory = storyArgs => ({
  components: { EcCheckbox },
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
      <ec-checkbox v-bind="args" v-model="model" />
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
  components: { EcCheckbox },
  setup() {
    const checkbox1 = ref(false);
    const checkbox2 = ref(false);

    const {
      label,
      errorMessage,
      hasError,
      disabled,
    } = toRefs(storyArgs);

    return {
      checkbox1,
      checkbox2,
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
      <ec-checkbox class="tw-mb-24 tw-mt-12">
        <template #label>
          I accept the <a href="#" @click.stop.prevent="onAction"> terms and conditions </a>
        </template>
      </ec-checkbox>

      <h3>Not checked - with multiline label text</h3>
      <ec-checkbox class="tw-mb-24 tw-mt-12">
        <template #label>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ullamcorper, tortor vitae elementum fringilla, risus leo hendrerit libero, vitae luctus nibh ex non neque. Duis id ligula eros.
        </template>
      </ec-checkbox>

      <h3>Checked</h3>
      <ec-checkbox
        :model-value="true"
        class="tw-mb-24 tw-mt-12"
      >
        <template #label>
          I accept the <a href="#" @click.stop.prevent="onAction"> terms and conditions </a>
        </template>
      </ec-checkbox>

      <h3>Indeterminate</h3>
      <ec-checkbox
        indeterminate
        class="tw-mb-24 tw-mt-12"
      >
        <template #label>
          Select all
        </template>
      </ec-checkbox>

      <h3>Error</h3>
      <ec-checkbox
        class="tw-mb-24 tw-mt-12"
        error-message="An error has occurred"
      >
        <template #label>
          I accept the <a href="#" @click.stop.prevent="onAction"> terms and conditions </a>
        </template>
      </ec-checkbox>

      <h3>Error - with multiline label text</h3>
      <ec-checkbox
        error-message="Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eos consequatur quas reiciendis aliquid ipsam ea pariatur dolorem, molestias maiores."
        class="tw-mb-24 tw-mt-12"
      >
        <template #label>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ullamcorper, tortor vitae elementum fringilla, risus leo hendrerit libero, vitae luctus nibh ex non neque. Duis id ligula eros.
        </template>
      </ec-checkbox>

      <h3>Disabled</h3>
      <ec-checkbox
        class="tw-mb-24 tw-mt-12"
        disabled
      >
        <template #label>
          I accept the <a href="#" @click.stop.prevent="onAction"> terms and conditions </a>
        </template>
      </ec-checkbox>

      <h3>Disabled - checked</h3>
      <ec-checkbox
        class="tw-mb-24 tw-mt-12"
        :model-value="true"
        disabled
      >
        <template #label>
          I accept the <a href="#" @click.stop.prevent="onAction"> terms and conditions </a>
        </template>
      </ec-checkbox>

      <h3>Disabled - indeterminate</h3>
      <ec-checkbox
        class="tw-mb-24 tw-mt-12"
        indeterminate
        disabled
      >
        <template #label>
          Select all
        </template>
      </ec-checkbox>

      <h3>Label and Error messages coming from controls</h3>
      <ec-checkbox
        v-if="!hasError"
        v-model="checkbox1"
        class="tw-mb-24 tw-mt-12"
        :disabled="disabled"
        :label="label"
      />
      <ec-checkbox
        v-else="hasError"
        v-model="checkbox1"
        class="tw-mb-24 tw-mt-12"
        :disabled="disabled"
        :label="label"
        :error-message="errorMessage"
      />

      <h3>Label and Error messages coming from template</h3>
      <ec-checkbox
        v-if="!hasError"
        v-model="checkbox2"
        :disabled="disabled"
      >
        <template #label>
          I accept the <a href="#" @click.stop.prevent="onAction"> terms and conditions </a>
        </template>
      </ec-checkbox>
      <ec-checkbox
        v-else
        v-model="checkbox2"
        :disabled="disabled"
      >
        <template #label>
          I accept the <a href="#" @click.stop.prevent="onAction"> terms and conditions </a>
        </template>
        <template #error-message>
          An error has occurred
        </template>
      </ec-checkbox>
    </div>
  `,
});

all.args = {
  label: 'I accept the terms and conditions',
  hasError: false,
  errorMessage: 'An error has occurred',
  disabled: false,
};
