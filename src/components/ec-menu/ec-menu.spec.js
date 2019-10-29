import { mount } from '@vue/test-utils';
import EcMenu from './ec-menu.vue';

const links = [
  {
    url: '/foo',
    iconName: 'foo-icon',
    text: 'Foo',
  },
  {
    link: '/bar',
    iconName: 'bar-icon',
    text: 'Bar',
  },
  {
    iconName: 'baz-icon',
    text: 'Baz',
  },
  {
    url: '/bat',
    iconName: 'baz-icon',
    text: 'Bat',
  },
];

describe('EcMenu', () => {
  it('should not render if links are not supplied', () => {
    const wrapper = mount(
      EcMenu,
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render if links are null', () => {
    const wrapper = mount(
      EcMenu,
      {
        propsData: {
          links: null,
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render if links is an empty array', () => {
    const wrapper = mount(
      EcMenu,
      {
        propsData: {
          links: [],
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render only links with a url property', () => {
    const wrapper = mount(
      EcMenu,
      {
        propsData: {
          links,
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected when set to horizontal', () => {
    const wrapper = mount(
      EcMenu,
      {
        propsData: {
          horizontal: true,
          links: [links[0]],
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render all items as compact when is horizontal', () => {
    const wrapper = mount(
      EcMenu,
      {
        propsData: {
          horizontal: true,
          links,
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
    wrapper.findAll('.ec-navigation-link').wrappers.forEach((linkWrapper) => {
      expect(linkWrapper.classes('ec-navigation-link--is-compact')).toBe(true);
    });
  });

  it('should not render all items as compact when horizontal is not set', () => {
    const wrapper = mount(
      EcMenu,
      {
        propsData: {
          horizontal: false,
          links,
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
    wrapper.findAll('.ec-navigation-link').wrappers.forEach((linkWrapper) => {
      expect(linkWrapper.classes('ec-navigation-link--is-compact')).toBe(false);
    });
  });

  it('should render as expanded by default', () => {
    const wrapper = mount(
      EcMenu,
      {
        propsData: {
          links,
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();

    wrapper.findAll('.ec-navigation-link__text').wrappers.forEach((textWrapper) => {
      expect(textWrapper.isVisible()).toBe(true);
    });
  });

  it('should render as not expanded when isExpanded is passed into', () => {
    const wrapper = mount(
      EcMenu,
      {
        propsData: {
          links,
          isExpanded: false,
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();

    wrapper.findAll('.ec-navigation-link__text').wrappers.forEach((textWrapper) => {
      expect(textWrapper.isVisible()).toBe(false);
    });
  });
});
