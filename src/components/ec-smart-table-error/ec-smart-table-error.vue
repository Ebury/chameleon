<template>
  <div
    class="ec-smart-table-error"
    data-test="ec-smart-table-error"
  >
    <div
      v-if="title"
      class="ec-smart-table-error__title"
    >{{ title }}</div>
    <slot name="filter" />
    <slot
      name="error"
      v-bind="{ errorMessage }"
    >{{ errorMessage }}</slot>
  </div>
</template>

<script>
export default {
  name: 'EcSmartTableError',
  props: {
    title: String,
    errorMessage: {
      type: String,
      default: 'Unexpected error while fetching data',
    },
  },
};
</script>

<style>
.ec-smart-table-error {
  &__title {
    @apply tw-h3;
    @apply tw-pb-16;
  }
}
</style>
