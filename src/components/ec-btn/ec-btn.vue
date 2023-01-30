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
        'ec-btn__icon--no-loading-text' : isSpinnerLoaderVisible(),
        'ec-btn__icon--with-loading-text' : isTextLoaderVisible(),
        'ec-btn__icon--disabled': isDisabled
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
        'ec-btn__text--is-loading' : isLoading,
        'ec-btn__text': true,
        'ec-btn__text--disabled': isDisabled
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

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import {
  computed,
  toRefs,
  useAttrs,
  useSlots,
} from 'vue';

import EcIcon from '../ec-icon';
import EcLoadingIcon from '../ec-loading-icon';

const slots = useSlots();
const attrs = useAttrs();
const props = defineProps({
  size: {
    type: String,
    default: 'md',
    validator(value) {
      return ['sm', 'md'].includes(value);
    },
  },
  href: {
    type: String,
  },
  to: {
    type: [String, Object],
  },
  tag: {
    type: String,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
  },
  isRounded: {
    type: Boolean,
    default: false,
  },
  isOutline: {
    type: Boolean,
    default: false,
  },
  isFullWidth: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    validator(value) {
      return ['primary', 'secondary', 'success', 'error', 'warning'].includes(value);
    },
  },
  isReverse: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isSubmit: {
    type: Boolean,
    default: true,
  },
});

const {
  size,
  href,
  to,
  tag,
  isDisabled,
  icon,
  isRounded,
  isOutline,
  isFullWidth,
  category,
  isReverse,
  isLoading,
  isSubmit,
} = toRefs(props);

const isRouterLink = computed(() => !!to.value);
const isAnchorLink = computed(() => !!href.value);

const componentTag = computed(() => {
  if (isAnchorLink.value) {
    return tag.value || 'a';
  } if (isRouterLink.value) {
    return tag.value || 'router-link';
  }
  return tag.value || 'button';
});

const componentProps = computed(() => {
  const newProps = {};
  if (!isAnchorLink.value && (isDisabled.value || isLoading.value)) {
    newProps.disabled = true;
  }
  if (componentTag.value === 'button') {
    newProps.type = isSubmit.value ? 'submit' : 'button';
  }
  if (to.value) {
    newProps.to = to.value;
  }
  if (href.value) {
    newProps.href = href.value;
  }
  return newProps;
});

function isSpinnerLoaderVisible() {
  return isLoading.value && !slots['loading-text'];
}
function isTextLoaderVisible() {
  return isLoading.value && !!slots['loading-text'];
}
function hasDefaultSlot() {
  return !!slots.default;
}

function getButtonClasses() {
  return {
    'ec-btn--sm': size.value === 'sm',
    'ec-btn--md': size.value === 'md',
    'ec-btn--rounded': isRounded.value,
    'ec-btn--full-width': isFullWidth.value,
    'ec-btn--icon-only': icon.value && !hasDefaultSlot(),
    [`ec-btn--${category.value}`]: category.value,
    'ec-btn--outline': isOutline.value,
    'ec-btn--primary-reverse': isReverse.value && category.value === 'primary',
    'ec-btn--secondary-reverse': isReverse.value && category.value === 'secondary',
    'ec-btn--success-reverse': isReverse.value && category.value === 'success',
    'ec-btn--error-reverse': isReverse.value && category.value === 'error',
    'ec-btn--warning-reverse': isReverse.value && category.value === 'warning',
    'ec-btn--is-loading': isSpinnerLoaderVisible() || isTextLoaderVisible(),
    'ec-btn--disabled': isDisabled.value,
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

    &--disabled {
      @apply tw-bg-gray-6;
      @apply tw-cursor-default;
    }

    &--disabled:hover {
      @apply tw-bg-gray-6;
    }

    &__text--disabled {
      @apply tw-text-gray-5;
    }

    &__icon--disabled {
      @apply tw-fill-gray-5;
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
