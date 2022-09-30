<template>
  <div
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-metroline` : 'ec-metroline'"
    class="ec-metroline"
  >
    <slot />
  </div>
</template>

<script setup>
import { provide, reactive, ref } from 'vue';

import METROLINE_SYMBOL from '../../symbols/provide-inject';

const emit = defineEmits(['change', 'complete']);

const metroline = reactive({
  activeItemId: null,
  lastItemId: null,
  isCompleted: false,
  register: (id) => {
    metrolineItemIds.value.push(id);
    metrolineItemIds.value.sort();

    metroline.lastItemId = metrolineItemIds.value[metrolineItemIds.value.length - 1];
    if (metrolineItemIds.value.length === 1) {
      metroline.activeItemId = id;
    }
  },
  unregister: (id) => {
    metrolineItemIds.value = metrolineItemIds.value.filter(item => item !== id);
  },
  goToNext: (id) => {
    if (metroline.activeItemId > id) {
      return;
    }

    const currentIndex = metrolineItemIds.value.findIndex(item => item === id);
    const nextMetrolineItemId = metrolineItemIds.value[currentIndex + 1];
    if (nextMetrolineItemId) {
      metroline.activeItemId = nextMetrolineItemId;
      emit('change', metroline.activeItemId);
    } else {
      metroline.complete();
    }
  },
  goTo: (id) => {
    metroline.activeItemId = id;
    metroline.isCompleted = false;
    emit('change', metroline.activeItemId);
  },
  complete: () => {
    metroline.isCompleted = true;
    emit('complete');
  },
});

const metrolineItemIds = ref([]);

provide(METROLINE_SYMBOL, metroline);
</script>

<style>
.ec-metroline {
  @apply tw-w-full;
}
</style>
