import { type ComponentMountingOptions, mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

import EcAmountInput from './ec-amount-input.vue';
import type { AmountInputProps } from './types';

describe('EcAmountInput', () => {
  function mountAmountInput(props?: AmountInputProps, mountOpts?: ComponentMountingOptions<typeof EcAmountInput>) {
    return mount(EcAmountInput, {
      props: {
        modelValue: 0,
        ...props,
      },
      ...mountOpts,
    });
  }

  it('should render properly', () => {
    const wrapper = mountAmountInput();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with a sensitive class when isSensitive prop is set to true', () => {
    const wrapper = mountAmountInput({ isSensitive: true });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with custom attributes', () => {
    const wrapper = mountAmountInput({}, {
      attrs: {
        'data-test': 'my-data-test',
        class: 'my-class',
        id: 'test-id',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should format the number when we pass it via the v-model', async () => {
    const Component = defineComponent({
      components: { EcAmountInput },
      data() {
        return {
          valueAmount: null,
        };
      },
      template: '<ec-amount-input v-model="valueAmount" />',
    });

    const wrapper = mount(Component);
    await wrapper.setData({ valueAmount: 1111 });
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('1,111');
  });

  it('should format the v-model when the isMasked prop is given', async () => {
    const Component = defineComponent({
      components: { EcAmountInput },
      data() {
        return {
          valueAmount: null,
        };
      },
      template: '<ec-amount-input v-model="valueAmount" is-masked />',
    });

    const wrapper = mount(Component);
    await wrapper.findByDataTest('ec-amount-input').setValue(1111);
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('1,111');
    expect(wrapper.vm.valueAmount).toBe('1,111');

    await wrapper.setData({ valueAmount: null });
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('');
    expect(wrapper.vm.valueAmount).toBe('');

    await wrapper.setData({ valueAmount: '2222' });
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('2,222');
    expect(wrapper.vm.valueAmount).toBe('2,222');

    await wrapper.setData({ valueAmount: 3333 });
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('');
    expect(wrapper.vm.valueAmount).toBe('');
  });

  it('should format and unformat the v-model when the masked property changes', async () => {
    const Component = defineComponent({
      components: { EcAmountInput },
      data() {
        return {
          isMasked: true,
          valueAmount: null,
        };
      },
      template: '<ec-amount-input v-model="valueAmount" :is-masked="isMasked" />',
    });

    const wrapper = mount(Component);
    await wrapper.findByDataTest('ec-amount-input').setValue(1111);
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('1,111');
    expect(wrapper.vm.valueAmount).toBe('1,111');

    await wrapper.setData({ isMasked: false });
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('1,111');
    expect(wrapper.vm.valueAmount).toBe(1111);

    await wrapper.setData({ isMasked: true });
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('1,111');
    expect(wrapper.vm.valueAmount).toBe('1,111');
  });

  it('should format the number with the given locale', async () => {
    const Component = defineComponent({
      components: { EcAmountInput },
      data() {
        return {
          locale: 'es',
          valueAmount: null,
        };
      },
      template: '<ec-amount-input v-model="valueAmount" :locale="locale" />',
    });

    const wrapper = mount(Component);
    await wrapper.findByDataTest('ec-amount-input').setValue('1111,11');
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('1.111,11');
    await wrapper.setData({ locale: 'en' });
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('1,111.11');
  });

  it('should format the number for a currency without decimals', async () => {
    const Component = defineComponent({
      components: { EcAmountInput },
      data() {
        return {
          valueAmount: null,
        };
      },
      template: '<ec-amount-input v-model="valueAmount" locale="en" currency="JPY" />',
    });

    const wrapper = mount(Component);
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('');
    await wrapper.setData({ valueAmount: '1111.11' });
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('1,111');
  });

  it('should remove existing decimals if currency changes to one without decimals', async () => {
    const Component = defineComponent({
      components: { EcAmountInput },
      data() {
        return {
          currency: 'GBP',
          valueAmount: null,
        };
      },
      template: '<ec-amount-input v-model="valueAmount" locale="en" :currency="currency" />',
    });

    const wrapper = mount(Component);
    await wrapper.setData({ valueAmount: 1111.11 });
    expect(wrapper.vm.valueAmount).toBe(1111.11);
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('1,111.11');

    await wrapper.setData({ currency: 'JPY' });
    expect(wrapper.vm.valueAmount).toBe(1111);
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('1,111');
  });

  it('should allow typing only a negative sign into input', async () => {
    const wrapper = mountAmountInput();
    await wrapper.findByDataTest('ec-amount-input').setValue('-');
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('-');
  });

  it('should allow typing only a negative sign into input when there is v-model', async () => {
    const Component = defineComponent({
      components: { EcAmountInput },
      data() {
        return {
          valueAmount: null,
        };
      },
      template: '<ec-amount-input v-model="valueAmount" locale="en" />',
    });

    const wrapper = mount(Component);

    await wrapper.findByDataTest('ec-amount-input').setValue('-');
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('-');
    expect(wrapper.vm.valueAmount).toBe(null);
  });

  it('should allow typing only a negative sign into the masked input when there is v-model', async () => {
    const Component = defineComponent({
      components: { EcAmountInput },
      data() {
        return {
          valueAmount: null,
        };
      },
      template: '<ec-amount-input v-model="valueAmount" is-masked locale="en" />',
    });

    const wrapper = mount(Component);

    await wrapper.findByDataTest('ec-amount-input').setValue('-');
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('-');
    expect(wrapper.vm.valueAmount).toBe('-');
  });

  it('should allow to reset the value from the v-model', async () => {
    const Component = defineComponent({
      components: { EcAmountInput },
      data() {
        return {
          valueAmount: null,
        };
      },
      template: '<ec-amount-input v-model="valueAmount" locale="en" />',
    });

    const wrapper = mount(Component);

    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('');
    expect(wrapper.vm.valueAmount).toBe(null);

    await wrapper.findByDataTest('ec-amount-input').setValue('2.11');
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('2.11');
    expect(wrapper.vm.valueAmount).toBe(2.11);

    await wrapper.findByDataTest('ec-amount-input').setValue('');
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('');
    expect(wrapper.vm.valueAmount).toBe(null);
  });

  it('should allow to reset the value from the v-model when masked', async () => {
    const Component = defineComponent({
      components: { EcAmountInput },
      data() {
        return {
          valueAmount: null,
        };
      },
      template: '<ec-amount-input v-model="valueAmount" is-masked locale="en" />',
    });

    const wrapper = mount(Component);
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('');
    expect(wrapper.vm.valueAmount).toBe(null);

    await wrapper.findByDataTest('ec-amount-input').setValue('2.11');
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('2.11');
    expect(wrapper.vm.valueAmount).toBe('2.11');

    await wrapper.findByDataTest('ec-amount-input').setValue('');
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('');
    expect(wrapper.vm.valueAmount).toBe('');
  });

  it('should ignore NaN values passed via value prop', () => {
    const wrapper = mountAmountInput({
      modelValue: NaN,
    });
    expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('');
  });

  describe('@update:modelValue event', () => {
    it('should format the value and emit the event to change the v-model on the parent', async () => {
      const wrapper = mountAmountInput();
      await wrapper.findByDataTest('ec-amount-input').setValue(222);
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-amount-input').element.value).toBe('222');

      await wrapper.findByDataTest('ec-amount-input').setValue(1111.11);
      expect(wrapper.emitted('update:modelValue')).toEqual([
        [222],
        [1111.11],
      ]);
    });

    it('should not emit an event if unmasked and the unformatted value is NaN (negative sign)', async () => {
      const wrapper = mountAmountInput();
      await wrapper.findByDataTest('ec-amount-input').setValue('-');
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });

    it('should not emit an event if unmasked and the unformatted value is NaN (decimals)', async () => {
      const wrapper = mountAmountInput();
      await wrapper.findByDataTest('ec-amount-input').setValue('.');
      expect(wrapper.emitted('update:modelValue')).toBeUndefined();
    });

    it('should not emit an event if unmasked and the unformatted value is not changing as user types', async () => {
      const wrapper = mountAmountInput();
      await wrapper.findByDataTest('ec-amount-input').setValue('-');
      await wrapper.findByDataTest('ec-amount-input').setValue('-1');
      await wrapper.findByDataTest('ec-amount-input').setValue('-1.');
      await wrapper.findByDataTest('ec-amount-input').setValue('-1.0');
      await wrapper.findByDataTest('ec-amount-input').setValue('-1.0a'); // invalid character
      await wrapper.findByDataTest('ec-amount-input').setValue('-1.01');
      await wrapper.findByDataTest('ec-amount-input').setValue('-1.011'); // invalid character - currency only supports 2 decimals
      await wrapper.findByDataTest('ec-amount-input').setValue('-1.02');

      expect(wrapper.emitted('update:modelValue')).toEqual([
        [-1],
        [-1.01],
        [-1.02],
      ]);
    });

    it('should emit for each valid character that user types if masked', async () => {
      const wrapper = mountAmountInput({
        modelValue: '',
        isMasked: true,
      });
      await wrapper.findByDataTest('ec-amount-input').setValue('-');
      await wrapper.findByDataTest('ec-amount-input').setValue('-1');
      await wrapper.findByDataTest('ec-amount-input').setValue('-1.');
      await wrapper.findByDataTest('ec-amount-input').setValue('-1.0');
      await wrapper.findByDataTest('ec-amount-input').setValue('-1.0a'); // invalid character
      await wrapper.findByDataTest('ec-amount-input').setValue('-1.01');
      await wrapper.findByDataTest('ec-amount-input').setValue('-1.011'); // invalid character - currency only supports 2 decimals
      await wrapper.findByDataTest('ec-amount-input').setValue('-1.02');

      expect(wrapper.emitted('update:modelValue')).toEqual([
        ['-'],
        ['-1'],
        ['-1.'],
        ['-1.0'],
        ['-1.01'],
        ['-1.02'],
      ]);
    });
  });
});
