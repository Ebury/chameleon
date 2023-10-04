<template>
  <div
    v-if="title"
    class="ec-smart-table-heading-title"
  >{{ title }}</div>
  <div
    v-if="hasSlot('filter') || hasSlot('actions')"
    class="ec-smart-table-heading"
  >
    <div
      v-if="hasSlot('filter')"
      class="ec-smart-table-heading__filter"
    >
      <slot name="filter" />
    </div>
    <div
      v-if="hasSlot('actions')"
      class="ec-smart-table-heading__actions"
    >
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>
import { useSlots } from 'vue';

const slots = useSlots();

defineProps({
  title: String,
});

function hasSlot(slotName) {
  return slotName in slots;
}
</script>

<style>
.ec-smart-table-heading-title {
  @apply tw-h3;
  @apply tw-pb-16;
}

.ec-smart-table-heading {
  @apply tw-flex;

  &__filter {
    @apply tw-p-8 tw-flex-grow;
  }

  &__actions {
    @apply tw-self-end tw-ml-auto;

    @screen sm {
      @apply tw-self-center;
    }
  }
}
</style>
