import { mount, createLocalVue } from '@vue/test-utils';
import EcAlert from './ec-alert.vue';
import { withMockedConsole } from '../../../tests/utils/console';

describe('EcAlert', () => {
  function mountAlert(props, mountOpts) {
    return mount(EcAlert, {
      propsData: {
        title: 'Title example',
        type: 'info',
        ...props,
      },
      ...mountOpts,
    });
  }

  function mountAlertAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
    const localVue = createLocalVue();

    const Component = localVue.extend({
      components: { EcAlert },
      template,
      ...wrapperComponentOpts,
    });

    return mount(Component, {
      propsData: {
        ...props,
      },
      localVue,
      ...mountOpts,
    });
  }

  it('should throw if no props were given', () => {
    withMockedConsole((errorSpy) => {
      mount(EcAlert);
      expect(errorSpy).toHaveBeenCalledTimes(2);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "type"');
      expect(errorSpy.mock.calls[1][0]).toContain('Missing required prop: "title"');
    });
  });

  it('should display only with a title and the type given', () => {
    const wrapper = mountAlert({ title: 'Random Title', type: 'info' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display with a subtitle given', () => {
    const wrapper = mountAlert({ subtitle: 'Subtitle example' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display with a button with the text given in the buttonText', () => {
    const wrapper = mountAlert({ buttonText: 'Button text' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should use the given type for the alert type and for the button too', () => {
    const wrapper = mountAlert({ type: 'error', buttonText: 'Warning button' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it.each(['error', 'info', 'success', 'warning'])('should use the type "%s"', (type) => {
    const wrapper = mountAlert({ type });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw an error if type is not valid', () => {
    withMockedConsole((errorSpy) => {
      mountAlert({ type: 'invalid-value' });
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "type"');
    });
  });

  it('should render the dismiss icon when is given the prop dismissable', () => {
    const wrapper = mountAlert({ dismissable: true });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should dismiss the alert when user clicks on the dismiss icon', async () => {
    const wrapper = mountAlertAsTemplate(
      '<ec-alert v-model="isOpen" type="info" title="Custom random" dismissable />',
      {},
      {
        data() {
          return { isOpen: true };
        },
      },
    );
    expect(wrapper.findByDataTest('ec-alert__dismiss-icon').exists()).toBe(true);
    await wrapper.findByDataTest('ec-alert__dismiss-icon').trigger('click');
    expect(wrapper.isVisible()).toBe(false);
  });

  it('should emit the event when user clicks on the button', async () => {
    const wrapper = mountAlert({ buttonText: 'Click here' });
    await wrapper.findByDataTest('ec-alert__button').trigger('click');
    expect(wrapper.emitted('action').length).toBe(1);
  });

  it('should dismiss or show the alert when we change the v-model', async () => {
    const wrapper = mountAlertAsTemplate(
      '<ec-alert v-model="isOpen" type="info" title="Custom random" dismissable />',
      {},
      {
        data() {
          return { isOpen: true };
        },
      },
    );

    expect(wrapper.vm.isOpen).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
    await wrapper.findByDataTest('ec-alert__dismiss-icon').trigger('click');
    expect(wrapper.isVisible()).toBe(false);
    expect(wrapper.vm.isOpen).toBe(false);
  });

  it('should render with the default slot given', () => {
    const wrapper = mountAlert({
      subtitle: 'Subtitle example',
    },
    {
      scopedSlots: {
        default: '<div slot-scope="{ title, subtitle }">Custom: {{ title }} - {{ subtitle }}</div>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with the cta slot given', () => {
    const wrapper = mountAlert({
      subtitle: 'Subtitle example',
    },
    {
      scopedSlots: {
        cta: '<a href="#">Click me</a>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render responsive by default', () => {
    const wrapper = mountAlert();
    expect(wrapper.classes('ec-alert--is-responsive')).toBe(true);
  });

  it('should not render responsive if the responsive prop is set to false', () => {
    const wrapper = mountAlert({ responsive: false });
    expect(wrapper.classes('ec-alert--is-responsive')).toBe(false);
  });
});
