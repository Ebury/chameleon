import { mount } from '@vue/test-utils';
import EcTimer from './ec-timer.vue';
import { withMockedConsole } from '../../../tests/utils/console';

describe('EcTimer', () => {
  function mountTimer(props) {
    return mount(EcTimer, {
      propsData: {
        ...props,
      },
    });
  }

  it('should throw an error if "seconds" prop is not given', () => {
    withMockedConsole((errorSpy) => {
      mount(EcTimer);

      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "seconds"');
    });
  });

  it('should throw an error if "seconds" prop is not an integer', () => {
    withMockedConsole((errorSpy) => {
      mountTimer({ seconds: 20.1 });

      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "seconds"');
    });
  });

  it('should render as expected', () => {
    const wrapper = mountTimer({ seconds: 20 });

    expect(wrapper.element).toMatchSnapshot();
  });

  // TODO: test that emits 'timer-complete' event after we add lolex or similar
});
