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
      sync: false,
      localVue,
      propsData: {
        currencies,
        value: {},
        ...props,
      },
      stubs: { EcPopover: MockedEcPopover },
      ...mountOpts,
    });
  }

  function mountCurrencyInputAsTemplate(template, props, mountOpts) {
    const localVue = createLocalVue();

    const Component = localVue.extend({
      components: { EcCurrencyInput },
      template,
    });

    return mount(Component, {
      sync: false,
      localVue,
      propsData: { ...props },
      stubs: { EcPopover: MockedEcPopover },
      ...mountOpts,
    });
  }

  it('should render properly', () => {
    const wrapper = mountCurrencyInput();

    expect(wrapper.element).toMatchSnapshot();
  });

  describe(':props', () => {
    it('should render the label when the label  is given', () => {
      const wrapper = mountCurrencyInput({ label: 'Currency Input' });
      expect(wrapper.findByDataTest('ec-currency-input__label-text').exists()).toBe(true);
    });

    it('should render the note when the note  is given', () => {
      const wrapper = mountCurrencyInput({ note: 'max 80 chars' });
      expect(wrapper.findByDataTest('ec-currency-input__note').exists()).toBe(true);
    });

    it('should render the error when the errorMessage is given', () => {
      const wrapper = mountCurrencyInput({ errorMessage: 'Random message' });

      expect(wrapper.find('.ec-currency-input__currencies .ec-input-field__input--has-error').exists()).toBe(true);
      expect(wrapper.find('.ec-currency-input__amount .ec-input-field__input--has-error').exists()).toBe(true);
      expect(wrapper.findByDataTest('ec-currency-input__error-text').exists()).toBe(true);
    });

    it('should render without any currencies if the currencies prop is empty', () => {
      const wrapper = mountCurrencyInput({ currencies: [] });
      expect(wrapper.findByDataTest('ec-dropdown-search__no-items').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@events', () => {
    it('should emit change event when an item is selected', () => {
      const wrapper = mountCurrencyInput();

      selectItem(wrapper, 1);
      // expect(wrapper.emitted('change').length).toEqual(1);
    });

    it('should emit change event when amount is set', () => {
      // const wrapper = mountCurrencyInput();

      // type data to the input
      // expect(wrapper.emitted('change').length).toEqual(1);
    });
  });

  describe('v-model', () => {
    it('should use the v-model with the currency and emit the changes', () => {
      const wrapper = mountCurrencyInputAsTemplate(
        '<ec-currency-input :currencies="currencies" v-model="value" />',
        {},
        {
          data() {
            return { currencies, value: { currency: {} } };
          },
        },
      );

      // expect(wrapper.emitted('change').length).toEqual(0);
      selectItem(wrapper, 0);
      // expect(wrapper.emitted('change').length).toEqual(1);
      expect(wrapper.vm.value.currency).toEqual(currencies[0]);
      selectItem(wrapper, 1);
      // expect(wrapper.emitted('change').length).toEqual(2);
      expect(wrapper.vm.value.currency).toEqual(currencies[1]);
    });

    it('should use the v-model with the amount and emit the changes', () => {
      const wrapper = mountCurrencyInputAsTemplate(
        '<ec-currency-input :currencies="currencies" v-model="value" />',
        {},
        {
          data() {
            return { currencies, value: { } };
          },
        },
      );

      // expect(wrapper.emitted('change').length).toEqual(1);
      wrapper.setData({ value: { amount: 11 } });
      expect(wrapper.vm.value.amount).toEqual(11);

      expect(wrapper.element).toMatchSnapshot();
    });
  });
});

function selectItem(wrapper, index) {
  wrapper.findAll('.ec-dropdown-search__item').at(index).trigger('click');
}
