<template>
  <div
    class="ec-donut"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-donut` : 'ec-donut'"
  >
    <div
      class="ec-donut__container"
      data-test="ec-donut__container"
    >
      <svg
        width="108"
        height="108"
        viewBox="0 0 108 108"
        class="ec-donut__svg"
      >
        <circle
          class="ec-donut__background"
          cx="54"
          cy="54"
          :r="radius"
          fill="transparent"
          stroke-width="11"
        />
        <circle
          class="ec-donut__remaining"
          cx="54"
          cy="54"
          :r="radius"
          fill="transparent"
          stroke-width="11"
          :stroke-dasharray="dashArray"
          :stroke-dashoffset="0"
        />
        <circle
          class="ec-donut__used"
          cx="54"
          cy="54"
          :r="radius"
          fill="transparent"
          stroke-width="11"
          :stroke-dasharray="dashArray"
          :stroke-dashoffset="dashOffset"
        />
      </svg>
    </div>
    <div
      class="ec-donut__legend"
      data-test="ec-donut__legend"
    >
      <div
        class="ec-donut__legend-used"
        data-test="ec-donut__legend-used"
      >
        <ec-icon
          name="rounded-notification"
          :size="14"
          class="ec-donut__legend-icon ec-donut__legend-icon--used"
        />
        <slot name="used-legend" />
      </div>
      <div
        class="ec-donut__legend-remaining"
        data-test="ec-donut__legend-remaining"
      >
        <ec-icon
          name="rounded-notification"
          :size="14"
          class="ec-donut__legend-icon ec-donut__legend-icon--remaining"
        />
        <slot name="remaining-legend" />
      </div>
    </div>
  </div>
</template>

<script>
import EcIcon from '../ec-icon';

export default {
  name: 'EcDonut',
  components: { EcIcon },
  props: {
    amount: {
      type: Number,
      required: true,
    },
    used: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      radius: 48,
    };
  },
  computed: {
    percentageUsed() {
      if (this.used > this.amount) {
        return 100;
      }
      if (this.used <= 0) {
        return 0;
      }
      return (this.used / this.amount) * 100;
    },
    // Calculate the circumference
    dashArray() {
      return 2 * Math.PI * this.radius;
    },
    // Calculate the how much needs to be offset of the used circle
    dashOffset() {
      return this.dashArray * (1 - this.percentageUsed / 100);
    },
  },
};
</script>

<style>
.ec-donut {
  @apply tw-flex tw-flex-wrap;

  &__container {
    height: 108px;

    @apply tw-w-full;
    @apply tw-mr-0;
    @apply tw-flex tw-justify-center;

    @screen sm {
      @apply tw-w-auto;
      @apply tw-mr-24;
      @apply tw-block;
      @apply justify-start;
    }
  }

  &__legend {
    @apply tw-h4;
    @apply tw-text-gray-3;
    @apply tw-pt-16 tw-px-0 tw-pb-0;
    @apply tw-inline-flex tw-flex-col tw-flex-wrap;
    @apply tw-my-0 tw-mx-auto;

    @screen sm {
      @apply tw-py-16;
      @apply tw-block;
      @apply tw-flex-row;
      @apply tw-m-0;
    }
  }

  &__legend-used {
    @apply tw-mb-12;

    @screen sm {
      @apply tw-mb-24;
    }
  }

  &__legend-used,
  &__legend-remaining {
    @apply tw-flex;
  }

  &__legend-icon {
    @apply tw-flex-shrink-0;
    @apply tw-mr-8 tw-mt-4;

    &--used {
      fill: hsla(var(--ec-reserved-color-info), 0.5);
    }

    &--remaining {
      @apply tw-fill-info;
    }
  }

  &__svg {
    @apply tw--rotate-90;
  }

  &__background {
    stroke: hsl(var(--ec-gray-color-level-7));
  }

  &__remaining {
    stroke: hsl(var(--ec-reserved-color-info));
  }

  &__used {
    stroke: hsl(var(--ec-gray-color-level-8));
    stroke-opacity: 0.5;
    animation: progress 1s ease-out;
  }
}

@keyframes progress {
  0% {
    /* This number is the (2 * Math.PI * radius) */
    stroke-dashoffset: 301.59289474462014;
  }
}

</style>
