import { mount } from '@vue/test-utils';
import EcTableHead from './ec-table-head.vue';

describe('EcTableHead', () => {
  it('Should render as expected', () => {
    const propsData = {
      columns: [
        {
          name: 'Column A',
        },
        {
          name: 'Column B',
          span: 2,
        },
        {
          name: 'Column C',
          scope: 'row',
        },
      ],
    };
    const wrapper = mount(EcTableHead, {
      propsData,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('Should not render if no columns are supplied', () => {
    const wrapper = mount(EcTableHead, {
      propsData: {},
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
