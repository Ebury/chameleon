import { type ComponentMountingOptions, mount } from '@vue/test-utils';

import EcMobileHeader from './ec-mobile-header.vue';
import type { MobileHeaderProps } from './types';

describe('EcMobileHeader', () => {
  const logoTemplate = '<img src="/test.svg" />';

  function mountMobileHeader(props?: MobileHeaderProps, mountOpts?: ComponentMountingOptions<typeof EcMobileHeader>) {
    return mount(EcMobileHeader, {
      props: {
        ...props,
      },
      ...mountOpts,
    });
  }

  it('should render properly if "isResponsive" prop is true', () => {
    const wrapper = mountMobileHeader({
      isResponsive: true,
    }, {
      slots: {
        logo: logoTemplate,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render the component if "isResponsive" prop is false', () => {
    const wrapper = mountMobileHeader({
      isResponsive: false,
    }, {
      slots: {
        logo: logoTemplate,
      },
    });
    expect(wrapper.findByDataTest('ec-mobile-header').exists()).toBe(false);
  });
});
