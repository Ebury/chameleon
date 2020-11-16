import { mount } from '@vue/test-utils';
import EcTimer from './ec-timer.vue';
import { withMockedConsole } from '../../../tests/utils/console';

jest.useFakeTimers();

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
      mountTimer({ isTimerRunning: true });

      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "seconds"');
    });
  });

  it('should throw an error if "seconds" prop is not an integer', () => {
    withMockedConsole((errorSpy) => {
      mountTimer({ seconds: 20.1, isTimerRunning: true });

      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "seconds"');
    });
  });

  it('should throw an error if "seconds" prop is negative ', () => {
    withMockedConsole((errorSpy) => {
      mountTimer({ seconds: -20, isTimerRunning: true });

      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "seconds"');
    });
  });

  it('should throw an error if "isTimerRunning" prop is not given', () => {
    withMockedConsole((errorSpy) => {
      mountTimer({ seconds: 20 });

      expect(errorSpy).toHaveBeenCalledTimes(1);
      expect(errorSpy.mock.calls[0][0]).toContain('Missing required prop: "isTimerRunning"');
    });
  });

  it('should render as expected', () => {
    const wrapper = mountTimer({ seconds: 20, isTimerRunning: true });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should emit an event called "time-expired" after the countdown completes', () => {
    const wrapper = mountTimer({ seconds: 20, isTimerRunning: true });

    jest.advanceTimersByTime(20000);

    expect(wrapper.emitted('time-expired').length).toBe(1);
  });
});
