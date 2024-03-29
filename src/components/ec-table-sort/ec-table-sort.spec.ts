import { type ComponentMountingOptions, mount } from '@vue/test-utils';

import { SortDirection } from '../../enums';
import EcTableSort from './ec-table-sort.vue';
import type { TableSortProps } from './types';

describe('EcTableSort', () => {
  function mountEcTableSort(props?: TableSortProps, mountOpts?: ComponentMountingOptions<typeof EcTableSort>) {
    return mount(EcTableSort, {
      props,
      ...mountOpts,
    });
  }

  it('should render as expected', () => {
    const wrapper = mountEcTableSort();
    expect(wrapper.element).toMatchSnapshot();
  });

  describe(':props', () => {
    it('should render with no direction', () => {
      const wrapper = mountEcTableSort({ direction: null });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with direction set to empty string', () => {
      const wrapper = mountEcTableSort({ direction: '' });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with direction set to ASC', () => {
      const wrapper = mountEcTableSort({ direction: SortDirection.ASC });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with direction set to DESC', () => {
      const wrapper = mountEcTableSort({ direction: SortDirection.DESC });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@events', () => {
    it('should notify parent about sorting', () => {
      const wrapper = mountEcTableSort({ direction: SortDirection.ASC });

      wrapper.findByDataTest('ec-table-sort__icon').trigger('click');
      expect(wrapper.emitted('sort')).toEqual([[SortDirection.ASC]]);
    });
  });

  describe('#slots', () => {
    it('should render default slot', () => {
      const wrapper = mountEcTableSort({}, {
        slots: {
          default: '<div>Random title</div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
