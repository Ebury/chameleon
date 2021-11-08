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
    const wrapper = mountEcSyncMultipleValuesFilter({
      value: [items[0]], label, items, selectAllFiltersText,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should emit change event when filter is clicked', async () => {
    const wrapper = mountEcSyncMultipleValuesFilter({
      label, items, selectAllFiltersText,
    });

    await wrapper.findByDataTest('ec-multiple-values-selection__checkbox-select-0').findByDataTest('ec-checkbox__label').trigger('click');
    expect(wrapper.emitted('change')).toEqual([
      [
        [items[0]],
      ],
    ]);
  });

  it('should emit change event when filter is clicked while there are preselected filters', async () => {
    const wrapper = mountEcSyncMultipleValuesFilter({
      value: [items[0]], label, items, selectAllFiltersText,
    });

    await wrapper.findByDataTest('ec-multiple-values-selection__checkbox-select-0').findByDataTest('ec-checkbox__label').trigger('click');
    expect(wrapper.emitted('change')).toEqual([
      [
        [items[0], items[1]],
      ],
    ]);
  });
});
