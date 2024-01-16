import fakeTimers from '@sinonjs/fake-timers';
import { mount } from '@vue/test-utils';
import { vi } from 'vitest';

import { withMockedConsole } from '../../../tests/utils/console';
import EcTimer from './ec-timer.vue';

describe('EcTimer', () => {
  function mountTimer(props, mountOpts) {
    return mount(EcTimer, {
      props,
      ...mountOpts,
    });
  }

  describe(':props', () => {
    it('should throw an error if "seconds" prop is not given', () => {
      withMockedConsole((errorSpy, warnSpy) => {
        mountTimer({ isRunning: true });

        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy.mock.calls[0][0]).toContain('Missing required prop: "seconds"');
      });
    });

    it('should throw an error if "seconds" prop is not an integer', () => {
      withMockedConsole((errorSpy, warnSpy) => {
        mountTimer({ seconds: 20.1, isRunning: true });

        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "seconds"');
      });
    });

    it('should throw an error if "showMinutes" prop is not a boolean', () => {
      withMockedConsole((errorSpy, warnSpy) => {
        mountTimer({ seconds: 20, isRunning: true, showMinutes: 'true' });

        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy.mock.calls[0][0]).toContain('Invalid prop: type check failed for prop "showMinutes"');
      });
    });

    it('should throw an error if "seconds" prop is negative', () => {
      withMockedConsole((errorSpy, warnSpy) => {
        mountTimer({ seconds: -20, isRunning: true });

        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy.mock.calls[0][0]).toContain('Invalid prop: custom validator check failed for prop "seconds"');
      });
    });

    it('should throw an error if "isRunning" prop is not given', () => {
      withMockedConsole((errorSpy, warnSpy) => {
        mountTimer({ seconds: 20 });

        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(warnSpy.mock.calls[0][0]).toContain('Missing required prop: "isRunning"');
      });
    });

    it('should clear the interval if we set "isRunning" to false', async () => {
      const clearTimeoutSpy = vi.spyOn(window, 'clearInterval');
      const wrapper = mountTimer({ seconds: 20, isRunning: true });

      expect(clearTimeoutSpy).toHaveBeenCalledTimes(0);

      await wrapper.setProps({ isRunning: false });
      expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
    });

    it('should render as expected', () => {
      const wrapper = mountTimer({ seconds: 20, isRunning: true });

      expect(wrapper.element).toMatchSnapshot();
    });

    describe('when "showMinutes" is true', () => {
      describe('when "isRunning" is false', () => {
        it('should render as expected', () => {
          const wrapper = mountTimer({ seconds: 20, isRunning: false, showMinutes: true });

          expect(wrapper.element).toMatchSnapshot();
        });
      });

      describe('when "isRunning" is true', () => {
        it('should render as expected', () => {
          const wrapper = mountTimer({ seconds: 20, isRunning: true, showMinutes: true });

          expect(wrapper.element).toMatchSnapshot();
        });
      });

      it('should render a timer with leading zero in minutes', () => {
        const wrapper = mountTimer({ seconds: 20, isRunning: true, showMinutes: true });

        expect(wrapper.findByDataTest('ec-timer__text-with-minutes').text()).toBe('0:20');
      });

      it('should render a timer with minutes', () => {
        const wrapper = mountTimer({ seconds: 80, isRunning: true, showMinutes: true });

        expect(wrapper.findByDataTest('ec-timer__text-with-minutes').text()).toBe('1:20');
      });
    });
  });

  describe('slots', () => {
    it('should render with the slot given', () => {
      const wrapper = mountTimer(
        {
          seconds: 20,
          isRunning: true,
        },
        {
          slots: {
            default: 'c',
          },
        },
      );

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@events', () => {
    let clock;

    beforeEach(() => {
      clock = fakeTimers.install();
    });

    afterEach(() => {
      if (clock) {
        clock.uninstall();
      }
    });

    it('should emit an event called "time-expired" after the countdown completes', async () => {
      const wrapper = mountTimer({ seconds: 20, isRunning: true });

      clock.tick(20000);

      expect(wrapper.emitted('time-expired').length).toBe(1);
      await wrapper.vm.$nextTick();
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should not emit an event if we stop the timer before time expires', async () => {
      const wrapper = mountTimer({ seconds: 20, isRunning: true });

      clock.tick(10000);
      await wrapper.setProps({ isRunning: false });
      clock.tick(10000);

      expect(wrapper.emitted('time-expired')).toBeUndefined();
    });

    it('should not emit the time expired twice if you restart the timer', async () => {
      const wrapper = mountTimer({ seconds: 20, isRunning: true });

      clock.tick(10000);
      await wrapper.setProps({ isRunning: false });
      await wrapper.setProps({ isRunning: true });
      clock.tick(10000);

      expect(wrapper.emitted('time-expired')).toBeUndefined();
      clock.tick(10000);
      expect(wrapper.emitted('time-expired').length).toBe(1);
    });
  });

  it('should clear the interval before we destroy the components', () => {
    const clearTimeoutSpy = vi.spyOn(window, 'clearInterval');
    const wrapper = mountTimer({ seconds: 20, isRunning: true });

    expect(clearTimeoutSpy).toHaveBeenCalledTimes(0);
    wrapper.unmount();
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
  });
});
