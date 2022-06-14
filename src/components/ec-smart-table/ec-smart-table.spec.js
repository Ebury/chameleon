import { flushPromises, mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';

import * as SortDirection from '../../enums/sort-direction';
import withFilters from '../../hocs/ec-with-filters';
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

  const dataSource = {
    fetch: jest.fn(),
  };

  function mountEcSmartTable(props, mountOpts) {
    return mount(EcSmartTable, {
      props: { dataSource, ...props },
      ...mountOpts,
    });
  }

  async function mountEcSmartTableWithResolvedData(resolvedData, props, mountOpts) {
    const resolvedDataSource = {
      fetch: jest.fn().mockResolvedValue(resolvedData),
    };
    const wrapper = mountEcSmartTable({ ...props, dataSource: resolvedDataSource }, mountOpts);
    await flushPromises();
    return wrapper;
  }

  async function mountEcSmartTableWithRejectedData(error, props, mountOpts) {
    const rejectedDataSource = {
      fetch: jest.fn().mockRejectedValue(error),
    };
    const wrapper = mountEcSmartTable({ ...props, dataSource: rejectedDataSource }, mountOpts);
    await flushPromises();
    return wrapper;
  }

  it('should render in loading state by default', () => {
    const wrapper = mountEcSmartTable({ columns });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render resolved data properly', async () => {
    const wrapper = await mountEcSmartTableWithResolvedData(data, { columns });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render empty data properly', async () => {
    const wrapper = await mountEcSmartTableWithResolvedData(emptyData, { columns });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render error properly', async () => {
    const wrapper = await mountEcSmartTableWithRejectedData(new Error('Random error'));
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render it\'s own title instead of using the one inside of ec-table', async () => {
    const wrapper = await mountEcSmartTableWithResolvedData(data, { columns, title: 'Random title' });
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('#slots', () => {
    it('should render in loading state by default with the header-actions slot with props', () => {
      const wrapper = mountEcSmartTable({ columns }, {
        slots: {
          'header-actions': ({
            total, items, error, loading,
          }) => h('div', `Header Actions total: ${total}, items: ${JSON.stringify(items)}, error: ${error}, loading: ${loading}`),
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render resolved data properly with the header-actions slot with props', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(data, { columns }, {
        slots: {
          'header-actions': ({
            total, items, error, loading,
          }) => h('div', `Header Actions total: ${total}, items: ${JSON.stringify(items)}, error: ${error}, loading: ${loading}`),
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render empty data with custom template', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(emptyData, { columns }, {
        slots: {
          empty: ({ emptyMessage }) => h('div', `Custom template - ${emptyMessage}`),
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render empty data with custom template and custom emptyMessage prop', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(emptyData, { columns, emptyMessage: 'No data' }, {
        slots: {
          empty: ({ emptyMessage }) => h('div', `Custom template - ${emptyMessage}`),
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render empty data with header-actions slot', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(emptyData, { columns }, {
        slots: {
          'header-actions': '<div>Header Actions</div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render empty data with header-actions slot with props', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(emptyData, { columns }, {
        slots: {
          'header-actions': ({
            total, items, error, loading,
          }) => h('div', `Header Actions total: ${total}, items: ${JSON.stringify(items)}, error: ${error}, loading: ${loading}`),
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render empty data with custom template, custom emptyMessage prop and header-actions slot with props', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(emptyData, { columns, emptyMessage: 'No data' }, {
        slots: {
          empty: ({ emptyMessage }) => h('div', `Custom template - ${emptyMessage}`),
          'header-actions': ({
            total, items, error, loading,
          }) => h('div', `Header Actions total: ${total}, items: ${JSON.stringify(items)}, error: ${error}, loading: ${loading}`),
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render error with custom template', async () => {
      const wrapper = await mountEcSmartTableWithRejectedData(new Error('Random error'), { columns }, {
        slots: {
          error: ({ errorMessage }) => h('div', `Custom template - ${errorMessage}`),
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render error with custom template and custom errorMessage prop', async () => {
      const wrapper = await mountEcSmartTableWithRejectedData(new Error('Random error'), { columns, errorMessage: 'Unexpected error' }, {
        slots: {
          error: ({ errorMessage }) => h('div', `Custom template - ${errorMessage}`),
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render error with custom template, custom errorMessage prop and header-actions slot with props', async () => {
      const wrapper = await mountEcSmartTableWithRejectedData(new Error('Random error'), { columns, errorMessage: 'Unexpected error' }, {
        slots: {
          error: ({ errorMessage }) => h('div', `Custom template - ${errorMessage}`),
          'header-actions': ({
            total, items, error, loading,
          }) => h('div', `Header Actions total: ${total}, items: ${JSON.stringify(items)}, error: ${error}, loading: ${loading}`),
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should pass ec-table slots', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(data, { columns }, {
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

    it('should render sortable columns', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(data, { columns });
      expect(wrapper.findByDataTest('ec-table-head').element).toMatchSnapshot();
    });

    it('should render sorted columns', async () => {
      const sorts = [
        { column: 'test1', direction: SortDirection.ASC },
        { column: 'test3', direction: SortDirection.DESC },
      ];
      const wrapper = await mountEcSmartTableWithResolvedData(data, { columns, sorts });
      expect(wrapper.findByDataTest('ec-table-head').element).toMatchSnapshot();
    });

    describe('single sort', () => {
      it('should sort column', async () => {
        const sorts = [
          { column: 'test1', direction: SortDirection.ASC },
        ];
        const wrapper = await mountEcSmartTableWithResolvedData(data, {
          columns, sorts, multiSort: false,
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
        const wrapper = await mountEcSmartTableWithResolvedData(data, {
          columns, sorts, multiSort: false,
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
        const wrapper = await mountEcSmartTableWithResolvedData(data, {
          columns, sorts, multiSort: true,
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
        const wrapper = await mountEcSmartTableWithResolvedData(data, {
          columns, sorts, multiSort: true,
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
    it('should render pagination when it\'s enabled', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(lotsOfData, { columns, isPaginationEnabled: true });
      expect(wrapper.findByDataTest('ec-smart-table-pagination').element).toMatchSnapshot();
    });

    it('should re-fetch the data when next page is selected', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(lotsOfData, { columns, isPaginationEnabled: true });
      await wrapper.findByDataTest('ec-table-pagination__action--next').trigger('click');
      expect(wrapper.findByDataTest('ec-loading__icon').element).toMatchSnapshot('loading icon while loading new page');
      await flushPromises();
      expect(wrapper.findByDataTest('ec-loading__icon').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-smart-table-pagination').element).toMatchSnapshot('pagination after loading new page');
    });

    it('should re-fetch the data when prev page is selected', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(lotsOfData, {
        columns,
        isPaginationEnabled: true,
      });
      wrapper.findByDataTest('ec-table-pagination__action--next').trigger('click'); // go to the second page
      await flushPromises();
      expect(wrapper.findByDataTest('ec-smart-table-pagination').element).toMatchSnapshot();

      await wrapper.findByDataTest('ec-table-pagination__action--prev').trigger('click'); // go to the first page
      expect(wrapper.findByDataTest('ec-loading__icon').element).toMatchSnapshot('loading icon while loading new page');
      await flushPromises();
      expect(wrapper.findByDataTest('ec-loading__icon').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-smart-table-pagination').element).toMatchSnapshot('pagination after loading new page');
    });

    it('should re-fetch the data when page size is changed', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(lotsOfData, { columns, isPaginationEnabled: true });
      await wrapper.findByDataTest('ec-table-pagination__action--page-size').trigger('click');
      await wrapper.findByDataTest('ec-dropdown-search__item--2').trigger('click');
      expect(wrapper.findByDataTest('ec-loading__icon').element).toMatchSnapshot('loading icon while loading new page');
      await flushPromises();
      expect(wrapper.findByDataTest('ec-loading__icon').exists()).toBe(false);
      expect(wrapper.findByDataTest('ec-smart-table-pagination').element).toMatchSnapshot('pagination after loading new page');
    });

    it('should render footer slot when pagination is not enabled', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(lotsOfData, {
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

    it('should render footer slot inside of the pagination when pagination is enabled', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(lotsOfData, {
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

    it('should pass pages slot into the pagination', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(lotsOfData, {
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
    const TableFilter = defineComponent({
      name: 'MyTableFilter',
      props: ['filters', 'modelValue'],
      template: `
        <div data-test="my-table-filter">
          <div># of filters: {{ filters.length }}</div>
          <div>value: {{ modelValue }}</div>
          <a data-test="my-table-filter__clear-button" @click="$emit('update:modelValue', {}); $emit('change', {})">Clear</a>
        </div>
      `,
    });

    const filters = [{ name: 'test1' }, { name: 'test2' }];

    const prefilter = {
      test1: 'test-value-1',
    };

    const TestTableFilter = withFilters(TableFilter, filters);

    it('should render the given filter component', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(data, { columns, filterComponent: TestTableFilter });
      expect(wrapper.findByDataTest('my-table-filter').element).toMatchSnapshot();
    });

    it('should pass given prefilter with filter component', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(data, { columns, filterComponent: TestTableFilter, filter: prefilter });
      expect(wrapper.findByDataTest('my-table-filter').element).toMatchSnapshot();
    });

    it('should handle changes in filters and reload the table data', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(data, { columns, filterComponent: TestTableFilter, filter: prefilter });
      await wrapper.findByDataTest('my-table-filter__clear-button').trigger('click');
      expect(wrapper.findByDataTest('my-table-filter').element).toMatchSnapshot();

      expect(wrapper.findByDataTest('ec-loading__icon').element).toMatchSnapshot('loading icon while loading filtered data');
      await flushPromises();
      expect(wrapper.findByDataTest('ec-loading__icon').exists()).toBe(false);
    });

    it('should reset the page after changes in filters and reload the table data', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(lotsOfData, {
        columns,
        filterComponent: TestTableFilter,
        filter: prefilter,
        isPaginationEnabled: true,
      });

      await wrapper.findByDataTest('ec-table-pagination__action--next').trigger('click');
      await flushPromises();
      expect(wrapper.findByDataTest('ec-smart-table-pagination').element).toMatchSnapshot('pagination after loading new page');

      await wrapper.findByDataTest('my-table-filter__clear-button').trigger('click');
      await flushPromises();
      expect(wrapper.findByDataTest('ec-smart-table-pagination').element).toMatchSnapshot('pagination after changing the filters');
    });
  });

  describe('fetch arguments', () => {
    it('should use given fetch arguments for fetching and re-fetching', async () => {
      const resolvedDataSource = {
        fetch: jest.fn().mockResolvedValue({}),
      };

      const fetchArgs = {
        prop1: 'value1',
        obj1: { prop2: 'value2' },
        arr1: ['str1', 1],
      };

      const wrapper = mountEcSmartTable({
        columns, isPaginationEnabled: true, dataSource: resolvedDataSource, fetchArgs,
      });
      await flushPromises();
      wrapper.vm.$forceUpdate();

      const expectedCancelToken = expect.anything();
      expect(resolvedDataSource.fetch).toHaveBeenCalledTimes(1);
      expect(resolvedDataSource.fetch).toHaveBeenCalledWith({
        filter: {},
        numberOfItems: 10,
        page: 1,
        sorts: [],
        prop1: 'value1',
        obj1: { prop2: 'value2' },
        arr1: ['str1', 1],
      }, expectedCancelToken);

      resolvedDataSource.fetch.mockReset();

      await wrapper.setProps({
        fetchArgs: {
          ...fetchArgs,
          prop1: 'value3',
        },
      });
      await flushPromises();

      expect(resolvedDataSource.fetch).toHaveBeenCalledTimes(1);
      expect(resolvedDataSource.fetch).toHaveBeenCalledWith({
        filter: {},
        numberOfItems: 10,
        page: 1,
        sorts: [],
        prop1: 'value3',
        obj1: { prop2: 'value2' },
        arr1: ['str1', 1],
      }, expectedCancelToken);
    });
  });
});
