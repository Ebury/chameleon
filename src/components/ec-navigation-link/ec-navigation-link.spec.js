/* eslint-disable no-use-before-define */
import { mount } from '@vue/test-utils';
import EcNavigationLink from '@/components/ec-navigation-link/ec-navigation-link.vue';
import { withMockedConsole } from '../../../tests/utils/console';

describe('EcNavigationLink', () => {
  it('should throw an error if prop text was not given', () => {
    withMockedConsole((errorSpy) => {
      mount(EcNavigationLink, {
        stubs: ['router-link'],
      });
      expect(errorSpy).toHaveBeenCalled();
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "text"');
    });
  });

  it('should throw an error if prop url was not given', () => {
    withMockedConsole((errorSpy) => {
      mount(EcNavigationLink, {
        stubs: ['router-link'],
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
        iconName: 'single-check',
        url: '/balances',
        isRouterLink: true,
        ...opts,
      };

      return mount(EcNavigationLink, {
        propsData,
        stubs: ['router-link'],
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
      expect(wrapper.classes('ec-navigation-link--is-expanded')).toBe(true);
    });

    it('should hide the text when is not expanded', () => {
      const wrapper = mountAsRouterLink({ isExpanded: false });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.find('.ec-navigation-link__text').isVisible()).toBe(false);
    });

    it('should show the text when is expanded', () => {
      const wrapper = mountAsRouterLink({ isExpanded: true });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.find('.ec-navigation-link__text').isVisible()).toBe(true);
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
        iconName: 'single-check',
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
      expect(wrapper.classes('ec-navigation-link--is-expanded')).toBe(true);
    });

    it('should hide the text when is not expanded', () => {
      const wrapper = mountAsAnchor({ isExpanded: false });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.find('.ec-navigation-link__text').isVisible()).toBe(false);
    });

    it('should show the text when is expanded', () => {
      const wrapper = mountAsAnchor({ isExpanded: true });
      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.find('.ec-navigation-link__text').isVisible()).toBe(true);
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
  });
});
