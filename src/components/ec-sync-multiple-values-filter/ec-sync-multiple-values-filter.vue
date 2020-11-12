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
          v-model="selectedFilters"
          :items="items"
          :is-searchable="false"
          :is-select-all="isSelectAll"
          :select-all-filters-text="selectAllFiltersText"
        />
      </template>
    </ec-filter-popover>
  </div>
</template>
<script>
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
    isSelectAll: {
      type: Boolean,
      required: false,
      default: false,
    }, // TODO ONL-4911
    selectAllFiltersText: {
      type: String,
      required: true,
      default: '',
    }, // TODO ONL-4911
    popoverOptions: {
      type: Object,
    },
  },
  computed: {
    numberOfSelectedFilters() {
      return this.selectedFilters.length;
    },
    selectedFilters: {
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
