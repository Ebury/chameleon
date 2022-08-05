import { mount } from '@vue/test-utils';

import { withMockedConsole } from '../../../tests/utils/console';
import EcPrivacyPolicy from './ec-privacy-policy.vue';

describe('EcPrivacyPolicy', () => {
  function mountPrivacyPolicy(props, mountOpts) {
    return mount(EcPrivacyPolicy, {
      props: {
        title: 'Random Title',
        buttonText: 'Click here',
        ...props,
      },
      ...mountOpts,
    });
  }

  it('should throw if no props were given', () => {
    withMockedConsole((errorSpy, warnSpy) => {
      mount(EcPrivacyPolicy);
      expect(warnSpy).toHaveBeenCalledTimes(3);
      expect(warnSpy.mock.calls[1][0]).toContain('Missing required prop: "title"');
      expect(warnSpy.mock.calls[2][0]).toContain('Missing required prop: "buttonText"');
    });
  });

  it('should display only with a title and the buttonText given', () => {
    const wrapper = mountPrivacyPolicy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with the slot given', () => {
    const wrapper = mountPrivacyPolicy({}, {
      slots: {
        default: '<div>Slot default</div>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should emit an event when the click on the button is fired', () => {
    const wrapper = mountPrivacyPolicy();
    wrapper.findByDataTest('ec-privacy-policy__btn').trigger('click');
    expect(wrapper.emitted('accept').length).toBe(1);
  });
});
