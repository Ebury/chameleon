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
    count: 3,
    total: 3,
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
      sync: false,
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
});
