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

  describe('@events', () => {
    it('should emit an event when the mobile menu button is clicked', async () => {
      const wrapper = mountMobileHeader();

      await wrapper.findByDataTest('ec-mobile-header__menu').trigger('click');
      expect(wrapper.emitted('open-mobile-menu')?.length).toBe(1);
    });
  });
});
