<template>
  <div class="ec-toaster">
    <transition-group
      name="ec-toaster-items-transition"
      tag="ul"
      class="ec-toaster__list"
      data-test="ec-toaster__list"
      @after-enter="rememberTopItemPositions"
      @after-leave="rememberTopItemPositions"
      @before-enter="rememberTopItemPositions"
      @before-leave="rememberTopItemPositions"
    >
      <li
        v-for="message of messages"
        :key="message.id"
        ref="items"
        v-ec-toaster-touch="{ minDistance: 50 }"
        class="ec-toaster__item"
        data-test="ec-toaster__item"
        @ec-toaster-touch-remove="$emit('remove', message)"
      >
        <ec-alert
          class="ec-toaster__item-content"
          :type="message.type"
          :title="message.title"
          :subtitle="message.subtitle"
          dismissable
          @change="$emit('remove', message)"
        />
      </li>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import EcAlert from '../ec-alert';
import vEcToasterTouch from './ec-toaster-touch';
import { type ToasterMessage, type ToasterProps } from './types';

withDefaults(defineProps<ToasterProps>(), {
  messages: () => [],
});

defineEmits<{
  'remove': [message: ToasterMessage],
}>();

const items = ref<HTMLElement[]>([]);

function rememberTopItemPositions() {
  if (items.value) {
    for (const item of items.value) {
      item.style.top = `${item.offsetTop}px`;
    }
  }
}

onMounted(rememberTopItemPositions);
</script>

<style>
.ec-toaster {
  @apply tw-fixed;
  @apply tw-z-notification;
  @apply tw-top-0 tw-right-0 tw-left-auto;
  @apply tw-pointer-events-none;
  @apply tw-w-full;

  max-width: 400px;

  &__list {
    @apply tw-w-full;
    @apply tw-flex tw-flex-col tw-items-end;
    @apply tw-relative;
    @apply tw-overflow-visible;
    @apply tw-p-24;
    @apply tw-m-0;
    @apply tw-pointer-events-none;
  }

  &__item {
    @apply tw-inline-block;
    @apply tw-max-w-full;
    @apply tw-flex-grow-0 tw-flex-shrink-0;
    @apply tw-transition-transform-opacity tw-duration-1000;
    @apply tw-mb-8;
    @apply tw-pointer-events-auto;

    &--swipe-active {
      @apply tw-duration-0;
    }

    &--removed-by-swipe {
      @apply tw-duration-300;
    }
  }

  &__item-content {
    @apply tw-shadow-level-2;
  }
}

.ec-toaster-items-transition-enter-from,
.ec-toaster-items-transition-leave-to {
  @apply tw-opacity-0;
  @apply tw-transform-gpu tw-translate-x-full;
}

.ec-toaster-items-transition-leave {
  @apply tw-absolute;
}
</style>
