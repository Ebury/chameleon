<template>
  <div
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-metroline-container` : 'ec-metroline-container'"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'EcMetroline',
  props: {
    status: {
      type: Object,
      required: true,
    },
  },
};
</script>
