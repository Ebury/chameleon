import { mount } from '@vue/test-utils';
import EcTableFooter from './ec-table-footer.vue';

describe('EcTableFooter', () => {
  it('should render without footer slot', () => {
    const wrapper = mount(
      EcTableFooter,
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with footer slot', () => {
    const wrapper = mount(
      EcTableFooter,
      {
        slots: {
          default: '<p>Random text</p>',
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });
});
