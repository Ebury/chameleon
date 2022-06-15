import { mount } from '@vue/test-utils';
import { h } from 'vue';

import EcSmartTableEmpty from './ec-smart-table-empty.vue';

function mountEcSmartTableEmpty(props, mountOpts) {
  return mount(EcSmartTableEmpty, {
    props: {
      title: 'Random Title',
      emptyMessage: 'Random empty message',
      ...props,
    },
    ...mountOpts,
  });
}

describe('EcSmartTableEmpty', () => {
  it('should render properly', () => {
    const wrapper = mountEcSmartTableEmpty();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render the title if title prop was not given', () => {
    const wrapper = mountEcSmartTableEmpty({ title: null });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render default empty message', () => {
    const wrapper = mountEcSmartTableEmpty({ emptyMessage: undefined });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given empty slot', () => {
    const wrapper = mountEcSmartTableEmpty({ emptyMessage: 'Test empty message' }, {
      slots: {
        empty: ({ emptyMessage }) => h('strong', `Empty Slot: ${emptyMessage}`),
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given filter slot', () => {
    const wrapper = mountEcSmartTableEmpty(null, {
      slots: {
        filter: '<div>Custom filter</div>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given header-actions slot', () => {
    const wrapper = mountEcSmartTableEmpty(null, {
      slots: {
        'header-actions': '<div>Header Actions</div>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given header-actions slot with the props', () => {
    const wrapper = mountEcSmartTableEmpty(null, {
      slots: {
        'header-actions': ({
          total, items, error, loading,
        }) => h('div', `Header Actions total: ${total}, items: ${JSON.stringify(items)}, error: ${error}, loading: ${loading}`),
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given filter and header-actions slots', () => {
    const wrapper = mountEcSmartTableEmpty(null, {
      slots: {
        filter: '<div>Custom filter</div>',
        'header-actions': '<div>Header Actions</div>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
