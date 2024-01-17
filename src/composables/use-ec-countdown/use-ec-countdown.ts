import { createEventHook } from '@vueuse/core';
import {
  type MaybeRef, ref, unref, watch,
} from 'vue';

export default function useEcCountdown(secondsToGo: MaybeRef<number>) {
  const secondsLeft = ref<number>(unref(secondsToGo));

  watch(() => unref(secondsToGo), () => {
    restart(unref(secondsToGo));
  });

  const isRunning = ref<boolean>(false);
  let startTime: number;
  let intervalId: NodeJS.Timeout;

  const timeUpdatedEvent = createEventHook<number>();
  const timeExpiredEvent = createEventHook<void>();

  function reduceSecondsLeft() {
    const currentTime = getCurrentTime();
    const timeDifference = currentTime - startTime;

    updateSecondsLeft(unref(secondsToGo) - timeDifference);
    if (secondsLeft.value <= 0) {
      stop();
      timeExpiredEvent.trigger();
    }
  }

  function updateSecondsLeft(seconds: number) {
    secondsLeft.value = Math.max(seconds, 0);
    timeUpdatedEvent.trigger(secondsLeft.value);
  }

  function getCurrentTime() {
    return Math.ceil(Date.now() / 1000);
  }

  function start() {
    startTime = getCurrentTime();
    intervalId = setInterval(reduceSecondsLeft, 1000);
    isRunning.value = true;
  }

  function stop() {
    if (isRunning.value) {
      clearInterval(intervalId);
    }
    isRunning.value = false;
  }

  function restart(seconds: number = unref(secondsToGo)) {
    const wasRunning = isRunning.value;
    stop();
    updateSecondsLeft(seconds);
    if (wasRunning) {
      start();
    }
  }

  return {
    secondsLeft,
    start,
    restart,
    stop,
    isRunning,
    onTimeUpdated: timeUpdatedEvent.on,
    onTimeExpired: timeExpiredEvent.on,
  };
}
