import EcBtnDropdown from './ec-btn-dropdown.vue';

export default {
  title: 'ButtonDropdown',
  component: EcBtnDropdown,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    EcBtnDropdown,
  },
  template: `
  <div class="tw-m-24 tw-p-24 tw-flex tw-justify-center tw-bg-gray-0">
    <ec-btn-dropdown :itemsDropdown="items" :isDisabled="isDisabled">
      Convert & Pay
    </ec-btn-dropdown>
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
};

export const disabled = Template.bind({});

disabled.args = {
  items: [
    { value: 'Spot', text: 'Spot' },
    { value: 'Convert', text: 'Convert' },
  ],
  isDisabled: true,
};

