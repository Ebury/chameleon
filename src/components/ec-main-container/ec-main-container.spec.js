import { mount } from '@vue/test-utils';
import EcMainContainer from './ec-main-container.vue';

describe('EcMainContainer', () => {
  it('should render empty if no props were given', () => {
    const wrapper = mount(EcMainContainer);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render both titles when they are given in props', () => {
    const propsData = {
      title: 'Lending',
      titleIntro: 'Here you will be able to keep track of all your requests to Ebury and of your credit line.',
    };
    const wrapper = mount(EcMainContainer, {
      propsData,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not display the titleIntro when title is not given', () => {
    const propsData = {
      titleIntro: 'Here you will be able to keep track of all your requests to Ebury and of your credit line.',
    };
    const wrapper = mount(EcMainContainer, {
      propsData,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should use given slot', () => {
    const propsData = {
      title: 'Lending',
      titleIntro: 'Here you will be able to keep track of all your requests to Ebury and of your credit line.',
    };
    const wrapper = mount(EcMainContainer, {
      propsData,
      slots: {
        default: '<p>Random text</p>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
