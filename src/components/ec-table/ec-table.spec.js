import { mount, createLocalVue } from '@vue/test-utils';
import * as SortDirection from '../../enums/sort-direction';
import EcTable from './ec-table.vue';

function mountTable(props, mountOpts) {
  return mount(EcTable, {
    propsData: {
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

function mountTableAsTemplate(template, props, mountOpts) {
  const localVue = createLocalVue();

  const Component = localVue.extend({
    components: { EcTable },
    template,
  });

  return mount(Component, {
    localVue,
    propsData: { ...props },
    ...mountOpts,
  });
}

describe('EcTable', () => {
  it('should not render if no props are supplied', () => {
    const wrapper = mountTable(null, { propsData: {} });
    expect(wrapper.element).toMatchSnapshot();
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
      showFooter: true,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected if provided with data and columns', () => {
    const wrapper = mountTable();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should have class ec-table-cell--text-center if type of column is icon', () => {
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

    expect(wrapper.findByDataTest('ec-table__cell--0').classes('ec-table__cell--text-center')).toBe(false);
    expect(wrapper.findByDataTest('ec-table__cell--1').classes('ec-table__cell--text-center')).toBe(true);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected if provided with data and columns, with footer switched on', () => {
    const wrapper = mountTable({ showFooter: true });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected if provided with empty row and no columns, with footer switched on', () => {
    const wrapper = mountTable({
      columns: [],
      data: [[]],
      showFooter: true,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected if provided with rows and columns, with footer switched on and the icon of the tooltip', () => {
    const wrapper = mountTable({
      showFooter: true,
      tooltipConfig: {
        content: 'This is the tooltip info',
        classes: ['ec-tooltip--bg-bright'],
        placement: 'bottom',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected if provided with rows and columns, with footer switched on, the icon of the tooltip and the title given', () => {
    const wrapper = mountTable({
      showFooter: true,
      tooltipConfig: {
        content: 'This is the tooltip info',
        classes: ['ec-tooltip--bg-bright'],
        placement: 'bottom',
      },
      title: 'Title example',
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
      showFooter: true,
    },
    {
      scopedSlots: {
        col2: '<p>{{ props.content }}</p>',
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
    expect(wrapper.emitted('sort')).toEqual([['lorem']]);
  });

  it('the first td should have the ec-table__cell--sticky-left class if stickyColumn prop is left', () => {
    const wrapper = mountTable({ stickyColumn: 'left' });

    expect(wrapper.findByDataTest('ec-table__cell--0').classes('ec-table__cell--sticky-left')).toBe(true);
    expect(wrapper.findByDataTest('ec-table__cell--1').classes('ec-table__cell--sticky-right')).toBe(false);
    wrapper.setProps({ stickyColumn: 'right' });
    expect(wrapper.findByDataTest('ec-table__cell--1').classes('ec-table__cell--sticky-right')).toBe(true);
    expect(wrapper.findByDataTest('ec-table__cell--0').classes('ec-table__cell--sticky-left')).toBe(false);
  });

  it('should have the style height the same as given on the prop', () => {
    const wrapper = mountTable({ maxHeight: 400 });

    expect(wrapper.findByDataTest('ec-table-scroll-container').attributes('style')).toBe('max-height: 400px;');
  });

  it('should emit the row-click event when you click on some row', () => {
    const wrapper = mountTable();

    expect(wrapper.emitted('row-click')).toBe(undefined);
    wrapper.findByDataTest('ec-table__row--0').trigger('click');
    expect(wrapper.emitted('row-click').length).toBe(1);
    wrapper.findByDataTest('ec-table__row--1').trigger('click');
    expect(wrapper.emitted('row-click').length).toBe(2);
  });

  it('should render the style with the min-width on each cell of the column that have the prop given', () => {
    const wrapper = mountTable({
      columns: [
        {
          name: 'lorem',
          title: 'Lorem',
          minWidth: '250px',
        },
        {
          name: 'ipsum',
          title: 'Ipsum',
        },
      ],
    });
    const wrapperArray = wrapper.findAllByDataTest('ec-table__cell--0');
    wrapperArray.wrappers.forEach(wrapperItem => expect(wrapperItem.attributes('style')).toBe('min-width: 250px;'));
  });
});
