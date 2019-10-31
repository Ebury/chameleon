<template>
  <div class="ec-container">
    <div
      class="ec-container__navigation"
      :class="{ 'ec-container__navigation--is-collapsable': isCollapsable }"
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
    isCollapsable: {
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
  align-items: stretch;

  &__navigation {
    flex-basis: 280px;

    &--is-collapsable {
      flex-basis: 80px;
    }
  }

  &__content {
    flex: 1;
  }
}
</style>
