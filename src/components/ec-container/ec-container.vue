<template>
  <div class="ec-container">
    <div
      class="ec-container__navigation"
      :class="{ 'ec-container__navigation--can-be-collapsed': canBeCollapsed }"
    >
      <slot name="navigation" />
    </div>
    <div class="ec-container__content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'EcContainer',
  props: {
    canBeCollapsed: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.ec-container {
  display: flex;
  flex-direction: row;
  min-height: 100vh;

  &__navigation {
    position: relative;
    flex-basis: 280px;

    &--can-be-collapsed {
      flex-basis: 80px;
    }
  }

  &__content {
    flex: 1;
  }
}
</style>
