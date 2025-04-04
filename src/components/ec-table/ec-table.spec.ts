import { type ComponentMountingOptions, mount } from '@vue/test-utils';
import { vi } from 'vitest';
import { defineComponent, h } from 'vue';

import { SortDirection } from '../../enums';
import { StickyColumnPosition } from '../ec-table-head/types';
import EcTable from './ec-table.vue';
import type { TableProps } from './types';

function mountEcTable<TRow extends ReadonlyArray<unknown>>(props?: Partial<TableProps<TRow>>, mountOpts?: ComponentMountingOptions<typeof EcTable>) {
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
    const Component = defineComponent({
      components: { EcTable },
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
      template: '<ec-table :columns="columns" :data="data"/>',
    });

    const wrapper = mount(Component);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should have a column align to the right if its type is currency', () => {
    const Component = defineComponent({
      components: { EcTable },
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
      template: '<ec-table :columns="columns" :data="data"/>',
    });

    const wrapper = mount(Component);

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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        col2: ({ content }) => h('p', content),
        footer: '<p>Random text</p>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render custom row if window width is lower than 768px', () => {
    vi.stubGlobal('matchMedia', (query: string) => ({
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
    await wrapper.setProps({ stickyColumn: StickyColumnPosition.RIGHT });
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

  it('should emit the row-click event when you press enter on some row', async () => {
    const onRowClick = vi.fn();
    const wrapper = mountEcTable({}, {
      attrs: {
        onRowClick,
      },
    });

    await wrapper.findByDataTest('ec-table__row--0').trigger('keydown.enter');
    expect(onRowClick.mock.calls[0]).toEqual([{ data: ['foo', 'bar'], rowIndex: 0 }]);
    await wrapper.findByDataTest('ec-table__row--1').trigger('keydown.enter');
    expect(onRowClick.mock.calls[1]).toEqual([{ data: ['widgets', 'doodads'], rowIndex: 1 }]);
  });

  it('should emit the row-click event when you press space on some row', async () => {
    const onRowClick = vi.fn();
    const wrapper = mountEcTable({}, {
      attrs: {
        onRowClick,
      },
    });

    await wrapper.findByDataTest('ec-table__row--0').trigger('keydown.space');
    expect(onRowClick.mock.calls[0]).toEqual([{ data: ['foo', 'bar'], rowIndex: 0 }]);
    await wrapper.findByDataTest('ec-table__row--1').trigger('keydown.space');
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

  describe('multiselect', () => {
    const columns = [
      {
        isSelect: true,
      },
      {
        name: 'lorem',
        title: 'Lorem',
      },
      {
        name: 'ipsum',
        title: 'Ipsum',
      },
    ];
    const data = [
      ['123', 'foo'],
      ['345', 'bar'],
      ['456', 'foobar'],
      ['789', 'barfoo'],
    ];
    const onSelectItem = vi.fn();
    const onSelectAllItems = vi.fn();

    const selectProps = {
      columns, data, isMultiSelectEnabled: true, selectedItems: ['345'], allItemsSelected: false,
    };
    const selectAttrs = { onSelectItem, onSelectAllItems };

    it('should render checkboxes in header and for every row when multi select is enabled', () => {
      const wrapper = mountEcTable(selectProps, { attrs: selectAttrs });

      const headerCheckbox = wrapper.findAllByDataTest('ec-table-head__select');
      expect(headerCheckbox.length).toEqual(1);
      expect(headerCheckbox.at(0)?.findByDataTest('ec-checkbox__check-icon').exists()).toBe(false);

      const rowCheckboxes = wrapper.findAllByDataTest('ec-table__select');
      expect(rowCheckboxes.length).toEqual(data.length);
      expect(rowCheckboxes.at(0)?.findByDataTest('ec-checkbox__check-icon').exists()).toBe(false);
      expect(rowCheckboxes.at(1)?.findByDataTest('ec-checkbox__check-icon').exists()).toBe(true);
      expect(rowCheckboxes.at(2)?.findByDataTest('ec-checkbox__check-icon').exists()).toBe(false);
      expect(rowCheckboxes.at(3)?.findByDataTest('ec-checkbox__check-icon').exists()).toBe(false);
    });

    it('should render checkboxes in header and for certain rows when the isSelectableCheck fn is provided', () => {
      const isSelectableCheck = vi.fn().mockImplementation((itemId: string) => ['123', '789'].includes(itemId));
      const wrapper = mountEcTable({
        ...selectProps,
        isSelectableCheck,
        selectedItems: [],
      }, {
        attrs: selectAttrs,
      });

      expect(wrapper.findByDataTest('ec-table-head__select').exists()).toBe(true);

      const rowCheckboxes = wrapper.findAllByDataTest('ec-table__select');
      expect(rowCheckboxes.length).toEqual(2);
      expect(rowCheckboxes.at(0)?.findByDataTest('ec-checkbox__check-icon').exists()).toBe(false);
      expect(rowCheckboxes.at(1)?.findByDataTest('ec-checkbox__check-icon').exists()).toBe(false);
    });

    it('should only render the header checkbox as disabled when no row items pass isSelectableCheck', () => {
      const isSelectableCheck = vi.fn().mockImplementation(() => false);
      const wrapper = mountEcTable({
        ...selectProps,
        isSelectableCheck,
      }, {
        attrs: selectAttrs,
      });

      const headerCheckbox = wrapper.findByDataTest('ec-table-head__select');
      expect(headerCheckbox.exists()).toBe(true);
      expect(headerCheckbox.findByDataTest<HTMLInputElement>('ec-checkbox__input').element.disabled).toBe(true);

      const rowCheckboxes = wrapper.findAllByDataTest('ec-table__select');
      expect(rowCheckboxes.length).toEqual(0);
    });

    it('should call onSelectItem when selecting a row', () => {
      const wrapper = mountEcTable(selectProps, { attrs: selectAttrs });

      const checkbox = wrapper.findAllByDataTest('ec-table__select').at(0);
      checkbox?.findByDataTest('ec-checkbox__input').setValue(true);
      expect(onSelectItem).toHaveBeenCalledWith('123');
    });

    it('should not call onRowClick on clicking on a checkbox', () => {
      const onRowClick = vi.fn();
      const wrapper = mountEcTable(selectProps, { attrs: { ...selectAttrs, onRowClick } });

      const checkbox = wrapper.findAllByDataTest('ec-table__select').at(0);
      checkbox?.findByDataTest('ec-checkbox__input').setValue(true);
      expect(onRowClick).not.toHaveBeenCalled();

      checkbox?.findByDataTest('ec-checkbox__check-icon-wrapper').trigger('click');
      expect(onRowClick).not.toHaveBeenCalled();
    });
  });
});
