import { type ComponentMountingOptions, mount } from '@vue/test-utils';

import EcBadge from './ec-badge.vue';
import { type BadgeProps, BadgeType } from './types';

describe('EcBadge', () => {
  function mountBadge(props?: Partial<BadgeProps>, mountOpts?: ComponentMountingOptions<typeof EcBadge>) {
    return mount(EcBadge, {
      props: {
        value: 'A random value',
        ...props,
      },
      ...mountOpts,
    });
  }

  it('should render as expected with a string value', () => {
    const wrapper = mountBadge({
      value: 'Random value',
    });

    expect(wrapper.findByDataTest('ec-badge').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected with a number value', () => {
    const wrapper = mountBadge({
      value: 1,
    });

    expect(wrapper.findByDataTest('ec-badge').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  it.each(Object.values(BadgeType))('should use the type "%s"', (type) => {
    const wrapper = mountBadge({ type });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with the default slot given', () => {
    const wrapper = mountBadge(
      {
        value: 'a random value',
      },
      {
        slots: {
          default: `
            <template #default="{ value }">
                Custom: {{ value }}
            </template>`,
        },
      },
    );
    expect(wrapper.element).toMatchSnapshot();
  });
});
