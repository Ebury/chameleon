<template>
  <div
    class="ec-smart-table-empty"
    data-test="ec-smart-table-empty"
  >
    <div
      v-if="title"
      class="ec-smart-table-empty__title"
    >{{ title }}</div>
    <div
      v-if="hasFilterSlot()"
      class="ec-smart-table-empty__filter"
    >
      <slot name="filter" />
    </div>
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
  methods: {
    hasFilterSlot() {
      return !!this.$scopedSlots.filter;
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

  &__filter {
    @apply tw-p-8;
  }
}
</style>
