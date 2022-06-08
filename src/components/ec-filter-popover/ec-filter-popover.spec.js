import { flushPromises, mount } from '@vue/test-utils';

import { withMockedConsole } from '../../../tests/utils/console';
import EcFilterPopover from './ec-filter-popover.vue';

const label = 'Test label';
const numberOfSelectedFilters = 0;

function mountEcFilterPopover(props, mountOpts) {
  return mount(EcFilterPopover, {
    props,
    ...mountOpts,
  });
}

describe('EcFilterPopover', () => {
  it('should throw an error if no label prop were given', () => {
    withMockedConsole((errorSpy, warnSpy) => {
      mountEcFilterPopover({ numberOfSelectedFilters });
      expect(warnSpy).toHaveBeenCalledTimes(4);
      expect(warnSpy.mock.calls[1][0]).toContain('Missing required prop: "label"');
    });
  });

  it('should render properly when label prop was given', () => {
    const wrapper = mountEcFilterPopover({ label, numberOfSelectedFilters });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw an error if no numberOfSelectedFilters prop were given', () => {
    withMockedConsole((errorSpy, warnSpy) => {
      mountEcFilterPopover({ label });
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('Missing required prop: "numberOfSelectedFilters"');
    });
  });

  it('should not display number of selected filters if the value of numberOfSelectedFilters is 0', () => {
    const wrapper = mountEcFilterPopover({ label, numberOfSelectedFilters: 0 });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display number of selected filters if the value of numberOfSelectedFilters is greater than 0', () => {
    const wrapper = mountEcFilterPopover({ label, numberOfSelectedFilters: 5 });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render correctly the named slot', () => {
    const wrapper = mountEcFilterPopover({ label, numberOfSelectedFilters }, {
      slots: {
        filter: '<p>Test name slot</p>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should set the open status of the popover', async () => {
    const wrapper = mountEcFilterPopover({ label, numberOfSelectedFilters });

    await wrapper.findComponent({ name: 'EcPopoverStub' }).vm.$emit('update:shown', true);
    await flushPromises();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should reset the open status of the popover', async () => {
    const wrapper = mountEcFilterPopover({ label, numberOfSelectedFilters });

    await wrapper.findComponent({ name: 'EcPopoverStub' }).vm.$emit('update:shown', false);
    await flushPromises();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should emit after-open event', () => {
    const wrapper = mountEcFilterPopover({ label, numberOfSelectedFilters });

    wrapper.findComponent({ name: 'EcPopoverStub' }).vm.$emit('apply-show');
    expect(wrapper.emitted('after-open')).toEqual([[]]);
  });

  it('should render properly when isFullHeight is set', () => {
    const wrapper = mountEcFilterPopover({ label, numberOfSelectedFilters, isFullHeight: true });
    expect(wrapper.element).toMatchSnapshot();
  });
});
