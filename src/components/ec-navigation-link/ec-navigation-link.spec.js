import { mount } from '@vue/test-utils';
import EcNavigationLink from './ec-navigation-link.vue';
import { withMockedConsole } from '../../../tests/utils/console';

describe('EcNavigationLink', () => {
  it('should throw an error if prop text was not given', () => {
    withMockedConsole((errorSpy) => {
      mount(EcNavigationLink);
      expect(errorSpy).toHaveBeenCalled();
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "text"');
    });
  });

  it('should throw an error if prop url was not given', () => {
    withMockedConsole((errorSpy) => {
      mount(EcNavigationLink, {
        propsData: {
          text: 'Random text',
        },
      });
      expect(errorSpy).toHaveBeenCalled();
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "url"');
    });
  });

  describe('as router-link', () => {
    function mountAsRouterLink(opts, mountOpts) {
      const propsData = {
        text: 'Link',
        iconName: 'simple-check',
        url: '/balances',
        isRouterLink: true,
        ...opts,
      };

      return mount(EcNavigationLink, {
        propsData,
        ...mountOpts,
      });
    }

    it('should render as a router link if isRouterLink prop set to true', () => {
      const wrapper = mountAsRouterLink({ isRouterLink: true });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should be expanded by default', () => {
      const wrapper = mountAsRouterLink();
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.classes('ec-navigation-link--is-collapsed')).toBe(false);
    });

    it('should hide the text when is collapsed', () => {
      const wrapper = mountAsRouterLink({ isCollapsed: true });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-navigation-link__text').isVisible()).toBe(false);
    });

    it('should show the text when is expanded', () => {
      const wrapper = mountAsRouterLink({ isCollapsed: false });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-navigation-link__text').isVisible()).toBe(true);
    });

    it('should be active when isActive is passed into', () => {
      const wrapper = mountAsRouterLink({ isActive: true });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.classes('ec-navigation-link--is-active')).toBe(true);
    });

    it('should be compact when isCompact is passed into', () => {
      const wrapper = mountAsRouterLink({ isCompact: true });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.classes('ec-navigation-link--is-compact')).toBe(true);
    });
  });

  describe('as regular anchor', () => {
    function mountAsAnchor(opts, mountOpts) {
      const propsData = {
        text: 'Link',
        iconName: 'simple-check',
        url: '/balances',
        isRouterLink: false,
        ...opts,
      };

      return mount(EcNavigationLink, {
        propsData,
        ...mountOpts,
      });
    }

    it('should render as a normal <a> tag if isRouterLink is set to false', () => {
      const wrapper = mountAsAnchor({ isRouterLink: false });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should be expanded by default', () => {
      const wrapper = mountAsAnchor();
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.classes('ec-navigation-link--is-collapsed')).toBe(false);
    });

    it('should hide the text when is collapsed', () => {
      const wrapper = mountAsAnchor({ isCollapsed: true });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-navigation-link__text').isVisible()).toBe(false);
    });

    it('should show the text when is expanded', () => {
      const wrapper = mountAsAnchor({ isCollapsed: false });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-navigation-link__text').isVisible()).toBe(true);
    });

    it('should be active when isActive is passed into', () => {
      const wrapper = mountAsAnchor({ isActive: true });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.classes('ec-navigation-link--is-active')).toBe(true);
    });

    it('should be compact when isCompact is passed into', () => {
      const wrapper = mountAsAnchor({ isCompact: true });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.classes('ec-navigation-link--is-compact')).toBe(true);
    });

    it('should pass listeners from parent to the root', () => {
      const clickSpy = jest.fn();
      const wrapper = mountAsAnchor({}, {
        listeners: { click: clickSpy },
      });

      wrapper.trigger('click');
      expect(clickSpy).toHaveBeenCalledTimes(1);
    });
  });
});
