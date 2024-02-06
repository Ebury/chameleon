<template>
  <div
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-metroline` : 'ec-metroline'"
    class="ec-metroline"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, reactive, ref } from 'vue';

import { METROLINE_PROVIDE_KEY } from './provide';
import type { MetrolineEvent, MetrolineEvents, MetrolineProviderContext } from './types';

const emit = defineEmits<{
  'change': [value: MetrolineEvents[MetrolineEvent.CHANGE]],
  'complete': [],
}>();

const metroline = reactive<MetrolineProviderContext>({
  activeItemId: null,
  lastItemId: null,
  isCompleted: false,
  register: (id: number) => {
    metrolineItemIds.value.push(id);
    metrolineItemIds.value.sort();

    metroline.lastItemId = metrolineItemIds.value[metrolineItemIds.value.length - 1];
    if (metrolineItemIds.value.length === 1) {
      metroline.activeItemId = id;
    }
  },
  unregister: (id: number) => {
    metrolineItemIds.value = metrolineItemIds.value.filter(item => item !== id);
  },
  goToNext: (id: number) => {
    if (!metroline.activeItemId || metroline.activeItemId > id) {
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
  goTo: (id: number) => {
    metroline.activeItemId = id;
    metroline.isCompleted = false;
    emit('change', metroline.activeItemId);
  },
  complete: () => {
    metroline.isCompleted = true;
    emit('complete');
  },
});

const metrolineItemIds = ref<number[]>([]);

function init() {
  provide<MetrolineProviderContext>(METROLINE_PROVIDE_KEY, metroline);
}

init();
</script>

<style>
.ec-metroline {
  @apply tw-w-full;
}
</style>
