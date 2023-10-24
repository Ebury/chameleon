import { mount } from '@vue/test-utils';
import { h } from 'vue';

import { withMockedConsole } from '../../../tests/utils/console';
import EcTablePagination from './ec-table-pagination.vue';

describe('EcTablePagination', () => {
  function mountEcTablePagination(props, mountOpts) {
    return mount(EcTablePagination, {
      props: { ...props },
      ...mountOpts,
    });
  }

  it('should render as expected', () => {
    const wrapper = mountEcTablePagination();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw if the prop numberOfItems has a invalid value', () => {
    withMockedConsole((errorSpy, warnSpy) => {
      mountEcTablePagination({ numberOfItems: 7 });
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "numberOfItems"');
    });
  });

  it('should display page information by calculating total number of pages', () => {
    const wrapper = mountEcTablePagination({
      total: 20,
      numberOfItems: 5,
      page: 2,
      isPageSizeHidden: false,
      isTotalHidden: false,
    });
    expect(wrapper.findByDataTest('ec-table-pagination__current-page').element).toMatchSnapshot();
  });

  it('should display last page information by calculating total number of pages', () => {
    const wrapper = mountEcTablePagination({ total: 20, numberOfItems: 5, page: 4 });
    expect(wrapper.findByDataTest('ec-table-pagination__current-page').element).toMatchSnapshot();
  });

  it('should display first page information by calculating total number of pages', () => {
    const wrapper = mountEcTablePagination({ total: 20, numberOfItems: 5, page: 1 });
    expect(wrapper.findByDataTest('ec-table-pagination__current-page').element).toMatchSnapshot();
  });

  it('should display page information even if the total is 0', () => {
    const wrapper = mountEcTablePagination({ total: 0 });
    expect(wrapper.findByDataTest('ec-table-pagination__current-page').element).toMatchSnapshot();
  });

  it('should display page information when last page is incomplete', () => {
    const wrapper = mountEcTablePagination({ total: 29, numberOfItems: 5, page: 6 });
    expect(wrapper.findByDataTest('ec-table-pagination__current-page').element).toMatchSnapshot();
  });

  it('should display the page size dropdown with preselected value', () => {
    const wrapper = mountEcTablePagination({ numberOfItems: 50 });
    expect(wrapper.findByDataTest('ec-table-pagination__page-size').element).toMatchSnapshot();
  });

  it('should display next and prev buttons disabled if pagination has only one page', () => {
    const wrapper = mountEcTablePagination({ numberOfItems: 50, total: 50, page: 1 });
    expect(wrapper.findByDataTest('ec-table-pagination__actions').element).toMatchSnapshot();
  });

  it('should display only next button disabled if pagination is on the last page', () => {
    const wrapper = mountEcTablePagination({ numberOfItems: 10, total: 50, page: 5 });
    expect(wrapper.findByDataTest('ec-table-pagination__actions').element).toMatchSnapshot();
  });

  it('should display only prev button disabled if pagination is on the first page', () => {
    const wrapper = mountEcTablePagination({ numberOfItems: 10, total: 50, page: 1 });
    expect(wrapper.findByDataTest('ec-table-pagination__actions').element).toMatchSnapshot();
  });

  it('should display next and prev buttons enabled if pagination is in the middle', () => {
    const wrapper = mountEcTablePagination({ numberOfItems: 10, total: 50, page: 3 });
    expect(wrapper.findByDataTest('ec-table-pagination__actions').element).toMatchSnapshot();
  });

  it('should not render page size when "isPageSizeHidden" prop is true', () => {
    const wrapper = mountEcTablePagination({
      isPageSizeHidden: true,
    });
    expect(wrapper.findByDataTest('ec-table-pagination__page-size').exists()).toBe(false);
  });

  it('should not render custom info when "isTotalHidden" prop is true', () => {
    const wrapper = mountEcTablePagination({
      isTotalHidden: true,
    });
    expect(wrapper.findByDataTest('ec-table-pagination__total').exists()).toBe(false);
  });

  describe('#slots', () => {
    it('should use given pages slot', () => {
      const wrapper = mountEcTablePagination({ total: 20, numberOfItems: 5, page: 1 }, {
        slots: {
          pages(slotProps) {
            return h('div', `Pages slot: ${JSON.stringify(slotProps)}`);
          },
        },
      });

      expect(wrapper.findByDataTest('ec-table-pagination__current-page').element).toMatchSnapshot();
    });

    it('should use given total slot', () => {
      const wrapper = mountEcTablePagination({
        total: 20,
        numberOfItems: 5,
        page: 1,
        isTotalHidden: false,
      }, {
        slots: {
          total(slotProps) {
            return h('div', `Total slot: ${JSON.stringify(slotProps)}`);
          },
        },
      });

      expect(wrapper.findByDataTest('ec-table-pagination__total').element).toMatchSnapshot();
    });
  });

  describe('@events', () => {
    it('should change the selected page size', async () => {
      const wrapper = mountEcTablePagination({ numberOfItems: 10 });
      await wrapper.findByDataTest('ec-table-pagination__action--page-size').trigger('click');
      await wrapper.findByDataTest('ec-dropdown-search__item--2').trigger('click');
      expect(wrapper.emitted('change')).toStrictEqual([[1, 50]]);
    });

    it('should change the selected page size and reset current page when pagination is not showing the first page', async () => {
      const wrapper = mountEcTablePagination({
        total: 100,
        page: 2,
        numberOfItems: 10,
        isPageSizeHidden: false,
      });
      await wrapper.findByDataTest('ec-table-pagination__action--page-size').trigger('click');
      await wrapper.findByDataTest('ec-dropdown-search__item--2').trigger('click');
      expect(wrapper.emitted('change')).toStrictEqual([[1, 50]]);
    });

    it('should change the current page when prev button is clicked', async () => {
      const wrapper = mountEcTablePagination({ numberOfItems: 10, total: 50, page: 3 });
      await wrapper.findByDataTest('ec-table-pagination__action--prev').trigger('click');
      expect(wrapper.emitted('change')).toStrictEqual([[2, 10]]);
    });

    it('should change the current page when next button is clicked', async () => {
      const wrapper = mountEcTablePagination({ numberOfItems: 10, total: 50, page: 3 });
      await wrapper.findByDataTest('ec-table-pagination__action--next').trigger('click');
      expect(wrapper.emitted('change')).toStrictEqual([[4, 10]]);
    });
  });
});
