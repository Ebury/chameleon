<template>
  <div
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-metroline` : 'ec-metroline'"
  >
    <slot />
  </div>
</template>

<script>
import * as MetrolineItemStatus from '../../enums/metroline-item-status';

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
        register: (metrolineItemVm) => {
          this.metrolineItems.push(metrolineItemVm);
          this.metrolineItems.sort((item1, item2) => item1.id - item2.id);

          if (this.metrolineItems.length === 1) {
            this.activeItemId = metrolineItemVm.id;
          }
        },
        unregister: (metrolineItemVm) => {
          this.metrolineItems = this.metrolineItems.filter(item => item !== metrolineItemVm);
        },
        goToNext: (id) => {
          if (this.activeItemId > id) {
            return;
          }

          const currentIndex = this.metrolineItems.findIndex(item => item.id === id);
          const nextMetrolineItem = this.metrolineItems[currentIndex + 1];
          if (nextMetrolineItem) {
            this.activeItemId = nextMetrolineItem.id;
            this.$emit('change', this.activeItemId);
          } else {
            this.activeItemId = Number.MAX_SAFE_INTEGER;
            this.$emit('complete');
            this.setAllItemsReadOnly(true);
          }
        },
        goTo: (id) => {
          this.activeItemId = id;
          this.setAllItemsReadOnly(false);
        },
      },
      metrolineItems: [],
      activeItemId: null,
    };
  },
  watch: {
    activeItemId: {
      immediate: true,
      handler() {
        this.updateStatuses();
      },
    },
    metrolineItems: {
      immediate: true,
      handler() {
        this.updateStatuses();
        this.updateIsLast();
      },
    },
  },
  methods: {
    updateStatuses() {
      for (const metrolineItem of this.metrolineItems) {
        if (metrolineItem.id < this.activeItemId) {
          metrolineItem.status = MetrolineItemStatus.COMPLETED;
        } else if (metrolineItem.id === this.activeItemId) {
          metrolineItem.status = MetrolineItemStatus.ACTIVE;
        } else {
          metrolineItem.status = MetrolineItemStatus.NEXT;
        }
      }
    },
    updateIsLast() {
      for (let i = 0; i < this.metrolineItems.length; i++) {
        const metrolineItem = this.metrolineItems[i];
        metrolineItem.isLast = i === this.metrolineItems.length - 1;
      }
    },
    setAllItemsReadOnly(readOnly) {
      for (const metrolineItem of this.metrolineItems) {
        metrolineItem.isReadOnly = readOnly;
      }
    },
  },
};
</script>
