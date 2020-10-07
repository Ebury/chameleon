import { mount } from '@vue/test-utils';
import * as SortDirection from '../../enums/sort-direction';
import EcSmartTable from './ec-smart-table.vue';
import flushPromises from '../../../tests/utils/flush-promises';

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

  const dataSource = {
    fetch: jest.fn(),
  };

  function mountEcSmartTable(props, mountOpts) {
    return mount(EcSmartTable, {
      propsData: { dataSource, ...props },
      stubs: {
        EcPopover: true,
      },
      ...mountOpts,
    });
  }

  async function mountEcSmartTableWithResolvedData(resolvedData, props, mountOpts) {
    const resolvedDataSource = {
      fetch: jest.fn().mockResolvedValue(resolvedData),
    };
    const wrapper = mountEcSmartTable({ ...props, dataSource: resolvedDataSource }, mountOpts);
    await flushPromises();
    wrapper.vm.$forceUpdate();
    return wrapper;
  }

  async function mountEcSmartTableWithRejectedData(error, props, mountOpts) {
    const rejectedDataSource = {
      fetch: jest.fn().mockRejectedValue(error),
    };
    const wrapper = mountEcSmartTable({ ...props, dataSource: rejectedDataSource }, mountOpts);
    await flushPromises();
    wrapper.vm.$forceUpdate();
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

  describe('#slots', () => {
    it('should render empty data with custom template', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(emptyData, { columns }, {
        scopedSlots: {
          empty: '<div>Custom template - {{ props.emptyMessage }}</div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render empty data with custom template and custom emptyMessage prop', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(emptyData, { columns, emptyMessage: 'No data' }, {
        scopedSlots: {
          empty: '<div>Custom template - {{ props.emptyMessage }}</div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render error with custom template', async () => {
      const wrapper = await mountEcSmartTableWithRejectedData(new Error('Random error'), { columns }, {
        scopedSlots: {
          error: '<div>Custom template - {{ props.errorMessage }}</div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render error with custom template and custom errorMessage prop', async () => {
      const wrapper = await mountEcSmartTableWithRejectedData(new Error('Random error'), { columns, errorMessage: 'Unexpected error' }, {
        scopedSlots: {
          error: '<div>Custom template - {{ props.errorMessage }}</div>',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('sorting', () => {
    async function sortColumnByIndex(wrapper, index) {
      wrapper.findByDataTest(`ec-table-head__cell--${index}`).findByDataTest('ec-table-sort__icon').trigger('click');
      await wrapper.vm.$nextTick();
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
    const lotsOfItems = new Array(10).map((val, i) => [i + 1, i + 2, i + 3]);
    const lotsOfData = {
      items: lotsOfItems,
      total: lotsOfItems.length * 5,
      count: lotsOfItems.length,
    };

    it('should render pagination when it\'s enabled', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(lotsOfData, { columns, isPaginationEnabled: true });
      expect(wrapper.findByDataTest('ec-smart-table-pagination').element).toMatchSnapshot();
    });

    it('should re-fetch the data when next page is selected', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(lotsOfData, { columns, isPaginationEnabled: true });
      wrapper.findByDataTest('ec-table-pagination__action--next').trigger('click');
      expect(wrapper.findByDataTest('ec-loading__icon').element).toMatchSnapshot('loading icon while loading new page');
      await flushPromises();
      expect(wrapper.findByDataTest('ec-loading__icon').element).toMatchSnapshot('loading icon after loading new page');
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
      expect(wrapper.findByDataTest('ec-loading__icon').element).toMatchSnapshot('loading icon after loading new page');
      expect(wrapper.findByDataTest('ec-smart-table-pagination').element).toMatchSnapshot('pagination after loading new page');
    });

    it('should re-fetch the data when page size is changed', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(lotsOfData, { columns, isPaginationEnabled: true });
      await wrapper.findByDataTest('ec-table-pagination__action--page-size').trigger('click');
      await wrapper.findByDataTest('ec-dropdown-search__item--2').trigger('click');
      expect(wrapper.findByDataTest('ec-loading__icon').element).toMatchSnapshot('loading icon while loading new page');
      await flushPromises();
      expect(wrapper.findByDataTest('ec-loading__icon').element).toMatchSnapshot('loading icon after loading new page');
      expect(wrapper.findByDataTest('ec-smart-table-pagination').element).toMatchSnapshot('pagination after loading new page');
    });

    it('should render footer slot when pagination is not enabled', async () => {
      const wrapper = await mountEcSmartTableWithResolvedData(lotsOfData, {
        columns,
        isPaginationEnabled: false,
      }, {
        scopedSlots: {
          footer() {
            return (<div>My custom footer</div>);
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
        scopedSlots: {
          footer() {
            return (<div>My custom footer</div>);
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
        scopedSlots: {
          pages(slotProps) {
            return (<div>Pages: { JSON.stringify(slotProps) }</div>);
          },
        },
      });

      expect(wrapper.findByDataTest('ec-table-pagination__current-page').element).toMatchSnapshot();
    });
  });
});
