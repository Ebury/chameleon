/* eslint-disable no-use-before-define */
import { mount } from '@vue/test-utils';
import EcModal from './ec-modal.vue';

describe('EcModal', () => {
  it('should not render the modal', () => {
    const wrapper = mount(EcModal);
    expect(wrapper.find('.ec-modal').exists()).toBe(false);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render basic modal', () => {
    const wrapper = mount(EcModal, {
      propsData: {
        showModal: true,
      },
      slots: {
        main: '<p>Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  it('should render close button', () => {
    const wrapper = mount(EcModal, {
      propsData: {
        showModal: true,
      },
    });
    expect(wrapper.find('.ec-modal__close').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render close button if set to false', () => {
    const wrapper = mount(EcModal, {
      propsData: {
        showModal: true,
        showCloseIcon: false,
      },
    });
    expect(wrapper.find('.ec-modal__close').exists()).toBe(false);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render help link', () => {
    const wrapper = mount(EcModal, {
      propsData: {
        showModal: true,
      },
    });
    expect(wrapper.find('.ec-modal__help-link').exists()).toBe(false);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render help link when showHelpLink is set to true', () => {
    const wrapper = mount(EcModal, {
      propsData: {
        showModal: true,
        showHelpLink: true,
      },
    });
    expect(wrapper.find('.ec-modal__help-link').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should have the ec-modal--lg class', () => {
    const wrapper = mount(EcModal, {
      propsData: {
        showModal: true,
        large: true,
      },
    });

    expect(wrapper.find('.ec-modal__content').classes('ec-modal--lg')).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });


  it('should render negative button if slot is passed', () => {
    const wrapper = mount(EcModal, {
      propsData: {
        showModal: true,
      },
      slots: {
        negative: 'Skip for now',
      },
    });
    expect(wrapper.find('.ec-modal__negative-btn').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render negative button if slot not passed', () => {
    const wrapper = mount(EcModal, {
      propsData: {
        showModal: true,
      },
    });
    expect(wrapper.find('.ec-modal__negative-btn').exists()).toBe(false);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render positive button if slot is passed', () => {
    const wrapper = mount(EcModal, {
      propsData: {
        showModal: true,
      },
      slots: {
        positive: 'Update management accounts',
      },
    });
    expect(wrapper.find('.ec-modal__positive-btn').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render positive button if slot not passed', () => {
    const wrapper = mount(EcModal, {
      propsData: {
        showModal: true,
      },
    });
    expect(wrapper.find('.ec-modal__positive-btn').exists()).toBe(false);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should emit a positiveAction event', () => {
    const wrapper = mount(EcModal, {
      propsData: {
        showModal: true,
      },
      slots: {
        positive: 'Positive Button',
      },
    });

    wrapper.find('.ec-modal__positive-btn').trigger('click');
    expect(wrapper.emitted().positiveAction).toBeTruthy();
  });

  it('should emit a negativeAction event when clicking the negative button', () => {
    const wrapper = mount(EcModal, {
      propsData: {
        showModal: true,
      },
      slots: {
        negative: 'Negative Button',
      },
    });

    wrapper.find('.ec-modal__negative-btn').trigger('click');
    expect(wrapper.emitted().negativeAction).toBeTruthy();
  });

  it('should emit a closeModal event when clicking the close button', () => {
    const wrapper = mount(EcModal, {
      propsData: {
        showModal: true,
        showCloseIcon: true,
      },
    });

    wrapper.find('.ec-modal__close').trigger('click');
    expect(wrapper.emitted().closeModal).toBeTruthy();
  });
});
