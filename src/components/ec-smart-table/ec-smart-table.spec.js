import { mount } from '@vue/test-utils';
import * as SortDirection from '../../enums/sort-direction';
import EcSmartTable from './ec-smart-table.vue';

describe('EcSmartTable', () => {
  const columns = [
    { name: 'test1', title: 'Test 1', sortable: true },
    { name: 'test2', title: 'Test 2', sortable: false },
    { name: 'test3', title: 'Test 3', sortable: true },
  ];

  const data = [[1, 2, 3]];

  function mountEcSmartTable(props, mountOpts) {
    return mount(EcSmartTable, {
      propsData: { ...props },
      ...mountOpts,
    });
  }

  function sortColumnByIndex(wrapper, index) {
    wrapper.findByDataTest(`ec-table-head__cell--${index}`).findByDataTest('ec-table-sort__icon').trigger('click');
  }

  it('should render properly', () => {
    const wrapper = mountEcSmartTable({ data });
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('sorting', () => {
    it('should render sortable columns', () => {
      const wrapper = mountEcSmartTable({ columns, data });
      expect(wrapper.findByDataTest('ec-table-head').element).toMatchSnapshot();
    });

    it('should render sorted columns', () => {
      const sorts = [
        { column: 'test1', direction: SortDirection.ASC },
        { column: 'test3', direction: SortDirection.DESC },
      ];
      const wrapper = mountEcSmartTable({ columns, data, sorts });
      expect(wrapper.findByDataTest('ec-table-head').element).toMatchSnapshot();
    });

    describe('single sort', () => {
      it('should sort column', () => {
        const sorts = [
          { column: 'test1', direction: SortDirection.ASC },
        ];
        const wrapper = mountEcSmartTable({
          columns, data, sorts, multiSort: false,
        });
        expect(wrapper.findByDataTest('ec-table-head__cell--0').element).toMatchSnapshot('ASC');
        sortColumnByIndex(wrapper, 0);
        expect(wrapper.findByDataTest('ec-table-head__cell--0').element).toMatchSnapshot('ASC -> DESC');
        sortColumnByIndex(wrapper, 0);
        expect(wrapper.findByDataTest('ec-table-head__cell--0').element).toMatchSnapshot('DESC -> not sorted');
        sortColumnByIndex(wrapper, 0);
        expect(wrapper.findByDataTest('ec-table-head__cell--0').element).toMatchSnapshot('not sorted -> ASC');
      });

      it('should allow sorting only one column', () => {
        const sorts = [
          { column: 'test1', direction: SortDirection.ASC },
        ];
        const wrapper = mountEcSmartTable({
          columns, data, sorts, multiSort: false,
        });
        expect(wrapper.findByDataTest('ec-table-head').element).toMatchSnapshot('Initial state ([ASC, null, null])');
        sortColumnByIndex(wrapper, 2);
        expect(wrapper.findByDataTest('ec-table-head').element).toMatchSnapshot('After sorting different column ([null, null, ASC])');
        sortColumnByIndex(wrapper, 0);
        expect(wrapper.findByDataTest('ec-table-head').element).toMatchSnapshot('After sorting different column #2 ([ASC, null, null])');
      });
    });

    describe('multi sort', () => {
      it('should sort column', () => {
        const sorts = [
          { column: 'test1', direction: SortDirection.ASC },
        ];
        const wrapper = mountEcSmartTable({
          columns, data, sorts, multiSort: true,
        });
        expect(wrapper.findByDataTest('ec-table-head__cell--0').element).toMatchSnapshot('ASC');
        sortColumnByIndex(wrapper, 0);
        expect(wrapper.findByDataTest('ec-table-head__cell--0').element).toMatchSnapshot('ASC -> DESC');
        sortColumnByIndex(wrapper, 0);
        expect(wrapper.findByDataTest('ec-table-head__cell--0').element).toMatchSnapshot('DESC -> not sorted');
        sortColumnByIndex(wrapper, 0);
        expect(wrapper.findByDataTest('ec-table-head__cell--0').element).toMatchSnapshot('not sorted -> ASC');
      });

      it('should allow sorting multiple columns', () => {
        const sorts = [
          { column: 'test1', direction: SortDirection.ASC },
        ];
        const wrapper = mountEcSmartTable({
          columns, data, sorts, multiSort: true,
        });
        expect(wrapper.findByDataTest('ec-table-head').element).toMatchSnapshot('Initial state ([ASC, null, null])');
        sortColumnByIndex(wrapper, 2);
        expect(wrapper.findByDataTest('ec-table-head').element).toMatchSnapshot('After sorting different column ([ASC, null, ASC])');
        sortColumnByIndex(wrapper, 0);
        expect(wrapper.findByDataTest('ec-table-head').element).toMatchSnapshot('After sorting different column #2 ([DESC, null, ASC])');
      });
    });
  });
});
