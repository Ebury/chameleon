import Vue from 'vue';
import { mount, createLocalVue } from '@vue/test-utils';
import EcCurrencyInput from './ec-currency-input.vue';

describe('EcCurrencyInput', () => {
  const MockedEcPopover = Vue.extend({
    methods: {
      update: jest.fn(),
    },
    template: '<div data-popover-stub><slot /><slot name="popover" /></div>',
  });

  const currencies = [{ text: 'GBP' }, { text: 'EUR' }, { text: 'USD' }];

  function mountCurrencyInput(props, mountOpts) {
    const localVue = createLocalVue();

    return mount(EcCurrencyInput, {
      localVue,
      propsData: { ...props },
      stubs: { EcPopover: MockedEcPopover },
      ...mountOpts,
    });
  }

  it('should render properly', () => {
    const wrapper = mountCurrencyInput({
      currencies,
      value: {},
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
