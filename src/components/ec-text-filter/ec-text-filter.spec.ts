import type { ComponentMountingOptions } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

import type { CVueWrapper } from '../../../tests/utils/global';
import EcTextFilter from './ec-text-filter.vue';
import type { TextFilterProps } from './types';
import { TextFilterEvent } from './types';

describe('EcTextFilter', () => {
  function mountComponent(props?: TextFilterProps, mountOpts?: ComponentMountingOptions<TextFilterProps>): CVueWrapper {
    return mount<TextFilterProps>(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      EcTextFilter as any,
      {
        props: {
          modelValue: 'Text test',
          ...props,
        },
        ...mountOpts,
      },
    ) as unknown as CVueWrapper;
  }

  function mountInputFieldAsTemplate(
    template: string,
    props: TextFilterProps,
    wrapperComponentOpts: Record<string, unknown>,
    mountOpts?: ComponentMountingOptions<TextFilterProps>,
  ) {
    const Component = defineComponent({
      components: { EcTextFilter },
      template,
      ...wrapperComponentOpts,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return mount<TextFilterProps, ComponentMountingOptions<TextFilterProps>>(Component as any, {
      props,
      ...mountOpts,
    }) as unknown as CVueWrapper;
  }

  it('should display properly with the given props', () => {
    const wrapper = mountComponent();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should set the v-model on the value of the input and change when it changes', async () => {
    const wrapper = mountInputFieldAsTemplate(
      '<ec-text-filter v-model="text" />',
      {},
      {
        data() {
          return { text: '' };
        },
      },
    );

    expect((wrapper.findByDataTest('ec-input-field__input').element as HTMLInputElement).value).toBe('');
    await wrapper.setData({ text: 'some text' });
    expect((wrapper.findByDataTest('ec-input-field__input').element as HTMLInputElement).value).toBe('some text');
  });

  it('should render close icon depends on modelValue', async () => {
    const wrapper = mountInputFieldAsTemplate(
      '<ec-text-filter v-model="text" />',
      {},
      {
        data() {
          return { text: '' };
        },
      },
    );

    expect((wrapper.findByDataTest('ec-input-field__input').element as HTMLInputElement).value).toBe('');
    expect(wrapper.findByDataTest('ec-input-field__icon-wrapper').exists()).toBe(false);

    await wrapper.setData({ text: 'some text' });

    expect(wrapper.findByDataTest('ec-input-field__icon-wrapper')).toMatchSnapshot();
  });

  it('should emit the value when you write on the input', async () => {
    const wrapper = mountInputFieldAsTemplate(
      '<ec-text-filter v-model="text" />',
      {},
      {
        data() {
          return { text: '' };
        },
      },
    );

    expect((wrapper.findByDataTest('ec-input-field__input').element as HTMLInputElement).value).toBe('');
    await wrapper.findByDataTest('ec-input-field__input').setValue('some text');
    expect(wrapper.findComponent(EcTextFilter).emitted()[TextFilterEvent.CHANGE]?.[0]).toEqual(['some text']);
  });

  it('should emit the empty value when you click on close icon', async () => {
    const wrapper = mountInputFieldAsTemplate(
      '<ec-text-filter v-model="text" />',
      {},
      {
        data() {
          return { text: 'some text' };
        },
      },
    );

    await wrapper.findByDataTest('ec-input-field__icon').trigger('click');
    expect(wrapper.findComponent(EcTextFilter).emitted()[TextFilterEvent.CHANGE]?.[0]).toEqual(['']);
  });

  it('should render with a sensitive class when isSensitive prop is set to true', () => {
    const wrapper = mountComponent({ inputProps: { isSensitive: true } });

    expect(wrapper.element).toMatchSnapshot();
  });
});
