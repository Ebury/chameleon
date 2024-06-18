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
    <div :class="{ 'ec-navigation__header': isMobileMenuOpen }">
      <div
        v-if="showBrandingLogo && branding.logo"
        :class="{
          'ec-navigation__branding--mobile-menu-open': isMobileMenuOpen,
          'ec-navigation__branding--light-mode': isInLightMode,
        }"
        class="ec-navigation__branding"
        data-test="ec-navigation__branding"
      >
        <img
          class="ec-navigation__branding-logo"
          :class="{ 'ec-navigation__branding-logo--light-mode': isInLightMode }"
          :src="branding.logo"
          :alt="branding.name"
          data-test="ec-navigation__branding-logo"
        >
      </div>

      <button
        v-if="isMobileMenuOpen"
        type="button"
        class="ec-navigation__mobile-menu-close-button"
        @click="isMobileMenuOpen = false"
      >
        <ec-icon
          class="ec-navigation__mobile-menu-close-button"
          data-test="ec-navigation__mobile-menu-close-button"
          :name="IconName.SIMPLE_CLOSE"
          :size="24"
        />
      </button>
    </div>

    <div
      v-if="$slots['user-info']"
      :class="{ 'ec-navigation__block ec-navigation__user-info--light-mode': isInLightMode }"
      class="ec-navigation__block ec-navigation__user-info"
      data-test="ec-navigation__block ec-navigation__user-info"
    >
      <slot name="user-info" v-bind="{ onNavigationLinkClicked, isInLightMode }" />
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
      <slot name="call-to-action" v-bind="{ onNavigationLinkClicked, isInLightMode }" />
    </div>

    <div
      class="ec-navigation__block ec-navigation__menu"
      data-test="ec-navigation__block ec-navigation__menu"
    >
      <slot name="menu" v-bind="{ onNavigationLinkClicked, isInLightMode }" />
    </div>

    <hr
      v-if="isInLightMode"
      class="ec-navigation__separator"
    />

    <div
      v-if="$slots['footer-menu']"
      class="ec-navigation__block ec-navigation__footer-menu"
      data-test="ec-navigation__block ec-navigation__footer-menu"
    >
      <slot name="footer-menu" v-bind="{ onNavigationLinkClicked, isInLightMode }" />
    </div>

    <div
      v-if="$slots.copyright && !isInLightMode"
      class="ec-navigation__block ec-navigation__copyright"
      data-test="ec-navigation__block ec-navigation__copyright"
    >
      <slot name="copyright" v-bind="{ onNavigationLinkClicked, isInLightMode }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import EcIcon from '../ec-icon';
import { IconName } from '../ec-icon/types';
import EcMobileHeader from '../ec-mobile-header/ec-mobile-header.vue';
import type { NavigationProps } from './types';

const isMobileMenuOpen = ref(false);

defineOptions({
  inheritAttrs: false,
});

withDefaults(defineProps<NavigationProps>(), {
  showBrandingLogo: true,
});

function onNavigationLinkClicked() {
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
}
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

  &__header {
    @apply tw-flex tw-justify-between tw-items-center;
  }

  &__block {
    @apply tw-mt-8;
  }

  &__user-info--light-mode {
    @apply tw-mt-16 tw-mb-24;
  }

  &__call-to-action {
    @apply tw-mt-16 tw-mb-8;
  }

  &--light-mode {
    @apply tw-bg-gray-7;
    @apply tw-text-gray-3;
    @apply tw-pt-32 tw-px-32 tw-pb-24;
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
    @apply tw-w-full;
    @apply tw-pt-16 tw-px-24 tw-pb-8;
  }

  &__mobile-menu-close-button {
    @apply tw-fill-key-4;
    @apply tw-border-0;
    @apply tw-p-0;
    @apply tw-bg-transparent;
    @apply tw-flex tw-items-center;

    &:hover {
      @apply tw-fill-key-3;
      @apply tw-cursor-pointer;
    }
  }

  &__mobile-header {
    &__logo {
      @apply tw-w-88;
    }
  }

  &__branding {
    @apply tw-py-0 tw-px-24;
    @apply tw-mt-24 tw-mb-8 tw-mx-0;
    @apply tw-text-center;

    &--light-mode {
      @apply tw-m-0 tw-p-0;
      @apply tw-text-left;
    }
  }

  &__branding-logo {
    &--light-mode {
      @apply tw-align-top;
      @apply tw-w-88;
    }
  }

  &__separator {
    @apply tw-w-full;
    @apply tw-my-8;
    @apply tw-border-solid tw-border-gray-6;
    @apply tw-border-b-0;
  }

  &__menu {
    @apply tw-flex-grow;
  }

  &__copyright {
    @apply tw-caption-text;
    @apply tw-whitespace-nowrap;
    @apply tw-px-24 tw-pt-8 tw-pb-16;
    @apply tw-text-center;
  }
}
</style>
