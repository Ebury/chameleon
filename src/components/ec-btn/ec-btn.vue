<template>
  <component
    :is="componentTag"
    v-bind="componentProps"
    class="ec-btn"
    :class="buttonClasses"
  >
    <ec-icon
      v-if="icon"
      class="ec-btn__icon"
      :class="{
        'ec-btn--icon-with-spacing': this.$slots.default && icon,
        'ec-btn__content-invisible' : loading && !this.$slots['text-loader'],
        'ec-btn__content-remove' : loading && this.$slots['text-loader'],
      }"
      :name="icon"
      :size="22"
    />

    <span
      v-if="loading && this.$slots['text-loader']"
      data-test="ec-btn__text-loader-slot"
    >
      <slot name="text-loader" />
    </span>

    <span
      v-else-if="this.$slots.default"
      data-test="ec-btn__default-slot"
      :class="{'ec-btn__content-invisible' : loading }"
    >
      <slot />
    </span>

    <ec-loading
      v-if="loading && !this.$slots['text-loader']"
      class="ec-btn__spinner"
      show
      :size="24"
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
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      validator(value) {
        return ['primary', 'secondary', 'success', 'error', 'warning'].includes(value);
      },
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    submit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isRouterLink() {
      return !!this.to;
    },
    isNormalLink() {
      return !!this.href;
    },
    buttonClasses() {
      return {
        'ec-btn--sm': this.size === 'sm',
        'ec-btn--md': this.size === 'md',
        'ec-btn--rounded': this.rounded,
        'ec-btn--full-width': this.fullWidth,
        'ec-btn--icon-only': this.icon && !(this.text || this.$slots.default),
        [`ec-btn--${this.type}`]: this.type,
        'ec-btn--outline': this.outline,
        'ec-btn--reverse': this.reverse,
        'ec-btn--primary-reverse': this.reverse && this.type === 'primary',
      };
    },
    componentTag() {
      if (this.isNormalLink) {
        return this.tag || 'a';
      } if (this.isRouterLink) {
        return this.tag || 'router-link';
      }
      return this.tag || 'button';
    },
    componentProps() {
      return {
        type: this.submit ? 'submit' : null,
        to: this.to || null,
        href: this.href || null,
        disabled: !this.isNormalLink && (this.disabled || this.loading),
      };
    },
  },
};
</script>

<style lang="scss">
  .ec-btn {
    &__content-invisible {
      visibility: hidden;
    }

    &__content-remove {
      display: none;
    }

    &__spinner {
      position: absolute;
      width: 100%;
    }

    &--icon-with-spacing {
      margin-right: 8px;
    }
  }
</style>
