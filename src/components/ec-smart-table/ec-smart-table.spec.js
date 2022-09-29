import { mount } from '@vue/test-utils';
import { h, markRaw } from 'vue';

import * as SortDirection from '../../enums/sort-direction';
import EcSmartTable from './ec-smart-table.vue';

describe('EcSmartTable', () => {
  const columns = [
    { name: 'test1', title: 'Test 1', sortable: true },
    { name: 'test2', title: 'Test 2', sortable: false },
    { name: 'test3', title: 'Test 3', sortable: true },
  ];

  const data = {
    count: 1,
    total: 1,
    items: [[1, 2, 3]],
  };

  const emptyData = {
    count: 0,
    total: 0,
    items: [],
  };

  const lotsOfItems = new Array(10).map((val, i) => [i + 1, i + 2, i + 3]);
  const lotsOfData = {
    items: lotsOfItems,
    total: lotsOfItems.length * 5,
    count: lotsOfItems.length,
  };

  function mountEcSmartTable(props, mountOpts) {
    return mount(EcSmartTable, {
      props: { ...props },
      ...mountOpts,
    });
  }

  function mountEcSmartTableWithData({ items, total }, props, mountOpts) {
    return mountEcSmartTable({
      ...props,
      data: items,
      totalRecords: total,
    }, mountOpts);
  }

  function mountEcSmartTableWithError(error, props, mountOpts) {
    return mountEcSmartTable({
      ...props,
      error,
    }, mountOpts);
  }

  it('should render in empty state by default', () => {
    const wrapper = mountEcSmartTable({ columns });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render resolved data properly', () => {
    const wrapper = mountEcSmartTableWithData(data, { columns });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render empty data properly', () => {
    const wrapper = mountEcSmartTableWithData(emptyData, { columns });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render error properly', () => {
    const wrapper = mountEcSmartTableWithError(new Error('Random error'));
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render its own title instead of using the one inside of ec-table', () => {
    const wrapper = mountEcSmartTableWithData(data, { columns, title: 'Random title' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not pass attrs to the ec-table', () => {
    const wrapper = mountEcSmartTableWithData(data, { columns }, {
      attrs: {
        id: 'my-table-id',
        'data-test': 'my-data-test',
        class: 'my-table',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should pass props to the ec-table', () => {
    const wrapper = mountEcSmartTableWithData(data, {
      columns,
      maxHeight: '100px',
      stickyColumn: 'left',
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should pass row-click event to the ec-table', async () => {
    const onRowClick = jest.fn();

    const wrapper = mountEcSmartTableWithData(data, { columns }, {
      attrs: {
        onRowClick,
      },
    });
    expect(wrapper.findByDataTest('ec-table__row--0').element).toMatchSnapshot();
    await wrapper.findByDataTest('ec-table__row--0').trigger('click');
    expect(onRowClick).toHaveBeenCalledTimes(1);
    expect(onRowClick).toHaveBeenCalledWith({ data: data.items[0], rowIndex: 0 });
  });

  describe('#slots', () => {
    it('should render in empty state by default with the header-actions slot with props', () => {
      const wrapper = mountEcSmartTable({ columns }, {
        slots: {
          'header-actions': ({
            total, items, error, loading,
          }) => h('div', `Header Actions total: ${total}, items: ${JSON.stringify(items)}, error: ${error}, loading: ${loading}`),
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render resolved data properly with the header-actions slot with props', () => {
      const wrapper = mountEcSmartTableWithData(data, { columns }, {
        slots: {
          'header-actions': ({
            total, items, error, loading,
          }) => h('div', `Header Actions total: ${total}, items: ${JSON.stringify(items)}, error: ${error}, loading: ${loading}`),
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render empty data with custom template', () => {
      const wrapper = mountEcSmartTableWithData(emptyData, { columns }, {
        slots: {
          empty: ({ emptyMessage }) => h('div', `Custom template - ${emptyMessage}`),
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render empty data with custom template and custom emptyMessage prop', () => {
      const wrapper = mountEcSmartTableWithData(emptyData, { columns, emptyMessage: 'No data' }, {
        slots: {
          empty: ({ emptyMessage }) => h('div', `Custom template - ${emptyMessage}`),
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render empty data with header-actions slot', () => {
      const wrapper = mountEcSmartTableWithData(emptyData, { columns }, {
        slots: {
          'header-actions': '<div>Header Actions</div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render empty data with header-actions slot with props', () => {
      const wrapper = mountEcSmartTableWithData(emptyData, { columns }, {
        slots: {
          'header-actions': ({
            total, items, error, loading,
          }) => h('div', `Header Actions total: ${total}, items: ${JSON.stringify(items)}, error: ${error}, loading: ${loading}`),
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render empty data with custom template, custom emptyMessage prop and header-actions slot with props', () => {
      const wrapper = mountEcSmartTableWithData(emptyData, { columns, emptyMessage: 'No data' }, {
        slots: {
          empty: ({ emptyMessage }) => h('div', `Custom template - ${emptyMessage}`),
          'header-actions': ({
            total, items, error, loading,
          }) => h('div', `Header Actions total: ${total}, items: ${JSON.stringify(items)}, error: ${error}, loading: ${loading}`),
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render error with custom template', () => {
      const wrapper = mountEcSmartTableWithError(new Error('Random error'), { columns }, {
        slots: {
          error: ({ errorMessage }) => h('div', `Custom template - ${errorMessage}`),
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render error with custom template and custom errorMessage prop', () => {
      const wrapper = mountEcSmartTableWithError(new Error('Random error'), { columns, errorMessage: 'Unexpected error' }, {
        slots: {
          error: ({ errorMessage }) => h('div', `Custom template - ${errorMessage}`),
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render error with custom template, custom errorMessage prop and header-actions slot with props', () => {
      const wrapper = mountEcSmartTableWithError(new Error('Random error'), { columns, errorMessage: 'Unexpected error' }, {
        slots: {
          error: ({ errorMessage }) => h('div', `Custom template - ${errorMessage}`),
          'header-actions': ({
            total, items, error, loading,
          }) => h('div', `Header Actions total: ${total}, items: ${JSON.stringify(items)}, error: ${error}, loading: ${loading}`),
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should pass ec-table slots', () => {
      const wrapper = mountEcSmartTableWithData(data, { columns }, {
        slots: {
          col1: props => h('div', `Cell data: ${JSON.stringify(props)}`),
        },
      });
      expect(wrapper.findByDataTest('ec-table__row--0').element).toMatchSnapshot();
    });
  });

  describe('sorting', () => {
    async function sortColumnByIndex(wrapper, index) {
      await wrapper.findByDataTest(`ec-table-head__cell--${index}`).findByDataTest('ec-table-sort__icon').trigger('click');
    }

    it('should render sortable columns', () => {
      const wrapper = mountEcSmartTableWithData(data, { columns });
      expect(wrapper.findByDataTest('ec-table-head').element).toMatchSnapshot();
    });

    it('should render sorted columns', () => {
      const sorts = [
        { column: 'test1', direction: SortDirection.ASC },
        { column: 'test3', direction: SortDirection.DESC },
      ];
      const wrapper = mountEcSmartTableWithData(data, { columns, sorts });
      expect(wrapper.findByDataTest('ec-table-head').element).toMatchSnapshot();
    });

    describe('single sort', () => {
      it('should sort column', async () => {
        const sorts = [
          { column: 'test1', direction: SortDirection.ASC },
        ];
        const wrapper = mountEcSmartTableWithData(data, {
          columns, sorts, isMultiSort: false,
        });
        expect(wrapper.findByDataTest('ec-table-head__cell--0').element).toMatchSnapshot('ASC');
        await sortColumnByIndex(wrapper, 0);
        expect(wrapper.findByDataTest('ec-table-head__cell--0').element).toMatchSnapshot('ASC -> DESC');
        await sortColumnByIndex(wrapper, 0);
        expect(wrapper.findByDataTest('ec-table-head__cell--0').element).toMatchSnapshot('DESC -> not sorted');
        await sortColumnByIndex(wrapper, 0);
        expect(wrapper.findByDataTest('ec-table-head__cell--0').element).toMatchSnapshot('not sorted -> ASC');
      });

      it('should allow sorting only one column', async () => {
        const sorts = [
          { column: 'test1', direction: SortDirection.ASC },
        ];
        const wrapper = await mountEcSmartTableWithData(data, {
          columns, sorts, isMultiSort: false,
        });
        expect(wrapper.findByDataTest('ec-table-head').element).toMatchSnapshot('Initial state ([ASC, null, null])');
        await sortColumnByIndex(wrapper, 2);
        expect(wrapper.findByDataTest('ec-table-head').element).toMatchSnapshot('After sorting different column ([null, null, ASC])');
        await sortColumnByIndex(wrapper, 0);
        expect(wrapper.findByDataTest('ec-table-head').element).toMatchSnapshot('After sorting different column #2 ([ASC, null, null])');
      });
    });

    describe('multi sort', () => {
      it('should sort column', async () => {
        const sorts = [
          { column: 'test1', direction: SortDirection.ASC },
        ];
        const wrapper = mountEcSmartTableWithData(data, {
          columns, sorts, isMultiSort: true,
        });
        expect(wrapper.findByDataTest('ec-table-head__cell--0').element).toMatchSnapshot('ASC');
        await sortColumnByIndex(wrapper, 0);
        expect(wrapper.findByDataTest('ec-table-head__cell--0').element).toMatchSnapshot('ASC -> DESC');
        await sortColumnByIndex(wrapper, 0);
        expect(wrapper.findByDataTest('ec-table-head__cell--0').element).toMatchSnapshot('DESC -> not sorted');
        await sortColumnByIndex(wrapper, 0);
        expect(wrapper.findByDataTest('ec-table-head__cell--0').element).toMatchSnapshot('not sorted -> ASC');
      });

      it('should allow sorting multiple columns', async () => {
        const sorts = [
          { column: 'test1', direction: SortDirection.ASC },
        ];
        const wrapper = mountEcSmartTableWithData(data, {
          columns, sorts, isMultiSort: true,
        });
        expect(wrapper.findByDataTest('ec-table-head').element).toMatchSnapshot('Initial state ([ASC, null, null])');
        await sortColumnByIndex(wrapper, 2);
        expect(wrapper.findByDataTest('ec-table-head').element).toMatchSnapshot('After sorting different column ([ASC, null, ASC])');
        await sortColumnByIndex(wrapper, 0);
        expect(wrapper.findByDataTest('ec-table-head').element).toMatchSnapshot('After sorting different column #2 ([DESC, null, ASC])');
      });
    });
  });

  describe('pagination', () => {
    it('should render pagination when it\'s enabled', () => {
      const wrapper = mountEcSmartTableWithData(lotsOfData, { columns, isPaginationEnabled: true });
      expect(wrapper.findByDataTest('ec-smart-table-pagination').element).toMatchSnapshot();
    });

    it('should include pagination in the fetch payload', () => {
      const wrapper = mountEcSmartTableWithData(lotsOfData, { columns, isPaginationEnabled: true });
      expect(wrapper.emitted('fetch').length).toBe(1);
      expect(wrapper.emitted('fetch')[0]).toEqual([{
        filter: {},
        numberOfItems: 10,
        page: 1,
        sorts: [],
      }]);
    });

    it('should re-fetch the data when next page is selected', async () => {
      const wrapper = mountEcSmartTableWithData(lotsOfData, { columns, isPaginationEnabled: true });
      expect(wrapper.emitted('fetch').length).toBe(1);
      await wrapper.findByDataTest('ec-table-pagination__action--next').trigger('click');
      expect(wrapper.emitted('fetch').length).toBe(2);
      expect(wrapper.emitted('fetch')[1]).toEqual([{
        filter: {},
        numberOfItems: 10,
        page: 2,
        sorts: [],
      }]);
    });

    it('should re-fetch the data when prev page is selected', async () => {
      const wrapper = mountEcSmartTableWithData(lotsOfData, {
        columns,
        isPaginationEnabled: true,
      });
      await wrapper.findByDataTest('ec-table-pagination__action--next').trigger('click'); // go to the second page
      expect(wrapper.findByDataTest('ec-smart-table-pagination').element).toMatchSnapshot();

      await wrapper.findByDataTest('ec-table-pagination__action--prev').trigger('click'); // go to the first page
      expect(wrapper.findByDataTest('ec-smart-table-pagination').element).toMatchSnapshot('pagination after loading new page');
    });

    it('should re-fetch the data when page size is changed', async () => {
      const wrapper = mountEcSmartTableWithData(lotsOfData, { columns, isPaginationEnabled: true });
      await wrapper.findByDataTest('ec-table-pagination__action--page-size').trigger('click');
      await wrapper.findByDataTest('ec-dropdown-search__item--2').trigger('click');
      expect(wrapper.findByDataTest('ec-smart-table-pagination').element).toMatchSnapshot('pagination after loading new page');
    });

    it('should render footer slot when pagination is not enabled', () => {
      const wrapper = mountEcSmartTableWithData(lotsOfData, {
        columns,
        isPaginationEnabled: false,
      }, {
        slots: {
          footer() {
            return h('div', 'My custom footer');
          },
        },
      });

      expect(wrapper.findByDataTest('ec-table-footer').element).toMatchSnapshot();
    });

    it('should render footer slot inside of the pagination when pagination is enabled', () => {
      const wrapper = mountEcSmartTableWithData(lotsOfData, {
        columns,
        isPaginationEnabled: true,
      }, {
        slots: {
          footer() {
            return h('div', 'My custom footer');
          },
        },
      });

      expect(wrapper.findByDataTest('ec-table-footer').element).toMatchSnapshot();
    });

    it('should pass pages slot into the pagination', () => {
      const wrapper = mountEcSmartTableWithData(lotsOfData, {
        columns,
        isPaginationEnabled: true,
      }, {
        slots: {
          pages(slotProps) {
            return h('div', `Pages: ${JSON.stringify(slotProps)}`);
          },
        },
      });

      expect(wrapper.findByDataTest('ec-table-pagination__current-page').element).toMatchSnapshot();
    });
  });

  describe('filtering', () => {
    const FakeTableFilterComponent = {
      compilerOptions: {
        whitespace: 'condense',
      },
      props: ['label', 'modelValue'],
      template: '<div>{{ label }} ({{ modelValue ?? "N/A" }})</div>',
    };

    const filters = [
      { name: 'test1', label: 'Test 1', component: markRaw(FakeTableFilterComponent) },
      { name: 'test2', label: 'Test 2', component: markRaw(FakeTableFilterComponent) },
    ];

    const prefilter = {
      test1: 'test-value-1',
    };

    it('should render the given filters', () => {
      const wrapper = mountEcSmartTableWithData(data, { columns, filters });
      expect(wrapper.findByDataTest('ec-smart-table__filter').element).toMatchSnapshot();
    });

    it('should trigger fetch with an empty filters', () => {
      const wrapper = mountEcSmartTableWithData(data, { columns, filters });
      expect(wrapper.emitted('fetch')[0]).toEqual([{
        filter: {},
        numberOfItems: 10,
        page: 1,
        sorts: [],
      }]);
    });

    it('should pass given prefilter to table filter', () => {
      const wrapper = mountEcSmartTableWithData(data, { columns, filters, filter: prefilter });
      expect(wrapper.findByDataTest('ec-smart-table__filter').element).toMatchSnapshot();
    });

    it('should trigger fetch with prefilter', () => {
      const wrapper = mountEcSmartTableWithData(data, { columns, filters, filter: prefilter });
      expect(wrapper.emitted('fetch')[0]).toEqual([{
        filter: prefilter,
        numberOfItems: 10,
        page: 1,
        sorts: [],
      }]);
    });

    it('should handle changes in filters and reload the table data', async () => {
      const wrapper = mountEcSmartTableWithData(data, { columns, filters, filter: prefilter });
      await wrapper.findByDataTest('ec-table-filter__clear-filters-button').trigger('click');
      expect(wrapper.findByDataTest('ec-smart-table__filter').element).toMatchSnapshot();
      expect(wrapper.emitted('fetch')[1]).toEqual([{
        filter: {},
        numberOfItems: 10,
        page: 1,
        sorts: [],
      }]);
    });

    it('should reset the page after changes in filters and reload the table data', async () => {
      const wrapper = mountEcSmartTableWithData(lotsOfData, {
        columns,
        filters,
        filter: prefilter,
        isPaginationEnabled: true,
      });

      await wrapper.findByDataTest('ec-table-pagination__action--next').trigger('click');
      expect(wrapper.findByDataTest('ec-smart-table-pagination').element).toMatchSnapshot('pagination after loading new page');
      expect(wrapper.emitted('fetch')[1]).toEqual([{
        filter: prefilter,
        numberOfItems: 10,
        page: 2,
        sorts: [],
      }]);

      await wrapper.findByDataTest('ec-table-filter__clear-filters-button').trigger('click');
      expect(wrapper.findByDataTest('ec-smart-table-pagination').element).toMatchSnapshot('pagination after changing the filters');
      expect(wrapper.emitted('fetch')[2]).toEqual([{
        filter: {},
        numberOfItems: 10,
        page: 1,
        sorts: [],
      }]);
    });
  });

  describe('additionalPayload', () => {
    it('should use given additionalPayload for fetching and re-fetching', async () => {
      const additionalPayload = {
        prop1: 'value1',
        obj1: { prop2: 'value2' },
        arr1: ['str1', 1],
      };

      const wrapper = mountEcSmartTableWithData(data, {
        columns, isPaginationEnabled: true, additionalPayload,
      });
      expect(wrapper.emitted('fetch')[0]).toEqual([{
        filter: {},
        numberOfItems: 10,
        page: 1,
        sorts: [],
        ...additionalPayload,
      }]);

      await wrapper.setProps({
        additionalPayload: {
          ...additionalPayload,
          prop1: 'value3',
        },
      });

      expect(wrapper.emitted('fetch')[1]).toEqual([{
        filter: {},
        numberOfItems: 10,
        page: 1,
        sorts: [],
        ...additionalPayload,
        prop1: 'value3',
      }]);
    });
  });
});
