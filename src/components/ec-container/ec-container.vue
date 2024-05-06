<template>
  <div
    class="ec-container"
    :class="{ 'ec-container--mobile-layout': showMobileLayout }"
    data-test="ec-container"
  >
    <div
      class="ec-container__navigation"
      :class="{
        'ec-container__navigation--is-collapsable': isCollapsable,
        'ec-container__navigation--mobile-layout': showMobileLayout,
      }"
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

  &--mobile-layout {
    @apply tw-flex-col;
  }

  &__navigation {
    flex-basis: 280px;

    &--is-collapsable {
      flex-basis: 80px;
    }

    &--mobile-layout {
      @apply tw-basis-auto;
    }
  }

  &__content {
    @apply tw-flex-1;
    @apply tw-min-w-0;
  }
}
</style>
