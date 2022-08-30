import { mount } from '@vue/test-utils';

import EcTableFooter from './ec-table-footer.vue';

describe('EcTableFooter', () => {
  function mountEcTableFooter(props, mountOpts) {
    return mount(EcTableFooter, {
      props,
      ...mountOpts,
    });
  }

  it('should render with the given colspan', () => {
    const wrapper = mountEcTableFooter({
      colspan: 6,
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render without footer slot', () => {
    const wrapper = mountEcTableFooter();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with footer slot', () => {
    const wrapper = mountEcTableFooter({}, {
      slots: {
        default: '<p>Random text</p>',
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
