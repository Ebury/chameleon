import { mount } from '@vue/test-utils';
import EcIcon from './ec-icon.vue';
import { withMockedConsole } from '../../../tests/utils/console';

describe('EcIcon', () => {
  function mountEcIcon(props, mountOpts) {
    return mount(EcIcon, {
      propsData: { ...props },
      ...mountOpts,
    });
  }

  it('should throw if no props were given', () => {
    withMockedConsole((errorSpy) => {
      mountEcIcon();
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "name"');
    });
  });

  it('should render properly when a name was given', () => {
    const wrapper = mount(EcIcon, { propsData: { name: 'random-icon' } });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should use the given size prop', () => {
    const wrapper = mountEcIcon({ name: 'random-icon', size: 16 });
    expect(wrapper.element).toMatchSnapshot();
  });

  it.each(['error', 'info', 'success', 'warning'])('should use the type "%s"', (type) => {
    const wrapper = mountEcIcon({ name: 'random-icon', type });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should throw an error if type is not valid', () => {
    withMockedConsole((errorSpy) => {
      mountEcIcon({ name: 'random-icon', type: 'invalid-value' });
      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "type"');
    });
  });
});
