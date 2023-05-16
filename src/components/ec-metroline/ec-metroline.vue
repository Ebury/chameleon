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

import { type MetrolineProviderContext, METROLINE_PROVIDE_KEY } from './provide';

const emit = defineEmits<{(e: 'change', value: string): void,
  (e: 'complete'): void,
}>();

const metroline = reactive<MetrolineProviderContext>({
  activeItemId: '',
  lastItemId: '',
  isCompleted: false,
  register: (id: string) => {
    metrolineItemIds.value.push(id);
    metrolineItemIds.value.sort();

    metroline.lastItemId = metrolineItemIds.value[metrolineItemIds.value.length - 1];
    if (metrolineItemIds.value.length === 1) {
      metroline.activeItemId = id;
    }
  },
  unregister: (id: string) => {
    metrolineItemIds.value = metrolineItemIds.value.filter(item => item !== id);
  },
  goToNext: (id: string) => {
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
  goTo: (id: string) => {
    metroline.activeItemId = id;
    metroline.isCompleted = false;
    emit('change', metroline.activeItemId);
  },
  complete: () => {
    metroline.isCompleted = true;
    emit('complete');
  },
});

const metrolineItemIds = ref<string[]>([]);

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
