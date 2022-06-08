import { mount } from '@vue/test-utils';

import EcPopover from './ec-popover.vue';

describe('EcPopover component', () => {
  function mountEcPopover(props, mountOpts) {
    return mount(EcPopover, {
      props,
      global: {
        stubs: { FvDropdown: true },
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
    await wrapper.findComponent({ name: 'FvDropdown' }).vm.$emit('show');
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
});
