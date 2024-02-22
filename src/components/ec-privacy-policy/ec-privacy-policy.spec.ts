import { type ComponentMountingOptions, mount } from '@vue/test-utils';

import EcPrivacyPolicy from './ec-privacy-policy.vue';
import type { PrivacyPolicyProps } from './types';

describe('EcPrivacyPolicy', () => {
  function mountPrivacyPolicy(props?: Partial<PrivacyPolicyProps>, mountOpts?: ComponentMountingOptions<typeof EcPrivacyPolicy>) {
    return mount(EcPrivacyPolicy, {
      props: {
        title: 'Random Title',
        buttonText: 'Click here',
        ...props,
      },
      ...mountOpts,
    });
  }

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
    expect(wrapper.emitted('accept')?.length).toBe(1);
  });
});
