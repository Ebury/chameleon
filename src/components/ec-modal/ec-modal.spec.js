import { enableAutoDestroy, mount, createLocalVue } from '@vue/test-utils';
import { withMockedConsole } from '../../../tests/utils/console';
import EcModal from './ec-modal.vue';

jest.mock('../../directives/ec-focus-trap');

function mountModal(props, mountOpts) {
  return mount(EcModal, {
    propsData: { ...props },
    ...mountOpts,
  });
}

function mountModalAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
  const localVue = createLocalVue();

  const Component = localVue.extend({
    components: { EcModal },
    template,
    ...wrapperComponentOpts,
  });

  return mount(Component, {
    localVue,
    propsData: { ...props },
    ...mountOpts,
  });
}

describe('EcModal', () => {
  enableAutoDestroy(afterEach);

  it('should not render the modal if "showModal" is not set to true', () => {
    const wrapper = mountModal();
    expect(wrapper.findByDataTest('ec-modal').exists()).toBe(false);
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

    expect(wrapper.findByDataTest('ec-modal__close').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-modal__header').element).toMatchSnapshot();
  });

  it('should not render close button when isClosable is set to false', () => {
    const wrapper = mountModal({
      showModal: true,
      isClosable: false,
    });

    expect(wrapper.findByDataTest('ec-modal__close').exists()).toBe(false);
    expect(wrapper.findByDataTest('ec-modal__header').element).toMatchSnapshot();
  });

  it('should have the ec-modal--lg class', () => {
    const wrapper = mountModal({
      showModal: true,
      large: true,
    });

    expect(wrapper.findByDataTest('ec-modal__content').classes('ec-modal--lg')).toBe(true);
    expect(wrapper.findByDataTest('ec-modal__content').element).toMatchSnapshot();
  });

  it('should have the style attribute z-index when the z-index props is given', async () => {
    const wrapper = mountModal({
      showModal: true,
      zIndex: 210,
    });

    expect(wrapper.findByDataTest('ec-modal').attributes('style')).toBe('z-index: 210;');
    await wrapper.setProps({ zIndex: 235 });
    expect(wrapper.findByDataTest('ec-modal').attributes('style')).toBe('z-index: 235;');
    expect(wrapper.findByDataTest('ec-modal').element).toMatchSnapshot();
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

    expect(wrapper.findByDataTest('ec-modal__footer').exists()).toBe(false);
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

    expect(wrapper.findByDataTest('ec-modal__footer-left-content').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-modal__footer').element).toMatchSnapshot();
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

    expect(wrapper.findByDataTest('ec-modal__negative-btn').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-loading__icon').exists()).toBe(false);
    expect(wrapper.findByDataTest('ec-modal__footer').element).toMatchSnapshot();
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

    expect(wrapper.findByDataTest('ec-modal__negative-btn').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-loading__icon').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-modal__footer').element).toMatchSnapshot();
  });

  it('should render negative button with given category', () => {
    const wrapper = mountModal({
      category: {
        negative: 'warning',
      },
      showModal: true,
    },
    {
      slots: {
        negative: 'Negative button',
      },
    });

    expect(wrapper.findByDataTest('ec-modal__negative-btn').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-modal__negative-btn').classes('ec-btn--warning')).toBe(true);
    expect(wrapper.findByDataTest('ec-modal__footer').element).toMatchSnapshot();
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

    expect(wrapper.findByDataTest('ec-modal__positive-btn').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-loading__icon').exists()).toBe(false);
    expect(wrapper.findByDataTest('ec-modal__footer').element).toMatchSnapshot();
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

    expect(wrapper.findByDataTest('ec-modal__positive-btn').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-loading__icon').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-modal__footer').element).toMatchSnapshot();
  });

  it('should render positive button with given category', () => {
    const wrapper = mountModal({
      category: {
        positive: 'error',
      },
      showModal: true,
    },
    {
      slots: {
        positive: 'Positive button',
      },
    });

    expect(wrapper.findByDataTest('ec-modal__positive-btn').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-modal__positive-btn').classes('ec-btn--error')).toBe(true);
    expect(wrapper.findByDataTest('ec-modal__footer').element).toMatchSnapshot();
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
    wrapper.findByDataTest('ec-modal__positive-btn').trigger('click');
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

    wrapper.findByDataTest('ec-modal__negative-btn').trigger('click');
    expect(wrapper.emitted().negative).toBeTruthy();
  });

  it('should emit a "close" event when clicking on the close button', () => {
    const wrapper = mountModal({
      showModal: true,
      isClosable: true,
    });

    wrapper.findByDataTest('ec-modal__close').trigger('click');
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it('should close the modal if ESC key is pressed and is closable', async () => {
    const elem = document.createElement('div');
    document.body.appendChild(elem);

    const wrapper = mountModal({
      showModal: true,
      isClosable: true,
    }, {
      attachTo: elem,
    });

    await wrapper.trigger('keyup.esc');
    expect(wrapper.emitted().close).toBeTruthy();
  });

  it('should not close the modal if ESC key is pressed and is not closable', async () => {
    const elem = document.createElement('div');
    document.body.appendChild(elem);

    const wrapper = mountModal({
      showModal: true,
      isClosable: false,
    }, {
      attachTo: elem,
    });

    await wrapper.trigger('keyup.esc');
    expect(wrapper.emitted('close')).toBeUndefined();
  });

  it('should not close the modal if key other than ESC is pressed and is closable', async () => {
    const elem = document.createElement('div');
    document.body.appendChild(elem);
    const wrapper = mountModal({
      showModal: true,
      isClosable: true,
    }, {
      attachTo: elem,
    });

    await wrapper.trigger('keyup.space');
    expect(wrapper.emitted('close')).toBeUndefined();
  });

  it('should stop listening to keyup events when closed', async () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    expect(addEventListenerSpy).not.toHaveBeenCalled();

    const elem = document.createElement('div');
    document.body.appendChild(elem);

    const wrapper = mountModal({
      showModal: true,
    }, {
      attachTo: elem,
    });

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledWith('keyup', expect.any(Function));

    await wrapper.setProps({ showModal: false });

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keyup', addEventListenerSpy.mock.calls[0][1]);
  });

  it('should stop listening to keyup events when destroyed', async () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');

    expect(addEventListenerSpy).not.toHaveBeenCalled();

    const elem = document.createElement('div');
    document.body.appendChild(elem);

    const wrapper = mountModal({
      showModal: true,
    }, {
      attachTo: elem,
    });

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledWith('keyup', expect.any(Function));

    await wrapper.destroy();

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keyup', addEventListenerSpy.mock.calls[0][1]);
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

      expect(wrapper.findByDataTest('ec-modal').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();

      await wrapper.findByDataTest('ec-modal__close').trigger('click');

      expect(wrapper.vm.showModal).toBe(false);
      expect(wrapper.findByDataTest('ec-modal').exists()).toBe(false);
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

      expect(wrapper.findByDataTest('ec-modal').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
