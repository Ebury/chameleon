import { type ComponentMountingOptions, mount } from '@vue/test-utils';

import { SortDirection } from '../../enums';
import EcTableHead from './ec-table-head.vue';
import { StickyColumnPosition, type TableHeadColumn, type TableHeadProps } from './types';

describe('EcTableHead', () => {
  const columns: TableHeadColumn[] = [
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

  function mountEcTableHead(props?: Partial<TableHeadProps>, mountOpts?: ComponentMountingOptions<typeof EcTableHead>) {
    return mount(EcTableHead, {
      props,
      ...mountOpts,
    });
  }

  it('should render as expected', () => {
    const wrapper = mountEcTableHead({ columns });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should have a column align to center if its type is icon', () => {
    const wrapper = mountEcTableHead({
      columns: columns.map((column): TableHeadColumn => ({
        ...column,
        type: column.name === 'column-b' ? 'icon' : '',
      })),
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should have a column align to the right if its type is currency', () => {
    const wrapper = mountEcTableHead({
      columns: columns.map((column): TableHeadColumn => ({
        ...column,
        type: column.name === 'column-b' ? 'currency' : '',
      })),
    });

    expect(wrapper.element).toMatchSnapshot();
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
    expect(wrapper.emitted('sort')).toEqual([[{ name: 'column-a', sortable: true, title: 'Column A' }]]);
  });

  it('should render info icon with a tooltip as expected', () => {
    const wrapper = mountEcTableHead({
      columns: columns.map(column => ({ ...column, tooltip: 'tooltip example' })),
    });

    expect(wrapper.findByDataTest('ec-table-head__tooltip-icon ').exists()).toBe(true);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('the first th should have the ec-table-head__cell--sticky-left class if stickyColumn prop is left and the changes to right when the prop is get changed to right', async () => {
    const wrapper = mountEcTableHead({
      columns,
      stickyColumn: StickyColumnPosition.LEFT,
    });

    expect(wrapper.findByDataTest('ec-table-head__cell--0').classes('ec-table-head__cell--sticky-left')).toBe(true);
    expect(wrapper.findByDataTest('ec-table-head__cell--2').classes('ec-table-head__cell--sticky-right')).toBe(false);
    await wrapper.setProps({ stickyColumn: StickyColumnPosition.RIGHT });
    expect(wrapper.findByDataTest('ec-table-head__cell--2').classes('ec-table-head__cell--sticky-right')).toBe(true);
    expect(wrapper.findByDataTest('ec-table-head__cell--0').classes('ec-table-head__cell--sticky-left')).toBe(false);
  });

  it('should render the style with the min-width on the column that have the prop given', () => {
    const wrapper = mountEcTableHead({
      columns: columns.map((column): TableHeadColumn => ({
        ...column,
        minWidth: column.name === 'column-b' ? '250px' : '',
      })),
    });

    expect(wrapper.findByDataTest('ec-table-head__cell--1').attributes('style')).toBe('min-width: 250px;');
    expect(wrapper.findByDataTest('ec-table-head__cell--0').attributes('style')).toBe(undefined);
  });

  it('should render with max-width and ellipsis on the column that has the prop given', () => {
    const wrapper = mountEcTableHead({
      columns: columns.map((column): TableHeadColumn => ({
        ...column,
        maxWidth: column.name === 'column-b' ? '250px' : '',
      })),
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
