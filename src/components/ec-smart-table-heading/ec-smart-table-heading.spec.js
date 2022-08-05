import { mount } from '@vue/test-utils';

import EcSmartTableHeading from './ec-smart-table-heading.vue';

function mountEcSmartTableHeading(props, mountOpts) {
  return mount(EcSmartTableHeading, {
    props: {
      title: 'Random Title',
      ...props,
    },
    ...mountOpts,
  });
}

describe('EcSmartTableHeading', () => {
  it('should render properly', () => {
    const wrapper = mountEcSmartTableHeading();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render the title if title prop was not given', () => {
    const wrapper = mountEcSmartTableHeading({ title: null });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given filter slot', () => {
    const wrapper = mountEcSmartTableHeading(null, {
      slots: {
        filter: '<div>Custom filter</div>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given header-actions slot', () => {
    const wrapper = mountEcSmartTableHeading(null, {
      slots: {
        actions: '<div>Header Actions</div>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given filter and header-actions slots', () => {
    const wrapper = mountEcSmartTableHeading(null, {
      slots: {
        filter: '<div>Custom filter</div>',
        actions: '<div>Header Actions</div>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
