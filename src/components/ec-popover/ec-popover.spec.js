import { mount } from '@vue/test-utils';
import { ref } from 'vue';

import EcPopover from './ec-popover.vue';
import { POPOVER_CONTAINER_KEY } from './ec-popover-provide';

describe('EcPopover component', () => {
  function mountEcPopover(props, mountOpts) {
    return mount(EcPopover, {
      props,
      global: {
        stubs: { VDropdown: true },
      },
      ...mountOpts,
    });
  }

  it('should pass default options when no additional props are given', () => {
    const wrapper = mountEcPopover();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should merge default options with given additional options', () => {
    const wrapper = mountEcPopover({
      popperClass: 'my-popover',
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should update options when additional options are also updated', async () => {
    const wrapper = mountEcPopover({ placement: 'left' });
    expect(wrapper.element).toMatchSnapshot('before');

    await wrapper.setProps({ placement: 'bottom' });
    expect(wrapper.element).toMatchSnapshot('after');
  });

  it('should pass all events to the 3rd party tooltip component', async () => {
    const showSpy = jest.fn();
    const wrapper = mountEcPopover({}, {
      attrs: { onShow: showSpy },
    });
    await wrapper.findComponent({ name: 'VDropdown' }).vm.$emit('show');
    expect(showSpy).toHaveBeenCalledTimes(1);
  });

  it('should add the z-index level class if the level was given', () => {
    const wrapper = mountEcPopover({
      level: 'level-30',
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should expose an update function', () => {
    const wrapper = mountEcPopover();
    expect(typeof wrapper.vm.update).toBe('function');
  });

  it('should attach to a different element when provided', () => {
    const wrapper = mount(EcPopover, {
      global: {
        stubs: { VDropdown: true },
        provide: {
          [POPOVER_CONTAINER_KEY]: { container: ref('custom-element') },
        },
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
