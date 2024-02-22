import { type ComponentMountingOptions, mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

import { withMockedConsole } from '../../../tests/utils/console';
import { IconName } from '../ec-icon/icon-names';
import { IconType } from '../ec-icon/types';
import EcMultipleValuesSelection from './ec-multiple-values-selection.vue';
import type { MultipleValuesSelectionItem, MultipleValuesSelectionProps } from './types';

const selectAllFiltersText = 'Select all';
const items: MultipleValuesSelectionItem[] = [{
  value: 'Success',
  icon: {
    name: IconName.ROUNDED_CHECK,
    type: IconType.SUCCESS,
  },
  text: 'Success',
}, {
  value: 'Partially paid',
  icon: {
    name: IconName.ROUNDED_PARTIAL,
    type: IconType.SUCCESS,
  },
  text: 'Name two',
}, {
  value: 'Cancelled',
  icon: {
    name: IconName.ROUNDED_CANCELLED,
    type: IconType.ERROR,
  },
  text: 'Cancelled',
}];

function mountEcMultipleValuesSelection(props?: MultipleValuesSelectionProps, mountOpts?: ComponentMountingOptions<typeof EcMultipleValuesSelection>) {
  return mount(EcMultipleValuesSelection, {
    props: {
      selectAllFiltersText,
      ...props,
    },
    ...mountOpts,
  });
}

describe('EcMultipleValuesSelection', () => {
  it('should render correctly if all the required props are passed', () => {
    const wrapper = mountEcMultipleValuesSelection({ items });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw an error if required prop label is missing', () => {
    withMockedConsole((errorSpy, warnSpy) => {
      mountEcMultipleValuesSelection();
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('Missing required prop: "items"');
    });
  });

  it('should emit selected items', async () => {
    const wrapper = mountEcMultipleValuesSelection({ items });
    await wrapper.findByDataTest('ec-multiple-values-selection__checkbox-select').findByDataTest('ec-checkbox__input').setValue(true);
    expect(wrapper.emitted('change')?.length).toBe(1);
    expect(wrapper.emitted('update:modelValue')?.length).toBe(1);
  });

  it('should deselected items', async () => {
    const Component = defineComponent({
      components: { EcMultipleValuesSelection },
      data() {
        return {
          items,
          selectAllFiltersText,
          selectedFilters: [items[2]],
        };
      },
      template: '<ec-multiple-values-selection v-model="selectedFilters" :items="items" :is-searchable="false" :select-all-filters-text="selectAllFiltersText" />',
    });

    const wrapper = mount(Component);
    expect(wrapper.vm.selectedFilters).toEqual([items[2]]);
    await wrapper.findByDataTest('ec-multiple-values-selection__checkbox-deselect').findByDataTest('ec-checkbox__input').setValue(false);
    expect(wrapper.vm.selectedFilters).toEqual([]);
  });

  it('should toggle (select/unselect) all options clicked', async () => {
    const Component = defineComponent({
      components: { EcMultipleValuesSelection },
      data() {
        return {
          items,
          selectedFilters: [],
          selectAllFiltersText,
        };
      },
      template: '<ec-multiple-values-selection v-model="selectedFilters" :items="items" :select-all-filters-text="selectAllFiltersText" :isSelectAll="true" />',
    });

    const wrapper = mount(Component);

    await wrapper.findByDataTest('ec-multiple-values-selection__select-all').findByDataTest('ec-checkbox__input').setValue(true);
    expect(wrapper.element).toMatchSnapshot();
    await wrapper.findByDataTest('ec-multiple-values-selection__select-all').findByDataTest('ec-checkbox__input').setValue(false);
    expect(wrapper.element).toMatchSnapshot();
  });

  describe('select all', () => {
    it('should be indeterminate when at least one option is selected', () => {
      const wrapper = mountEcMultipleValuesSelection({
        items,
        modelValue: [items[0]],
        isSelectAll: true,
      });

      expect(wrapper.findByDataTest('ec-multiple-values-selection__select-all').element).toMatchSnapshot();
    });

    it('should not be indeterminate when all options are selected', () => {
      const wrapper = mountEcMultipleValuesSelection({
        items,
        modelValue: [...items],
        isSelectAll: true,
      });
      expect(wrapper.findByDataTest('ec-multiple-values-selection__select-all').element).toMatchSnapshot();
    });

    it('should not be indeterminate when Select all gets click', async () => {
      const Component = defineComponent({
        components: { EcMultipleValuesSelection },
        data() {
          return {
            items,
            selectedFilters: [items[0]],
            selectAllFiltersText,
          };
        },
        template: '<ec-multiple-values-selection v-model="selectedFilters" :items="items" :select-all-filters-text="selectAllFiltersText" is-select-all />',
      });

      const wrapper = mount(Component);
      await wrapper.findByDataTest('ec-multiple-values-selection__select-all').findByDataTest('ec-checkbox__input').setValue(true);

      expect(wrapper.findByDataTest('ec-multiple-values-selection__select-all').element).toMatchSnapshot();
    });
  });

  it('should set the empty state message', () => {
    const wrapper = mountEcMultipleValuesSelection({ items: [], emptyMessage: 'No items' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should set the empty state icon', () => {
    const wrapper = mountEcMultipleValuesSelection({ items: [], emptyMessage: 'No items', emptyIcon: IconName.SIMPLE_CHECK });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should set the error message', () => {
    const wrapper = mountEcMultipleValuesSelection({ items: [], errorMessage: 'Error message' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should set the error icon', () => {
    const wrapper = mountEcMultipleValuesSelection({ items: [], errorMessage: 'Error message', errorIcon: IconName.SIMPLE_CHECK });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render loading state', () => {
    const wrapper = mountEcMultipleValuesSelection({ items: [], isLoading: true });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with rounded icons', () => {
    const wrapper = mountEcMultipleValuesSelection({
      items: [
        {
          value: 'Currency EUR',
          icon: {
            name: IconName.CURRENCY_EUR,
            type: IconType.INTERACTIVE,
          },
          text: 'Currency EUR',
        },
      ],
      hasRoundedIcons: true,
    });
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
      expect(wrapper.findByDataTest<HTMLInputElement>('ec-multiple-values-selection__search-input').element.value).toBe('ABCD efgh');
    });

    it('should be focusable when is searchable', async () => {
      const element = document.createElement('div');
      document.body.appendChild(element);

      const wrapper = mountEcMultipleValuesSelection({ items, isSearchable: true }, {
        attachTo: element,
      });

      (document.activeElement as HTMLElement).blur();
      wrapper.vm.focus();

      await wrapper.vm.$nextTick();

      expect(document.activeElement).toBe(wrapper.findByDataTest('ec-multiple-values-selection__search-input').element);

      wrapper.unmount();
    });
  });
});
