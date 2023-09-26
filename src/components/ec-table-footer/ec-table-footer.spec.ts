import { type ComponentMountingOptions, mount } from '@vue/test-utils';

import EcTableFooter from './ec-table-footer.vue';
import type { TableFooterProps } from './types';

describe('EcTableFooter', () => {
  function mountEcTableFooter(props?: Partial<TableFooterProps>, mountOpts?: ComponentMountingOptions<TableFooterProps>) {
    return mount(EcTableFooter, {
      props,
      ...mountOpts,
    });
  }

  it('should render with the given colspan', () => {
    const wrapper = mountEcTableFooter({
      colspan: 6,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render without footer slot', () => {
    const wrapper = mountEcTableFooter();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with footer slot', () => {
    const wrapper = mountEcTableFooter({}, {
      slots: {
        default: '<p>Random text</p>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
