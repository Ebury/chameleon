<template>
  <div
    class="ec-metroline-card"
    :class="{
      'ec-metroline-card--is-collapsed': isCollapsed,
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
    hasNarrowPadding: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.ec-metroline-card {
  @apply tw-border tw-border-solid tw-border-gray-6 tw-rounded;
  @apply tw-p-24;

  &--is-collapsed {
    @apply tw-bg-gray-7;
  }

  &--has-narrow-padding {
    @apply tw-p-16;
  }
}
</style>
