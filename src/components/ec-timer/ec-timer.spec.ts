import fakeTimers, { type InstalledClock } from '@sinonjs/fake-timers';
import { type ComponentMountingOptions, mount } from '@vue/test-utils';

import EcTimer from './ec-timer.vue';
import type { TimerProps } from './types';

describe('EcTimer', () => {
  let clock: InstalledClock;

  beforeEach(() => {
    clock = fakeTimers.install();
  });

  afterEach(() => {
    if (clock) {
      clock.uninstall();
    }
  });

  function mountTimer(props?: TimerProps, mountOpts?: ComponentMountingOptions<typeof EcTimer>) {
    return mount(EcTimer, {
      props,
      ...mountOpts,
    });
  }

  describe(':props', () => {
    it('should clear the interval if we set "isRunning" to false', async () => {
      const wrapper = mountTimer({ seconds: 20, isRunning: true });
      expect(clock.countTimers()).toBe(1);

      await wrapper.setProps({ isRunning: false });
      expect(clock.countTimers()).toBe(0);
    });

    it('should render as expected', () => {
      const wrapper = mountTimer({ seconds: 20, isRunning: true });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should restart when seconds prop is updated', async () => {
      const wrapper = mountTimer({ seconds: 20, isRunning: true });
      clock.tick(10000);
      await wrapper.vm.$nextTick();
      expect(wrapper.element).toMatchSnapshot('before restart');

      await wrapper.setProps({ seconds: 30 });

      expect(wrapper.element).toMatchSnapshot('after restart');
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
    it('should emit an event called "time-expired" after the countdown completes', async () => {
      const wrapper = mountTimer({ seconds: 20, isRunning: true });

      clock.tick(20000);

      expect(wrapper.emitted('time-expired')?.length).toBe(1);
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
      expect(wrapper.emitted('time-expired')?.length).toBe(1);
    });
  });

  it('should clear the interval before destroying the component', () => {
    const wrapper = mountTimer({ seconds: 20, isRunning: true });
    expect(clock.countTimers()).toBe(1);

    wrapper.unmount();
    expect(clock.countTimers()).toBe(0);
  });
});
