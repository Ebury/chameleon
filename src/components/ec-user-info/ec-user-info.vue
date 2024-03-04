<template>
  <div
    data-test="ec-user-info"
    class="ec-user-info"
    :class="{ 'ec-user-info--is-collapsable': isCollapsable }"
  >
    <img
      class="ec-user-info__avatar"
      data-test="ec-user-info__avatar"
      :src="user.gravatar"
      :alt="`${user.name} gravatar`"
      @click="emit('toggle')"
    >

    <transition name="ec-user-info__client-fade">
      <div
        v-if="!isCollapsed"
        class="ec-user-info__client-wrapper"
      >
        <a
          data-test="ec-user-info__client-name"
          class="ec-user-info__client-name"
          :href="user.profileUrl"
        >{{ user.name }}</a>

        <slot name="client-selector" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import type { UserInfoProps } from './types';

defineProps<UserInfoProps>();

const emit = defineEmits<{
  'toggle': []
}>();
</script>

<style>
@import '../../styles/tools/transitions.css';

:root,
:host {
  --ec-user-info-avatar-size: theme('spacing.48');
}

.ec-user-info {
  @apply tw-flex tw-flex-col tw-items-center;
  @apply tw-py-0 tw-px-16;
  @apply tw-whitespace-nowrap;

  &--is-collapsable {
    @apply tw-flex-row tw-items-start tw-justify-start;

    max-height: var(--ec-user-info-avatar-size);

    .ec-user-info__avatar {
      @apply tw-mr-16;
    }
  }

  &__avatar {
    @apply tw-rounded;

    width: var(--ec-user-info-avatar-size);
    height: var(--ec-user-info-avatar-size);
  }

  &__client-name {
    @apply tw-h4;
    @apply tw-truncate;
    @apply tw-block;
    @apply tw-text-gray-8;
    @apply tw-no-underline;
    @apply tw-mt-8 tw-mb-4;

    &:hover {
      @mixin ec-text-color-transition;

      @apply tw-text-key-4;
      @apply tw-no-underline;
    }

    &:focus {
      @apply tw-outline-none;
      @apply tw-text-key-4;
    }

    .ec-user-info--is-collapsable & {
      @apply tw-mt-0;
    }
  }

  &__client-fade {
    @mixin ec-fade-transition;
  }

  &__client-wrapper {
    @apply tw-min-w-0 tw-max-w-full;
    @apply tw-text-center;

    .ec-user-info--is-collapsable & {
      @apply tw-text-left;
      @apply tw-self-center;
    }
  }
}
</style>
