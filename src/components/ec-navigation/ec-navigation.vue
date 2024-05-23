<template>
  <ec-mobile-header v-if="isResponsive">
    <template #logo>
      <img
        class="ec-navigation__mobile-header__logo"
        :src="branding.logo"
        :alt="branding.name"
        data-test="ec-navigation__mobile-header__logo"
      >
    </template>
  </ec-mobile-header>
  <div
    v-else
    class="ec-navigation"
    :class="{
      'ec-navigation--is-collapsable': isCollapsable,
      'ec-navigation--is-collapsed': isCollapsed,
      'ec-navigation--light-mode': isInLightMode,
    }"
    v-bind="{
      ...$attrs,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-navigation` : 'ec-navigation',
    }"
  >
    <div
      v-if="showBrandingLogo && branding.logo"
      class="ec-navigation__branding"
      :class="{
        'ec-navigation__branding--light-mode': isInLightMode,
      }"
      data-test="ec-navigation__branding"
    >
      <img
        class="ec-navigation__branding-logo"
        :src="branding.logo"
        :alt="branding.name"
        data-test="ec-navigation__branding-logo"
      >
    </div>
    <div
      v-if="$slots['user-info']"
      class="ec-navigation__block ec-navigation__user-info"
      data-test="ec-navigation__block ec-navigation__user-info"
    >
      <slot name="user-info" />
    </div>
    <hr
      v-if="isInLightMode"
      class="ec-navigation__separator"
    />
    <div
      v-if="$slots['call-to-action']"
      class="ec-navigation__block ec-navigation__call-to-action"
      data-test="ec-navigation__block ec-navigation__call-to-action"
    >
      <slot name="call-to-action" />
    </div>
    <div
      class="ec-navigation__block ec-navigation__menu"
      data-test="ec-navigation__block ec-navigation__menu"
    >
      <slot name="menu" />
    </div>
    <div
      v-if="$slots['footer-menu']"
      class="ec-navigation__block ec-navigation__footer-menu"
      data-test="ec-navigation__block ec-navigation__footer-menu"
    >
      <slot name="footer-menu" />
    </div>
    <div
      v-if="$slots.copyright"
      class="ec-navigation__block ec-navigation__copyright"
      data-test="ec-navigation__block ec-navigation__copyright"
    >
      <slot name="copyright" />
    </div>
  </div>
</template>

<script setup lang="ts">
import EcMobileHeader from '../ec-mobile-header/ec-mobile-header.vue';
import type { NavigationProps } from './types';

defineOptions({
  inheritAttrs: false,
});

withDefaults(defineProps<NavigationProps>(), {
  showBrandingLogo: true,
});
</script>

<style>
:root,
:host {
  --ec-navigation-width: 280px;
  --ec-navigation-collapsable-width: 256px;
  --ec-navigation-is-collapsed-width: 80px;
}

.ec-navigation {
  width: var(--ec-navigation-width);

  @apply tw-fixed;
  @apply tw-top-0 tw-bottom-0;
  @apply tw-z-navigation;
  @apply tw-bg-key-2;
  @apply tw-text-gray-8;
  @apply tw-flex tw-flex-col;
  @apply tw-overflow-y-auto tw-overflow-x-hidden;

  &--light-mode {
    @apply tw-bg-gray-7;
    @apply tw-text-gray-3;
    @apply tw-py-32 tw-px-24;
  }

  &--is-collapsable {
    width: var(--ec-navigation-collapsable-width);
    transition-property: width;

    @apply tw-duration-500;
  }

  &--is-collapsed {
    width: var(--ec-navigation-is-collapsed-width);
  }

  &__mobile-header {
    &__logo {
      @apply tw-h-32;
    }
  }

  &__branding {
    @apply tw-py-0 tw-px-24;
    @apply tw-mt-24 tw-mb-8 tw-mx-0;
    @apply tw-text-center;

    &--light-mode {
      @apply tw-m-0 tw-mb-16 tw-p-0;
      @apply tw-text-left;
    }
  }

  &__branding-logo {
    @apply tw-align-top;
  }

  &__block {
    @apply tw-mt-16;

    &:last-child {
      @apply tw-mb-16;
    }
  }

  &__separator {
    @apply tw-w-full;
    @apply tw-mt-24 tw-mb-0;
    @apply tw-border-solid tw-border-gray-6;
  }

  &__menu {
    @apply tw-flex-grow;
  }

  &__copyright {
    @apply tw-caption-text;
    @apply tw-whitespace-nowrap;
    @apply tw-py-0 tw-px-24;
    @apply tw-text-center;
  }
}
</style>
