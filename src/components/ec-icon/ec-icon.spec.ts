import type { ComponentMountingOptions } from '@vue/test-utils';
import { mount } from '@vue/test-utils';

import type { CVueWrapper } from '../../../tests/utils/global';
import EcIcon from './ec-icon.vue';
import { IconName, type IconProps, IconType } from './types';

describe('EcIcon', () => {
  function mountEcIcon(props?: IconProps, mountOpts?: ComponentMountingOptions<IconProps>): CVueWrapper {
    return mount(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      EcIcon as any,
      {
        props,
        ...mountOpts,
      },
    ) as CVueWrapper;
  }

  it('should render properly when a name was given', () => {
    const wrapper = mount(EcIcon, { props: { name: IconName.SimpleAdd } });

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.classes('ec-icon')).toBe(true);
  });

  it('should use the given size prop', () => {
    const wrapper = mountEcIcon({ name: IconName.SimpleAdd, size: 16 });
    expect(wrapper.element).toMatchSnapshot();
  });

  it.each([undefined, IconType.ERROR, IconType.INFO, IconType.SUCCESS, IconType.WARNING])('should use the type "%s"', (type) => {
    const wrapper = mountEcIcon({ name: IconName.SimpleAdd, type });
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.classes(`ec-icon--${type}`)).toBe(!!type);
  });

  it('should pass custom attributes', () => {
    const wrapper = mountEcIcon(
      { name: IconName.SimpleAdd },
      {
        attrs: {
          id: 'my-icon',
          'data-test': 'my-custom-icon',
        },
      },
    );

    expect(wrapper.attributes('id')).toBe('my-icon');
    expect(wrapper.attributes('data-test')).toBe('my-custom-icon');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should pass a custom event handler', () => {
    const clickSpy = jest.fn();
    const wrapper = mountEcIcon(
      {
        name: IconName.SimpleAdd,
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
