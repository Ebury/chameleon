import { type ComponentMountingOptions, mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { defineComponent, ref } from 'vue';

import { ZIndexLevel } from '../../enums';
import EcPopover from './ec-popover.vue';
import { POPOVER_CONTAINER_KEY } from './ec-popover-provide';
import { PopoverPlacement, type PopoverProps, PopoverTrigger } from './types';

describe('EcPopover component', () => {
  function mountEcPopover(props?: PopoverProps, mountOpts?: ComponentMountingOptions<typeof EcPopover>) {
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

  it('should render with custom attributes', () => {
    const wrapper = mountEcPopover({}, {
      attrs: {
        'data-test': 'my-data-test',
        class: 'my-class',
        id: 'test-id',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should merge default options with given additional options', () => {
    const wrapper = mountEcPopover({
      popperClass: 'my-popover',
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should update options when additional options are also updated', async () => {
    const wrapper = mountEcPopover({
      placement: PopoverPlacement.LEFT,
      triggers: [PopoverTrigger.CLICK],
    });
    expect(wrapper.element).toMatchSnapshot('before');

    await wrapper.setProps({
      placement: PopoverPlacement.BOTTOM,
      triggers: [PopoverTrigger.HOVER],
    });
    expect(wrapper.element).toMatchSnapshot('after');
  });

  it('should pass all events to the 3rd party tooltip component', async () => {
    const showSpy = vi.fn();
    const wrapper = mountEcPopover({}, {
      attrs: { onShow: showSpy },
    });
    await wrapper.findComponent({ name: 'VDropdown' }).vm.$emit('show');
    expect(showSpy).toHaveBeenCalledTimes(1);
  });

  it('should add the z-index level class if the level was given', () => {
    const wrapper = mountEcPopover({
      level: ZIndexLevel.LEVEL3,
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

  it('should render given slot', () => {
    const FakeVDropdown = defineComponent({
      template: '<ec-stub><slot name="popper"></slot></ec-stub>',
    });

    const wrapper = mount(EcPopover, {
      global: {
        stubs: { VDropdown: FakeVDropdown },
      },
      slots: {
        popper: '<div>Random text</div>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
