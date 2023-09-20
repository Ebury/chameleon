<template>
  <div
    class="ec-multiple-values-selection"
    data-test="ec-multiple-values-selection"
  >
    <div
      v-if="isSearchable"
      class="ec-multiple-values-selection__search-area"
    >
      <ec-icon
        class="ec-multiple-values-selection__search-icon"
        data-test="ec-multiple-values-selection__search-icon"
        name="simple-search"
        type="interactive"
        :size="20"
      />
      <input
        ref="searchInputRef"
        v-model.trim="searchModel"
        type="text"
        autocomplete="off"
        :placeholder="searchFilterPlaceholder"
        class="ec-multiple-values-selection__search-input"
        data-test="ec-multiple-values-selection__search-input"
      >
    </div>

    <div
      v-if="isLoading"
      class="ec-multiple-values-selection__loading"
    >
      <ec-loading-icon :size="32" />
    </div>
    <div
      v-else-if="emptyMessage"
      class="ec-multiple-values-selection__no-results-wrapper"
    >
      <ec-icon
        v-if="emptyIcon"
        class="ec-multiple-values-selection__no-results-icon"
        data-test="ec-multiple-values-selection__no-results-icon"
        :name="emptyIcon"
        type="info"
        :size="32"
      />
      <span class="ec-multiple-values-selection__no-results-message">{{ emptyMessage }}</span>
    </div>
    <div
      v-else-if="errorMessage"
      class="ec-multiple-values-selection__error-wrapper"
    >
      <ec-icon
        v-if="errorIcon"
        class="ec-multiple-values-selection__error-icon"
        data-test="ec-multiple-values-selection__error-icon"
        :name="errorIcon"
        type="error"
        :size="32"
      />
      <span class="ec-multiple-values-selection__error-message">{{ errorMessage }}</span>
    </div>
    <template v-else>
      <div
        v-if="isSelectAll"
        class="ec-multiple-values-selection__select-all"
      >
        <ec-checkbox
          :model-value="allFiltersAreSelected"
          :indeterminate="atLeastOneFilterIsSelected"
          :label="selectAllFiltersText"
          is-single-line
          data-test="ec-multiple-values-selection__select-all"
          @change="toggleAll()"
        />
      </div>
      <div class="ec-multiple-values-selection__values">
        <ul>
          <li
            v-for="(item, index) in items"
            :key="item.value"
            class="ec-multiple-values-selection__value-wrapper"
            :data-test="`ec-multiple-values-selection__value-wrapper ec-multiple-values-selection__value-wrapper--${ isItemChecked(item) ? 'selected' : 'not-selected' }`"
          >
            <ec-checkbox
              class="ec-multiple-values-selection__checkbox"
              :data-test="`ec-multiple-values-selection__checkbox-${ isItemChecked(item) ? 'deselect' : 'select' } ec-multiple-values-selection__checkbox-${ isItemChecked(item) ? 'deselect' : 'select' }-${index}`"
              :is-single-line="true"
              :label="item.text"
              :model-value="isItemChecked(item)"
              @update:model-value="isItemChecked(item) ? onDeselect(item) : onSelect(item)"
            >
              <template #label>
                <div
                  class="ec-multiple-values-selection__label-wrapper"
                >
                  <ec-icon
                    v-if="item.icon"
                    class="ec-multiple-values-selection__icon"
                    :class="{ 'ec-multiple-values-selection__icon--rounded': hasRoundedIcons }"
                    :name="item.icon.name"
                    :type="item.icon.type"
                    :size="20"
                  />
                  <span class="ec-multiple-values-selection__label-text">{{ item.text }}</span>
                </div>
              </template>
            </ec-checkbox>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue';

