/* eslint-disable no-use-before-define */
import { mount } from '@vue/test-utils';
import EcModal from './ec-modal.vue';

function mountModal(props, mountOpts) {
  return mount(EcModal, {
    propsData: { ...props },
    ...mountOpts,
  });
}

describe('EcModal', () => {
  it('should not render the modal if "showModal" is not set to true', () => {
    const wrapper = mount(EcModal);
    expect(wrapper.find('.ec-modal').exists()).toBe(false);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render basic modal', () => {
    const wrapper = mountModal(
      { showModal: true },
      {
        slots: {
          main: '<p>Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>',
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render close button', () => {
    const wrapper = mountModal({ showModal: true });

    expect(wrapper.find('.ec-modal__close').exists()).toBe(true);
    expect(wrapper.find('.ec-modal__header').element).toMatchSnapshot();
  });

  it('should not render close button when isClosable is set to false', () => {
    const wrapper = mountModal({
      showModal: true,
      isClosable: false,
    });

    expect(wrapper.find('.ec-modal__close').exists()).toBe(false);
    expect(wrapper.find('.ec-modal__header').element).toMatchSnapshot();
  });

  it('should not render footer left section', () => {
    const wrapper = mountModal({
      showModal: true,
    });

    expect(wrapper.find('.ec-modal__footer-left-content').exists()).toBe(false);
    expect(wrapper.find('.ec-modal__footer').element).toMatchSnapshot();
  });

  it('should render footer left section when "showFooterLeftContent" is set to true', () => {
    const wrapper = mountModal({
      showModal: true,
      showFooterLeftContent: true,
    });

    expect(wrapper.find('.ec-modal__footer-left-content').exists()).toBe(true);
    expect(wrapper.find('.ec-modal__footer').element).toMatchSnapshot();
  });

  it('should have the ec-modal--lg class', () => {
    const wrapper = mountModal({
      showModal: true,
      large: true,
    });

    expect(wrapper.find('.ec-modal__content').classes('ec-modal--lg')).toBe(true);
    expect(wrapper.find('.ec-modal__content').element).toMatchSnapshot();
  });

  it('should render negative button if slot is passed', () => {
    const wrapper = mountModal({
      showModal: true,
    },
    {
      slots: {
        negative: 'Skip for now',
      },
    });

    expect(wrapper.find('.ec-modal__negative-btn').exists()).toBe(true);
    expect(wrapper.find('.ec-modal__footer').element).toMatchSnapshot();
  });

  it('should not render negative button if slot not passed', () => {
    const wrapper = mountModal({
      showModal: true,
    });

    expect(wrapper.find('.ec-modal__negative-btn').exists()).toBe(false);
    expect(wrapper.find('.ec-modal__footer').element).toMatchSnapshot();
  });

  it('should render positive button if slot is passed', () => {
    const wrapper = mountModal({
      showModal: true,
    },
    {
      slots: {
        positive: 'Update management accounts',

      },
    });

    expect(wrapper.find('.ec-modal__positive-btn').exists()).toBe(true);
    expect(wrapper.find('.ec-modal__footer').element).toMatchSnapshot();
  });

  it('should not render positive button if slot not passed', () => {
    const wrapper = mountModal({
      showModal: true,
    });

    expect(wrapper.find('.ec-modal__positive-btn').exists()).toBe(false);
    expect(wrapper.find('.ec-modal__footer').element).toMatchSnapshot();
  });

  it('should emit a "positive" event when clicking on the positive button', () => {
    const wrapper = mountModal(
      {
        showModal: true,
      },
      {
        slots: {
          positive: 'Positive Button',
        },
      },
    );
    wrapper.find('.ec-modal__positive-btn').trigger('click');
    expect(wrapper.emitted().positive).toBeTruthy();
  });

  it('should emit a "negative" event when clicking on the negative button', () => {
    const wrapper = mountModal({
      showModal: true,
    },
    {
      slots: {
        negative: 'Negative Button',
      },
    });

    wrapper.find('.ec-modal__negative-btn').trigger('click');
    expect(wrapper.emitted().negative).toBeTruthy();
  });

  it('should emit a "close" event when clicking on the close button', () => {
    const wrapper = mountModal({
      showModal: true,
      showCloseIcon: true,
    });

    wrapper.find('.ec-modal__close').trigger('click');
    expect(wrapper.emitted().close).toBeTruthy();
  });
});
