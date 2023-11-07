import { mount } from '@vue/test-utils';
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import { vi } from 'vitest';
import { defineComponent } from 'vue';

import { withMockedConsole } from '../../../tests/utils/console';
import EcModal from './ec-modal.vue';

function mountModal(props, mountOpts) {
  return mount(EcModal, {
    props,
    ...mountOpts,
  });
}

function mountModalAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
  const Component = defineComponent({
    components: { EcModal },
    template,
    ...wrapperComponentOpts,
  });

  return mount(Component, {
    props,
    ...mountOpts,
  });
}

describe('EcModal', () => {
  it('should not render the modal if "show" is not set to true', () => {
    const wrapper = mountModal();
    expect(wrapper.findByDataTest('ec-modal').exists()).toBe(false);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should be called with the "useFocusTrap composable" mandatory options', () => {
    mountModal({ show: true });
    const options = useFocusTrap.mock.calls[0][1];
    expect(options)
      .toEqual({
        clickOutsideDeactivates: true,
        escapeDeactivates: true,
        immediate: true,
      });
  });

  it('should render basic modal', () => {
    const wrapper = mountModal(
      { show: true },
      {
        slots: {
          main: '<p>Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>',
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with custom attributes', () => {
    const wrapper = mountModal({
      show: true,
    }, {
      attrs: {
        'data-test': 'my-data-test',
        class: 'my-class',
        id: 'test-id',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render close button', () => {
    const wrapper = mountModal({ show: true });

    expect(wrapper.findByDataTest('ec-modal__close').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-modal__header').element).toMatchSnapshot();
  });

  it('should not render close button when isClosable is set to false', () => {
    const wrapper = mountModal({
      show: true,
      isClosable: false,
    });

    expect(wrapper.findByDataTest('ec-modal__close').exists()).toBe(false);
    expect(wrapper.findByDataTest('ec-modal__header').element).toMatchSnapshot();
  });

  it('should have the ec-modal--lg class', () => {
    const wrapper = mountModal({
      show: true,
      large: true,
    });

    expect(wrapper.findByDataTest('ec-modal__content').classes('ec-modal--lg')).toBe(true);
    expect(wrapper.findByDataTest('ec-modal__content').element).toMatchSnapshot();
  });

  it('should have the style attribute z-index when the z-index props is given', async () => {
    const wrapper = mountModal({
      show: true,
      zIndex: 210,
    });

    expect(wrapper.findByDataTest('ec-modal').attributes('style')).toBe('z-index: 210;');
    await wrapper.setProps({ zIndex: 235 });
    expect(wrapper.findByDataTest('ec-modal').attributes('style')).toBe('z-index: 235;');
    expect(wrapper.findByDataTest('ec-modal').element).toMatchSnapshot();
  });

  it('should throw an error when we try to pass a number not allowed on the z-index prop', () => {
    withMockedConsole((errorSpy, warnSpy) => {
      // The error can be throw when we don't pass a number between 200 and 250
      mountModal({
        show: true,
        zIndex: 200,
      });
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "zIndex"');
    });
  });

  it('should not render the footer if slots for left content, positive, nor negative were not passed', () => {
    const wrapper = mountModal({
      show: true,
    }, {
      slots: {},
    });

    expect(wrapper.findByDataTest('ec-modal__footer').exists()).toBe(false);
  });

  it('should render footer left section when slot is passed', () => {
    const wrapper = mountModal({
      show: true,
    }, {
      slots: {
        footerLeftContent: '<p>Need Help ?</p>',
      },
    });

    expect(wrapper.findByDataTest('ec-modal__footer-left-content').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-modal__footer').element).toMatchSnapshot();
  });

  it('should render negative button if slot is passed', () => {
    const wrapper = mountModal({
      show: true,
    }, {
      slots: {
        negative: 'Skip for now',
      },
    });

    expect(wrapper.findByDataTest('ec-modal__negative-btn').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-loading__icon').exists()).toBe(false);
    expect(wrapper.findByDataTest('ec-modal__footer').element).toMatchSnapshot();
  });

  it('should render with an enabled negative button by default', () => {
    const wrapper = mountModal({
      show: true,
    }, {
      slots: {
        negative: 'Negative Button',
      },
    });
    expect(wrapper.findByDataTest('ec-modal__negative-btn').isDisabled()).toBe(false);
    expect(wrapper.findByDataTest('ec-modal__negative-btn')).toMatchSnapshot();
  });

  it('should disable the negative button when the "isDisabled" given prop is true', () => {
    const wrapper = mountModal({
      show: true,
      negativeButtonProps: {
        isDisabled: true,
      },
    }, {
      slots: {
        negative: 'negative Button',
      },
    });
    expect(wrapper.findByDataTest('ec-modal__negative-btn').isDisabled()).toBe(true);
    expect(wrapper.findByDataTest('ec-modal__negative-btn')).toMatchSnapshot();
  });

  it('should render negative button with the loading status if slot is passed', () => {
    const wrapper = mountModal({
      isLoading: {
        negative: true,
      },
      show: true,
    }, {
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
      show: true,
    }, {
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
      show: true,
    }, {
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
      show: true,
    }, {
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
      show: true,
    }, {
      slots: {
        positive: 'Positive button',
      },
    });

    expect(wrapper.findByDataTest('ec-modal__positive-btn').exists()).toBe(true);
    expect(wrapper.findByDataTest('ec-modal__positive-btn').classes('ec-btn--error')).toBe(true);
    expect(wrapper.findByDataTest('ec-modal__footer').element).toMatchSnapshot();
  });

  it('should emit a "positive" event when clicking on the positive button', () => {
    const wrapper = mountModal({
      show: true,
    }, {
      slots: {
        positive: 'Positive Button',
      },
    });
    wrapper.findByDataTest('ec-modal__positive-btn').trigger('click');
    expect(wrapper.emitted('positive').length).toBe(1);
  });

  it('should render with an enabled positive button by default', () => {
    const wrapper = mountModal({
      show: true,
    }, {
      slots: {
        positive: 'Positive Button',
      },
    });
    expect(wrapper.findByDataTest('ec-modal__positive-btn').isDisabled()).toBe(false);
    expect(wrapper.findByDataTest('ec-modal__positive-btn')).toMatchSnapshot();
  });

  it('should disable the positive button when the "isDisabled" given prop is true', () => {
    const wrapper = mountModal({
      show: true,
      positiveButtonProps: {
        isDisabled: true,
      },
    }, {
      slots: {
        positive: 'Positive Button',
      },
    });
    expect(wrapper.findByDataTest('ec-modal__positive-btn').isDisabled()).toBe(true);
    expect(wrapper.findByDataTest('ec-modal__positive-btn')).toMatchSnapshot();
  });

  it('should emit a "negative" event when clicking on the negative button', () => {
    const wrapper = mountModal({
      show: true,
    }, {
      slots: {
        negative: 'Negative Button',
      },
    });

    wrapper.findByDataTest('ec-modal__negative-btn').trigger('click');
    expect(wrapper.emitted('negative').length).toBe(1);
  });

  it('should emit a "close" event when clicking on the close button', () => {
    const wrapper = mountModal({
      show: true,
      isClosable: true,
    });

    wrapper.findByDataTest('ec-modal__close').trigger('click');
    expect(wrapper.emitted('close').length).toBe(1);
    expect(wrapper.emitted('update:show').length).toBe(1);
  });

  it('should close the modal if ESC key is pressed and is closable', async () => {
    const elem = document.createElement('div');
    document.body.appendChild(elem);

    const wrapper = mountModal({
      show: true,
      isClosable: true,
    }, {
      attachTo: elem,
    });

    await wrapper.trigger('keyup.esc');
    expect(wrapper.emitted('close').length).toBe(1);
    expect(wrapper.emitted('update:show').length).toBe(1);
  });

  it('should not close the modal if ESC key is pressed and is not closable', async () => {
    const elem = document.createElement('div');
    document.body.appendChild(elem);

    const wrapper = mountModal({
      show: true,
      isClosable: false,
    }, {
      attachTo: elem,
    });

    await wrapper.trigger('keyup.esc');
    expect(wrapper.emitted('close')).toBeUndefined();
    expect(wrapper.emitted('update:show')).toBeUndefined();
  });

  it('should not close the modal if key other than ESC is pressed and is closable', async () => {
    const elem = document.createElement('div');
    document.body.appendChild(elem);
    const wrapper = mountModal({
      show: true,
      isClosable: true,
    }, {
      attachTo: elem,
    });

    await wrapper.trigger('keyup.space');
    expect(wrapper.emitted('close')).toBeUndefined();
    expect(wrapper.emitted('update:show')).toBeUndefined();
  });

  it('should stop listening to keyup events when closed', async () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    expect(addEventListenerSpy).not.toHaveBeenCalled();

    const elem = document.createElement('div');
    document.body.appendChild(elem);

    const wrapper = mountModal({
      show: true,
    }, {
      attachTo: elem,
    });

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledWith('keyup', expect.any(Function));

    await wrapper.setProps({ show: false });

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keyup', addEventListenerSpy.mock.calls[0][1]);
  });

  it('should stop listening to keyup events when destroyed', async () => {
    const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    expect(addEventListenerSpy).not.toHaveBeenCalled();

    const elem = document.createElement('div');
    document.body.appendChild(elem);

    const wrapper = mountModal({
      show: true,
    }, {
      attachTo: elem,
    });

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(addEventListenerSpy).toHaveBeenCalledWith('keyup', expect.any(Function));

    await wrapper.unmount();

    expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keyup', addEventListenerSpy.mock.calls[0][1]);
  });

  describe('v-model', () => {
    it('should render the modal when we pass to model true', async () => {
      const wrapper = mountModalAsTemplate(
        ' <ec-modal is-closable v-model:show="show"></ec-modal>',
        {},
        {
          data() {
            return {
              show: true,
            };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-modal').exists()).toBe(true);
      expect(wrapper.element).toMatchSnapshot();

      await wrapper.findByDataTest('ec-modal__close').trigger('click');

      expect(wrapper.vm.show).toBe(false);
      expect(wrapper.findByDataTest('ec-modal').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should not render the modal when we pass to model false', () => {
      const wrapper = mountModalAsTemplate(
        ' <ec-modal is-closable v-model:show="show"></ec-modal>',
        {},
        {
          data() {
            return {
              show: false,
            };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-modal').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('when second modal is present', () => {
    it('should be rendered with a second modal', () => {
      const template = `
      <div>
        <ec-modal
          is-closable
          large
          v-model:show="showFirstModal">

          <template #header>
            <h2>First Modal</h2>
          </template>

          <template #main>
            <div>
              <button data-test="first-modal-action__btn">Action first modal</button>
              <p class="tw-mt-0">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
            </div>
          </template>
        </ec-modal>

        <ec-modal
          is-closable
          :z-index="zIndex"
          v-model:show="showSecondModal">

          <template #header>
            <h2>Second Modal</h2>
          </template>

          <template #main>
            <div>
              <button data-test="second-modal-action__btn">Action second modal</button>
              <p class="tw-mt-0">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
            </div>
          </template>
        </ec-modal>
      </div>
    `;
      const wrapper = mountModalAsTemplate(
        template,
        {},
        {
          data() {
            return {
              showFirstModal: true,
              showSecondModal: true,
              zIndex: 201,
            };
          },
        },
      );
      expect(wrapper.findByDataTest('ec-modal').element).toMatchSnapshot();
      expect(wrapper.findByDataTest('second-modal-action__btn').exists()).toBe(true);
    });
    it('should be rendered with a second modal button clickable', () => {
      const template = `
      <div>
        <ec-modal
          is-closable
          large
          v-model:show="showFirstModal">

          <template #header>
            <h2>First Modal</h2>
          </template>

          <template #main>
            <div>
              <button @click.prevent.stop="firstModalAction" data-test="first-modal-action__btn">Action first modal</button>
              <p class="tw-mt-0">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
            </div>
          </template>
        </ec-modal>

        <ec-modal
          is-closable
          :z-index="zIndex"
          v-model:show="showSecondModal">

          <template #header>
            <h2>Second Modal</h2>
          </template>

          <template #main>
            <div>
              <button @click.prevent.stop="secondModalAction" data-test="second-modal-action__btn">Action second modal</button>
              <p class="tw-mt-0">Before we can process your application we need you to upload your management accounts. You can do this now or leave it for later.</p>
            </div>
          </template>
        </ec-modal>
      </div>
    `;
      const wrapper = mountModalAsTemplate(
        template,
        {},
        {
          data() {
            return {
              showFirstModal: true,
              showSecondModal: true,
              zIndex: 201,
              firstModalAction: vi.fn(),
              secondModalAction: vi.fn(),
            };
          },
        },
      );
      wrapper.findByDataTest('second-modal-action__btn').trigger('click');
      expect(wrapper.vm.secondModalAction).toHaveBeenCalled();
    });
  });
});
