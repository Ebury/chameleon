<template>
  <div
    class="ec-sync-multiple-values-filter"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-sync-multiple-values-filter` : 'ec-sync-multiple-values-filter'"
  >
    <ec-filter-popover
      :popover-options="popoverOptions"
      :label="label"
      :number-of-selected-filters="numberOfSelectedFilters"
      :is-full-height="isFullHeight"
      data-test="ec-sync-multiple-values-filter__trigger"
      @after-open="onPopoverOpened"
    >
      <template #filter>
        <ec-multiple-values-selection
          ref="multipleValuesSelection"
          v-model="selectedFilters"
          :items="filteredItems"
          :is-loading="isLoading"
          :empty-message="emptyMessageText"
          :error-message="errorMessage"
          :is-searchable="isSearchable"
          :is-select-all="isSelectAll"
          :select-all-filters-text="selectAllFiltersText"
          :search-filter-placeholder="searchFilterPlaceholder"
          @search="onSearch"
        />
      </template>
    </ec-filter-popover>
  </div>
</template>
<script>
import { removeDiacritics } from '../../utils/diacritics';
import EcFilterPopover from '../ec-filter-popover';
import EcMultipleValuesSelection from '../ec-multiple-values-selection';

export default {
  name: 'EcSyncMultipleValuesFilter',
  components: { EcFilterPopover, EcMultipleValuesSelection },
  props: {
    label: {
      type: String,
      required: true,
      default: '',
    },
    modelValue: {
      type: Array,
      required: false,
      default: () => ([]),
    },
    items: {
      type: Array,
      required: true,
      default: () => ([]),
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    errorMessage: {
      type: String,
    },
    emptyMessage: {
      type: String,
      default: 'No results found',
    },
    isSelectAll: {
      type: Boolean,
      default: false,
    },
    isSearchable: {
      type: Boolean,
      default: false,
    },
    selectAllFiltersText: {
      type: String,
      default: 'Select all',
    },
    popoverOptions: {
      type: Object,
    },
    searchFilterPlaceholder: {
      type: String,
      default: 'Search...',
    },
    isFullHeight: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue', 'change'],
  data() {
    return {
      query: '',
    };
  },
  computed: {
    numberOfSelectedFilters() {
      return this.selectedFilters.length;
    },
    selectedFilters: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
        this.$emit('change', value);
      },
    },
    filteredItems() {
      if (!this.isSearchable) {
        return this.items;
      }

      const filterText = removeDiacritics(this.query.toLowerCase());
      if (!filterText) {
        return this.items;
      }

      return this.items.filter((item) => {
        const itemText = removeDiacritics(item.text.trim().toLowerCase());
        return itemText.includes(filterText);
      });
    },
    emptyMessageText() {
      return this.filteredItems.length ? null : this.emptyMessage;
    },
  },
  methods: {
    onSearch(query) {
      this.query = query;
    },
    onPopoverOpened() {
      this.$refs.multipleValuesSelection.focus();
    },
  },
};
</script>
