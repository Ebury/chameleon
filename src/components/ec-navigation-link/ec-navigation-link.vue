<template>
  <!-- If it is a router link -->
  <router-link
    v-if="isRouterLink"
    v-bind="{
      ...$attrs,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-navigation-link` : 'ec-navigation-link',
    }"
    active-class="ec-navigation-link--is-active"
    class="ec-navigation-link"
    :class="{
      'ec-navigation-link--is-active': isActive,
      'ec-navigation-link--is-compact': isCompact,
      'ec-navigation-link--is-collapsed': isCollapsed,
      'ec-navigation-link--light-mode': isInLightMode,
    }"
    :to="url"
    @click="emit('navigation-link-clicked')"
  >
    <ec-icon
      class="ec-navigation-link__icon"
      data-test="ec-navigation-link__icon"
      :name="iconName"
      :size="iconSize"
    />
    <transition name="ec-navigation-link__text-fade">
      <span
        v-show="!isCollapsed"
        class="ec-navigation-link__text"
        data-test="ec-navigation-link__text"
      >{{ text }}</span>
    </transition>

  </router-link>

  <!-- If is a normal link that directs you outside the SPA -->
  <a
    v-else
    v-bind="{
      ...$attrs,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-navigation-link` : 'ec-navigation-link',
    }"
    class="ec-navigation-link"
    :class="{
      'ec-navigation-link--is-active': isActive,
      'ec-navigation-link--is-compact': isCompact,
      'ec-navigation-link--is-collapsed': isCollapsed,
      'ec-navigation-link--light-mode': isInLightMode,
    }"
    :href="url"
    :target="target"
  >
    <ec-icon
      class="ec-navigation-link__icon"
      data-test="ec-navigation-link__icon"
      :name="iconName"
      :size="iconSize"
    />
    <transition name="ec-navigation-link__text-fade">
      <span
        v-show="!isCollapsed"
        class="ec-navigation-link__text"
        data-test="ec-navigation-link__text"
      >{{ text }}</span>
    </transition>
  </a>
</template>

<script setup lang="ts">
import EcIcon from '../ec-icon/ec-icon.vue';
import type { NavigationLinkProps } from './types';

const emit = defineEmits<{
  'navigation-link-clicked': [],
}>();

defineOptions({
  inheritAttrs: false,
});

withDefaults(defineProps<NavigationLinkProps>(), {
  iconSize: 24,
});
</script>

<style>
@import '../../styles/tools/transitions.css';

.ec-navigation-link {
  @apply tw-h6;
  @apply tw-py-12 tw-px-24;
  @apply tw-flex tw-items-center;
  @apply tw-no-underline;
  @apply tw-text-gray-8;
  @apply tw-whitespace-nowrap;

  font-style: normal;

  &:hover {
    @apply tw-text-key-4;
    @apply tw-no-underline;
    @apply tw-small-strong;

    &.ec-navigation-link--light-mode {
      @apply tw-text-gray-2;
    }
  }

  &:focus {
    @apply tw-outline-none;
    @apply tw-text-key-4;
  }

  &--is-compact {
    @apply tw-normal-case;
    @apply tw-p-0;
  }

  &--is-collapsed {
    @apply tw-py-12 tw-px-28;
  }

  &__icon {
    @apply tw-fill-current;
    @apply tw-flex-shrink-0;
  }

  &__text {
    @apply tw-truncate;
    @apply tw-flex-shrink;
    @apply tw-ml-16;

    .ec-navigation-link--is-compact & {
      @apply tw-ml-8;
    }
  }

  &__text-fade {
    @mixin ec-fade-transition;
  }

  &--is-active {
    @apply tw-bg-key-4;

    &:hover,
    &:focus {
      @apply tw-text-gray-8;
    }

    &:focus {
      @apply tw-text-key-4;
    }

    &.ec-navigation-link--light-mode {
      @apply tw-bg-transparent;
      @apply tw-small-strong;
      @apply tw-text-gray-2;
    }
  }

  &--light-mode {
    @apply tw-small-text;
    @apply tw-p-8;
    @apply tw-text-gray-3;
    @apply tw-bg-transparent;
    @apply tw-capitalize;

    &:hover,
    &:focus {
      @apply tw-small-strong;
      @apply tw-bg-transparent;
      @apply tw-text-gray-2;
    }
  }
}
</style>
