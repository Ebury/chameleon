import { mount, createLocalVue } from '@vue/test-utils';
import EcTableFilter from './ec-table-filter.vue';
import EcSyncMultipleValuesFilter from '../ec-sync-multiple-values-filter';
import EcDateRangeFilter from '../ec-date-range-filter';
import { withMockedConsole } from '../../../tests/utils/console';

const filters = [{
  label: 'Payment status',
  name: 'paymentStatus',
  component: EcSyncMultipleValuesFilter,
  items: [{ text: 'Paid', value: 'paid' }, { text: 'Cancelled', value: 'canceled' }, { text: 'Overdue', value: 'overdue' }],
  isSearchable: false,
  isSelectAll: false,
  selectAllFiltersText: '',
}, {
  label: 'Fee type',
  name: 'feeType',
  component: EcSyncMultipleValuesFilter,
  items: [{ text: 'Invoiced', value: 'invoiced' }, { text: 'Other type', value: 'other type' }],
  isSearchable: false,
  isSelectAll: false,
  selectAllFiltersText: '',
}, {
  label: 'Due date',
  name: 'dueDate',
  component: EcDateRangeFilter,
  fromLabelText: 'From',
  toLabelText: 'To',
  clearText: 'Clear dates',
}];

const value = { feeType: [{ text: 'Invoiced', value: 'invoiced' }] };

function mountEcTableFilter(props, mountOpts) {
  return mount(EcTableFilter, {
    stubs: { EcPopover: true },
    propsData: {
      ...props,
    },
    ...mountOpts,
  });
}

function mountEcTableFilterAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
  const localVue = createLocalVue();

  const Component = localVue.extend({
    components: { EcTableFilter },
    template,
    ...wrapperComponentOpts,
  });

  return mount(Component, {
    localVue,
    stubs: { EcPopover: true },
    propsData: { ...props },
    ...mountOpts,
  });
}

describe('EcTableFilter', () => {
  it('should render correctly if all the required props are passed', () => {
    const wrapper = mountEcTableFilter({ filters });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw an error if no filters prop is given', () => {
    withMockedConsole((errorSpy) => {
      mountEcTableFilter();
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "filters"');
    });
  });

  it('should render with pre-selected filters if the value prop is passed', () => {
    const wrapper = mountEcTableFilter({ value, filters });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should hide the clear filters button if there isn\'t any preselected filter', () => {
    const wrapper = mountEcTableFilterAsTemplate(
      '<ec-table-filter v-model="valueFromProps" :filters="filters" />',
      {},
      {
        data() {
          return {
            valueFromProps: {},
            filters,
          };
        },
      },
    );
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should hide the clear filters button when the user deselect the all the filters manually', async () => {
    const wrapper = mountEcTableFilterAsTemplate(
      '<ec-table-filter v-model="valueFromProps" :filters="filters" :popover-options="{ open: true }" />',
      {},
      {
        data() {
          return {
            valueFromProps: value,
            filters,
          };
        },
      },
    );
    const filterItem = wrapper.findByDataTest('ec-table-filter__filter-item-1').findByDataTest('ec-multiple-values-selection__checkbox-deselect').findByDataTest('ec-checkbox__label');

    await filterItem.trigger('click');

    await wrapper.vm.$nextTick();
    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.findByDataTest('ec-table-filter__clear-filters-button').exists()).toBeFalsy();
  });

  it('should emit an empty object when clear filters button is clicked', () => {
    const wrapper = mountEcTableFilter({ value, filters });

    wrapper.findByDataTest('ec-table-filter__clear-filters-button').trigger('click');
    expect(wrapper.emitted().change).toEqual([[{}]]);
  });

  it('should emit a change event with an empty object when the user deselect the filter', () => {
    const wrapper = mountEcTableFilter({ value, filters, popoverOptions: { open: true } });
    const filterItem = wrapper.findByDataTest('ec-table-filter__filter-item-1').findByDataTest('ec-multiple-values-selection__checkbox-deselect').findByDataTest('ec-checkbox__label');

    filterItem.trigger('click');

    expect(wrapper.emitted().change).toEqual([[{}]]);
  });

  it('should emit a change event with the selected filters object when the user select a filter', () => {
    const wrapper = mountEcTableFilter({ value, filters, popoverOptions: { open: true } });

    wrapper.findByDataTest('ec-table-filter__filter-item-0').findByDataTest('ec-checkbox__label').trigger('click');
    expect(wrapper.emitted('change').length).toBeTruthy();
  });
});
