import { flushPromises, mount } from '@vue/test-utils';

import { withMockedConsole } from '../../../tests/utils/console';
import EcSyncMultipleValuesFilter from './ec-sync-multiple-values-filter.vue';

const items = [{
  value: 'success',
  icon: {
    name: 'rounded-check',
    type: 'success',
  },
  text: 'Success',
}, {
  value: 'partially-paid',
  icon: {
    name: 'rounded-partial',
    type: 'success',
  },
  text: 'Partially paid',
}, {
  value: 'cancelled',
  icon: {
    name: 'rounded-cancelled',
    type: 'error',
  },
  text: 'Cancelled',
}];

function mountEcSyncMultipleValuesFilter(props, mountOpts) {
  return mount(EcSyncMultipleValuesFilter, {
    props: {
      label: 'Status',
      ...props,
    },
    ...mountOpts,
  });
}

describe('EcSyncMultipleValuesFilter', () => {
  it('should render correctly if all the required props are passed', () => {
    const wrapper = mountEcSyncMultipleValuesFilter({ items });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw an error if no prop label is given', () => {
    withMockedConsole((errorSpy, warnSpy) => {
      mountEcSyncMultipleValuesFilter({}, { props: {} });
      expect(warnSpy).toHaveBeenCalledTimes(2);
      expect(warnSpy.mock.calls[0][0]).toContain('Missing required prop: "label"');
      expect(warnSpy.mock.calls[1][0]).toContain('Missing required prop: "items"');
    });
  });

  it('should update the number of items selected in numberOfSelectedFilters', () => {
    const wrapper = mountEcSyncMultipleValuesFilter({
      modelValue: [items[0]], items,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should emit update:modelValue and change events when filter is clicked', async () => {
    const wrapper = mountEcSyncMultipleValuesFilter({
      items,
    });

    await wrapper.findByDataTest('ec-multiple-values-selection__checkbox-select-0').findByDataTest('ec-checkbox__input').setValue(true);
    expect(wrapper.emitted('update:modelValue')).toEqual([[[items[0]]]]);
    expect(wrapper.emitted('change')).toEqual([[[items[0]]]]);
  });

  it('should emit update:modelValue event when filter is clicked while there are preselected filters', async () => {
    const wrapper = mountEcSyncMultipleValuesFilter({
      modelValue: [items[0]], items,
    });

    await wrapper.findByDataTest('ec-multiple-values-selection__checkbox-select-1').findByDataTest('ec-checkbox__input').setValue(true);
    expect(wrapper.emitted('update:modelValue')).toEqual([[[items[0], items[1]]]]);
    expect(wrapper.emitted('change')).toEqual([[[items[0], items[1]]]]);
  });

  it('should display loading state properly', () => {
    const wrapper = mountEcSyncMultipleValuesFilter({
      items,
      isLoading: true,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display error state properly', () => {
    const wrapper = mountEcSyncMultipleValuesFilter({
      items,
      errorMessage: 'Random error message',
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should ignore empty message when items are given', () => {
    const wrapper = mountEcSyncMultipleValuesFilter({
      items,
      emptyMessage: 'Random empty message',
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display an empty message when items are empty', () => {
    const wrapper = mountEcSyncMultipleValuesFilter({
      items: [],
      emptyMessage: 'Random empty message',
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display Select all checkbox if isSelectAll is set', () => {
    const wrapper = mountEcSyncMultipleValuesFilter({
      items: items.slice(0, 1),
      isSelectAll: true,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display custom label for Select all checkbox', () => {
    const wrapper = mountEcSyncMultipleValuesFilter({
      items: items.slice(0, 1),
      isSelectAll: true,
      selectAllFiltersText: 'Custom select all',
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render as full height if isFullHeight is set', () => {
    const wrapper = mountEcSyncMultipleValuesFilter({
      items: items.slice(0, 1),
      isFullHeight: true,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render search if isSearchable is set', () => {
    const wrapper = mountEcSyncMultipleValuesFilter({
      items: items.slice(0, 1),
      isSearchable: true,
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render custom search placeholder if is given', () => {
    const wrapper = mountEcSyncMultipleValuesFilter({
      items: items.slice(0, 1),
      isSearchable: true,
      searchFilterPlaceholder: 'Custom Search...',
    });
    expect(wrapper.findByDataTest('ec-multiple-values-selection__search-input').element).toMatchSnapshot();
  });

  it('should display empty state if searched value does not match any item', async () => {
    const wrapper = mountEcSyncMultipleValuesFilter({
      items,
      isSearchable: true,
    });

    await wrapper.findByDataTest('ec-multiple-values-selection__search-input').setValue('abcd');

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should not display selected values in the empty state if searched value does not match any item', async () => {
    const wrapper = mountEcSyncMultipleValuesFilter({
      items,
      isSearchable: true,
      modelValue: [items[0], items[1]],
    });

    await wrapper.findByDataTest('ec-multiple-values-selection__search-input').setValue('abcd');

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should be able to search in items by their text', async () => {
    const wrapper = mountEcSyncMultipleValuesFilter({
      items,
      isSearchable: true,
    });

    await wrapper.findByDataTest('ec-multiple-values-selection__search-input').setValue('partially paid');

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should be able to search in items by their text even if diacritics does not match', async () => {
    const wrapper = mountEcSyncMultipleValuesFilter({
      items,
      isSearchable: true,
    });

    await wrapper.findByDataTest('ec-multiple-values-selection__search-input').setValue('  Suččéss ');

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should ignore only whitespace in the search query', async () => {
    const wrapper = mountEcSyncMultipleValuesFilter({
      items,
      isSearchable: true,
    });

    await wrapper.findByDataTest('ec-multiple-values-selection__search-input').setValue('  \n ');

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should focus the search input when the popover gets open', async () => {
    const elem = document.createElement('div');
    document.body.appendChild(elem);

    const wrapper = mountEcSyncMultipleValuesFilter({
      items,
      isSearchable: true,
    }, {
      attachTo: elem,
    });

    document.activeElement.blur();

    await wrapper.findComponent({ name: 'EcPopoverStub' }).vm.$emit('apply-show');
    await flushPromises();

    expect(document.activeElement).toBe(wrapper.findByDataTest('ec-multiple-values-selection__search-input').element);

    wrapper.unmount();
  });
});
