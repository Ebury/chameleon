import { mount, createLocalVue } from '@vue/test-utils';
import { withMockedConsole } from '../../../tests/utils/console';
import EcModal from './ec-modal.vue';

jest.mock('../../directives/ec-focus-trap');

function mountModal(props, mountOpts) {
  return mount(EcModal, {
    propsData: { ...props },
    ...mountOpts,
  });
}

function mountModalAsTemplate(template, props, mountOpts) {
  const localVue = createLocalVue();

  const Component = localVue.extend({
    components: { EcModal },
    template,
  });

  return mount(Component, {
    localVue,
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

  it('should have the ec-modal--z-index-X class when the z-index props is given', () => {
    const wrapper = mountModal({
      showModal: true,
      zIndex: 210,
    });

    expect(wrapper.findByDataTest('ec-modal').attributes().style).toBe('z-index: 210;');
    wrapper.setProps({ zIndex: 235 });
    expect(wrapper.findByDataTest('ec-modal').attributes().style).toBe('z-index: 235;');
    expect(wrapper.find('ec-modal').element).toMatchSnapshot();
  });

  it('should throw an error when we try to pass a number not allowed on the z-index prop', () => {
    withMockedConsole((errorSpy) => {
      // The error can be throw when we don't pass a number between 200 and 250
      mountModal({
        showModal: true,
        zIndex: 200,
      });
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "zIndex"');
    });
  });

  it('should not render the footer if slots for left content, positive, nor negative were not passed', () => {
    const wrapper = mountModal({
      showModal: true,
    }, {
      slots: {},
    });

    expect(wrapper.find('.ec-modal__footer').exists()).toBe(false);
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
    expect(wrapper.find('.ec-loading__icon').exists()).toBe(false);
    expect(wrapper.find('.ec-modal__footer').element).toMatchSnapshot();
  });

  it('should render negative button with the loading status if slot is passed', () => {
    const wrapper = mountModal({
      isLoading: {
        negative: true,
      },
      showModal: true,
    },
    {
      slots: {
        negative: 'Skip for now',
      },
    });

    expect(wrapper.find('.ec-modal__negative-btn').exists()).toBe(true);
    expect(wrapper.find('.ec-loading__icon').exists()).toBe(true);
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
    expect(wrapper.find('.ec-loading__icon').exists()).toBe(false);
    expect(wrapper.find('.ec-modal__footer').element).toMatchSnapshot();
  });

  it('should render positive button with the loading status if slot is passed', () => {
    const wrapper = mountModal({
      isLoading: {
        positive: true,
      },
      showModal: true,
    },
    {
      slots: {
        positive: 'Update management accounts',
      },
    });

    expect(wrapper.find('.ec-modal__positive-btn').exists()).toBe(true);
    expect(wrapper.find('.ec-loading__icon').exists()).toBe(true);
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

  describe('v-model', () => {
    it('should render the modal when we pass to model true', async () => {
      const wrapper = mountModalAsTemplate(
        ' <ec-modal is-closable v-model="showModal"></ec-modal>',
        {},
        {
          data() {
            return {
              showModal: true,
            };
          },
        },
      );

      expect(wrapper.find('.ec-modal').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();

      wrapper.find('.ec-modal__close').trigger('click');
      await wrapper.vm.$forceUpdate(); // The modal is not updated despite the vm is

      expect(wrapper.vm.showModal).toBe(false);
      expect(wrapper.find('.ec-modal').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should not render the modal when we pass to model false', () => {
      const wrapper = mountModalAsTemplate(
        ' <ec-modal is-closable v-model="showModal"></ec-modal>',
        {},
        {
          data() {
            return {
              showModal: false,
            };
          },
        },
      );

      expect(wrapper.find('.ec-modal').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
