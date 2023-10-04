import { mount } from '@vue/test-utils';
import { defineComponent, markRaw } from 'vue';

import { withMockedConsole } from '../../../tests/utils/console';
import EcDateRangeFilter from '../ec-date-range-filter';
import EcSyncMultipleValuesFilter from '../ec-sync-multiple-values-filter';
import EcTextFilter from '../ec-text-filter';
import EcTableFilter from './ec-table-filter.vue';

const filters = [{
  label: 'Payment status',
  name: 'paymentStatus',
  component: markRaw(EcSyncMultipleValuesFilter),
  items: [{ text: 'Paid', value: 'paid' }, { text: 'Cancelled', value: 'canceled' }, { text: 'Overdue', value: 'overdue' }],
  isSearchable: false,
  isSelectAll: false,
  selectAllFiltersText: '',
}, {
  label: 'Fee type',
  name: 'feeType',
  component: markRaw(EcSyncMultipleValuesFilter),
  items: [{ text: 'Invoiced', value: 'invoiced' }, { text: 'Other type', value: 'other type' }],
  isSearchable: false,
  isSelectAll: false,
  selectAllFiltersText: '',
}, {
  label: 'Due date',
  name: 'dueDate',
  component: markRaw(EcDateRangeFilter),
  fromLabelText: 'From',
  toLabelText: 'To',
  clearText: 'Clear dates',
}, {
  name: 'text',
  component: markRaw(EcTextFilter),
}];

const modelValue = { feeType: [{ text: 'Invoiced', value: 'invoiced' }], text: 'Some value' };

function mountEcTableFilter(props, mountOpts) {
  return mount(EcTableFilter, {
    props,
    ...mountOpts,
  });
}

function mountEcTableFilterAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
  const Component = defineComponent({
    components: { EcTableFilter },
    template,
    ...wrapperComponentOpts,
  });

  return mount(Component, {
    props,
    ...mountOpts,
  });
}

describe('EcTableFilter', () => {
  it('should render correctly if all the required props are passed', () => {
    const wrapper = mountEcTableFilter({ filters });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw an error if no filters prop is given', () => {
    withMockedConsole((errorSpy, warnSpy) => {
      mountEcTableFilter();
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('Missing required prop: "filters"');
    });
  });

  it('should render custom attributes', () => {
    const wrapper = mountEcTableFilter({ filters }, {
      attrs: {
        class: 'my-class',
        id: 'my-id',
        'data-test': 'my-data-test',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with pre-selected filters if the value prop is passed', () => {
    const wrapper = mountEcTableFilter({ modelValue, filters });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should hide filters with "tw-hidden" class when "isHidden" is set', async () => {
    const hiddenFilters = [
      {
        name: 'text',
        component: markRaw(EcTextFilter),
        isHidden: true,
      },
    ];
    const wrapper = mountEcTableFilterAsTemplate(
      '<ec-table-filter v-model="value" :filters="filters" />',
      {},
      {
        data() {
          return {
            value: {},
            filters: [...filters, ...hiddenFilters],
          };
        },
      },
    );
    const dueDateFilter = wrapper.findByDataTest('ec-table-filter__filter-item-4');
    expect(dueDateFilter.classes()).toContain('tw-hidden');
    expect(dueDateFilter.element).toMatchSnapshot();

    hiddenFilters[0].isHidden = false;
    await wrapper.setProps({
      filters: hiddenFilters,
    });

    expect(dueDateFilter.classes()).not.toContain('tw-hidden');
    expect(dueDateFilter.element).toMatchSnapshot();
  });

  it('should hide the clear filters button when "isClearFiltersButtonHidden" is set', () => {
    const wrapper = mountEcTableFilterAsTemplate(
      '<ec-table-filter v-model="value" :filters="filters" />',
      {
        isClearFiltersButtonHidden: true,
      },
      {
        data() {
          return {
            value: { feeType: modelValue.feeType },
            filters,
          };
        },
      },
    );
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should hide the clear filters button if there isn\'t any preselected filter', () => {
    const wrapper = mountEcTableFilterAsTemplate(
      '<ec-table-filter v-model="value" :filters="filters" />',
      {},
      {
        data() {
          return {
            value: {},
            filters,
          };
        },
      },
    );
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should hide the clear filters button when the user deselect the all the filters manually', async () => {
    const wrapper = mountEcTableFilterAsTemplate(
      '<ec-table-filter v-model="value" :filters="filters" :popover-options="{ open: true }" />',
      {},
      {
        data() {
          return {
            value: { feeType: modelValue.feeType },
            filters,
          };
        },
      },
    );
    await wrapper.findByDataTest('ec-table-filter__filter-item-1').findByDataTest('ec-multiple-values-selection__checkbox-deselect').findByDataTest('ec-checkbox__input').setValue(false);
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-table-filter__clear-filters-button').exists()).toBe(false);
  });

  it('should emit an empty object when clear filters button is clicked', () => {
    const wrapper = mountEcTableFilter({ modelValue, filters });

    wrapper.findByDataTest('ec-table-filter__clear-filters-button').trigger('click');
    expect(wrapper.emitted('update:modelValue')).toEqual([[{}]]);
    expect(wrapper.emitted('change')).toEqual([[{}]]);
  });

  it('should emit a change event with an empty object when the user deselect the filter', async () => {
    const wrapper = mountEcTableFilter({ modelValue, filters });
    await wrapper.findByDataTest('ec-table-filter__filter-item-1').findByDataTest('ec-multiple-values-selection__checkbox-deselect').findByDataTest('ec-checkbox__input').setValue(false);

    expect(wrapper.emitted('update:modelValue').length).toBe(1);
    expect(wrapper.emitted('change').length).toEqual(1);
  });

  it('should emit a change event with the selected filters object when the user select a filter', async () => {
    const wrapper = mountEcTableFilter({ modelValue, filters });

    await wrapper.findByDataTest('ec-table-filter__filter-item-0').findByDataTest('ec-checkbox__input').setValue(true);
    expect(wrapper.emitted('update:modelValue').length).toBe(1);
    expect(wrapper.emitted('change').length).toBe(1);
  });
});
