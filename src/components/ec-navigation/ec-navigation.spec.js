import { mount } from '@vue/test-utils';

import { withMockedConsole } from '../../../tests/utils/console';
import EcNavigation from './ec-navigation.vue';

describe('EcNavigation', () => {
  function mountNavigation(opts, mountOpts) {
    return mount(EcNavigation, {
      props: {
        isCollapsed: false,
        isCollapsable: false,
        branding: {},
        ...opts,
      },
      ...mountOpts,
    });
  }

  it('should render with custom attributes', () => {
    const wrapper = mountNavigation({}, {
      attrs: {
        'data-test': 'my-data-test',
        class: 'my-class',
        id: 'test-id',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw an error if required props are missing', () => {
    withMockedConsole((errorSpy, warnSpy) => {
      mount(EcNavigation);

      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('Missing required prop: "isCollapsable"');
    });
  });

  it('should be expanded when isCollapsed is set to false', () => {
    const wrapper = mountNavigation({ isCollapsed: false });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.classes('ec-navigation--is-collapsed')).toBe(false);
  });

  it('should be collapsed when isCollapsed is set to true', () => {
    const wrapper = mountNavigation({ isCollapsed: true });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.classes('ec-navigation--is-collapsed')).toBe(true);
  });

  it('should be collapsable when isCollapsable is set', () => {
    const wrapper = mountNavigation({ isCollapsable: true });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.classes('ec-navigation--is-collapsable')).toBe(true);
  });

  it('should not render branding if no logo is given in branding object', () => {
    const wrapper = mountNavigation({ branding: { logo: null } });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-navigation__branding').exists()).toBe(false);
  });

  it('should not render branding if logo is given in branding object but showBrandingLogo is set to false', () => {
    const wrapper = mountNavigation({
      branding: { logo: '/img/my.png' },
      showBrandingLogo: false,
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-navigation__branding').exists()).toBe(false);
  });

  it('should render branding logo and name when given', () => {
    const wrapper = mountNavigation({
      branding: { logo: '/img/my.png', name: 'My Branding' },
    });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-navigation__branding').element).toMatchSnapshot('Branding should have alt and src.');
  });

  it('should only render mandatory slot if no other slots were given', () => {
    const wrapper = mountNavigation();
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findAllByDataTest('ec-navigation__block').length).toBe(1);
    expect(wrapper.findByDataTest('ec-navigation__menu').exists()).toBe(true);
  });

  it('should render all given slots', () => {
    const wrapper = mountNavigation(null, {
      slots: {
        'user-info': '<div>User Info</div>',
        'call-to-action': '<div>CTA</div>',
        menu: '<div>Menu</div>',
        'footer-menu': '<div>Footer Menu</div>',
        copyright: '<div>Copyright</div>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findAllByDataTest('ec-navigation__block').length).toBe(5);
  });
});
