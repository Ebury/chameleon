import { mount } from '@vue/test-utils';

import { withMockedConsole } from '../../../tests/utils/console';
import * as SortDirection from '../../enums/sort-direction';
import EcTableSort from './ec-table-sort.vue';

describe('EcTableSort', () => {
  function mountEcTableSort(props, mountOpts) {
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

    it('should validate direction prop', () => {
      withMockedConsole((errorSpy, warnSpy) => {
        mountEcTableSort({ direction: 'invalid' });
        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "direction"');
      });
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
