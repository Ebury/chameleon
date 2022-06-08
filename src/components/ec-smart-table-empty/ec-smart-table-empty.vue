<template>
  <div
    class="ec-smart-table-empty"
    data-test="ec-smart-table-empty"
  >
    <ec-smart-table-heading :title="title">
      <template
        #filter
        v-if="hasFilterSlot()"
      >
        <slot name="filter" />
      </template>
      <template
        #actions
        v-if="hasActionsSlot()"
      >
        <slot
          name="header-actions"
          v-bind="{ total: 0, items: [], error: null, loading: false }"
        />
      </template>
    </ec-smart-table-heading>
    <slot
      name="empty"
      v-bind="{ emptyMessage }"
    >{{ emptyMessage }}</slot>
  </div>
</template>

<script>
import EcSmartTableHeading from '../ec-smart-table-heading';

export default {
  name: 'EcSmartTableEmpty',
  components: { EcSmartTableHeading },
  props: {
    title: String,
    emptyMessage: {
      type: String,
      default: 'No items found',
    },
  },
  methods: {
    hasFilterSlot() {
      return !!this.$slots.filter;
    },
    hasActionsSlot() {
      return !!this.$slots['header-actions'];
    },
  },
};
</script>
