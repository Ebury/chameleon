import { mount, createLocalVue } from '@vue/test-utils';
import EcMultipleValuesSelection from './ec-multiple-values-selection.vue';
import { withMockedConsole } from '../../../tests/utils/console';

const selectAllFiltersText = 'Select all';
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

function mountEcMultipleValuesSelection(props, mountOpts) {
  return mount(EcMultipleValuesSelection, {
    propsData: {
      selectAllFiltersText,
      ...props,
    },
    ...mountOpts,
  });
}

function mountEcMultipleValuesSelectionAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
  const localVue = createLocalVue();

  const Component = localVue.extend({
    components: { EcMultipleValuesSelection },
    template,
    ...wrapperComponentOpts,
  });

  return mount(Component, {
    localVue,
    propsData: { ...props },
    ...mountOpts,
  });
}
describe('EcMultipleValuesSelection', () => {
  it('should render correctly if all the required props are passed', () => {
    const wrapper = mountEcMultipleValuesSelection({ items });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw an error if required prop label is missing', () => {
    withMockedConsole((errorSpy) => {
      mountEcMultipleValuesSelection();
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "items"');
    });
  });

  it(':selectedFilters should return the correct value from prop "value"', () => {
    const testValue = [{ value: 'test value', name: 'test name' }];
    const wrapper = mountEcMultipleValuesSelection({ items, value: testValue });

    expect(wrapper.vm.selectedFilters).toEqual(testValue);
  });

  it('should not be visibile if isSearchable is set to false', () => {
    const wrapper = mountEcMultipleValuesSelection({ items, isSearchable: false });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should emit selected items', async () => {
    const wrapper = mountEcMultipleValuesSelection({ items });
    await wrapper.findByDataTest('ec-multiple-values-selection__checkbox-select').findByDataTest('ec-checkbox__input').trigger('click');
    expect(wrapper.emitted('change')).toBeTruthy();
  });

  it('should deselected items', async () => {
    const wrapper = mountEcMultipleValuesSelectionAsTemplate(
      '<ec-multiple-values-selection v-model="selectedFilters" :items="items" :is-searchable="false" :select-all-filters-text="selectAllFiltersText" />',
      {},
      {
        data() {
          return {
            items,
            selectAllFiltersText,
            selectedFilters: [{ value: 'Cancel', name: 'Cancel' }],
          };
        },
      },
    );
    await wrapper.findByDataTest('ec-multiple-values-selection__checkbox-deselect').findByDataTest('ec-checkbox__input').trigger('click');
    expect(wrapper.vm.selectedFilters).toEqual([]);
  });

  it('should toggle (select/unselect) all options clicked', async () => {
    const wrapper = mountEcMultipleValuesSelectionAsTemplate(
      '<ec-multiple-values-selection v-model="selectedFilters" :items="items" :select-all-filters-text="selectAllFiltersText" :isSelectAll="true" />',
      {},
      {
        data() {
          return {
            items,
            selectedFilters: [],
            selectAllFiltersText,
          };
        },
      },
    );

    await wrapper.findByDataTest('ec-multiple-values-selection__select-all').findByDataTest('ec-checkbox__input').trigger('click');
    expect(wrapper.element).toMatchSnapshot();
    await wrapper.findByDataTest('ec-multiple-values-selection__select-all').findByDataTest('ec-checkbox__input').trigger('click');
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should set the empty state message', async () => {
    const wrapper = mountEcMultipleValuesSelection({ items: [], emptyMessage: 'No items', emptyIcon: 'simple-error' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should set the error message', async () => {
    const error = new Error('Error message');
    const wrapper = mountEcMultipleValuesSelection({ items: [], error, emptyIcon: 'simple-error' });
    expect(wrapper.element).toMatchSnapshot();
  });
});
