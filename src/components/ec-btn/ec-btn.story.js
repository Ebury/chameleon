import { action } from '@storybook/addon-actions';
import storyRouter from 'storybook-vue3-router';

import {
  allAnchorsDark, allAnchorsLight, allButtonsDark, allButtonsLight, propsDark, propsLight,
} from '../../styles/components/ec-btn/ec-btn.story';
import EcBtn from './ec-btn.vue';

export default {
  title: 'Button',
  component: EcBtn,
  decorators: [storyRouter()],
  argTypes: {
    category: {
      options: ['primary', 'secondary', 'success', 'error', 'warning'],
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md'],
      control: { type: 'select' },
    },
    icon: {
      options: ['simple-check', 'simple-download'],
      control: { type: 'select' },
    },
    tag: {
      options: ['a', 'button'],
      control: { type: 'select' },
    },
  },
};

const Template = ({ text, ...args }) => ({
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
basic.args = {
  text: 'Click Me',
  category: 'primary',
  size: 'md',
  isSubmit: false,
};

basic.parameters = {
  visualRegressionTests: { disable: true },
};

export const all = ({
  text,
  loadingText,
  ...args
}) => ({
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
