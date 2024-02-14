import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';
import { vueRouter } from 'storybook-vue3-router';

import EcBtnDropdown from './ec-btn-dropdown.vue';
import type { BtnDropdownProps } from './types';

export default {
  title: 'Button Dropdown',
  component: EcBtnDropdown,
  decorators: [vueRouter([
    {
      path: '/',
      name: 'root',
      component: { template: '<div></div>' },
    },
    {
      path: '/link1',
      name: 'link1',
      component: { template: '<div></div>' },
    },
  ])],
} as Meta;

type EcBtnDropdownStory = StoryFn<BtnDropdownProps>;

const Template: EcBtnDropdownStory = args => ({
  components: {
    EcBtnDropdown,
  },
  setup() {
    return {
      args,
      onClick: action('click'),
      onChange: action('change'),
    };
  },
  template: `
    <div class="tw-m-24 tw-p-24 tw-flex tw-justify-center tw-bg-gray-2">
      <ec-btn-dropdown v-bind="args" v-on="{ click: onClick, change: onChange }" />
    </div>
  `,
});

export const basic = Template.bind({});
basic.args = {
  isBtnDropdownDisabled: false,
  buttonText: 'Convert & Pay',
  items: [
    { value: 'Spot', text: 'Spot' },
    { value: 'Convert', text: 'Convert' },
  ],
};

export const disabled = Template.bind({});
disabled.args = {
  ...basic.args,
  isBtnDropdownDisabled: true,
};

export const buttonLinks = Template.bind({});
buttonLinks.args = {
  isBtnDropdownDisabled: false,
  buttonText: 'Button links',
  items: [
    {
      to: {
        name: 'link1',
      },
      attrs: {},
      value: 'link1',
      text: 'Link1',
      disabled: false,
      disabledReason: '',
    },
    {
      href: '/link2/',
      value: 'link2',
      text: 'Link2',
      disabled: false,
      disabledReason: '',
    },
  ],
};

export const onlySomeButtonLinksDisabled = Template.bind({});
onlySomeButtonLinksDisabled.args = {
  isBtnDropdownDisabled: false,
  buttonText: 'Button links',
  items: [
    {
      to: {
        name: 'link1',
      },
      attrs: {},
      value: 'link1',
      text: 'Link1',
      disabled: true,
      disabledReason: 'This link is disabled',
    },
    {
      href: '/link2/',
      value: 'link2',
      text: 'Link2',
      disabled: false,
      disabledReason: '',
    },
    {
      href: '/link3/',
      value: 'link3',
      text: 'Link3',
      disabled: false,
      disabledReason: '',
    },
  ],
};

export const allButtonLinksDisabled = Template.bind({});
allButtonLinksDisabled.args = {
  isBtnDropdownDisabled: true,
  buttonText: 'Button links',
  items: [
    {
      to: {
        name: 'link1',
      },
      attrs: {},
      value: 'link1',
      text: 'Link1',
      disabled: true,
      disabledReason: 'Link1 is disabled',
    },
    {
      href: '/link2/',
      value: 'link2',
      text: 'Link2',
      disabled: true,
      disabledReason: 'Link2 is disabled',
    },
  ],
};
