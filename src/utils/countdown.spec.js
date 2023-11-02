import fakeTimers from '@sinonjs/fake-timers';
import { vi } from 'vitest';

import Countdown from './countdown';

describe('Countdown', () => {
  let clock;

  beforeEach(() => {
    clock = fakeTimers.install(window);
  });

  afterEach(() => {
    if (clock) {
      clock.uninstall();
    }
  });

  it('should finish the countdown', () => {
    const countdown = new Countdown();
    countdown.start(20);
    clock.tick(20000);

    expect(countdown.secondsLeft).toBe(0);
    expect(clock.countTimers()).toBe(0);
  });

  it('should update the "secondsLeft" when the time is running', () => {
    const countdown = new Countdown();
    countdown.start(20);
    clock.tick(10000);
    expect(countdown.secondsLeft).toBe(10);
    clock.tick(10000);
    expect(countdown.secondsLeft).toBe(0);
    expect(clock.countTimers()).toBe(0);
  });

  it('should emit the events', () => {
    const timeExpiredMock = vi.fn();
    const timeUpdatedMock = vi.fn();
    const countdown = new Countdown();
    countdown.on('time-expired', timeExpiredMock);
    countdown.on('time-updated', timeUpdatedMock);
    countdown.start(20);
    clock.tick(20000);

    expect(timeExpiredMock).toHaveBeenCalledTimes(1);
    expect(timeUpdatedMock).toHaveBeenCalledTimes(20);
    expect(clock.countTimers()).toBe(0);
  });
});
