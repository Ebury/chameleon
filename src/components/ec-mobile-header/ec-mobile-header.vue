<template>
  <header
    class="ec-mobile-header"
    data-test="ec-mobile-header"
  >
    <div class="ec-mobile-header__logo">
      <slot name="logo" />
    </div>
    <button
      type="button"
      class="ec-mobile-header__menu"
      @click="emit('open-mobile-menu')"
    >
      <ec-icon
        class="ec-mobile-header__menu__icon"
        :name="IconName.SIMPLE_MENU"
        :size="24"
      />
    </button>
  </header>
</template>

<script setup lang="ts">
import EcIcon from '../ec-icon';
import { IconName } from '../ec-icon/types';

const emit = defineEmits<{
  'open-mobile-menu': [],
}>();
</script>

<style>
.ec-mobile-header {
  @apply tw-flex tw-flex-row tw-items-center tw-justify-between;
  @apply tw-w-full;
  @apply tw-py-16 tw-px-24;
  @apply tw-bg-gray-7;

  &__logo {
    @apply tw-h-32;
  }

  &__menu {
    @apply tw-absolute;
    @apply tw-top-16 tw-right-24;
    @apply tw-flex tw-items-center;
    @apply tw-border-0 tw-p-0;
    @apply tw-bg-transparent;

    &__icon {
      @apply tw-fill-key-4;
    }

    &:hover {
      @apply tw-cursor-pointer;
      @apply tw-fill-key-3;
    }
  }
}
</style>
