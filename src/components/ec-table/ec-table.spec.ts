import { type ComponentMountingOptions, mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { defineComponent, h } from 'vue';

import { SortDirection } from '../../enums';
import { StickyColumnPosition } from '../ec-table-head/types';
import EcTable from './ec-table.vue';
import type { TableProps } from './types';

function mountEcTable<TRow extends unknown[]>(props?: Partial<TableProps<TRow>>, mountOpts?: ComponentMountingOptions<typeof EcTable>) {
  return mount(EcTable, {
    props: {
      columns: [
        {
          name: 'lorem',
          title: 'Lorem',
        },
        {
          name: 'ipsum',
          title: 'Ipsum',
        },
      ],
      data: [
        ['foo', 'bar'],
        ['widgets', 'doodads'],
      ],
      ...props,
    },
    ...mountOpts,
  });
}

function mountTableAsTemplate<TRow extends unknown[]>(template: string, props?: Partial<TableProps<TRow>>, wrapperComponentOpts?: Record<string, unknown>, mountOpts?: ComponentMountingOptions<TableProps<TRow>>) {
  const Component = defineComponent({
    components: { EcTable },
    template,
    ...wrapperComponentOpts,
  });

  return mount(Component, {
    props,
    ...mountOpts,
  });
}

describe('EcTable', () => {
  it('should not render if no props are supplied', () => {
    const wrapper = mountEcTable({}, { props: {} });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render if not provided with any data', () => {
    const wrapper = mountEcTable({
      columns: undefined,
      data: undefined,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render if not provided with an empty array of data', () => {
    const wrapper = mountEcTable({
      columns: undefined,
      data: [],
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected if provided with data but no columns', () => {
    const wrapper = mountEcTable({
      columns: undefined,
      data: [
        ['foo', 'bar'],
        ['widgets', 'doodads'],
      ],
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected if provided with data but no columns, and footer switched on', () => {
    const wrapper = mountEcTable({
      columns: undefined,
      data: [
        ['foo', 'bar'],
        ['widgets', 'doodads'],
      ],
    }, {
      slots: {
        footer: '<p>Random text</p>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected if provided with data and columns', () => {
    const wrapper = mountEcTable();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should have a column align to center if its type is icon', () => {
    const wrapper = mountTableAsTemplate(
      '<ec-table :columns="columns" :data="data"/>',
      {},
      {
        data() {
          return {
            columns: [
              {
                name: 'lorem',
                title: 'Lorem',
              },
              {
                name: 'ipsum',
                title: 'Ipsum',
                type: 'icon',
              },
            ],
            data: [
              ['foo', 'bar'],
              ['widgets', 'doodads'],
            ],
          };
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should have a column align to the right if its type is currency', () => {
    const wrapper = mountTableAsTemplate(
      '<ec-table :columns="columns" :data="data"/>',
      {},
      {
        data() {
          return {
            columns: [
              {
                name: 'lorem',
                title: 'Lorem',
              },
              {
                name: 'ipsum',
                title: 'Ipsum',
                type: 'currency',
              },
            ],
            data: [
              ['foo', 'bar'],
              ['widgets', 'doodads'],
            ],
          };
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('the tr should have class ec-table-row--is-clickable if we set the listener on row-click', () => {
    const onRowClick = vi.fn();
    const wrapper = mountEcTable(
      {
        columns: [
          {
            name: 'lorem',
            title: 'Lorem',
          },
          {
            name: 'ipsum',
            title: 'Ipsum',
            type: 'icon',
          },
        ],
        data: [
          ['foo', 'bar'],
          ['widgets', 'doodads'],
        ],
      },
      {
        attrs: {
          onRowClick,
        },
      },
    );

    const firstRow = wrapper.findByDataTest('ec-table__row--0');
    expect(firstRow.classes('ec-table__row--is-clickable')).toBe(true);
  });

  it('should render as expected if provided with data and columns, with footer switched on', () => {
    const wrapper = mountEcTable({}, {
      slots: {
        footer: '<p>Random text</p>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected if provided with empty row and no columns, with footer switched on', () => {
    const wrapper = mountEcTable({
      columns: [],
      data: [[]],
    }, {
      slots: {
        footer: '<p>Random text</p>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected if provided with rows and columns, with footer switched on and the title given', () => {
    const wrapper = mountEcTable({
      title: 'Title example',
    }, {
      slots: {
        footer: '<p>Random text</p>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render slots as expected', () => {
    const wrapper = mountEcTable({
      columns: [
        {
          name: 'lorem',
          title: 'Lorem',
        },
        {
          name: 'ipsum',
          title: 'Ipsum',
        },
      ],
      data: [
        ['foo', 'bar'],
        ['widgets', 'doodads'],
      ],
    }, {
      slots: {
        col2: ({ content }: { content: string }) => h('p', content),
        footer: '<p>Random text</p>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render custom row if window width is lower than 768px', () => {
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(max-width: 767px)',
      media: '',
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
    }));

    const wrapper = mountEcTable({
      columns: [
        {
          name: 'lorem',
          title: 'Lorem',
        },
        {
          name: 'ipsum',
          title: 'Ipsum',
        },
      ],
      data: [
        ['foo', 'bar'],
        ['widgets', 'doodads'],
      ],
    }, {
      slots: {
        default: '<p>Custom row</p>',
        col2: '<p>Column</p>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should only render custom row if "isCustomRowShown" is true', () => {
    const wrapper = mountEcTable({
      columns: [
        {
          name: 'lorem',
          title: 'Lorem',
        },
        {
          name: 'ipsum',
          title: 'Ipsum',
        },
      ],
      data: [
        ['foo', 'bar'],
        ['widgets', 'doodads'],
      ],
      isCustomRowShown: true,
    }, {
      slots: {
        default: '<p>Custom row</p>',
        col2: '<p>Column</p>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render sorting as expected', () => {
    const wrapper = mountEcTable({
      sorts: [
        { column: 'lorem', direction: SortDirection.ASC },
        { column: 'ipsum', direction: SortDirection.DESC },
      ],
      columns: [
        {
          name: 'lorem',
          title: 'Lorem',
          sortable: true,
        },
        {
          name: 'ipsum',
          title: 'Ipsum',
          sortable: true,
        },
      ],
    });

    expect(wrapper.findByDataTest('ec-table-head').element).toMatchSnapshot();
  });

  it('should notify parent about sorting', () => {
    const wrapper = mountEcTable({
      columns: [
        {
          name: 'lorem',
          title: 'Lorem',
          sortable: true,
        },
        {
          name: 'ipsum',
          title: 'Ipsum',
          sortable: true,
        },
      ],
    });
    wrapper.findByDataTest('ec-table-head__cell--0').findByDataTest('ec-table-sort__icon').trigger('click');
    expect(wrapper.emitted('sort')).toEqual([[{ name: 'lorem', sortable: true, title: 'Lorem' }]]);
  });

  it('the first th should have the ec-table-head__cell--sticky-left class if stickyColumn prop is left and the changes to right when the prop is get changed to right', async () => {
    const wrapper = mountEcTable({ stickyColumn: StickyColumnPosition.LEFT });

    expect(wrapper.findByDataTest('ec-table__cell--0').classes('ec-table__cell--sticky-left')).toBe(true);
    expect(wrapper.findByDataTest('ec-table__cell--1').classes('ec-table__cell--sticky-right')).toBe(false);
    await wrapper.setProps({ stickyColumn: 'right' });
    expect(wrapper.findByDataTest('ec-table__cell--1').classes('ec-table__cell--sticky-right')).toBe(true);
    expect(wrapper.findByDataTest('ec-table__cell--0').classes('ec-table__cell--sticky-left')).toBe(false);
  });

  it('should have the style height the same as given on the prop', () => {
    const wrapper = mountEcTable({ maxHeight: '400px' });

    expect(wrapper.findByDataTest('ec-table-scroll-container').attributes('style')).toBe('max-height: 400px;');
  });

  it('should emit the row-click event when you click on some row', async () => {
    const onRowClick = vi.fn();
    const wrapper = mountEcTable({}, {
      attrs: {
        onRowClick,
      },
    });

    await wrapper.findByDataTest('ec-table__row--0').trigger('click');
    expect(onRowClick.mock.calls[0]).toEqual([{ data: ['foo', 'bar'], rowIndex: 0 }]);
    await wrapper.findByDataTest('ec-table__row--1').trigger('click');
    expect(onRowClick.mock.calls[1]).toEqual([{ data: ['widgets', 'doodads'], rowIndex: 1 }]);
  });

  it('should render the style with the min-width on each cell of the column that have the prop given', () => {
    const columns = [
      {
        name: 'lorem',
        title: 'Lorem',
        minWidth: '250px',
      },
      {
        name: 'ipsum',
        title: 'Ipsum',
      },
    ];
    const wrapper = mountEcTable({ columns });
    const wrapperArray = wrapper.findAllByDataTest('ec-table__cell--0');
    expect(wrapperArray.length).toBe(columns.length);
    wrapperArray.forEach(wrapperItem => expect(wrapperItem.attributes('style')).toBe('min-width: 250px;'));
  });

  it('should render the style with the max-width on each cell of the column that have the prop given', () => {
    const columns = [
      {
        name: 'lorem',
        title: 'Lorem',
        maxWidth: '250px',
      },
      {
        name: 'ipsum',
        title: 'Ipsum',
      },
    ];
    const wrapper = mountEcTable({ columns });

    expect(wrapper.element).toMatchSnapshot();
  });
});
