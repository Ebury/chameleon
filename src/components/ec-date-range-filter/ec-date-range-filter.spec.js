import { mount } from '@vue/test-utils';
import ecDateRangeFilter from './ec-date-range-filter.vue';
import { withMockedConsole } from '../../../tests/utils/console';

const label = 'Due date';
const fromLabelText = 'From';
const toLabelText = 'To';

function mountecDateRangeFilter(props, mountOpts) {
  return mount(ecDateRangeFilter, {
    propsData: {
      ...props,
    },
    ...mountOpts,
  });
}
describe('ecDateRangeFilter', () => {
  it('should render properly when all the props are given', () => {
    const wrapper = mountecDateRangeFilter({ label, fromLabelText, toLabelText });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should through an error if no label pop was given', () => {
    withMockedConsole((errorSpy) => {
      mountecDateRangeFilter({ fromLabelText, toLabelText });
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "label"');
    });
  });

  it('should through an error if no fromLabelText pop was given', () => {
    withMockedConsole((errorSpy) => {
      mountecDateRangeFilter({ label, toLabelText });
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "fromLabelText"');
    });
  });

  it('should through an error if no toLabelText pop was given', () => {
    withMockedConsole((errorSpy) => {
      mountecDateRangeFilter({ fromLabelText, label });
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "toLabelText"');
    });
  });

  // should emit the date values when correct dates are given
  // should reset the field value when clear dates button is clicked
  // clear dates emit
  // check the v-model
  // numberOfSelectedFilters should update when we add dates
});
