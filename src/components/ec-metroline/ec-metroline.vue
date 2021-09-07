<template>
  <div
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-metroline` : 'ec-metroline'"
    class="ec-metroline"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'EcMetroline',
  provide() {
    return {
      metroline: this.metroline,
    };
  },
  data() {
    return {
      metroline: {
        activeItemId: null,
        lastItemId: null,
        isCompleted: false,
        register: (id) => {
          this.metrolineItemIds.push(id);
          this.metrolineItemIds.sort();

          this.metroline.lastItemId = this.metrolineItemIds[this.metrolineItemIds.length - 1];

          if (this.metrolineItemIds.length === 1) {
            this.metroline.activeItemId = id;
          }
        },
        unregister: (id) => {
          this.metrolineItemIds = this.metrolineItemIds.filter(item => item !== id);
        },
        goToNext: (id) => {
          if (this.metroline.activeItemId > id) {
            return;
          }

          const currentIndex = this.metrolineItemIds.findIndex(item => item === id);
          const nextMetrolineItemId = this.metrolineItemIds[currentIndex + 1];
          if (nextMetrolineItemId) {
            this.metroline.activeItemId = nextMetrolineItemId;
            this.$emit('change', this.metroline.activeItemId);
          } else {
            this.metroline.complete();
          }
        },
        goTo: (id) => {
          this.metroline.activeItemId = id;
          this.metroline.isCompleted = false;
          this.$emit('change', this.metroline.activeItemId);
        },
        complete: () => {
          this.metroline.isCompleted = true;
          this.$emit('complete');
        },
      },
      metrolineItemIds: [],
    };
  },
};
</script>

<style>
.ec-metroline {
  @apply tw-w-full;
}
</style>
