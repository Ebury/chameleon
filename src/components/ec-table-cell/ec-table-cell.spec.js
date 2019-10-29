import { mount } from '@vue/test-utils';
import EcTableCell from './ec-table-cell.vue';

describe('EcTableCell', () => {
  it('should render as expected', () => {
    const wrapper = mount(
      EcTableCell,
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should use the slot when given content', () => {
    const wrapper = mount(
      EcTableCell,
      {
        slots: {
          default: '<p><a href="#">PO1234A</a<p><p>This is a payment reference</p>',
        },
      },
    );

    expect(wrapper.element).toMatchSnapshot();
  });
});
