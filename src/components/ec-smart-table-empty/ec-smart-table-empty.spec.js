import { mount } from '@vue/test-utils';
import EcSmartTableEmpty from './ec-smart-table-empty.vue';

function mountEcSmartTableEmpty(props, mountOpts) {
  return mount(EcSmartTableEmpty, {
    propsData: {
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
      scopedSlots: {
        empty: '<strong>Empty Slot: {{props.emptyMessage}}</strong>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given filter slot', () => {
    const wrapper = mountEcSmartTableEmpty(null, {
      scopedSlots: {
        filter: '<div>Custom filter</div>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
