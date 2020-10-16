import { shallowMount } from '@vue/test-utils';
import EcFilterPopover from './ec-filter-popover.vue';
import { withMockedConsole } from '../../../tests/utils/console';

describe('EcFilterPopover', () => {
  it('should throw an error if no label prop were given', () => {
    withMockedConsole((errorSpy) => {
      shallowMount(EcFilterPopover);
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "label"');
    });
  });

  it('should render properly when label prop was given', () => {
    const wrapper = shallowMount(EcFilterPopover,
      {
        propsData: {
          label: 'Test label',
        },
      });
    expect(wrapper.element).toMatchSnapshot();
  });
});
