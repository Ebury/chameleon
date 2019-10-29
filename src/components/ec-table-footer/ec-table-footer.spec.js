import { mount } from '@vue/test-utils';
import EcTableFooter from './ec-table-footer.vue';

describe('EcTableFooter', () => {
  it('should render an empty row if no props are supplied', () => {
    const wrapper = mount(
      EcTableFooter,
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with singular text if supplied with 1 item and no total items', () => {
    const wrapper = mount(
      EcTableFooter,
      {
        propsData: {
          itemsInView: 1,
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with the plural text when supplied with more than 1 item and no total items', () => {
    const wrapper = mount(
      EcTableFooter,
      {
        propsData: {
          itemsInView: 2,
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with singular text if there is only 1 for total items', () => {
    const wrapper = mount(
      EcTableFooter,
      {
        propsData: {
          itemsInView: 1,
          totalItems: 1,
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render without `total items` text if there are more items supplied than total items', () => {
    const wrapper = mount(
      EcTableFooter,
      {
        propsData: {
          itemsInView: 13,
          totalItems: 3,
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with `total items` text if there are more total items supplied than items in view', () => {
    const wrapper = mount(
      EcTableFooter,
      {
        propsData: {
          itemsInView: 17,
          totalItems: 21,
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });
});
