<template>
  <div
    class="ec-sync-multiple-values-filter"
    data-test="ec-sync-multiple-values-filter"
  >

    <ec-filter-popover
      :popover-options="popoverOptions"
      :label="label"
      :number-of-selected-filters="numberOfSelectedFilters"
      data-test="ec-sync-multiple-values-filter__trigger"
    >
      <template #filter>
        <ec-multiple-values-selection
          v-model="selectedItems"
          :items="items"
          :is-searchable="false"
          :can-select-all="canSelectAll"
          :select-all-text="selectAllText"
        />
      </template>
    </ec-filter-popover>
    <!--  the async option with dataSource will be implemented with the ticket CONTROLLA IL TICKET NUMBER-->
  </div>
</template>
<script>
// non dimenticare di aggiungere il design di itzi con il empty state - si fara' quando implementeremo l'async mode
import EcMultipleValuesSelection from '../ec-multiple-values-selection';
import EcFilterPopover from '../ec-filter-popover';

export default {
  name: 'EcSyncMultipleValuesFilter',
  components: { EcFilterPopover, EcMultipleValuesSelection },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    label: {
      type: String,
      required: true,
      default: '',
    },
    value: {
      type: Array,
      required: false,
      default: () => ([]),
    },
    items: {
      type: Array,
      required: true,
      default: () => ([]),
    },
    canSelectAll: {
      type: Boolean,
      required: false,
      default: false,
    },
    selectAllText: {
      type: String,
      required: true,
      default: '',
    },
    popoverOptions: {
      type: Object,
    },
  },
  computed: {
    numberOfSelectedFilters() {
      return this.selectedItems.length;
    },
    selectedItems: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('change', value);
      },
    },
  },
};
</script>
