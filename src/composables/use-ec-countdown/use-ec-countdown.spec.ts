import fakeTimers, { type InstalledClock } from '@sinonjs/fake-timers';
import { flushPromises } from '@vue/test-utils';
import { vi } from 'vitest';
import { ref } from 'vue';

import useEcCountdown from './use-ec-countdown';

describe('useEcCountdown', () => {
  let clock: InstalledClock;

  beforeEach(() => {
    clock = fakeTimers.install();
  });

  afterEach(() => {
    if (clock) {
      clock.uninstall();
    }
  });

  it('should not running until started', () => {
    const { secondsLeft, start, isRunning } = useEcCountdown(20);
    clock.tick(10000);
    expect(isRunning.value).toBe(false);
    expect(secondsLeft.value).toBe(20);
    expect(clock.countTimers()).toBe(0);

    start();
    clock.tick(1000);
    expect(isRunning.value).toBe(true);
    expect(secondsLeft.value).toBe(19);
    expect(clock.countTimers()).toBe(1);
  });

  it('should count down to 0', () => {
    const { secondsLeft, start } = useEcCountdown(20);
    start();
    clock.tick(20000);

    expect(secondsLeft.value).toBe(0);
    expect(clock.countTimers()).toBe(0);
  });

  it('should stop counting down', () => {
    const { secondsLeft, start, stop } = useEcCountdown(20);
    start();
    clock.tick(1000);
    expect(secondsLeft.value).toBe(19);
    expect(clock.countTimers()).toBe(1);
    stop();
    clock.tick(1000);
    expect(secondsLeft.value).toBe(19);
    expect(clock.countTimers()).toBe(0);
  });

  it('should be able to restart', () => {
    const { secondsLeft, start, restart } = useEcCountdown(20);
    start();
    clock.tick(1000);
    expect(secondsLeft.value).toBe(19);
    expect(clock.countTimers()).toBe(1);
    restart();
    expect(secondsLeft.value).toBe(20);
    expect(clock.countTimers()).toBe(1);
    clock.tick(1000);
    expect(secondsLeft.value).toBe(19);
    expect(clock.countTimers()).toBe(1);
  });

  it('should be able to restart with different amount of seconds', () => {
    const { secondsLeft, start, restart } = useEcCountdown(20);
    start();
    clock.tick(10000);
    expect(secondsLeft.value).toBe(10);
    expect(clock.countTimers()).toBe(1);

    restart(60);
    expect(secondsLeft.value).toBe(60);
    expect(clock.countTimers()).toBe(1);
  });

  it('should be able to restart using stop/start', () => {
    const { secondsLeft, start, stop } = useEcCountdown(20);
    start();
    clock.tick(1000);
    expect(secondsLeft.value).toBe(19);
    expect(clock.countTimers()).toBe(1);
    stop();
    expect(clock.countTimers()).toBe(0);
    start();
    clock.tick(1000);
    expect(secondsLeft.value).toBe(19);
    expect(clock.countTimers()).toBe(1);
  });

  it('should be able to restart using stop/start with different amount of seconds', async () => {
    const seconds = ref(20);
    const { secondsLeft, start } = useEcCountdown(seconds);
    start();
    clock.tick(10000);
    expect(secondsLeft.value).toBe(10);
    expect(clock.countTimers()).toBe(1);

    seconds.value = 60;
    await flushPromises();
    clock.tick(1000);
    expect(secondsLeft.value).toBe(59);
    expect(clock.countTimers()).toBe(1);
  });

  it('should be able to start different amount of seconds', async () => {
    const seconds = ref(20);
    const { secondsLeft, start } = useEcCountdown(seconds);
    clock.tick(10000);
    expect(secondsLeft.value).toBe(20);
    expect(clock.countTimers()).toBe(0);

    seconds.value = 60;
    await flushPromises();
    start();
    clock.tick(1000);
    expect(secondsLeft.value).toBe(59);
    expect(clock.countTimers()).toBe(1);
  });

  it('should trigger events when ticking', () => {
    const timeUpdatedSpy = vi.fn();
    const timeExpiredSpy = vi.fn();

    const {
      secondsLeft, start, onTimeExpired, onTimeUpdated,
    } = useEcCountdown(3);
    onTimeExpired(timeExpiredSpy);
    onTimeUpdated(timeUpdatedSpy);
    start();

    // 3 -> 2
    clock.tick(1000);
    expect(secondsLeft.value).toBe(2);
    expect(timeUpdatedSpy).toHaveBeenCalledTimes(1);
    expect(timeUpdatedSpy).toHaveBeenLastCalledWith(2);
    expect(timeExpiredSpy).toHaveBeenCalledTimes(0);

    // 2 -> 1
    clock.tick(1000);
    expect(secondsLeft.value).toBe(1);
    expect(timeUpdatedSpy).toHaveBeenCalledTimes(2);
    expect(timeUpdatedSpy).toHaveBeenLastCalledWith(1);
    expect(timeExpiredSpy).toHaveBeenCalledTimes(0);

    // 1 -> 0
    clock.tick(1000);
    expect(secondsLeft.value).toBe(0);
    expect(timeUpdatedSpy).toHaveBeenCalledTimes(3);
    expect(timeUpdatedSpy).toHaveBeenLastCalledWith(0);
    expect(timeExpiredSpy).toHaveBeenCalledTimes(1);
    expect(timeExpiredSpy).toHaveBeenLastCalledWith(undefined);

    // should stop firing events after
    clock.tick(1000);
    expect(secondsLeft.value).toBe(0);
    expect(timeUpdatedSpy).toHaveBeenCalledTimes(3);
    expect(timeUpdatedSpy).toHaveBeenLastCalledWith(0);
    expect(timeExpiredSpy).toHaveBeenCalledTimes(1);
    expect(timeExpiredSpy).toHaveBeenLastCalledWith(undefined);
  });
});
