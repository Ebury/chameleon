// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
// eslint-disable-next-line import/no-extraneous-dependencies
import storyRouter from 'storybook-vue3-router';

import {
  allAnchorsDark,
  allAnchorsLight,
  allButtonsDark,
  allButtonsLight,
  propsDark,
  propsLight,
} from '../../styles/components/ec-btn/ec-btn.story';
import { IconName } from '../ec-icon/icon-names';
import EcBtn from './ec-btn.vue';
import type { ButtonProps } from './types';
import { ButtonCategory, ButtonSize } from './types';

export default {
  title: 'Button',
  component: EcBtn,
  decorators: [storyRouter()],
  argTypes: {
    category: {
      options: ButtonCategory,
      control: { type: 'select' },
    },
    size: {
      options: ButtonSize,
      control: { type: 'select' },
    },
    icon: {
      options: IconName,
      control: { type: 'select' },
    },
    tag: {
      options: ['a', 'button'],
      control: { type: 'select' },
    },
  },
};

type StoryArgs = ButtonProps & { text: string };

const Template = ({ text, ...args }: StoryArgs) => ({
  components: { EcBtn },
  setup() {
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
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
basic.args = {
  text: 'Click Me',
  category: ButtonCategory.Primary,
  size: ButtonSize.Medium,
  isSubmit: false,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
basic.parameters = {
  visualRegressionTests: { disable: true },
};

export const all = ({
  text,
  loadingText,
  ...args
}: StoryArgs & { loadingText: string }) => ({
  components: { EcBtn },
  setup() {
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
            {{loadingText}}
          </template>
          {{text}}
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
          {{text}}
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
        >{{text}}</ec-btn>

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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ...basic.args,
  icon: 'simple-check',
  loadingText: '',
};

all.parameters = {
  visualRegressionTests: { disable: true },
};

export {
  allAnchorsDark,
  allAnchorsLight,
  allButtonsDark,
  allButtonsLight,
  propsDark,
  propsLight,
};
