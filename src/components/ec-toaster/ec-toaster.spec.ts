import { type ComponentMountingOptions, mount, VueWrapper } from '@vue/test-utils';
import { vi } from 'vitest';

import EcToaster from './ec-toaster.vue';
import { type ToasterMessage, ToasterMessageType, type ToasterProps } from './types';

const messages: ToasterMessage[] = [
  {
    id: 1,
    type: ToasterMessageType.SUCCESS,
    title: 'This is the title',
    subtitle: 'This is the subtitle',
  },
];

const allTypeMessages: ToasterMessage[] = Object.values(ToasterMessageType).map((type, id) => ({
  id, type, title: 'random', subtitle: 'random',
}));

function mountToaster(props?: ToasterProps, mountOpts?: ComponentMountingOptions<typeof EcToaster>) {
  return mount(EcToaster, {
    props,
    ...mountOpts,
  });
}

describe('EcToaster', () => {
  describe('messages prop', () => {
    it('should not render the toaster if no props are passed', () => {
      const wrapper = mountToaster();
      expect(wrapper.findByDataTest('ec-toaster__item').exists()).toBe(false);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render a toaster if the messages prop is passed', () => {
      const wrapper = mountToaster({ messages: allTypeMessages });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('swipe', () => {
    it('should emit a "remove" event when toaster is swiped for more than 50px to the right', () => {
      const wrapper = mountToaster({ messages });
      swipe(wrapper, 200, 251);

      expect(wrapper.emitted('remove')?.length).toBe(1);
      expect(wrapper.emitted('remove')?.[0]).toEqual([messages[0]]);
    });
    it('should not emit a "remove" event when toaster is swiped for less than 50px to the right', () => {
      const wrapper = mountToaster({ messages });
      swipe(wrapper, 200, 249);

      expect(wrapper.emitted('remove')).toBeUndefined();
    });

    it('should not emit a "remove" event when toaster is swiped to the left', () => {
      const wrapper = mountToaster({ messages });
      swipe(wrapper, 200, 199);

      expect(wrapper.emitted('remove')).toBeUndefined();
    });

    it('should add a class of "ec-toaster__item--swipe-active" when swap starts', () => {
      const wrapper = mountToaster({ messages });
      wrapper.findByDataTest('ec-toaster__item').trigger('touchstart', { changedTouches: [{ pageX: 200 }] });

      expect(wrapper.findByDataTest('ec-toaster__item').classes('ec-toaster__item--swipe-active')).toBe(true);
    });

    it('should remove the class of "ec-toaster__item--swipe-active" when swap finish', () => {
      const wrapper = mountToaster({ messages });
      wrapper.findByDataTest('ec-toaster__item').trigger('touchend', { changedTouches: [{ pageX: 300 }] });

      expect(wrapper.findByDataTest('ec-toaster__item').classes('ec-toaster__item--swipe-active')).toBe(false);
    });

    it('should stop listening to touch events after being destroyed', async () => {
      const wrapper = mountToaster({ messages });
      const item = wrapper.findByDataTest('ec-toaster__item').element;

      const spy = vi.spyOn(item, 'removeEventListener');
      await wrapper.setProps({ messages: [] });
      expect(spy).toHaveBeenCalledTimes(4);
    });

    it('should follow the pointer touching the item when swiping to the right', () => {
      const wrapper = mountToaster({ messages });
      const item = wrapper.findByDataTest<HTMLElement>('ec-toaster__item');

      item.trigger('touchstart', { changedTouches: [{ pageX: 0 }] });
      item.trigger('touchmove', { changedTouches: [{ pageX: 20 }] });
      expect(item.element.style.transform).toBe('translateX(20px)');

      item.trigger('touchmove', { changedTouches: [{ pageX: 30 }] });
      expect(item.element.style.transform).toBe('translateX(30px)');

      item.trigger('touchmove', { changedTouches: [{ pageX: 10 }] });
      expect(item.element.style.transform).toBe('translateX(10px)');
    });

    it('should not follow the pointer touching the item when swiping to the left', () => {
      const wrapper = mountToaster({ messages });
      const item = wrapper.findByDataTest<HTMLElement>('ec-toaster__item');

      item.trigger('touchstart', { changedTouches: [{ pageX: 20 }] });
      item.trigger('touchmove', { changedTouches: [{ pageX: 0 }] });
      expect(item.element.style.transform).toBe('');
    });

    it('should restore the original transform style prop when swipe gets cancelled', () => {
      const wrapper = mountToaster({ messages });
      const item = wrapper.findByDataTest<HTMLElement>('ec-toaster__item');
      item.element.style.transform = 'scale(1.5)';

      item.trigger('touchstart', { changedTouches: [{ pageX: 0 }] });
      item.trigger('touchmove', { changedTouches: [{ pageX: 20 }] });
      expect(item.element.style.transform).toBe('translateX(20px)');
      item.trigger('touchcancel');
      expect(item.element.style.transform).toBe('scale(1.5)');
    });

    function swipe(wrapper: VueWrapper, startX: number, endX: number) {
      wrapper.findByDataTest('ec-toaster__item').trigger('touchstart', { changedTouches: [{ pageX: startX }] });
      wrapper.findByDataTest('ec-toaster__item').trigger('touchend', { changedTouches: [{ pageX: endX }] });
    }
  });

  it('should emit a "remove" event when dismiss button is clicked', () => {
    const wrapper = mountToaster({ messages });
    wrapper.findByDataTest('ec-alert__dismiss-icon').trigger('click');

    expect(wrapper.emitted('remove')?.length).toBe(1);
    expect(wrapper.emitted('remove')?.[0]).toEqual([messages[0]]);
  });

  it('should not contain initially a class of "ec-toaster__item--swipe-active"', () => {
    const wrapper = mountToaster({ messages });

    expect(wrapper.findByDataTest('ec-toaster__item').classes('ec-toaster__item--swipe-active')).toBe(false);
    expect(wrapper.findByDataTest('ec-toaster__item').element).toMatchSnapshot();
  });
});
