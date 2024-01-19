import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

import { withMockedConsole } from '../../../tests/utils/console';
import EcDateRangeFilter from './ec-date-range-filter.vue';

const label = 'Due date';
const modelValue = { from: new Date(2020, 3, 14), to: new Date(2020, 4, 10) };
const modelValueEmpty = { from: null, to: null };

describe('EcDateRangeFilter', () => {
  function mountEcDateRangeFilter(props, mountOpts) {
    return mount(EcDateRangeFilter, {
      props: {
        fromDatepickerOptions: {
          label: 'From',
        },
        toDatepickerOptions: {
          label: 'To',
        },
        clearText: 'Clear dates',
        modelValue,
        ...props,
      },
      ...mountOpts,
    });
  }

  function mountEcDateRangeFilterAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
    const Component = defineComponent({
      components: { EcDateRangeFilter },
      template,
      ...wrapperComponentOpts,
    });

    return mount(Component, {
      props,
      ...mountOpts,
    });
  }

  it('should render properly when all the props are given', () => {
    const wrapper = mountEcDateRangeFilter({ label });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with custom attributes', () => {
    const wrapper = mountEcDateRangeFilter({ label }, {
      attrs: {
        'data-test': 'my-data-test',
        class: 'my-class',
        id: 'test-id',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render properly with an error message when the dateRangeErrorMessage is given', () => {
    const wrapper = mountEcDateRangeFilter({ label, dateRangeErrorMessage: 'This is the date range error message' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render properly with an error message when the fromErrorMessage is given', () => {
    const wrapper = mountEcDateRangeFilter({
      label,
      fromDatepickerOptions: {
        errorMessage: 'This is the from field error message',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render properly with an error message when the toErrorMessage is given', () => {
    const wrapper = mountEcDateRangeFilter({
      label,
      toDatepickerOptions: {
        errorMessage: 'This is the to field error message',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw an error if no label prop was given', () => {
    withMockedConsole((errorSpy, warnSpy) => {
      mountEcDateRangeFilter();
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('Missing required prop: "label"');
    });
  });

  it('should emit a change event when correct dates are given', async () => {
    const wrapper = mountEcDateRangeFilter({ label });
    await wrapper.findByDataTest('ec-date-range-filter__trigger').trigger('click');
    await wrapper.findByDataTest('ec-date-range-filter__from-input').setValue('2020-11-06');
    await wrapper.findByDataTest('ec-date-range-filter__from-input').trigger('blur');
    expect(wrapper.emitted('change').length).toBe(1);
  });

  it('should emit a change event when the clear dates button is clicked', async () => {
    const wrapper = mountEcDateRangeFilter({ label });
    await wrapper.findByDataTest('ec-date-range-filter__trigger').trigger('click');
    wrapper.findByDataTest('ec-date-range-filter__clear-button').trigger('click');
    expect(wrapper.emitted('change')).toEqual([[{
      from: null,
      to: null,
    }]]);
  });

  it('should not emit a change event when there are no value for dates', async () => {
    const wrapper = mountEcDateRangeFilter({ label, modelValue: modelValueEmpty });
    await wrapper.findByDataTest('ec-date-range-filter__trigger').trigger('click');
    wrapper.findByDataTest('ec-date-range-filter__clear-button').trigger('click');
    expect(wrapper.findByDataTest('ec-date-range-filter__clear-button').attributes('disabled')).toBe('');
    expect(wrapper.emitted('change')).toBeUndefined();
  });

  it('should emit a blur event when the focus is moved away from the date input field', async () => {
    const wrapper = mountEcDateRangeFilter({ label });
    await wrapper.findByDataTest('ec-filter-popover__label').trigger('click');
    await wrapper.findByDataTest('ec-date-range-filter__from-input').trigger('blur');

    expect(wrapper.emitted('blur').length).toBe(1);
  });

  it('should update numberOfSelectedFilters when the dates are passed', async () => {
    const wrapper = mountEcDateRangeFilterAsTemplate(
      '<ec-date-range-filter :label="label" v-model="value"/>',
      {},
      {
        data() {
          return { value: modelValueEmpty, label };
        },
      },
    );

    await wrapper.findByDataTest('ec-date-range-filter__trigger').trigger('click');
    expect(wrapper.findByDataTest('ec-badge').exists()).toBe(false);

    await wrapper.findByDataTest('ec-date-range-filter__from-input').setValue('2020-11-06');
    await wrapper.findByDataTest('ec-date-range-filter__from-input').trigger('blur');
    expect(wrapper.findByDataTest('ec-date-range-filter__from-input').element.value).toBe('2020-11-06');
    expect(wrapper.findByDataTest('ec-badge').text()).toBe('1');

    await wrapper.findByDataTest('ec-date-range-filter__to-input').setValue('2020-12-06');
    await wrapper.findByDataTest('ec-date-range-filter__to-input').trigger('blur');
    expect(wrapper.findByDataTest('ec-date-range-filter__to-input').element.value).toBe('2020-12-06');
    expect(wrapper.findByDataTest('ec-badge').text()).toBe('2');
  });

  it('should render if no dates are passed in value prop', () => {
    const wrapper = mountEcDateRangeFilter({ label, modelValue: null });
    expect(wrapper.element).toMatchSnapshot();
  });
});
