<template>
  <div
    class="ec-metroline-card"
    :class="{
      'ec-metroline-card--is-collapsed': isCollapsed,
      'ec-metroline-card--is-first': isFirst,
      'ec-metroline-card--is-last': isLast,
      'ec-metroline-card--is-stand-alone': isStandAlone,
      'ec-metroline-card--has-narrow-padding': hasNarrowPadding,
    }"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-metroline-card` : 'ec-metroline-card'"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'EcMetrolineCard',
  props: {
    isCollapsed: {
      type: Boolean,
      default: false,
    },
    isFirst: {
      type: Boolean,
      default: false,
    },
    isLast: {
      type: Boolean,
      default: false,
    },
    isStandAlone: {
      type: Boolean,
      default: true,
    },
    hasNarrowPadding: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.ec-metroline-card {
  @apply tw-border-b tw-border-solid tw-border-gray-6;
  @apply tw-p-24;

  &--is-collapsed {
    @apply tw-bg-gray-7;
  }

  &--is-first {
    @apply tw-rounded-t;
  }

  &--is-last {
    @apply tw-border-b-0 tw-rounded-b;
  }

  &--is-stand-alone {
    @apply tw-border tw-rounded;
  }

  &--has-narrow-padding {
    @apply tw-p-16;
  }
}
</style>
