import Vue from 'vue';
import { mount } from '@vue/test-utils';
import EcSwift from './ec-swift.vue';
import { withMockedConsole } from '../../../tests/utils/console';

describe('EcSwift', () => {
  function mountSwift(props, mountOpts) {
    return mount(EcSwift, {
      propsData: {
        title: 'Title example',
        type: 'info',
        ...props,
      },
      ...mountOpts,
    });
  }

  it('should throw if no props were given', () => {
    withMockedConsole((errorSpy) => {
      mount(EcSwift);
      expect(errorSpy).toHaveBeenCalledTimes(2);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "type"');
      expect(errorSpy.mock.calls[1][0]).toContain('Missing required prop: "title"');
    });
  });

  it('should display only with a title and the type given', () => {
    const wrapper = mountSwift({ title: 'Random Title', type: 'info' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display with a subtitle given', () => {
    const wrapper = mountSwift({ subtitle: 'Subtitle example' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display with a button with the text given in the buttonText', () => {
    const wrapper = mountSwift({ buttonText: 'Button text' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should use the given type for the swift type and for the button too', () => {
    const wrapper = mountSwift({ type: 'error', buttonText: 'Warning button' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it.each(['error', 'info', 'success', 'warning'])('should use the type "%s"', (type) => {
    const wrapper = mountSwift({ type });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw an error if type is not valid', () => {
    withMockedConsole((errorSpy) => {
      mountSwift({ type: 'invalid-value' });
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "type"');
    });
  });

  it('should render the dismiss icon when is given the prop dismissable', () => {
    const wrapper = mountSwift({ dismissable: true });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should dismiss the swift when user clicks on the dismiss icon ', () => {
    const wrapper = mount(Vue.extend({
      components: { EcSwift },
      data() {
        return { isOpen: true };
      },
      template: `
        <ec-swift v-model="isOpen" type="info" title="Custom random" dismissable />
      `,
    }));
    expect(wrapper.find('.ec-swift__dismiss-icon').exists()).toBe(true);
    wrapper.find('.ec-swift__dismiss-icon').trigger('click');
    expect(wrapper.isVisible()).toBe(false);
  });

  it('should emit the event when user clicks on the button', () => {
    const wrapper = mountSwift({ buttonText: 'Click here' });
    wrapper.find('.ec-swift__button').trigger('click');
    expect(wrapper.emitted('action').length).toBe(1);
  });

  it('should dismiss or show the swift when we change the v-model', () => {
    const wrapper = mount(Vue.extend({
      components: { EcSwift },
      data() {
        return { isOpen: true };
      },
      template: `
        <ec-swift v-model="isOpen" type="info" title="Custom random" dismissable />
      `,
    }));

    expect(wrapper.vm.isOpen).toBe(true);
    expect(wrapper.isVisible()).toBe(true);
    wrapper.find('.ec-swift__dismiss-icon').trigger('click');
    expect(wrapper.isVisible()).toBe(false);
    expect(wrapper.vm.isOpen).toBe(false);
  });
  it('should render with the slot given', () => {
    const wrapper = mountSwift({
      subtitle: 'Subtitle example',
    },
    {
      scopedSlots: {
        default: '<div slot-scope="{ title, subtitle }">Custom: {{ title }} - {{ subtitle }}</div>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render responsive by default', () => {
    const wrapper = mountSwift();
    expect(wrapper.classes('ec-swift--is-responsive')).toBe(true);
  });

  it('should not render responsive if the responsive prop is set to false', () => {
    const wrapper = mountSwift({ responsive: false });
    expect(wrapper.classes('ec-swift--is-responsive')).toBe(false);
  });
});
