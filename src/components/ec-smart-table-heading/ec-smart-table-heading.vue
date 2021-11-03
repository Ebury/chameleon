<template>
  <div>
    <div
      v-if="title"
      class="ec-smart-table-heading-title"
    >{{ title }}</div>
    <div
      v-if="hasFilterSlot() || hasActionsSlot()"
      class="ec-smart-table-heading"
    >
      <div
        v-if="hasFilterSlot()"
        class="ec-smart-table-heading__filter"
      >
        <slot name="filter" />
      </div>
      <div
        v-if="hasActionsSlot()"
        class="ec-smart-table-heading__actions"
      >
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EcSmartTableHeading',
  props: {
    title: String,
  },
  methods: {
    hasFilterSlot() {
      return !!this.$scopedSlots.filter;
    },
    hasActionsSlot() {
      return !!this.$scopedSlots.actions;
    },
  },
};
</script>

<style>
.ec-smart-table-heading-title {
  @apply tw-h3;
  @apply tw-pb-16;
}

.ec-smart-table-heading {
  @apply tw-flex;

  &__filter {
    @apply tw-p-8;
  }

  &__actions {
    @apply tw-self-end tw-ml-auto;

    @screen sm {
      @apply tw-self-center;
    }
  }
}
</style>
