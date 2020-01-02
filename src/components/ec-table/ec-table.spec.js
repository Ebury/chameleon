import { mount, createLocalVue } from '@vue/test-utils';
import EcTable from './ec-table.vue';

function mountTable(props, mountOpts) {
  return mount(EcTable, {
    propsData: {
      columns: [
        {
          name: 'lorem',
        },
        {
          name: 'ipsum',
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
    const wrapper = mountTable({
      columns: undefined,
      data: undefined,
    });

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
              },
              {
                name: 'ipsum',
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

    expect(wrapper.findByDataTest('ec-table__cell-0').classes()).not.toContain('ec-table__cell--text-center');
    expect(wrapper.findByDataTest('ec-table__cell-1').classes()).toContain('ec-table__cell--text-center');

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
        },
        {
          name: 'ipsum',
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
});
