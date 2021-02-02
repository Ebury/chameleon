<template>
  <div
    class="ec-smart-table-empty"
    data-test="ec-smart-table-empty"
  >
    <div
      v-if="title"
      class="ec-smart-table-empty__title"
    >{{ title }}</div>
    <slot name="filter" />
    <slot
      name="empty"
      v-bind="{ emptyMessage }"
    >{{ emptyMessage }}</slot>
  </div>
</template>

<script>
export default {
  name: 'EcSmartTableEmpty',
  props: {
    title: String,
    emptyMessage: {
      type: String,
      default: 'No items found',
    },
  },
};
</script>

<style>
.ec-smart-table-empty {
  &__title {
    @apply tw-h3;
    @apply tw-pb-16;
  }
}
</style>
