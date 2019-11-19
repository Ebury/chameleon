import { mount } from '@vue/test-utils';
import EcTable from './ec-table.vue';

describe('EcTable', () => {
  it('should not render if no props are supplied', () => {
    const wrapper = mount(
      EcTable,
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render if not provided with any data', () => {
    const wrapper = mount(
      EcTable,
      {
        propsData: {
          data: undefined,
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render if not provided with an empty array of data', () => {
    const wrapper = mount(
      EcTable,
      {
        propsData: {
          data: [],
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected if provided with data but no columns', () => {
    const wrapper = mount(
      EcTable,
      {
        propsData: {
          data: [
            ['foo', 'bar'],
            ['widgets', 'doodads'],
          ],
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected if provided with data but no columns, and footer switched on', () => {
    const wrapper = mount(
      EcTable,
      {
        propsData: {
          data: [
            ['foo', 'bar'],
            ['widgets', 'doodads'],
          ],
          showFooter: true,
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected if provided with data and columns', () => {
    const wrapper = mount(
      EcTable,
      {
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
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected if provided with data and columns, with footer switched on', () => {
    const wrapper = mount(
      EcTable,
      {
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
          showFooter: true,
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as expected if provided with empty row and no columns, with footer switched on', () => {
    const wrapper = mount(
      EcTable,
      {
        propsData: {
          columns: [],
          data: [[]],
          showFooter: true,
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render slots as expected', () => {
    const wrapper = mount(
      EcTable,
      {
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
          showFooter: true,
        },
        scopedSlots: {
          col2: '<p>{{ props.content }}</p>',
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });
});
