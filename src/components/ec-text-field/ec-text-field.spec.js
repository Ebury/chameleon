import { mount } from '@vue/test-utils';
import EcTextField from './ec-text-field.vue';
import { withMockedConsole } from '../../../tests/utils/console';

describe('EcTextField', () => {
  function mountTextField(props, mountOpts) {
    return mount(EcTextField, {
      propsData: {
        value: 'Text test',
        type: 'text',
        errorMessage: 'error msg',
        state: '',
        label: 'label test',
        ...props,
      },
      ...mountOpts,
    });
  }

  it('should throw if no props were given', () => {
    withMockedConsole((errorSpy) => {
      mountTextField({ type: 'random', state: 'random' });
      expect(errorSpy).toHaveBeenCalledTimes(2);
      expect(errorSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "type"');
      expect(errorSpy.mock.calls[1][0]).toContain('Invalid prop: custom validator check failed for prop "state"');
    });
  });

  it('should display properly with the given props', () => {
    const wrapper = mountTextField();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display properly with the given state "error"', () => {
    const wrapper = mountTextField({ state: 'error' });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display properly without label', () => {
    const wrapper = mountTextField({ label: '' });
    expect(wrapper.element).toMatchSnapshot();
  });
});
