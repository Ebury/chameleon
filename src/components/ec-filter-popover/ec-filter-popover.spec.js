import { shallowMount } from '@vue/test-utils';
import EcFilterPopover from './ec-filter-popover.vue';
import { withMockedConsole } from '../../../tests/utils/console';

const label = 'Test label';

function shallowMountEcFilterPopover(props) {
  return shallowMount(EcFilterPopover, {
    propsData: {
      ...props,
    },
  });
}
describe('EcFilterPopover', () => {
  it('should throw an error if no label prop were given', () => {
    withMockedConsole((errorSpy) => {
      shallowMountEcFilterPopover();
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "label"');
    });
  });

  it('should render properly when label prop was given', () => {
    const wrapper = shallowMountEcFilterPopover({ label });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should propagate isOpen event from EcFilterPopover to the parent', () => {
    const wrapper = shallowMountEcFilterPopover({ label });
    wrapper.find('ec-popover-stub').vm.$emit('update:open');
    expect(wrapper.emitted('isOpen').length).toBe(1);
  });

  it('should render given default slot', () => {
    const wrapper = shallowMountEcFilterPopover({ label }, {
      slots: {
        default: '<a class="ec-filter-popover__label">Test Slot random label</a>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render correctly the named slot', () => {
    const wrapper = shallowMountEcFilterPopover({ label }, {
      scopedSlots: {
        filter: '<p>Test name slot</a>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
