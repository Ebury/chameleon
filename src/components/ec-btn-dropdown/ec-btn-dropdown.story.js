import { action } from '@storybook/addon-actions';
import EcBtnDropdown from './ec-btn-dropdown.vue';

export default {
  title: 'Button Dropdown',
  component: EcBtnDropdown,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    EcBtnDropdown,
  },
  methods: {
    onClick: action('click'),
    onChange: action('change'),
  },
  template: `
    <div class="tw-m-24 tw-p-24 tw-flex tw-justify-center tw-bg-gray-2">
      <ec-btn-dropdown v-bind="$props" v-on="{ click: onClick, change: onChange }" />
    </div>
  `,
});

export const basic = Template.bind({});
basic.args = {
  isDisabled: false,
  buttonText: 'Convert & Pay',
  items: [
    { value: 'Spot', text: 'Spot' },
    { value: 'Convert', text: 'Convert' },
  ],
};

export const disabled = Template.bind({});
disabled.args = {
  ...basic.args,
  isDisabled: true,
};

