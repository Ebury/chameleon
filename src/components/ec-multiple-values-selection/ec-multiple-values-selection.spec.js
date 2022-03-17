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

  it('should emit selected items', async () => {
    const wrapper = mountEcMultipleValuesSelection({ items });
    await wrapper.findByDataTest('ec-multiple-values-selection__checkbox-select').findByDataTest('ec-checkbox__input').trigger('click');
    expect(wrapper.emitted('change').length).toBe(1);
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
            selectedFilters: [items[2]],
          };
        },
      },
    );
    expect(wrapper.vm.selectedFilters).toEqual([items[2]]);
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

  describe('Select all', () => {
    it('should be indeterminate when at least one option is selected', () => {
      const wrapper = mountEcMultipleValuesSelection({
        items,
        value: [items[0]],
        isSelectAll: true,
      });

      expect(wrapper.findByDataTest('ec-multiple-values-selection__select-all').element).toMatchSnapshot();
    });

    it('should not be indeterminate when all options are selected', () => {
      const wrapper = mountEcMultipleValuesSelection({
        items,
        value: [...items],
        isSelectAll: true,
      });
      expect(wrapper.findByDataTest('ec-multiple-values-selection__select-all').element).toMatchSnapshot();
    });

    it('should not be indeterminate when Select all gets click', async () => {
      const wrapper = mountEcMultipleValuesSelectionAsTemplate(
        '<ec-multiple-values-selection v-model="selectedFilters" :items="items" :select-all-filters-text="selectAllFiltersText" is-select-all />',
        {},
        {
          data() {
            return {
              items,
              selectedFilters: [items[0]],
              selectAllFiltersText,
            };
          },
        },
      );

      await wrapper.findByDataTest('ec-multiple-values-selection__select-all').findByDataTest('ec-checkbox__input').trigger('click');

      expect(wrapper.findByDataTest('ec-multiple-values-selection__select-all').element).toMatchSnapshot();
    });
  });

  it('should set the empty state message', () => {
    const wrapper = mountEcMultipleValuesSelection({ items: [], emptyMessage: 'No items' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should set the empty state icon', () => {
    const wrapper = mountEcMultipleValuesSelection({ items: [], emptyMessage: 'No items', emptyIcon: 'simple-check' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should set the error message', () => {
    const wrapper = mountEcMultipleValuesSelection({ items: [], errorMessage: 'Error message' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should set the error icon', () => {
    const wrapper = mountEcMultipleValuesSelection({ items: [], errorMessage: 'Error message', errorIcon: 'simple-check' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render loading state', () => {
    const wrapper = mountEcMultipleValuesSelection({ items: [], isLoading: true });
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('search', () => {
    it('should not have the search visible if isSearchable is set to false', () => {
      const wrapper = mountEcMultipleValuesSelection({ items, isSearchable: false });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render properly when isSearchable is true', () => {
      const wrapper = mountEcMultipleValuesSelection({ items, isSearchable: true });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render properly when searchFilterPlaceholder is set', () => {
      const wrapper = mountEcMultipleValuesSelection({ items, isSearchable: true, searchFilterPlaceholder: 'Custom placeholder' });
      expect(wrapper.findByDataTest('ec-multiple-values-selection__search-input').element).toMatchSnapshot();
    });

    it('should emit search event and trim its value', async () => {
      const wrapper = mountEcMultipleValuesSelection({ items, isSearchable: true });
      await wrapper.findByDataTest('ec-multiple-values-selection__search-input').setValue(' ABCD efgh  ');
      expect(wrapper.emitted('search')).toEqual([
        ['ABCD efgh'],
      ]);
    });

    it('should be focusable when is searchable', async () => {
      const elem = document.createElement('div');
      document.body.appendChild(elem);

      const wrapper = mountEcMultipleValuesSelection({ items, isSearchable: true }, {
        attachTo: elem,
      });

      document.activeElement.blur();
      wrapper.vm.focus();

      await wrapper.vm.$nextTick();

      expect(document.activeElement).toBe(wrapper.findByDataTest('ec-multiple-values-selection__search-input').element);

      wrapper.destroy();
    });
  });
});
