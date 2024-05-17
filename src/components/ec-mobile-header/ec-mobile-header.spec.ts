import { type ComponentMountingOptions, mount } from '@vue/test-utils';

import EcMobileHeader from './ec-mobile-header.vue';

describe('EcMobileHeader', () => {
  const logoTemplate = '<img src="/test.svg" />';

  function mountMobileHeader(mountOpts?: ComponentMountingOptions<typeof EcMobileHeader>) {
    return mount(EcMobileHeader, {
      ...mountOpts,
    });
  }

  it('should render properly', () => {
    const wrapper = mountMobileHeader({
      slots: {
        logo: logoTemplate,
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
