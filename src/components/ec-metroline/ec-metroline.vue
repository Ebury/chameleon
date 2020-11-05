<template>
  <div
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-metroline-container` : 'ec-metroline-container'"
  >
    <template v-for="(slot, index) in Object.keys($scopedSlots)">
      <slot
        :name="slot"
        :status="itemsStatus[index]"
        :goToNext="goToNext"
      />
    </template>
  </div>
</template>

<script>
import * as MetrolineItemStatus from '../../enums/metroline-item-status';

export default {
  name: 'EcMetroline',
  data() {
    return {
      itemsStatus: [],
    };
  },
  computed: {
    activeMetrolineItemIndex() {
      const isActive = item => item === MetrolineItemStatus.ACTIVE;
      const index = this.itemsStatus.findIndex(isActive);

      return index;
    },
    amountOfMetrolineItems() {
      return Object.keys(this.$scopedSlots).length;
    },
  },
  mounted() {
    this.initialiseItems();
  },
  methods: {
    initialiseItems() {
      if (this.$scopedSlots) {
        for (let i = 0; i < this.amountOfMetrolineItems; i++) {
          if (i === 0) {
            this.itemsStatus.push(MetrolineItemStatus.ACTIVE);
          } else {
            this.itemsStatus.push(MetrolineItemStatus.NEXT);
          }
        }
      }
    },
    goToNext() {
      if (this.activeMetrolineItemIndex < this.amountOfMetrolineItems) {
        const nextActiveMetrolineItemIndex = this.activeMetrolineItemIndex + 1;

        this.itemsStatus[this.activeMetrolineItemIndex] = MetrolineItemStatus.COMPLETED;
        this.itemsStatus[nextActiveMetrolineItemIndex] = MetrolineItemStatus.ACTIVE;
      }
    },
  },
};
</script>
