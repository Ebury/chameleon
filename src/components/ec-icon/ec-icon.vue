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
    fill: $error;
  }

  &--info {
    fill: $info;
  }

  &--success {
    fill: $success;
  }

  &--warning {
    fill: $warning;
  }
}
</style>
