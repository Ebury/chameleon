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

  it('should have class ec-table-head__cell--text-center if type of content is icon', () => {
    const propsData = {
      columns: [
        {
          name: 'Column A',
        },
        {
          name: 'Column B',
          type: 'icon',
        },
      ],
    };
    const wrapper = mount(EcTableHead, {
      propsData,
    });


    expect(wrapper.findByDataTest('ec-table-head__cell-0').classes()).not.toContain('ec-table-head__cell--text-center');
    expect(wrapper.findByDataTest('ec-table-head__cell-1').classes()).toContain('ec-table-head__cell--text-center');
  });

  it('Should not render if no columns are supplied', () => {
    const wrapper = mount(EcTableHead, {
      propsData: {},
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
