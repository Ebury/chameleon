<template>
  <svg
    :width="size"
    :height="size"
    :class="['ec-icon', typeClass]"
    v-on="$listeners"
  >
    <use :xlink:href="`#ec-${name}`" />
  </svg>
</template>

<script>
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
  },
  computed: {
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
