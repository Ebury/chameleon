import { mount } from '@vue/test-utils';
import { h } from 'vue';

import EcSmartTableError from './ec-smart-table-error.vue';

function mountEcSmartTableError(props, mountOpts) {
  return mount(EcSmartTableError, {
    props: {
      title: 'Random Title',
      errorMessage: 'Random error message',
      ...props,
    },
    ...mountOpts,
  });
}

describe('EcSmartTableError', () => {
  it('should render properly', () => {
    const wrapper = mountEcSmartTableError();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not render the title if title prop was not given', () => {
    const wrapper = mountEcSmartTableError({ title: null });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render default error message', () => {
    const wrapper = mountEcSmartTableError({ errorMessage: undefined });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given error slot', () => {
    const wrapper = mountEcSmartTableError({ errorMessage: 'Test error message' }, {
      slots: {
        error: ({ errorMessage }) => h('strong', `Error Slot: ${errorMessage}`),
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given filter slot', () => {
    const wrapper = mountEcSmartTableError(null, {
      slots: {
        filter: '<div>Custom filter</div>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given header-actions slot', () => {
    const wrapper = mountEcSmartTableError(null, {
      slots: {
        'header-actions': '<div>Header Actions</div>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given header-actions slot with the props', () => {
    const wrapper = mountEcSmartTableError(null, {
      slots: {
        'header-actions': ({
          total, items, error, loading,
        }) => h('div', `Header Actions total: ${total}, items: ${JSON.stringify(items)}, error: ${error}, loading: ${loading}`),
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given filter and header-actions slots', () => {
    const wrapper = mountEcSmartTableError(null, {
      slots: {
        filter: '<div>Custom filter</div>',
        'header-actions': '<div>Header Actions</div>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
