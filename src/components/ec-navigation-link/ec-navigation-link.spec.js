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
    it('should render as a router link if isRouterLink prop set to true', () => {
      const propsData = {
        text: 'Link',
        iconName: 'single-check',
        url: '/balances',
        isRouterLink: true,
      };
      const wrapper = mount(EcNavigationLink, {
        propsData,
        stubs: ['router-link'],
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should hide the text when is not expanded', () => {
      const propsData = {
        text: 'Link',
        iconName: 'single-check',
        url: '/balances',
        isRouterLink: true,
        isExpanded: false,
      };
      const wrapper = mount(EcNavigationLink, {
        propsData,
        stubs: ['router-link'],
      });

      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.find('.ec-navigation-link__text').isVisible()).toBe(false);
    });

    it('should show the text when is expanded', () => {
      const propsData = {
        text: 'Link',
        iconName: 'single-check',
        url: '/balances',
        isRouterLink: true,
        isExpanded: true,
      };
      const wrapper = mount(EcNavigationLink, {
        propsData,
        stubs: ['router-link'],
      });

      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.find('.ec-navigation-link__text').isVisible()).toBe(true);
    });

    it('should be active when isActive is passed into', () => {
      const propsData = {
        text: 'Link',
        iconName: 'single-check',
        url: '/balances',
        isRouterLink: true,
        isActive: true,
      };
      const wrapper = mount(EcNavigationLink, {
        propsData,
        stubs: ['router-link'],
      });

      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.classes('ec-navigation-link--active')).toBe(true);
    });
  });

  describe('as regular anchor', () => {
    it('should render as a normal <a> tag if isRouterLink is set to false', () => {
      const propsData = {
        text: 'Link',
        iconName: 'single-check',
        url: '/balances',
        isRouterLink: false,
      };
      const wrapper = mount(EcNavigationLink, {
        propsData,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should hide the text when is not expanded', () => {
      const propsData = {
        text: 'Link',
        iconName: 'single-check',
        url: '/balances',
        isRouterLink: false,
        isExpanded: false,
      };
      const wrapper = mount(EcNavigationLink, {
        propsData,
      });

      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.find('.ec-navigation-link__text').isVisible()).toBe(false);
    });

    it('should show the text when is expanded', () => {
      const propsData = {
        text: 'Link',
        iconName: 'single-check',
        url: '/balances',
        isRouterLink: false,
        isExpanded: true,
      };
      const wrapper = mount(EcNavigationLink, {
        propsData,
      });

      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.find('.ec-navigation-link__text').isVisible()).toBe(true);
    });

    it('should be active when isActive is passed into', () => {
      const propsData = {
        text: 'Link',
        iconName: 'single-check',
        url: '/balances',
        isRouterLink: false,
        isActive: true,
      };
      const wrapper = mount(EcNavigationLink, {
        propsData,
      });

      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.classes('ec-navigation-link--active')).toBe(true);
    });
  });
});
