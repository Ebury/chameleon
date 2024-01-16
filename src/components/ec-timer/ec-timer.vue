<template>
  <div
    class="ec-timer"
    data-test="ec-timer"
  >
    <svg
      :width="diameter"
      :height="diameter"
      :viewBox="viewbox"
      class="ec-timer__svg"
    >
      <circle
        class="ec-timer__elapsed"
        cx="50%"
        cy="50%"
        :r="radius"
        fill="transparent"
        :stroke-width="strokeWidth"
      />

      <circle
        class="ec-timer__remaining"
        cx="50%"
        cy="50%"
        :r="radius"
        fill="transparent"
        :stroke-width="strokeWidth"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
      />
      <text
        v-if="showMinutes"
        x="50%"
        y="50%"
        data-test="ec-timer__text-with-minutes"
        class="ec-timer__text"
        dominant-baseline="central"
        text-anchor="middle"
      >
        {{ minutesLeft }}:{{ minuteSecondsLeft }}
      </text>
      <text
        v-else
        x="50%"
        y="50%"
        data-test="ec-timer__text-only-seconds"
        class="ec-timer__text"
        dominant-baseline="central"
        text-anchor="middle"
      >
        <!--
          @slot Additional text
        -->
        {{ totalSecondsLeft }}<slot>s</slot>
      </text>
    </svg>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, watchEffect } from 'vue';

import useEcCountdown from '../../composables/use-ec-countdown/use-ec-countdown';

const props = defineProps({
  /**
   * Seconds to finish the countdown
   */
  seconds: {
    type: Number,
    required: true,
    validator(value) {
      return Number.isInteger(value) && value > 0;
    },
  },
  showMinutes: {
    type: Boolean,
    default: false,
  },
  /**
   * Indicates if the countdown is running
   */
  isRunning: {
    type: Boolean,
    required: true,
  },
});
const emit = defineEmits(['time-expired']);

const radius = 24;
const strokeWidth = 4;
const diameter = radius * 2 + strokeWidth;
const viewbox = `0 0 ${diameter} ${diameter}`;
const circumference = 2 * Math.PI * radius;
const steps = computed(() => circumference / props.seconds);

const offset = computed(() => {
  if (totalSecondsLeft.value === 0) {
    return circumference;
  }

  return circumference + steps.value * totalSecondsLeft.value;
});

const minutesLeft = computed(() => Math.floor(totalSecondsLeft.value / 60));

const minuteSecondsLeft = computed(() => totalSecondsLeft.value % 60);

const seconds = computed(() => props.seconds);

const {
  start: startCountdown,
  stop: stopCountdown,
  secondsLeft: totalSecondsLeft,
  onTimeExpired,
} = useEcCountdown(seconds);

onTimeExpired(() => {
  emit('time-expired');
});

watchEffect(() => {
  if (props.isRunning) {
    startCountdown();
  } else {
    stopCountdown();
  }
});

onBeforeUnmount(() => {
  stopCountdown();
});
</script>

<style>
.ec-timer {
  &__elapsed {
    @apply tw-stroke-gray-7;
  }

  &__remaining {
    @apply tw-stroke-key-4;
    @apply tw--rotate-90 tw-origin-center;
  }

  &__text {
    @apply tw-body-strong;
    @apply tw-text-gray-3;
  }
}
</style>
