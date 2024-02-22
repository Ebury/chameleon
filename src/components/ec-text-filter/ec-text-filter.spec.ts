import fakeTimers, { type InstalledClock } from '@sinonjs/fake-timers';
import type { ComponentMountingOptions } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

import EcTextFilter from './ec-text-filter.vue';
import type { TextFilterProps } from './types';
import { TextFilterEvent } from './types';

describe('EcTextFilter', () => {
  let clock: InstalledClock;

  beforeEach(() => {
    clock = fakeTimers.install();
  });

  afterEach(() => {
    if (clock) {
      clock.uninstall();
    }
  });

  function mountEcTextFilter(props?: TextFilterProps, mountOpts?: ComponentMountingOptions<typeof EcTextFilter>) {
    return mount(
      EcTextFilter,
      {
        props: {
          modelValue: 'Text test',
          ...props,
        },
        ...mountOpts,
      },
    );
  }

  it('should display properly with the given props', () => {
    const wrapper = mountEcTextFilter();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should set the v-model on the value of the input and change when it changes', async () => {
    const Component = defineComponent({
      components: { EcTextFilter },
      data() {
        return { text: '' };
      },
      template: '<ec-text-filter v-model="text" />',
    });

    const wrapper = mount(Component);

    expect((wrapper.findByDataTest<HTMLInputElement>('ec-input-field__input').element).value).toBe('');
    await wrapper.setData({ text: 'some text' });
    expect((wrapper.findByDataTest<HTMLInputElement>('ec-input-field__input').element).value).toBe('some text');
  });

  it('should render close icon depends on modelValue', async () => {
    const Component = defineComponent({
      components: { EcTextFilter },
      data() {
        return { text: '' };
      },
      template: '<ec-text-filter v-model="text" />',
    });

    const wrapper = mount(Component);

    expect((wrapper.findByDataTest<HTMLInputElement>('ec-input-field__input').element).value).toBe('');
    expect(wrapper.findByDataTest('ec-input-field__icon-wrapper').exists()).toBe(false);

    await wrapper.setData({ text: 'some text' });

    expect(wrapper.findByDataTest('ec-input-field__icon-wrapper')).toMatchSnapshot();
  });

  it('should emit the value when you write on the input', async () => {
    const Component = defineComponent({
      components: { EcTextFilter },
      data() {
        return { text: '' };
      },
      template: '<ec-text-filter v-model="text" />',
    });

    const wrapper = mount(Component);

    expect((wrapper.findByDataTest<HTMLInputElement>('ec-input-field__input').element).value).toBe('');
    await wrapper.findByDataTest('ec-input-field__input').setValue('some text');
    clock.tick(300);
    expect(wrapper.findComponent(EcTextFilter).emitted()[TextFilterEvent.CHANGE]?.[0]).toEqual(['some text']);
    expect(wrapper.findComponent(EcTextFilter).emitted()[TextFilterEvent.UPDATE_MODEL_VALUE]?.[0]).toEqual(['some text']);
  });

  it('should emit the value when you write on the input corresponding to debounceTime', async () => {
    const Component = defineComponent({
      components: { EcTextFilter },
      data() {
        return { text: '' };
      },
      template: '<ec-text-filter v-model="text" :debounceTime="20"/>',
    });

    const wrapper = mount(Component);

    expect((wrapper.findByDataTest<HTMLInputElement>('ec-input-field__input').element).value).toBe('');
    await wrapper.findByDataTest('ec-input-field__input').setValue('some text');
    clock.tick(20);
    expect(wrapper.findComponent(EcTextFilter).emitted()[TextFilterEvent.CHANGE]?.[0]).toEqual(['some text']);
    expect(wrapper.findComponent(EcTextFilter).emitted()[TextFilterEvent.UPDATE_MODEL_VALUE]?.[0]).toEqual(['some text']);
  });

  it('should emit the empty value when you click on close icon', async () => {
    const Component = defineComponent({
      components: { EcTextFilter },
      data() {
        return { text: 'some text' };
      },
      template: '<ec-text-filter v-model="text" />',
    });

    const wrapper = mount(Component);

    await wrapper.findByDataTest('ec-input-field__icon').trigger('click');
    expect(wrapper.findComponent(EcTextFilter).emitted()[TextFilterEvent.CHANGE]?.[0]).toEqual(['']);
    expect(wrapper.findComponent(EcTextFilter).emitted()[TextFilterEvent.UPDATE_MODEL_VALUE]?.[0]).toEqual(['']);
  });

  it('should render with a sensitive class when isSensitive prop is set to true', () => {
    const wrapper = mountEcTextFilter({ inputProps: { isSensitive: true } });

    expect(wrapper.element).toMatchSnapshot();
  });
});
