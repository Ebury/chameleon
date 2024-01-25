
import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';
import { vueRouter } from 'storybook-vue3-router';
import { ref, watchEffect } from 'vue';

import { IconName } from '../ec-icon/icon-names';
import EcBtn from './ec-btn.vue';
import { ButtonCategory, type ButtonProps, ButtonSize } from './types';

export default {
  title: 'Button',
  component: EcBtn,
  decorators: [vueRouter()],
  argTypes: {
    category: {
      options: Object.values(ButtonCategory),
      control: { type: 'select' },
    },
    size: {
      options: Object.values(ButtonSize),
      control: { type: 'select' },
    },
    icon: {
      options: Object.values(IconName),
      control: { type: 'select' },
    },
    tag: {
      options: ['a', 'button'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof EcBtn>;

type StoryArgs = ButtonProps & { text: string };

const Template: StoryFn<StoryArgs> = storyArgs => ({
  components: { EcBtn },
  setup() {
    const text = ref('');
    const args = ref({});

    watchEffect(() => {
      const { text: textFromArgs, ...rest } = storyArgs;
      text.value = textFromArgs;
      args.value = rest;
    });

    return {
      onClick: action('click'),
      text,
      args,
    };
  },
  template: `
    <div class="tw-p-24 tw-text-center">
      <ec-btn v-bind="args" v-on="{ click: onClick }">{{ text }}</ec-btn>
    </div>
  `,
});

export const basic = Template.bind({});
basic.args = {
  text: 'Click Me',
  category: ButtonCategory.Primary,
  size: ButtonSize.Medium,
  isSubmit: false,
};

basic.parameters = {
  visualRegressionTests: { disable: true },
};

export const all: StoryFn<StoryArgs & { loadingText: string }> = storyArgs => ({
  components: { EcBtn },
  setup() {
    const text = ref('');
    const loadingText = ref('');
    const args = ref({});

    watchEffect(() => {
      const {
        text: textFromArgs,
        loadingText: loadingTextFromArgs,
        ...rest
      } = storyArgs;
      text.value = textFromArgs;
      loadingText.value = loadingTextFromArgs;
      args.value = rest;
    });

    return {
      args,
      text,
      loadingText,
      onClick: action('click'),
    };
  },
  template: `
    <div class="tw-m-20">
      <h3>Button tag *</h3>

      <ec-btn
        v-bind="args"
        class="tw-mt-20"
        @click="onClick"
      >
        <template v-if="loadingText" #loading-text>
          {{ loadingText }}
        </template>
        {{ text }}
      </ec-btn>

      <ec-btn
        v-if="args.icon"
        v-bind="args"
        class="tw-ml-20 tw-mt-20"
        @click="onClick"
      />

      <h3 class="tw-mt-20">Router link</h3>
      <ec-btn
        v-bind="{ ...args, to: '/my/url/' }"
        class="tw-mt-20"
        @click="onClick"
      >
        {{ text }}
      </ec-btn>

      <ec-btn
        v-if="args.icon"
        v-bind="{ ...args, to: '/my/url/' }"
        class="tw-ml-20 tw-mt-20"
        @click="onClick"
      />

      <h3 class="tw-mt-20">Anchor link - a tag</h3>

      <ec-btn
        v-bind="{ ...args, href: 'https://ebury.com' }"
        class="tw-mt-20"
        @click.prevent.stop="onClick"
      >{{ text }}</ec-btn>

      <ec-btn
        v-if="args.icon"
        v-bind="{ ...args, href: 'https://ebury.com' }"
        class="tw-ml-20 tw-mt-20"
        @click.prevent.stop="onClick"
      />

      <p class="tw-mt-40"> * Disabled and loading states apply only to buttons.</p>
      <p> ** Custom loader text will replace the spinner loader if set.</p>
      <p> *** Reverse cannot be combined with an outline.</p>
    </div>
  `,
});

all.argTypes = {
  isReverse: {
    name: 'isReverse ***',
  },
  isDisabled: {
    name: 'isDisabled *',
  },
  isLoading: {
    name: 'isLoading *',
  },
  loadingText: {
    name: 'loadingText **',
  },
};

all.args = {
  ...basic.args,
  icon: IconName.SimpleCheck,
  loadingText: '',
};

all.parameters = {
  visualRegressionTests: { disable: true },
};
