import type { ComponentMountingOptions } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { defineComponent } from 'vue';

import { EcTooltipDirectiveMock } from '../../../tests/mocks/ec-tooltip.mock';
import { IconName } from '../ec-icon/icon-names';
import { IconType } from '../ec-icon/types';
import EcInputField from './ec-input-field.vue';
import type { InputFieldProps } from './types';
import { InputFieldEvent, InputFieldType } from './types';

describe('EcInputField', () => {
  function mountInputField(props?: InputFieldProps, mountOpts?: ComponentMountingOptions<typeof EcInputField>) {
    return mount(
      EcInputField,
      {
        props: {
          modelValue: 'Text test',
          type: InputFieldType.TEXT,
          errorMessage: '',
          label: 'label test',
          note: 'note test',
          labelTooltip: '',
          ...props,
        },
        ...mountOpts,
      },
    );
  }

  it('should display properly with the given props', () => {
    const wrapper = mountInputField();
    expect(wrapper.findByDataTest('ec-input-field__input').attributes('autocomplete')).toBe(undefined);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders properly with the given prop bgColorLevel', () => {
    const wrapper = mountInputField({ bgColorLevel: 6 });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders properly with the given prop autocomplete OFF', () => {
    const wrapper = mountInputField({ autocomplete: 'off' });
    expect(wrapper.findByDataTest('ec-input-field__input').attributes('autocomplete')).toBe('off');
  });

  it('renders properly with the given prop autocomplete ON', () => {
    const wrapper = mountInputField({ autocomplete: 'on' });
    expect(wrapper.findByDataTest('ec-input-field__input').attributes('autocomplete')).toBe('on');
  });

  it('renders properly with the given prop errorMessage', () => {
    const wrapper = mountInputField({ errorMessage: 'error msg' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders properly without the error when the prop errorMessage is given and the isInGroup prop is not empty', () => {
    const wrapper = mountInputField({ errorMessage: 'error msg', isInGroup: 'right' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders properly with the id from the parent', () => {
    const wrapper = mountInputField({ id: 'id-test' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders properly with the errorId from the parent', () => {
    const wrapper = mountInputField({
      errorId: 'error-id-test',
      errorMessage: 'Test error message',
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders properly without label', () => {
    const wrapper = mountInputField({ label: '' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders properly without note', () => {
    const wrapper = mountInputField({ note: '' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders with the attrs min and max', () => {
    const wrapper = mountInputField({ type: InputFieldType.NUMBER }, {
      attrs: {
        min: 5,
        max: 10,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('works with the same listeners as the input', () => {
    const event = vi.fn();
    const wrapper = mountInputField(
      {},
      {
        attrs: {
          onClick: event,
        },
      },
    );

    wrapper.findByDataTest('ec-input-field__input').trigger('click');
    expect(event).toHaveBeenCalledTimes(1);
  });

  it('should set the v-model on the value of the input and change when it changes', async () => {
    const Component = defineComponent({
      components: { EcInputField },
      data() {
        return { text: '' };
      },
      template: '<ec-input-field v-model="text" type="text" />',
    });

    const wrapper = mount(Component);

    expect((wrapper.findByDataTest<HTMLInputElement>('ec-input-field__input').element).value).toBe('');
    await wrapper.setData({ text: 'some text' });
    expect((wrapper.findByDataTest<HTMLInputElement>('ec-input-field__input').element).value).toBe('some text');
  });

  it('should set the v-model on the value of the input when type is "tel" and change when it changes', async () => {
    const Component = defineComponent({
      components: { EcInputField },
      data() {
        return { text: '' };
      },
      template: '<ec-input-field v-model="text" type="tel" />',
    });

    const wrapper = mount(Component);

    expect((wrapper.findByDataTest<HTMLInputElement>('ec-input-field__input').element).value).toBe('');
    await wrapper.setData({ text: '123456789' });
    expect((wrapper.findByDataTest<HTMLInputElement>('ec-input-field__input').element).value).toBe('123456789');
  });

  it('should emit the value when you write on the input', async () => {
    const Component = defineComponent({
      components: { EcInputField },
      data() {
        return { text: '' };
      },
      template: '<ec-input-field v-model="text" type="text" />',
    });

    const wrapper = mount(Component);

    expect((wrapper.findByDataTest<HTMLInputElement>('ec-input-field__input').element).value).toBe('');
    await wrapper.findByDataTest('ec-input-field__input').setValue('some text');
    expect(wrapper.findComponent(EcInputField).emitted()[InputFieldEvent.UPDATE_MODEL_VALUE]?.[0]).toEqual(['some text']);
    expect((wrapper.findByDataTest<HTMLInputElement>('ec-input-field__input').element).value).toBe('some text');
  });

  it('should emit an event when we click on the icon', () => {
    const wrapper = mountInputField({ icon: IconName.SIMPLE_CHECK });

    wrapper.findByDataTest('ec-input-field__icon')
      .trigger('click');

    expect(wrapper.emitted(InputFieldEvent.ICON_CLICK)?.length).toBe(1);
  });

  it('should render given icon', () => {
    const wrapper = mountInputField({ icon: IconName.SIMPLE_CHECK });
    expect(wrapper.findByDataTest('ec-input-field__icon-wrapper').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given icon with given size', () => {
    const wrapper = mountInputField({ icon: IconName.SIMPLE_CHECK, iconSize: 40 });
    expect(wrapper.findByDataTest('ec-input-field__icon-wrapper').element).toMatchSnapshot();
  });

  it('should render given icon with success colour', () => {
    const wrapper = mountInputField({ icon: IconName.SIMPLE_CHECK, iconType: IconType.SUCCESS });
    expect(wrapper.findByDataTest('ec-input-field__icon-wrapper').element).toMatchSnapshot();
  });

  it('should not render any icon if only the icon size is given', () => {
    const wrapper = mountInputField({ iconSize: 40 });
    expect(wrapper.findByDataTest('ec-input-field__icon-wrapper').exists()).toBe(false);
  });

  it('should render given left-icon', () => {
    const wrapper = mountInputField({ leftIcon: IconName.SIMPLE_CHECK });
    expect(wrapper.findByDataTest('ec-input-field__left-icon-wrapper').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given left-icon with given size', () => {
    const wrapper = mountInputField({ leftIcon: IconName.SIMPLE_CHECK, leftIconSize: 40 });
    expect(wrapper.findByDataTest('ec-input-field__left-icon-wrapper').element).toMatchSnapshot();
  });

  it('should render given left-icon with success colour', () => {
    const wrapper = mountInputField({ leftIcon: IconName.SIMPLE_CHECK, leftIconType: IconType.SUCCESS });
    expect(wrapper.findByDataTest('ec-input-field__left-icon-wrapper').element).toMatchSnapshot();
  });

  it('should not render any left-icon if only the left-icon size is given', () => {
    const wrapper = mountInputField({ leftIconSize: 40 });
    expect(wrapper.findByDataTest('ec-input-field__left-icon-wrapper').exists()).toBe(false);
  });

  it('renders properly when disabled', () => {
    const wrapper = mountInputField({}, { attrs: { disabled: true } });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders properly when readonly', () => {
    const wrapper = mountInputField({}, { attrs: { readonly: true } });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders properly the icon when disabled', () => {
    const wrapper = mountInputField({ icon: IconName.SIMPLE_CHECK }, { attrs: { disabled: true } });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders properly when the labelTooltip prop is set', () => {
    const wrapper = mountInputField({ labelTooltip: 'Testing the labelTooltip prop' }, {
      global: {
        mocks: {
          vEcTooltip: EcTooltipDirectiveMock,
        },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders properly when the inputTooltip prop is set', () => {
    const wrapper = mountInputField({ inputTooltip: 'Testing the inputTooltip' }, {
      global: {
        mocks: {
          vEcTooltip: EcTooltipDirectiveMock,
        },
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with a sensitive class when isSensitive prop is set to true', () => {
    const wrapper = mountInputField({ isSensitive: true });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders properly when is loading', () => {
    const wrapper = mountInputField({ isLoading: true });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders with bottom note', () => {
    const wrapper = mountInputField({ bottomNote: 'Random bottom note' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders with warning bottom note', () => {
    const wrapper = mountInputField({ bottomNote: 'Random bottom note', isWarning: true });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders without bottom note if error message is given', () => {
    const wrapper = mountInputField({
      bottomNote: 'Random bottom note',
      errorMessage: 'Random error message',
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders properly custom attributes', () => {
    const wrapper = mountInputField({}, {
      attrs: {
        'data-test': 'my-data-test',
        class: 'my-class',
        style: { backgroundColor: 'hotpink' },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should never assign undefined value to the input', async () => {
    const wrapper = mountInputField({
      modelValue: '1234',
    });

    expect((wrapper.findByDataTest<HTMLInputElement>('ec-input-field__input').element).value).toBe('1234');

    await wrapper.setProps({
      modelValue: undefined,
    });

    expect((wrapper.findByDataTest<HTMLInputElement>('ec-input-field__input').element).value).toBe('');
  });

  it('should be focusable from outside', async () => {
    const element = document.createElement('div');
    document.body.appendChild(element);

    const wrapper = mountInputField({}, { attachTo: element });

    (document.activeElement as HTMLElement)?.blur();
    expect(document.activeElement).not.toBe(wrapper.findByDataTest('ec-input-field__input').element);
    wrapper.findComponent(EcInputField).vm.focus();

    await wrapper.vm.$nextTick();

    expect(document.activeElement).toBe(wrapper.findByDataTest('ec-input-field__input').element);

    wrapper.unmount();
  });
});