import EcCheckbox from '../ec-checkbox';
import EcIcon from '../ec-icon';
import EcLoadingIcon from '../ec-loading-icon';

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => ([]),
  },
  modelValue: {
    type: Array,
    required: false,
    default: () => ([]),
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    type: String,
  },
  errorIcon: {
    type: String,
    default: 'simple-error',
  },
  emptyMessage: {
    type: String,
  },
  emptyIcon: {
    type: String,
    default: 'simple-error',
  },
  isSearchable: {
    type: Boolean,
  },
  isSelectAll: {
    type: Boolean,
    default: false,
  },
  selectAllFiltersText: {
    type: String,
    default: 'Select all',
  },
  searchFilterPlaceholder: {
    type: String,
    default: 'Search...',
  },
  hasRoundedIcons: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'search', 'change']);

// search
const searchQuery = ref('');
const searchModel = computed({
  get() {
    return searchQuery.value;
  },
  set(value) {
    searchQuery.value = value;
    emit('search', value);
  },
});

const searchInputRef = ref(null);
function focus() {
  if (props.isSearchable) {
    nextTick(() => {
      searchInputRef?.value.focus();
    });
  }
}
defineExpose({ focus });

// items
const selectedValues = computed(() => new Set(props.modelValue.map(item => item.value)));
const allFiltersAreSelected = computed(() => props.modelValue.length === props.items.length);
const atLeastOneFilterIsSelected = computed(() => !allFiltersAreSelected.value && selectedValues.value.size > 0);

function update(items) {
  emit('update:modelValue', items);
  emit('change', items);
}
function toggleAll() {
  if (allFiltersAreSelected.value) {
    update([]);
  } else {
    update(props.items);
  }
}
function onSelect(item) {
  const newItems = [...props.modelValue, item];
  update(newItems);
}
function onDeselect(item) {
  const newItems = props.modelValue.filter(selectedItem => selectedItem.value !== item.value);
  update(newItems);
}
function isItemChecked(item) {
  return selectedValues.value.has(item.value);
}

</script>

<style>
@import '../../styles/tools/scrollbars';

:root,
:host {
  --ec-multiple-values-popover-selector-height: 368px;
}

.ec-multiple-values-selection {
  @apply tw-flex tw-flex-col tw-min-h-full;

  &__search-area {
    @apply tw-py-8 tw-px-24;
    @apply tw-flex tw-flex-row tw-items-center;
    @apply tw-text-gray-3;
  }

  &__search-icon {
    @apply tw-fill-current;
    @apply tw-flex-shrink-0;
    @apply tw-mr-8;
  }

  &__search-input {
    @apply tw-body-text;
    @apply tw-outline-none;
    @apply tw-border-0;
    @apply tw-flex-grow;
  }

  &__search-area,
  &__select-all {
    @apply tw-flex-shrink-0;
    @apply tw-border-solid tw-border-b tw-border-gray-6;
  }

  &__select-all {
    @apply tw-py-8 tw-px-16;
  }

  &__values {
    max-height: var(--ec-multiple-values-popover-selector-height);

    @apply tw-overflow-y-auto;

    @mixin small-scrollbar;
  }

  &__value-wrapper {
    @apply tw-py-8 tw-px-16;
    @apply tw-list-none;
    @apply tw-transition-colors tw-duration-200 tw-ease-out;

    &:hover {
      @apply tw-bg-gray-7;
    }
  }

  &__label-wrapper {
    @apply tw-flex;
    @apply tw-items-center;

    &:hover {
      @apply tw-cursor-pointer;
    }
  }

  &__icon {
    @apply tw-mr-8;
    @apply tw-flex-shrink-0;

    &--rounded {
      @apply tw-rounded-1/2;
    }
  }

  &__label-text {
    @apply tw-m-0;
    @apply tw-inline;
    @apply tw-text-gray-3;
    @apply tw-truncate;
  }

  &__loading,
  &__error-wrapper,
  &__no-results-wrapper {
    @apply tw-flex tw-items-center tw-justify-center tw-flex-col tw-flex-1;
    @apply tw-my-16 tw-mx-16;
    @apply tw-text-center;
  }

  &__loading {
    @apply tw-py-32;
  }

  &__error-icon,
  &__no-results-icon {
    @apply tw-mb-16;
  }

  &__error-message,
  &__no-results-message {
    @apply tw-small-text;
  }

  &__error-message {
    @apply tw-text-error;
  }
}
</style>
