<template>
  <svg
    :width="size"
    :height="size"
    :class="['ec-icon', typeClass]"
    v-on="$listeners"
  >
    <use :href="iconUrl" />
  </svg>
</template>

<script>
import { getSpriteSourceByName } from './ec-icon-sprite';

export default {
  name: 'EcIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
    },
    type: {
      type: String,
      validator(value) {
        return ['error', 'info', 'success', 'warning', 'interactive'].includes(value);
      },
    },
    spriteSource: {
      type: String,
      default: 'auto',
    },
  },
  computed: {
    iconUrl() {
      if (!this.name) {
        return null;
      }

      if (this.spriteSource === 'inline') {
        return `#ec-${this.name}`;
      }

      const spriteUrl = this.spriteSource === 'auto' ? getSpriteSourceByName(this.name) : this.spriteSource;
      return `${spriteUrl}#ec-${this.name}`;
    },
    typeClass() {
      return this.type ? `ec-icon--${this.type}` : null;
    },
  },
};
</script>

<style>
.ec-icon {
  &--error {
    @apply tw-fill-error;
  }

  &--info {
    @apply tw-fill-info;
  }

  &--success {
    @apply tw-fill-success;
  }

  &--warning {
    @apply tw-fill-warning;
  }

  &--interactive {
    @apply tw-fill-gray-4;
  }
}
</style>
