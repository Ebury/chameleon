import { mount } from '@vue/test-utils';

import EcMainContainer from './ec-main-container.vue';

describe('EcMainContainer', () => {
  it('should render empty if no props were given', () => {
    const wrapper = mount(EcMainContainer);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render both titles when they are given in props', () => {
    const props = {
      title: 'Trade Finance',
      titleIntro: 'Here you will be able to keep track of all your requests to Ebury and your credit line.',
    };
    const wrapper = mount(EcMainContainer, {
      props,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not display the titleIntro when title is not given', () => {
    const props = {
      titleIntro: 'Here you will be able to keep track of all your requests to Ebury and your credit line.',
    };
    const wrapper = mount(EcMainContainer, {
      props,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render without title intro when the titleIntro prop is not given', () => {
    const props = {
      title: 'Trade Finance',
    };
    const wrapper = mount(EcMainContainer, {
      props,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should use given slot', () => {
    const props = {
      title: 'Trade Finance',
      titleIntro: 'Here you will be able to keep track of all your requests to Ebury and your credit line.',
    };
    const wrapper = mount(EcMainContainer, {
      props,
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
    const wrapper = mount(EcMainContainer, {
      props,
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
    const wrapper = mount(EcMainContainer, {
      props,
      slots: {
        breadcrumbs: '<a href="#">Breadcrumbs</a>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
