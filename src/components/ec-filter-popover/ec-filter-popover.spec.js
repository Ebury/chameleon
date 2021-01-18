import { mount } from '@vue/test-utils';
import EcFilterPopover from './ec-filter-popover.vue';
import { withMockedConsole } from '../../../tests/utils/console';

const label = 'Test label';
const numberOfSelectedFilters = 0;

function mountEcFilterPopover(props, mountOpts) {
  return mount(EcFilterPopover, {
    propsData: {
      ...props,
    },
    ...mountOpts,
  });
}

describe('EcFilterPopover', () => {
  it('should throw an error if no label prop were given', () => {
    withMockedConsole((errorSpy) => {
      mountEcFilterPopover({ numberOfSelectedFilters });
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "label"');
    });
  });

  it('should render properly when label prop was given', () => {
    const wrapper = mountEcFilterPopover({ label, numberOfSelectedFilters });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw an error if no numberOfSelectedFilters prop were given', () => {
    withMockedConsole((errorSpy) => {
      mountEcFilterPopover({ label });
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "numberOfSelectedFilters"');
    });
  });

  it('numberOfSelectedFilters should not be visible if it\'s value is less than 0', () => {
    const wrapper = mountEcFilterPopover({ label, numberOfSelectedFilters });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('numberOfSelectedFilters should be visible if it\'s value is greater than 0', () => {
    const wrapper = mountEcFilterPopover({ label, numberOfSelectedFilters: 5 });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render correctly the named slot', () => {
    const wrapper = mountEcFilterPopover({ label, numberOfSelectedFilters }, {
      scopedSlots: {
        filter: '<p>Test name slot</p>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should set the open status of the popover', async () => {
    const wrapper = mountEcFilterPopover({ label, numberOfSelectedFilters });
    await wrapper.findByDataTest('ec-popover-stub').vm.$emit('update:open', true);
    expect(wrapper.element).toMatchSnapshot();
  });
});
