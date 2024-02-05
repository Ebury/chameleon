import type { ComponentMountingOptions } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';

import EcIcon from './ec-icon.vue';
import { IconName, type IconProps, IconType } from './types';

describe('EcIcon', () => {
  function mountEcIcon(props?: IconProps, mountOpts?: ComponentMountingOptions<typeof EcIcon>) {
    return mount(
      EcIcon,
      {
        props,
        ...mountOpts,
      },
    );
  }

  it('should render properly when a name was given', () => {
    const wrapper = mount(EcIcon, { props: { name: IconName.SIMPLE_ADD } });

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.classes('ec-icon')).toBe(true);
  });

  it('should use the given size prop', () => {
    const wrapper = mountEcIcon({ name: IconName.SIMPLE_ADD, size: 16 });
    expect(wrapper.element).toMatchSnapshot();
  });

  it.each([undefined, IconType.ERROR, IconType.INFO, IconType.SUCCESS, IconType.WARNING])('should use the type "%s"', (type) => {
    const wrapper = mountEcIcon({ name: IconName.SIMPLE_ADD, type });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.classes(`ec-icon--${type}`)).toBe(!!type);
  });

  it('should pass custom attributes', () => {
    const wrapper = mountEcIcon(
      { name: IconName.SIMPLE_ADD },
      {
        attrs: {
          id: 'my-icon',
          'data-test': 'my-custom-icon',
          class: 'my-class',
        },
      },
    );

    expect(wrapper.attributes('id')).toBe('my-icon');
    expect(wrapper.attributes('data-test')).toBe('my-custom-icon');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should pass a custom event handler', () => {
    const clickSpy = vi.fn();
    const wrapper = mountEcIcon(
      {
        name: IconName.SIMPLE_ADD,
      },
      {
        attrs: {
          onClick: clickSpy,
          'data-test': 'my-custom-icon',
        },
      },
    );

    wrapper.findByDataTest('my-custom-icon').trigger('click');
    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted('click')?.length).toBe(1);
  });
});
