import { mount } from '@vue/test-utils';
import EcSyncMultipleValuesFilter from './ec-sync-multiple-values-filter.vue';
import { withMockedConsole } from '../../../tests/utils/console';

const label = 'Status';
const items = [{
  value: 'Success',
  icon: {
    name: 'rounded-check',
    type: 'success',
  },
  text: 'Success',
}, {
  value: 'Partially paid',
  icon: {
    name: 'rounded-partial',
    type: 'success',
  },
  text: 'Name two',
}, {
  value: 'Cancelled',
  icon: {
    name: 'rounded-cancelled',
    type: 'error',
  },
  text: 'Cancelled',
}];
const selectAllFiltersText = 'Select all test';

function mountEcSyncMultipleValuesFilter(props, mountOpts) {
  return mount(EcSyncMultipleValuesFilter, {
    propsData: {
      ...props,
    },
    ...mountOpts,
  });
}

describe('EcSyncMultipleValuesFilter', () => {
  it('should render correctly if all the required props are passed', () => {
    const wrapper = mountEcSyncMultipleValuesFilter({ label, items, selectAllFiltersText });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw an error if no prop label is given', () => {
    withMockedConsole((errorSpy) => {
      mountEcSyncMultipleValuesFilter();
      expect(errorSpy).toHaveBeenCalledTimes(3);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "label"');
      expect(errorSpy.mock.calls[1][0]).toContain('Missing required prop: "items"');
      expect(errorSpy.mock.calls[2][0]).toContain('Missing required prop: "selectAllFiltersText"');
    });
  });

  it('should update the number of items selected in numberOfSelectedFilters', () => {
    const value = [{ value: 'a', name: 'test name' }];
    const wrapper = mountEcSyncMultipleValuesFilter({
      value, label, items, selectAllFiltersText,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should emit change event when selectedFilters value change', async () => {
    const wrapper = mountEcSyncMultipleValuesFilter({
      label, items, selectAllFiltersText,
    });

    await wrapper.setData({ selectedFilters: [{ value: 'a', name: 'test name' }, { value: 'b', name: 'test name' }] });
    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });
});
