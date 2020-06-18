<template>
  <component
    :is="componentTag"
    v-bind="componentProps"
    class="ec-btn"
    :class="getButtonClasses()"
    v-on="$listeners"
  >
    <ec-icon
      v-if="icon"
      class="ec-btn__icon"
      data-test="ec-btn__icon"
      :class="{
        'ec-btn__icon--with-spacing': this.$slots.default && icon,
        'ec-btn__icon--no-loading-text' : isSpinnerLoaderVisible(),
        'ec-btn__icon--with-loading-text' : isTextLoaderVisible(),
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
      v-else-if="this.$slots.default"
      data-test="ec-btn__text"
      :class="{'ec-btn__text--is-loading' : isLoading }"
    >
      <slot />
    </span>

    <ec-loading
      v-if="isSpinnerLoaderVisible()"
      class="ec-btn__loading-spinner"
      data-test="ec-btn__loading-spinner"
      show
      :size="22"
    />

  </component>
</template>

<script>
import EcIcon from '../ec-icon/ec-icon.vue';
import EcLoading from '../ec-loading/ec-loading.vue';

export default {
  name: 'EcBtn',
  components: {
    EcIcon,
    EcLoading,
  },
  props: {
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
      type: String,
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
  },
  computed: {
    isRouterLink() {
      return !!this.to;
    },
    isAnchorLink() {
      return !!this.href;
    },
    componentTag() {
      if (this.isAnchorLink) {
        return this.tag || 'a';
      } if (this.isRouterLink) {
        return this.tag || 'router-link';
      }
      return this.tag || 'button';
    },
    componentProps() {
      return {
        type: (this.componentTag === 'button' && this.isSubmit) ? 'submit' : null,
        to: this.to || null,
        href: this.href || null,
        disabled: !this.isAnchorLink && (this.isDisabled || this.isLoading),
      };
    },
  },
  methods: {
    isSpinnerLoaderVisible() {
      return this.isLoading && !this.$slots['loading-text'];
    },
    isTextLoaderVisible() {
      return this.isLoading && this.$slots['loading-text'];
    },
    getButtonClasses() {
      return {
        'ec-btn--sm': this.size === 'sm',
        'ec-btn--md': this.size === 'md',
        'ec-btn--rounded': this.isRounded,
        'ec-btn--full-width': this.isFullWidth,
        'ec-btn--icon-only': this.icon && !this.$slots.default,
        [`ec-btn--${this.category}`]: this.category,
        'ec-btn--outline': this.isOutline,
        'ec-btn--primary-reverse': this.isReverse && this.category === 'primary',
        'ec-btn--secondary-reverse': this.isReverse && this.category === 'secondary',
        'ec-btn--success-reverse': this.isReverse && this.category === 'success',
        'ec-btn--error-reverse': this.isReverse && this.category === 'error',
        'ec-btn--warning-reverse': this.isReverse && this.category === 'warning',
      };
    },
  },
};
</script>

<style>
  .ec-btn {
    &__text--is-loading,
    &__icon--no-loading-text {
      @apply tw-invisible;
    }

    &__icon--with-loading-text {
      @apply tw-hidden;
    }

    &__loading-spinner {
      @apply tw-absolute;
      @apply tw-w-full;
    }

    &__icon--with-spacing {
      @apply tw-mr-8;
    }
  }
</style>
