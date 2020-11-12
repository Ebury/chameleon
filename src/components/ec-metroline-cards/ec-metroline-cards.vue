<template>
  <div
    class="ec-metroline-cards"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-metroline-cards` : 'ec-metroline-cards'"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'EcMetrolineCards',
};
</script>

<style>
.ec-metroline-cards {
  @apply tw-border tw-border-solid tw-border-gray-6 tw-rounded;
}
</style>
