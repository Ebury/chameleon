import { mount } from '@vue/test-utils';
import * as SortDirection from '../../enums/sort-direction';
import EcTableHead from './ec-table-head.vue';

describe('EcTableHead', () => {
  const columns = [
    {
      name: 'column-a',
      title: 'Column A',
    },
    {
      name: 'column-b',
      title: 'Column B',
      span: 2,
    },
    {
      name: 'column-c',
      title: 'Column C',
    },
  ];

  function mountEcTableHead(props, mountOpts) {
    return mount(EcTableHead, {
      propsData: { ...props },
      ...mountOpts,
    });
  }

  it('should render as expected', () => {
    const wrapper = mountEcTableHead({ columns });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should have class ec-table-head__cell--text-center if type of content is icon', () => {
    const wrapper = mountEcTableHead({
      columns: columns.map(column => ({
        ...column,
        type: column.name === 'column-b' ? 'icon' : null,
      })),
    });

    expect(wrapper.findByDataTest('ec-table-head__cell--0').classes('ec-table-head__cell--text-center')).toBe(false);
    expect(wrapper.findByDataTest('ec-table-head__cell--1').classes('ec-table-head__cell--text-center')).toBe(true);
  });

  it('should not render if no columns are supplied', () => {
    const wrapper = mountEcTableHead({ columns: undefined });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render sorting as expected', () => {
    const wrapper = mountEcTableHead({
      sorts: [
        { column: 'column-a', direction: SortDirection.ASC },
        { column: 'column-b', direction: SortDirection.DESC },
      ],
      columns: columns.map(column => ({ ...column, sortable: true })),
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should notify parent about sorting', () => {
    const wrapper = mountEcTableHead({
      sorts: [
        { column: 'column-a', direction: SortDirection.ASC },
        { column: 'column-b', direction: SortDirection.DESC },
      ],
      columns: columns.map(column => ({ ...column, sortable: true })),
    });

    wrapper.findByDataTest('ec-table-head__cell--0').findByDataTest('ec-table-sort__icon').trigger('click');
    expect(wrapper.emitted('sort')).toEqual([['column-a']]);
  });
});
