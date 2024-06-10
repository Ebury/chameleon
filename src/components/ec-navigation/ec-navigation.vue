<template>
  <ec-mobile-header
    v-if="isResponsive && !isMobileMenuOpen"
    @open-mobile-menu="isMobileMenuOpen = true"
  >
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
      'ec-navigation--mobile-mode': isMobileMenuOpen,
    }"
    v-bind="{
      ...$attrs,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-navigation` : 'ec-navigation',
    }"
  >
    <button
      v-if="isMobileMenuOpen"
      type="button"
      class="ec-navigation__mobile-menu-close-button"
      @click="isMobileMenuOpen = false"
    >
      <ec-icon
        class="ec-navigation__mobile-menu-close-button"
        :name="IconName.SIMPLE_CLOSE"
        :size="24"
      />
    </button>
    <div
      v-if="showBrandingLogo && branding.logo"
      class="ec-navigation__branding"
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
import { ref } from 'vue';

import EcIcon from '../ec-icon';
import { IconName } from '../ec-icon/types';
import EcMobileHeader from '../ec-mobile-header/ec-mobile-header.vue';
import type { NavigationProps } from './types';

const isMobileMenuOpen = ref(true);

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

    .ec-navigation__branding {
      @apply tw-m-0 tw-mb-16 tw-p-0;
      @apply tw-text-left;
    }
  }

  &--is-collapsable {
    width: var(--ec-navigation-collapsable-width);
    transition-property: width;

    @apply tw-duration-500;
  }

  &--is-collapsed {
    width: var(--ec-navigation-is-collapsed-width);
  }

  &--mobile-mode {
    @apply tw-w-screen;
  }

  &__mobile-menu-close-button {
    @apply tw-fill-key-4;
    @apply tw-border-0;
    @apply tw-p-0;
    @apply tw-bg-none;
    @apply tw-fixed tw-top-16 tw-right-24;

    &:hover {
      @apply tw-fill-key-3;
      @apply tw-cursor-pointer;
    }
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
