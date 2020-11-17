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
        x="50%"
        y="50%"
        data-test="ec-timer__text"
        class="ec-timer__text"
        dominant-baseline="central"
        text-anchor="middle"
      >
        {{ secondsLeft }}<slot>s</slot>
      </text>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'EcTimer',
  props: {
    seconds: {
      type: Number,
      required: true,
      validator(value) {
        return Number.isInteger(value) && value > 0;
      },
    },
    isRunning: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      radius: 24,
      strokeWidth: 4,
      secondsLeft: this.seconds,
      startTime: null,
      currentTime: null,
    };
  },
  computed: {
    diameter() {
      return (this.radius * 2) + this.strokeWidth;
    },
    viewbox() {
      return `0 0 ${this.diameter} ${this.diameter}`;
    },
    circumference() {
      return 2 * Math.PI * this.radius;
    },
    steps() {
      return this.circumference / this.seconds;
    },
    offset() {
      return this.circumference + this.steps * this.secondsLeft;
    },
    timeDifference() {
      return this.currentTime - this.startTime;
    },
  },
  watch: {
    isRunning: {
      immediate: true,
      handler(value) {
        clearInterval(this.timerInterval);
        this.secondsLeft = this.seconds;
        if (value) {
          this.countdown();
        }
      },
    },
  },
  beforeDestroy() {
    clearInterval(this.timerInterval);
  },
  methods: {
    countdown() {
      if (this.isRunning) {
        this.startTime = Math.ceil(Date.now() / 1000);
        this.timerInterval = setInterval(this.reduceSecondsLeft, 1000);
      }
    },
    reduceSecondsLeft() {
      this.currentTime = Math.ceil(Date.now() / 1000);
      if (this.timeDifference < this.seconds) {
        this.secondsLeft = this.seconds - this.timeDifference;
      } else {
        this.secondsLeft = this.seconds - this.timeDifference;
        clearInterval(this.timerInterval);
        this.$emit('time-expired');
      }
    },
  },
};
</script>

<style>
.ec-timer {
  &__elapsed {
    stroke: hsl(var(--ec-gray-color-level-7));
  }

  &__remaining {
    transform-origin: 50%;

    @apply tw-stroke-key-4;
    @apply tw--rotate-90;
  }

  &__text {
    @apply tw-body-strong;
    @apply tw-text-gray-3;
  }
}
</style>
