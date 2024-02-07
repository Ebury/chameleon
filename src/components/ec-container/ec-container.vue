<template>
  <div
    class="ec-container"
    data-test="ec-container"
  >
    <div
      class="ec-container__navigation"
      :class="{ 'ec-container__navigation--is-collapsable': isCollapsable }"
      data-test="ec-container__navigation"
    >
      <slot name="navigation" />
    </div>
    <div
      class="ec-container__content"
      data-test="ec-container__content"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContainerProps } from './types';

defineProps<ContainerProps>();
</script>

<style>
.ec-container {
  @apply tw-flex tw-flex-row tw-items-stretch;
  @apply tw-min-h-screen;

  &__navigation {
    flex-basis: 280px;

    &--is-collapsable {
      flex-basis: 80px;
    }
  }

  &__content {
    @apply tw-flex-1;
    @apply tw-min-w-0;
  }
}
</style>
