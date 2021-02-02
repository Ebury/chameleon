import { mount, createLocalVue } from '@vue/test-utils';
import EcDateRangeFilter from './ec-date-range-filter.vue';
import { withMockedConsole } from '../../../tests/utils/console';

const label = 'Due date';
const value = { from: '2020-03-14', to: '2020-04-10' };
const valueEmpty = { from: null, to: null };

function mountEcDateRangeFilter(props, mountOpts) {
  return mount(EcDateRangeFilter, {
    propsData: {
      fromLabelText: 'From',
      toLabelText: 'To',
      clearText: 'Clear dates',
      value,
      ...props,
    },
    ...mountOpts,
  });
}

function mountEcDateRangeFilterAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
  const localVue = createLocalVue();

  const Component = localVue.extend({
    components: { EcDateRangeFilter },
    template,
    ...wrapperComponentOpts,
  });

  return mount(Component, {
    localVue,
    propsData: { ...props },
    ...mountOpts,
  });
}

describe('EcDateRangeFilter', () => {
  it('should render properly when all the props are given', () => {
    const wrapper = mountEcDateRangeFilter({ label });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render properly with an error message when the dateRangeErrorMessage is given', () => {
    const wrapper = mountEcDateRangeFilter({ label, dateRangeErrorMessage: 'This is the date range error message' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render properly with an error message when the fromErrorMessage is given', () => {
    const wrapper = mountEcDateRangeFilter({ label, fromErrorMessage: 'This is the from field error message' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render properly with an error message when the toErrorMessage is given', () => {
    const wrapper = mountEcDateRangeFilter({ label, toErrorMessage: 'This is the to field error message' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw an error if no label prop was given', () => {
    withMockedConsole((errorSpy) => {
      mountEcDateRangeFilter();
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "label"');
    });
  });

  it('should emit a change event when corrects dates are given', async () => {
    const wrapper = mountEcDateRangeFilter({ label });
    await wrapper.findByDataTest('ec-date-range-filter__trigger').trigger('click');
    wrapper.findByDataTest('ec-date-range-filter__from-input').setValue('2020-11-06');
    expect(wrapper.emitted('change')).toBeTruthy();
  });

  it('should emit a change event when the clear dates button is clicked', async () => {
    const wrapper = mountEcDateRangeFilter({ label });
    await wrapper.findByDataTest('ec-date-range-filter__trigger').trigger('click');
    wrapper.findByDataTest('ec-date-range-filter__clear-button').trigger('click');
    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.emitted().change).toEqual([[null]]);
  });

  it('should not emit clear when there are no value for dates', async () => {
    const wrapper = mountEcDateRangeFilter({ label, value: valueEmpty });
    await wrapper.findByDataTest('ec-date-range-filter__trigger').trigger('click');
    wrapper.findByDataTest('ec-date-range-filter__clear-button').trigger('click');
    expect(wrapper.findByDataTest('ec-date-range-filter__clear-button').attributes('disabled')).toBe('disabled');
    expect(wrapper.emitted('change')).toBeFalsy();
  });

  it('should emit a blur event when the focus is moved away from the date input field', async () => {
    const wrapper = mountEcDateRangeFilter({ label });
    await wrapper.findByDataTest('ec-filter-popover__label').trigger('click');
    await wrapper.findByDataTest('ec-date-range-filter__from-input').findByDataTest('ec-input-field__input').trigger('blur');

    expect(wrapper.emitted('blur')).toBeTruthy();
  });

  it('should update numberOfSelectedFilters when the dates are passed', async () => {
    const wrapper = mountEcDateRangeFilterAsTemplate(
      '<ec-date-range-filter :label="label" v-model="value"/>',
      {},
      {
        data() {
          return { value: valueEmpty, label };
        },
      },
    );

    await wrapper.findByDataTest('ec-date-range-filter__trigger').trigger('click');
    expect(wrapper.findByDataTest('ec-filter-popover__badge').exists()).toBeFalsy();

    await wrapper.findByDataTest('ec-date-range-filter__from-input').setValue('2020-11-06');
    expect(wrapper.findByDataTest('ec-date-range-filter__from-input').element.value).toBe('2020-11-06');
    expect(wrapper.findByDataTest('ec-filter-popover__badge').text()).toBe('1');

    await wrapper.findByDataTest('ec-date-range-filter__to-input').setValue('2020-12-06');
    expect(wrapper.findByDataTest('ec-date-range-filter__to-input').element.value).toBe('2020-12-06');
    expect(wrapper.findByDataTest('ec-filter-popover__badge').text()).toBe('2');
  });

  it('should return undefined if no dates are passed in value prop', () => {
    const wrapper = mountEcDateRangeFilter({ label, value: null });
    expect(wrapper.element).toMatchSnapshot();
  });
});
