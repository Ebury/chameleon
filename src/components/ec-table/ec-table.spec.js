import { mount } from '@vue/test-utils';
import { defineComponent, h } from 'vue';

import { withMockedConsole } from '../../../tests/utils/console';
import * as SortDirection from '../../enums/sort-direction';
import EcTable from './ec-table.vue';

function mountTable(props, mountOpts) {
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

function mountTableAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
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
    const wrapper = mountTable(null, { props: {} });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw if the prop stickyColumn have a invalid value', () => {
    withMockedConsole((errorSpy, warnSpy) => {
      mountTable({ stickyColumn: 'test' });
      expect(warnSpy).toHaveBeenCalledTimes(3);
      expect(warnSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "stickyColumn"');
    });
  });

  it('should not render if not provided with any data', () => {
    const wrapper = mountTable({
      columns: undefined,
      data: undefined,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render if not provided with an empty array of data', () => {
    const wrapper = mountTable({
      columns: undefined,
      data: [],
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected if provided with data but no columns', () => {
    const wrapper = mountTable({
      columns: undefined,
      data: [
        ['foo', 'bar'],
        ['widgets', 'doodads'],
      ],
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected if provided with data but no columns, and footer switched on', () => {
    const wrapper = mountTable({
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
    const wrapper = mountTable();

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
    const onRowClick = jest.fn();
    const wrapper = mountTable(
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
    const wrapper = mountTable({}, {
      slots: {
        footer: '<p>Random text</p>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected if provided with empty row and no columns, with footer switched on', () => {
    const wrapper = mountTable({
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
    const wrapper = mountTable({
      title: 'Title example',
    }, {
      slots: {
        footer: '<p>Random text</p>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render slots as expected', () => {
    const wrapper = mountTable({
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
        col2: ({ content }) => h('p', content),
        footer: '<p>Random text</p>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render sorting as expected', () => {
    const wrapper = mountTable({
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
    const wrapper = mountTable({
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
    const wrapper = mountTable({ stickyColumn: 'left' });

    expect(wrapper.findByDataTest('ec-table__cell--0').classes('ec-table__cell--sticky-left')).toBe(true);
    expect(wrapper.findByDataTest('ec-table__cell--1').classes('ec-table__cell--sticky-right')).toBe(false);
    await wrapper.setProps({ stickyColumn: 'right' });
    expect(wrapper.findByDataTest('ec-table__cell--1').classes('ec-table__cell--sticky-right')).toBe(true);
    expect(wrapper.findByDataTest('ec-table__cell--0').classes('ec-table__cell--sticky-left')).toBe(false);
  });

  it('should have the style height the same as given on the prop', () => {
    const wrapper = mountTable({ maxHeight: '400px' });

    expect(wrapper.findByDataTest('ec-table-scroll-container').attributes('style')).toBe('max-height: 400px;');
  });

  it('should emit the row-click event when you click on some row', async () => {
    const wrapper = mountTable();

    expect(wrapper.emitted('row-click')).toBe(undefined);
    await wrapper.findByDataTest('ec-table__row--0').trigger('click');
    expect(wrapper.emitted('row-click')[0]).toEqual([{ data: ['foo', 'bar'], rowIndex: 0 }]);
    expect(wrapper.emitted('row-click').length).toBe(1);
    await wrapper.findByDataTest('ec-table__row--1').trigger('click');
    expect(wrapper.emitted('row-click')[1]).toEqual([{ data: ['widgets', 'doodads'], rowIndex: 1 }]);
    expect(wrapper.emitted('row-click').length).toBe(2);
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
    const wrapper = mountTable({ columns });
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
    const wrapper = mountTable({ columns });

    expect(wrapper.element).toMatchSnapshot();
  });
});
