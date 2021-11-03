<template>
  <div
    class="ec-smart-table-error"
    data-test="ec-smart-table-error"
  >
    <ec-smart-table-heading :title="title">
      <template
        slot="filter"
        v-if="hasFilterSlot()"
      >
        <slot name="filter" />
      </template>
      <template
        slot="actions"
        v-if="hasActionsSlot()"
      >
        <slot
          name="header-actions"
          v-bind="{ total: 0, items: [], error: errorMessage, loading: false }"
        />
      </template>
    </ec-smart-table-heading>
    <slot
      name="error"
      v-bind="{ errorMessage }"
    >{{ errorMessage }}</slot>
  </div>
</template>

<script>
import EcSmartTableHeading from '../ec-smart-table-heading';

export default {
  name: 'EcSmartTableError',
  components: { EcSmartTableHeading },
  props: {
    title: String,
    errorMessage: {
      type: String,
      default: 'Unexpected error while fetching data',
    },
  },
  methods: {
    hasFilterSlot() {
      return !!this.$scopedSlots.filter;
    },
    hasActionsSlot() {
      return !!this.$scopedSlots['header-actions'];
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
