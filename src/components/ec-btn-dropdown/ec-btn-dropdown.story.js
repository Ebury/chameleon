import EcBtnDropdown from './ec-btn-dropdown.vue';

export default {
  title: 'Button Dropdown',
  component: EcBtnDropdown,
  argTypes: {
    click: { action: 'clicked' },
    change: { action: 'change' },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    EcBtnDropdown,
  },
  template: `
  <div class="tw-m-24 tw-p-24 tw-flex tw-justify-center tw-bg-gray-0">
    <ec-btn-dropdown :items="items" @click="click" @change="change" :isDisabled="isDisabled" :buttonText="buttonText" />
  </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  items: [
    { value: 'Spot', text: 'Spot' },
    { value: 'Convert', text: 'Convert' },
  ],
  isDisabled: false,
  buttonText: 'Convert & Pay',
};

export const disabled = Template.bind({});

disabled.args = {
  items: [
    { value: 'Spot', text: 'Spot' },
    { value: 'Convert', text: 'Convert' },
  ],
  isDisabled: true,
  buttonText: 'Convert & Pay',
};

