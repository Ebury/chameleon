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

  it('should format the value and emit the event to change the v-model on the parent', () => {
    const wrapper = mountAmountInput();
    wrapper.find('input').setValue(222);
    expect(wrapper.find('input').element.value).toBe('222');
    wrapper.find('input').setValue(1111.11);
    expect(wrapper.find('input').element.value).toBe('1,111.11');
  });

  it('should formatted the number when we pass it by the v-model', async () => {
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
    expect(wrapper.find('input').element.value).toBe('1,111');
  });

  it('should not format the v-model when the masked is given', async () => {
    const wrapper = mountAmountInputAsTemplate(
      '<ec-amount-input v-model="valueAmount" :masked="masked" />',
      {
        data() {
          return {
            masked: true,
            valueAmount: null,
          };
        },
      },
    );
    wrapper.find('input').setValue(1111);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('input').element.value).toBe('1,111');
    expect(wrapper.vm.valueAmount).toBe('1,111');
  });

  it('should format and unformat the v-model watching the masked property', async () => {
    const wrapper = mountAmountInputAsTemplate(
      '<ec-amount-input v-model="valueAmount" :masked="masked" />',
      {
        data() {
          return {
            masked: true,
            valueAmount: null,
          };
        },
      },
    );
    wrapper.find('input').setValue(1111);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('input').element.value).toBe('1,111');
    expect(wrapper.vm.valueAmount).toBe('1,111');

    wrapper.setData({ masked: false });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('input').element.value).toBe('1,111');
    expect(wrapper.vm.valueAmount).toBe(1111);

    wrapper.setData({ masked: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('input').element.value).toBe('1,111');
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
    wrapper.find('input').setValue('1111,11');
    expect(wrapper.find('input').element.value).toBe('1.111,11');
    wrapper.setData({ locale: 'en' });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('input').element.value).toBe('1,111.11');
  });
});

