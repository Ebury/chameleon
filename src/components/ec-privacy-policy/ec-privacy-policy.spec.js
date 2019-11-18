import { mount } from '@vue/test-utils';
import EcPrivacyPolicy from './ec-privacy-policy.vue';
import { withMockedConsole } from '../../../tests/utils/console';

describe('EcPrivacyPolicy', () => {
  function mountPrivacyPolicy(props, mountOpts) {
    return mount(EcPrivacyPolicy, {
      propsData: {
        title: 'Random Title',
        buttonText: 'Click here',
        ...props,
      },
      ...mountOpts,
    });
  }

  it('should throw if no props were given', () => {
    withMockedConsole((errorSpy) => {
      mount(EcPrivacyPolicy);
      expect(errorSpy).toHaveBeenCalledTimes(2);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "title"');
      expect(errorSpy.mock.calls[1][0]).toContain('Missing required prop: "buttonText"');
    });
  });

  it('should display only with a title and the buttonText given', () => {
    const wrapper = mountPrivacyPolicy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with the slot given', () => {
    const wrapper = mountPrivacyPolicy({}, {
      scopedSlots: {
        default: '<div>Slot default</div>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should emitted the event when the click on the button is fired', () => {
    const wrapper = mountPrivacyPolicy();
    wrapper.find('.ec-privacy-policy__btn').trigger('click');
    expect(wrapper.emitted('accept')).toBeTruthy();
  });
});
