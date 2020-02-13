<template>
  <router-link
    v-if="isRouterLink"
    :to="to"
  >
    <ec-icon />
    <slot name="loading" />
  </router-link>

  <a
    v-else-if="isNormalLink"
    :href="href"
  >
    <slot />
    <slot name="loading" />
  </a>

  <button v-else>
    <slot />
    <slot name="loading" />

  </button>
</template>

<script>
import EcIcon from '../ec-icon/ec-icon.vue';

export default {
  name: 'EcBtn',
  components: {
    EcIcon,
  },
  props: {
    label: {
      type: String,
    },
    size: {
      type: String,
      default: 'md',
      validator(value) {
        return ['sm', 'md'].includes(value);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
    },
    iconRight: {
      type: String,
    },
    iconOnly: {
      type: Boolean,
      default: false,
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
    to: {
      type: String,
    },
    href: {
      type: String,
    },
    htmlType: {
      type: String,
      validator(value) {
        return ['button', 'submit', 'menu', 'reset'].includes(value);
      },
    },
  },
  computed: {
    isRouterLink() {
      return !!this.to;
    },
    isNormalLink() {
      return !!this.href;
    },
  },
};
</script>

<style lang="scss">
// add styles
</style>
