<template>
  <svg
    :width="size"
    :height="size"
    :class="['ec-icon', typeClass]"
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
        return ['error', 'info', 'success', 'warning'].includes(value);
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
@import '../../scss/settings/colors/reserved-color-scale';

.ec-icon {
  &--error {
    fill: $level-2-error;
  }

  &--info {
    fill: $level-2-info;
  }

  &--success {
    fill: $level-2-success;
  }

  &--warning {
    fill: $level-2-warning;
  }
}
</style>
