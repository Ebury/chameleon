import { type ComponentMountingOptions, mount } from '@vue/test-utils';
import { vi } from 'vitest';

import { IconName } from '../ec-icon/icon-names';
import EcMenu from './ec-menu.vue';
import type { MenuLink, MenuProps } from './types';

const links: MenuLink[] = [
  {
    url: '/foo',
    iconName: IconName.SIMPLE_ADDRESS,
    text: 'Foo',
    dataTest: 'foo',
  },
  {
    url: '/bar',
    iconName: IconName.SIMPLE_CITY,
    text: 'Bar',
  },
  {
    url: '/baz',
    iconName: IconName.SIMPLE_EYE,
    text: 'Baz',
    dataTest: 'baz',
  },
  {
    url: '/bat',
    iconName: IconName.SIMPLE_TRADE,
    text: 'Bat',
  },
];

const routerLink: MenuLink[] = [{
  url: '/bat',
  iconName: IconName.SIMPLE_TRADE,
  text: 'Bat',
  isRouterLink: true,
  dataTest: 'test-router-link',
}];

describe('EcMenu', () => {
  function mountEcMenu(props?: Partial<MenuProps>, mountOpts?: ComponentMountingOptions<typeof EcMenu>) {
    return mount(EcMenu, {
      props,
      ...mountOpts,
    });
  }

  it('should not render if links are not supplied', () => {
    const wrapper = mountEcMenu();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render if links is an empty array', () => {
    const wrapper = mountEcMenu({ links: [] });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected when set to horizontal', () => {
    const wrapper = mountEcMenu({ links: [links[0]], horizontal: true });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected when set to isReverse', () => {
    const wrapper = mountEcMenu({ links: [links[0]], isReversed: true });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected when set to isReverse and horizontal', () => {
    const wrapper = mountEcMenu({ links: [links[0]], isReversed: true, horizontal: true });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render all items as compact when is horizontal', () => {
    const wrapper = mountEcMenu({ links, horizontal: true });
    expect(wrapper.element).toMatchSnapshot();
    wrapper.findAllByDataTest('ec-menu__link').forEach((linkWrapper) => {
      expect(linkWrapper.classes('ec-navigation-link--is-compact')).toBe(true);
    });
  });

  it('should not render all items as compact when horizontal is not set', () => {
    const wrapper = mountEcMenu({ links, horizontal: false });
    expect(wrapper.element).toMatchSnapshot();
    wrapper.findAllByDataTest('ec-menu__link').forEach((linkWrapper) => {
      expect(linkWrapper.classes('ec-navigation-link--is-compact')).toBe(false);
    });
  });

  it('should render as expanded by default', () => {
    const wrapper = mountEcMenu({ links });
    expect(wrapper.element).toMatchSnapshot();

    wrapper.findAllByDataTest('ec-navigation-link__text').forEach((textWrapper) => {
      expect(textWrapper.isVisible()).toBe(true);
    });
  });

  it('should render as collapsed when isCollapsed is passed into', () => {
    const wrapper = mountEcMenu({ links, isCollapsed: true });
    expect(wrapper.element).toMatchSnapshot();

    wrapper.findAllByDataTest('ec-navigation-link__text').forEach((textWrapper) => {
      expect(textWrapper.isVisible()).toBe(false);
    });
  });

  it('should attach custom listeners passed in the link definition', async () => {
    const testSpy = vi.fn();
    const link: MenuLink = {
      ...links[0],
      on: {
        test: testSpy,
      },
    };

    const wrapper = mountEcMenu({ links: [link], isCollapsed: true });
    expect(wrapper.element).toMatchSnapshot();

    await wrapper.findByDataTest('ec-menu__link').trigger('test');
    expect(testSpy).toHaveBeenCalledTimes(1);
  });

  describe('@events', () => {
    it('should propagate the event from the navigation link', async () => {
      const wrapper = mountEcMenu({ links: routerLink });
      expect(wrapper.element).toMatchSnapshot();
      await wrapper.findByDataTest('test-router-link').trigger('click');
      expect(wrapper.emitted('navigation-link-clicked')?.length).toBe(1);
    });
  });
});
