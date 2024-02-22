<template>
  <div
    v-if="title"
    class="ec-smart-table-heading-title"
  >{{ title }}</div>
  <div
    v-if="hasSlot('filter') || hasSlot('actions')"
    class="ec-smart-table-heading"
    :class="{
      'ec-smart-table-heading--is-responsive': isResponsive,
      'ec-smart-table-heading--has-stretch-filter': hasStretchFilter,
    }"
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

<script setup lang="ts">
import { useSlots } from 'vue';

import type { SmartTableHeadingProps } from './types';

const slots = useSlots();

withDefaults(defineProps<SmartTableHeadingProps>(), {
  isResponsive: true,
});

function hasSlot(slotName: string): boolean {
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

  &--is-responsive {
    @apply tw-px-12 tw-pb-12;

    @screen md {
      @apply tw-px-0 tw-pb-0;
    }
  }

  &--has-stretch-filter {
    @screen md {
      @apply tw-mb-16;
    }
  }

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
