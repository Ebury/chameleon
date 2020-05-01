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

<style lang="scss">
@import '../../scss/settings/colors/';

.ec-icon {
  &--error {
    fill: $color-error;
  }

  &--info {
    fill: $color-info;
  }

  &--success {
    fill: $color-success;
  }

  &--warning {
    fill: $color-warning;
  }

  &--interactive {
    // TODO $color-interactive has been deprecated -> use gray-color-level-4 instead - that's the same color
    fill: $color-interactive;
  }
}
</style>
