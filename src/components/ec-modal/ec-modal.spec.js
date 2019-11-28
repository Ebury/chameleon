/* eslint-disable no-use-before-define */
import { mount } from '@vue/test-utils';
import EcModal from './ec-modal.vue';

jest.mock('../../directives/ec-focus-trap');

function mountModal(props, mountOpts) {
  return mount(EcModal, {
    propsData: { ...props },
    ...mountOpts,
  });
}

describe('EcModal', () => {
  it('should not render the modal if "showModal" is not set to true', () => {
    const wrapper = mountModal();
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

  it('should have the ec-modal--lg class', () => {
    const wrapper = mountModal({
      showModal: true,
      large: true,
    });

    expect(wrapper.find('.ec-modal__content').classes('ec-modal--lg')).toBe(true);
    expect(wrapper.find('.ec-modal__content').element).toMatchSnapshot();
  });

  it('should not render footer left section if slot not passed', () => {
    const wrapper = mountModal({
      showModal: true,
    });

    expect(wrapper.find('.ec-modal__footer-left-content').exists()).toBe(false);
    expect(wrapper.find('.ec-modal__footer').element).toMatchSnapshot();
  });

  it('should render footer left section when slot is passed', () => {
    const wrapper = mountModal({
      showModal: true,
    },
    {
      slots: {
        footerLeftContent: '<p>Need Help ?</p>',
      },
    });

    expect(wrapper.find('.ec-modal__footer-left-content').exists()).toBe(true);
    expect(wrapper.find('.ec-modal__footer').element).toMatchSnapshot();
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
      isClosable: true,
    });

    wrapper.find('.ec-modal__close').trigger('click');
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it('should close the modal if ESC key is pressed and is closable', () => {
    const wrapper = mountModal({
      showModal: true,
      isClosable: true,
    }, {
      attachToDocument: true,
    });

    wrapper.trigger('keyup.esc');
    expect(wrapper.emitted().close).toBeTruthy();

    wrapper.destroy(); // because we attached the wrapper to document
  });

  it('should not close the modal if ESC key is pressed and is not closable', () => {
    const wrapper = mountModal({
      showModal: true,
      isClosable: false,
    }, {
      attachToDocument: true,
    });

    wrapper.trigger('keyup.esc');
    expect(wrapper.emitted().close).toBeUndefined();

    wrapper.destroy(); // because we attached the wrapper to document
  });

  it('should not close the modal if key other than ESC is pressed and is closable', () => {
    const wrapper = mountModal({
      showModal: true,
      isClosable: true,
    }, {
      attachToDocument: true,
    });

    wrapper.trigger('keyup', { key: 'a' });
    expect(wrapper.emitted().close).toBeUndefined();

    wrapper.destroy(); // because we attached the wrapper to document
  });

  it('should stop listening to keyup events when closed', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    expect(addEventListenerSpy).not.toHaveBeenCalled();

    const wrapper = mountModal({
      showModal: true,
      isClosable: false,
    }, {
      attachToDocument: true,
    });

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledWith('keyup', expect.any(Function));

    wrapper.setProps({ showModal: false });

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keyup', addEventListenerSpy.mock.calls[0][1]);

    wrapper.destroy(); // because we attached the wrapper to document
  });
});
