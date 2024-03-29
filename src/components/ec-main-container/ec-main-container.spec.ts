
import { type ComponentMountingOptions, mount } from '@vue/test-utils';

import EcMainContainer from './ec-main-container.vue';
import type { MainContainerProps } from './types';

describe('EcMainContainer', () => {
  function mountEcMainContainer(props?: Partial<MainContainerProps>, mountOpts?: ComponentMountingOptions<typeof EcMainContainer>) {
    return mount(EcMainContainer, {
      props,
      ...mountOpts,
    });
  }

  it('should render empty if no props or slots were given', () => {
    const wrapper = mountEcMainContainer();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render both titles when they are given in props', () => {
    const props = {
      title: 'Trade Finance',
      titleIntro: 'Here you will be able to keep track of all your requests to Ebury and your credit line.',
    };
    const wrapper = mountEcMainContainer(props);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render without title intro when the titleIntro prop is not given', () => {
    const props = {
      title: 'Trade Finance',
    };
    const wrapper = mountEcMainContainer(props);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should use given slot', () => {
    const props = {
      title: 'Trade Finance',
      titleIntro: 'Here you will be able to keep track of all your requests to Ebury and your credit line.',
    };
    const wrapper = mountEcMainContainer(props, {
      slots: {
        default: '<p>Random text</p>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should use the given named cta slot', () => {
    const props = {
      title: 'Trade Finance',
      titleIntro: 'Here you will be able to keep track of all your requests to Ebury and your credit line.',
    };
    const wrapper = mountEcMainContainer(props, {
      slots: {
        cta: '<button class="ec-btn ec-btn--rounded ec-btn--primary ec-btn--md ec-btn--full-width">Test cta</button>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should use the given named breadcrumbs slot', () => {
    const props = {
      title: 'Trade Finance',
      titleIntro: 'Here you will be able to keep track of all your requests to Ebury and your credit line.',
    };
    const wrapper = mountEcMainContainer(props, {
      slots: {
        breadcrumbs: '<a href="#">Breadcrumbs</a>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display breadcrumbs even when there are no props', () => {
    const wrapper = mountEcMainContainer({}, {
      slots: {
        breadcrumbs: '<a href="#">Breadcrumbs</a>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display breadcrumbs and CTA slot when given', () => {
    const wrapper = mountEcMainContainer({}, {
      slots: {
        breadcrumbs: '<a href="#">Breadcrumbs</a>',
        cta: '<button class="ec-btn ec-btn--rounded ec-btn--primary ec-btn--md ec-btn--full-width">Test cta</button>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
