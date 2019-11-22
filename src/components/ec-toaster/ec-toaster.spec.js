/* eslint-disable no-use-before-define */
import { mount } from '@vue/test-utils';
import EcToaster from './ec-toaster.vue';

const messages = [
  {
    id: 1,
    type: 'success',
    title: 'This is the title',
    subtitle: 'This is the subtitle',
  },
];

const messagesTypes = ['error', 'success', 'info', 'warning'].map((type, id) => ({
  id, type, title: 'random', subtitle: 'random',
}));

function mountToaster(props, mountOpts) {
  return mount(EcToaster, {
    propsData: { ...props },
    ...mountOpts,
  });
}

describe('EcToaster', () => {
  describe('messages prop', () => {
    it('should not render the toaster if no props are passed', () => {
      const wrapper = mountToaster();
      expect(wrapper.find('.ec-toaster__item').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a toaster if the messages prop is passed', () => {
      const wrapper = mountToaster({ messages: messagesTypes });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('swipe', () => {
    it('should emit a "remove" event when toaster is swiped for more than 50px to the right', () => {
      const wrapper = mountToaster({ messages });
      swipe(wrapper, 200, 251);

      expect(wrapper.emitted('remove')).toBeTruthy();
      expect(wrapper.emitted('remove')[0]).toEqual([messages[0]]);
    });
    it('should not emit a "remove" event when toaster is swiped for less than 50px to the right', () => {
      const wrapper = mountToaster({ messages });
      swipe(wrapper, 200, 249);

      expect(wrapper.emitted('remove')).toBeFalsy();
    });

    it('should not emit a "remove" event when toaster is swiped to the left', () => {
      const wrapper = mountToaster({ messages });
      swipe(wrapper, 200, 199);

      expect(wrapper.emitted('remove')).toBeFalsy();
    });

    it('should add a class of "ec-toaster__item--swipe-active" when swap starts', () => {
      const wrapper = mountToaster({ messages });
      wrapper.find('.ec-toaster__item').trigger('touchstart', { changedTouches: [{ pageX: 200 }] });

      expect(wrapper.find('.ec-toaster__item').classes('ec-toaster__item--swipe-active')).toBe(true);
    });

    it('should remove the class of "ec-toaster__item--swipe-active" when swap finish', () => {
      const wrapper = mountToaster({ messages });
      wrapper.find('.ec-toaster__item').trigger('touchend', { changedTouches: [{ pageX: 300 }] });

      expect(wrapper.find('.ec-toaster__item').classes('ec-toaster__item--swipe-active')).toBe(false);
    });

    function swipe(wrapper, startX, endX) {
      wrapper.find('.ec-toaster__item').trigger('touchstart', { changedTouches: [{ pageX: startX }] });
      wrapper.find('.ec-toaster__item').trigger('touchend', { changedTouches: [{ pageX: endX }] });
    }
  });

  it('should emit a "remove" event when dismiss button is clicked', () => {
    const wrapper = mountToaster({ messages });
    wrapper.find('.ec-alert__dismiss-icon').trigger('click');

    expect(wrapper.emitted('remove')[0]).toEqual([messages[0]]);
    expect(wrapper.emitted('remove')).toBeTruthy();
  });

  it('should not contain initially a class of "ec-toaster__item--swipe-active" ', () => {
    const wrapper = mountToaster({ messages });

    expect(wrapper.find('.ec-toaster__item').classes('ec-toaster__item--swipe-active')).toBe(false);
    expect(wrapper.find('.ec-toaster__item').element).toMatchSnapshot();
  });
});
