import { mount, createLocalVue } from '@vue/test-utils';
import EcAmountInput from './ec-amount-input.vue';

describe('EcAmountInput', () => {
  function mountAmountInput(props, mountOpts) {
    return mount(EcAmountInput, {
      sync: false,
      propsData: {
        value: 0,
        ...props,
      },
      ...mountOpts,
    });
  }

  function mountAmountInputAsTemplate(template, mountOpts) {
    const localVue = createLocalVue();

    const Component = localVue.extend({
      components: { EcAmountInput },
      template,
      ...mountOpts,
    });

    return mount(Component, {
      sync: false,
      localVue,
    });
  }

  it('should render properly', () => {
    const wrapper = mountAmountInput();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should format the value and emit the event to change the v-model on the parent', async () => {
    const wrapper = mountAmountInput();
    wrapper.findByDataTest('ec-amount-input').setValue(222);
    await wrapper.vm.$nextTick();
    expect(wrapper.findByDataTest('ec-amount-input').element.value).toBe('222');
    wrapper.findByDataTest('ec-amount-input').setValue(1111.11);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('value-change').length).toEqual(2);
  });

  it('should format the number when we pass it by the v-model', async () => {
    const wrapper = mountAmountInputAsTemplate(
      '<ec-amount-input v-model="valueAmount" />',
      {
        data() {
          return {
            valueAmount: null,
          };
        },
      },
    );

    wrapper.setData({ valueAmount: 1111 });
    await wrapper.vm.$nextTick();
    expect(wrapper.findByDataTest('ec-amount-input').element.value).toBe('1,111');
  });

  it('should format the v-model when the isMasked is given', async () => {
    const wrapper = mountAmountInputAsTemplate(
      '<ec-amount-input v-model="valueAmount" :isMasked="isMasked" />',
      {
        data() {
          return {
            isMasked: true,
            valueAmount: null,
          };
        },
      },
    );
    wrapper.findByDataTest('ec-amount-input').setValue(1111);
    await wrapper.vm.$nextTick();
    expect(wrapper.findByDataTest('ec-amount-input').element.value).toBe('1,111');
    expect(wrapper.vm.valueAmount).toBe('1,111');
  });

  it('should format and unformat the v-model when the masked property changes', async () => {
    const wrapper = mountAmountInputAsTemplate(
      '<ec-amount-input v-model="valueAmount" :isMasked="isMasked" />',
      {
        data() {
          return {
            isMasked: true,
            valueAmount: null,
          };
        },
      },
    );
    wrapper.findByDataTest('ec-amount-input').setValue(1111);
    await wrapper.vm.$nextTick();
    expect(wrapper.findByDataTest('ec-amount-input').element.value).toBe('1,111');
    expect(wrapper.vm.valueAmount).toBe('1,111');

    wrapper.setData({ isMasked: false });
    await wrapper.vm.$nextTick();
    expect(wrapper.findByDataTest('ec-amount-input').element.value).toBe('1,111');
    expect(wrapper.vm.valueAmount).toBe(1111);

    wrapper.setData({ isMasked: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.findByDataTest('ec-amount-input').element.value).toBe('1,111');
    expect(wrapper.vm.valueAmount).toBe('1,111');
  });

  it('should format the number with the given locale', async () => {
    const wrapper = mountAmountInputAsTemplate(
      '<ec-amount-input v-model="valueAmount" :locale="locale" />',
      {
        data() {
          return {
            locale: 'es',
            valueAmount: null,
          };
        },
      },
    );
    wrapper.findByDataTest('ec-amount-input').setValue('1111,11');
    await wrapper.vm.$nextTick();
    expect(wrapper.findByDataTest('ec-amount-input').element.value).toBe('1.111,11');
    wrapper.setData({ locale: 'en' });
    await wrapper.vm.$nextTick();
    expect(wrapper.findByDataTest('ec-amount-input').element.value).toBe('1,111.11');
  });

  it('should format the number for currency without decimals', async () => {
    const wrapper = mountAmountInputAsTemplate(
      '<ec-amount-input v-model="valueAmount" locale="en" currency="JPY" />', {
        data() {
          return {
            valueAmount: null,
          };
        },
      },
    );
    expect(wrapper.findByDataTest('ec-amount-input').element.value).toBe('');
    wrapper.setData({ valueAmount: '1111.11' });
    await wrapper.vm.$nextTick();
    expect(wrapper.findByDataTest('ec-amount-input').element.value).toBe('1,111');
  });

  it('should remove existing decimals if currency changes to one without decimals', async () => {
    const wrapper = mountAmountInputAsTemplate(
      '<ec-amount-input v-model="valueAmount" locale="en" :currency="currency" />', {
        data() {
          return {
            currency: 'GBP',
            valueAmount: null,
          };
        },
      },
    );
    wrapper.setData({ valueAmount: 1111.11 });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.valueAmount).toBe(1111.11);
    expect(wrapper.findByDataTest('ec-amount-input').element.value).toBe('1,111.11');
    wrapper.setData({ currency: 'JPY' });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.valueAmount).toBe(1111);
    expect(wrapper.findByDataTest('ec-amount-input').element.value).toBe('1,111');
  });

  it('should allow typing only a negative sign into input', async () => {
    const wrapper = mountAmountInput();
    wrapper.findByDataTest('ec-amount-input').setValue('-');
    await wrapper.vm.$nextTick();
    expect(wrapper.findByDataTest('ec-amount-input').element.value).toBe('-');
  });

  it('should allow typing only a negative sign into input when there is v-model', async () => {
    const wrapper = mountAmountInputAsTemplate(
      '<ec-amount-input v-model="valueAmount" locale="en" />', {
        data() {
          return {
            valueAmount: null,
          };
        },
      },
    );

    wrapper.findByDataTest('ec-amount-input').setValue('-');
    await wrapper.vm.$nextTick();
    expect(wrapper.findByDataTest('ec-amount-input').element.value).toBe('-');
    expect(wrapper.vm.valueAmount).toBeNaN();
  });

  it('should allow to reset the value from the v-model', async () => {
    const wrapper = mountAmountInputAsTemplate(
      '<ec-amount-input v-model="valueAmount" locale="en" />', {
        data() {
          return {
            valueAmount: null,
          };
        },
      },
    );

    expect(wrapper.findByDataTest('ec-amount-input').element.value).toBe('');
    expect(wrapper.vm.valueAmount).toBe(null);

    wrapper.findByDataTest('ec-amount-input').setValue('2.11');
    await wrapper.vm.$nextTick();
    expect(wrapper.findByDataTest('ec-amount-input').element.value).toBe('2.11');
    expect(wrapper.vm.valueAmount).toBe(2.11);

    wrapper.findByDataTest('ec-amount-input').setValue('');
    await wrapper.vm.$nextTick();
    expect(wrapper.findByDataTest('ec-amount-input').element.value).toBe('');
    expect(wrapper.vm.valueAmount).toBe(null);
  });
});
