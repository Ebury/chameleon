<template>
  <component
    :is="componentTag"
    v-bind="{
      ...attrs,
      ...componentProps,
      'data-test': attrs['data-test'] ? `${attrs['data-test']} ec-btn` : 'ec-btn',
    }"
    class="ec-btn"
    :class="getButtonClasses()"
  >
    <ec-icon
      v-if="icon"
      class="ec-btn__icon"
      data-test="ec-btn__icon"
      :class="{
        'ec-btn__icon--with-spacing': hasDefaultSlot() && icon,
        'ec-btn__icon--no-loading-text': isSpinnerLoaderVisible(),
        'ec-btn__icon--with-loading-text': isTextLoaderVisible(),
      }"
      :name="icon"
      :size="22"
    />

    <span
      v-if="isTextLoaderVisible()"
      data-test="ec-btn__loading-text"
    >
      <slot name="loading-text" />
    </span>

    <span
      v-else-if="hasDefaultSlot()"
      data-test="ec-btn__text"
      :class="{
        'ec-btn__text--is-loading': isLoading,
        'ec-btn__text': true,
      }"
    >
      <slot />
    </span>

    <div
      v-if="isSpinnerLoaderVisible()"
      class="ec-btn__loading-spinner"
      data-test="ec-btn__loading-spinner"
    >
      <ec-loading-icon :size="22" />
    </div>
  </component>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

import {
  computed,
  useAttrs,
  useSlots,
} from 'vue';
import type { RouteLocationRaw, RouterLinkProps } from 'vue-router';

import EcIcon from '../ec-icon';
import type { IconName } from '../ec-icon/icon-names';
import EcLoadingIcon from '../ec-loading-icon';
import { ButtonCategory, ButtonSize } from './types';

const slots = useSlots();
const attrs = useAttrs();

interface ButtonProps {
  size?: ButtonSize;
  href?: string;
  to?: RouteLocationRaw;
  tag?: string;
  isDisabled?: boolean;
  icon?: IconName;
  isRounded?: boolean;
  isOutline?: boolean;
  isFullWidth?: boolean;
  category?: ButtonCategory;
  isReverse?: boolean;
  isLoading?: boolean;
  isSubmit?: boolean
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: ButtonSize.MEDIUM,
  isDisabled: false,
  isRounded: false,
  isOutline: false,
  isFullWidth: false,
  isReverse: false,
  isLoading: false,
  isSubmit: true,
});

const isRouterLink = computed(() => !!props.to);
const isAnchorLink = computed(() => !!props.href);

const componentTag = computed(() => {
  if (isAnchorLink.value) {
    return props.tag || 'a';
  }
  if (isRouterLink.value) {
    return props.tag || 'router-link';
  }
  return props.tag || 'button';
});

const componentProps = computed(() => {
  const isDisabled = props.isDisabled || props.isLoading;

  switch (componentTag.value) {
    case 'button':
      return {
        disabled: isDisabled || undefined,
        type: props.isSubmit ? 'submit' : 'button',
      } as HTMLButtonElement;
    case 'router-link':
      return {
        disabled: isDisabled || undefined,
        to: props.to,
      } as RouterLinkProps;
    case 'a': return {
      href: props.href,
    } as HTMLLinkElement;
    default: return {
      href: props.href,
      to: props.to,
    } as unknown as HTMLElement;
  }
});

function isSpinnerLoaderVisible() {
  return props.isLoading && !slots['loading-text'];
}
function isTextLoaderVisible() {
  return props.isLoading && !!slots['loading-text'];
}
function hasDefaultSlot() {
  return !!slots.default;
}

function getButtonClasses() {
  return {
    'ec-btn--sm': props.size === ButtonSize.SMALL,
    'ec-btn--md': props.size === ButtonSize.MEDIUM,
    'ec-btn--rounded': props.isRounded,
    'ec-btn--full-width': props.isFullWidth,
    'ec-btn--icon-only': props.icon && !hasDefaultSlot(),
    [`ec-btn--${props.category}`]: props.category,
    'ec-btn--outline': props.isOutline,
    'ec-btn--primary-reverse': props.isReverse && props.category === ButtonCategory.PRIMARY,
    'ec-btn--secondary-reverse': props.isReverse && props.category === ButtonCategory.SECONDARY,
    'ec-btn--success-reverse': props.isReverse && props.category === ButtonCategory.SUCCESS,
    'ec-btn--error-reverse': props.isReverse && props.category === ButtonCategory.ERROR,
    'ec-btn--warning-reverse': props.isReverse && props.category === ButtonCategory.WARNING,
    'ec-btn--is-loading': isSpinnerLoaderVisible() || isTextLoaderVisible(),
  };
}
</script>

<style>
  .ec-btn {
    &--is-loading {
      @apply tw-relative;
    }

    &__text {
      @apply tw-truncate;
    }

    &__text--is-loading,
    &__icon--no-loading-text {
      @apply tw-invisible;
    }

    &__icon--with-loading-text {
      @apply tw-hidden;
    }

    &__loading-spinner {
      @apply tw-absolute tw-inset-0;
      @apply tw-flex tw-items-center tw-justify-center;
      @apply tw-w-full;
    }

    &__icon--with-spacing {
      @apply tw-mr-8;
    }
  }
</style>
