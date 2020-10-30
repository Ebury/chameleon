import { mount } from '@vue/test-utils';
import ecDateRangeFilter from './ec-date-range-filter.vue';

const dateRangeFilterLabel = 'Due date';
const fromLabelText = 'From';
const toLabelText = 'To';

function mountecDateRangeFilter(props) {
  return mount(ecDateRangeFilter, {
    propsData: {
      ...props,
    },
  });
}
describe('ecDateRangeFilter', () => {
  it('should render properly when all the props are given', () => {
    const wrapper = mountecDateRangeFilter({ dateRangeFilterLabel, fromLabelText, toLabelText });
    expect(wrapper.element).toMatchSnapshot();
  });
});
