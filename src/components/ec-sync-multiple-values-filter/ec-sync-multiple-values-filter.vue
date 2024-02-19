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
          :has-rounded-icons="hasRoundedIcons"
          @search="onSearch"
        />
      </template>
    </ec-filter-popover>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import { removeDiacritics } from '../../utils/diacritics';
import EcFilterPopover from '../ec-filter-popover';
import EcMultipleValuesSelection from '../ec-multiple-values-selection';
import type { MultipleValuesSelectionItem } from '../ec-multiple-values-selection/types';
import type { SyncMultipleValuesFilterProps } from './types';

const props = withDefaults(defineProps<SyncMultipleValuesFilterProps>(), {
  label: '',
  modelValue: () => [],
  items: () => [],
  emptyMessage: 'No results found',
  selectAllFiltersText: 'Select all',
  searchFilterPlaceholder: 'Search...',
});

const emit = defineEmits<{
  'update:modelValue': [items: MultipleValuesSelectionItem[]],
  'change': [items: MultipleValuesSelectionItem[]],
}>();

// item(s) selection
const selectedFilters = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
    emit('change', value);
  },
});
const numberOfSelectedFilters = computed(() => selectedFilters.value.length);

// items filtering based on search query
const searchQuery = ref('');
function onSearch(newQuery: string) {
  searchQuery.value = newQuery;
}

const filteredItems = computed(() => {
  if (!props.isSearchable) {
    return props.items;
  }

  const filterText = removeDiacritics(searchQuery.value.toLowerCase());
  if (!filterText) {
    return props.items;
  }

  return props.items.filter((item) => {
    const itemText = removeDiacritics(item.text.trim().toLowerCase());
    return itemText.includes(filterText);
  });
});

const emptyMessageText = computed(() => (filteredItems.value.length ? undefined : props.emptyMessage));

// focus when opened
const multipleValuesSelection = ref<InstanceType<typeof EcMultipleValuesSelection>>();
function onPopoverOpened() {
  multipleValuesSelection.value?.focus();
}
</script>
