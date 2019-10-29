/* eslint-disable no-use-before-define */
import { mount } from '@vue/test-utils';
import EcIcon from './ec-icon.vue';
import { withMockedConsole } from '../../../tests/utils/console';

describe('EcIcon', () => {
  it('should throw if no props were given', () => {
    withMockedConsole((errorSpy) => {
      mount(EcIcon);
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "name"');
    });
  });

  it('should render properly when a name was given', () => {
    const wrapper = mount(EcIcon, { propsData: { name: 'random-icon' } });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should use the given size prop', () => {
    const wrapper = mount(EcIcon, { propsData: { name: 'random-icon', size: 16 } });

    expect(wrapper.element).toMatchSnapshot();
  });

  it.each(['error', 'info', 'success', 'warning'])('should use the type "%s"', (type) => {
    const wrapper = mount(EcIcon, { propsData: { name: 'random-icon', type } });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw an error if type is not valid', () => {
    withMockedConsole((errorSpy) => {
      mount(EcIcon, { propsData: { name: 'random-icon', type: 'invalid-value' } });
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "type"');
    });
  });
});
