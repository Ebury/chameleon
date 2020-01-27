import { mount, createLocalVue } from '@vue/test-utils';
import EcInputField from './ec-input-field.vue';
import { withMockedConsole } from '../../../tests/utils/console';

describe('EcInputField', () => {
  function mountInputField(props, mountOpts) {
    return mount(EcInputField, {
      propsData: {
        value: 'Text test',
        type: 'text',
        errorMessage: '',
        label: 'label test',
        ...props,
      },
      ...mountOpts,
    });
  }
  function mountInputFieldAsTemplate(template, props, mountOpts) {
    const localVue = createLocalVue();

    const Component = localVue.extend({
      components: { EcInputField },
      template,
    });

    return mount(Component, {
      localVue,
      propsData: { ...props },
      ...mountOpts,
    });
  }

  it('should validate given props', () => {
    withMockedConsole((errorSpy) => {
      mountInputField({ type: 'random' });
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "type"');
    });
  });

  it('should display properly with the given props', () => {
    const wrapper = mountInputField();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders properly with the given state "error"', () => {
    const wrapper = mountInputField({ errorMessage: 'error msg' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders properly without label', () => {
    const wrapper = mountInputField({ label: '' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders with the attrs min and max', () => {
    const wrapper = mountInputField({ min: 5, max: 10, type: 'number' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('works with the same listeners as the input', () => {
    const event = jest.fn();
    const wrapper = mountInputField(
      {},
      {
        listeners: {
          click: event,
        },
      },
    );

    wrapper.find('input').trigger('click');
    expect(event).toHaveBeenCalledTimes(1);
  });

  it('should set the v-model on the value of the input and change when it changes', () => {
    const wrapper = mountInputFieldAsTemplate(
      '<ec-input-field v-model="text" type="text" />',
      {},
      {
        data() {
          return { text: '' };
        },
      },
    );

    expect(wrapper.find('input').element.value).toBe('');
    wrapper.setData({ text: 'some text' });
    expect(wrapper.find('input').element.value).toBe('some text');
  });

  it('should emit the value when you write on the input', () => {
    const wrapper = mountInputFieldAsTemplate(
      '<ec-input-field v-model="text" type="text" />',
      {},
      {
        data() {
          return { text: '' };
        },
      },
    );

    expect(wrapper.find('input').element.value).toBe('');
    wrapper.find('input').setValue('some text');
    expect(wrapper.vm.text).toBe('some text');
    expect(wrapper.find('input').element.value).toBe('some text');
  });

  it('should render given icon', () => {
    const wrapper = mountInputField({ icon: 'simple-check' });
    expect(wrapper.find('.ec-input-field__icon-wrapper').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given icon with given size', () => {
    const wrapper = mountInputField({ icon: 'simple-check', iconSize: 40 });
    expect(wrapper.find('.ec-input-field__icon-wrapper').element).toMatchSnapshot();
  });

  it('should not render any icon if only the icon size is given', () => {
    const wrapper = mountInputField({ iconSize: 40 });
    expect(wrapper.find('.ec-input-field__icon-wrapper').exists()).toBe(false);
  });
});
