<template>
  <div
    class="ec-multiple-values-selection"
    data-test="ec-multiple-values-selection"
  >
    <div
      v-if="isSearchable"
    >
      <ec-icon
        class="ec-multiple-values-selection__search-icon"
        data-test="ec-multiple-values-selection__search-icon"
        name="simple-search"
        type="interactive"
        :size="16"
      />
      <ec-input-field
        v-model="query"
        :placeholder="searchFilterPlaceholder"
        class="ec-multiple-values-selection__search-field"
        data-test="ec-multiple-values-selection__search-field"
        @change="$emit('search', query)"
      />
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
    <div v-else>
      <div
        v-if="isSelectAll"
        class="ec-multiple-values-selection__select-all"
      >
        <ec-checkbox
          :checked="allFiltersAreSelected"
          :label="selectAllFiltersText"
          is-single-line
          data-test="ec-multiple-values-selection__select-all"
          @change="toggleAll()"
        />
      </div>
      <li
        v-for="(item, index) in selectedFilters"
        :key="item.value"
        class="ec-multiple-values-selection__value-wrapper"
        data-test="ec-multiple-values-selection__value-wrapper ec-multiple-values-selection__value-wrapper--selected"
      >
        <ec-checkbox
          checked
          class="ec-multiple-values-selection__checkbox"
          :data-test="`ec-multiple-values-selection__checkbox-deselect ec-multiple-values-selection__checkbox-deselect-${index}`"
          :is-single-line="true"
          :label="item.text"
          @checked-value-change="onDeselect(item)"
        >
          <template #label>
            <div
              class="ec-multiple-values-selection__label-wrapper"
            >
              <ec-icon
                v-if="item.icon"
                class="ec-multiple-values-selection__icon"
                :name="item.icon.name"
                :type="item.icon.type"
                :size="24"
              />
              <span class="ec-multiple-values-selection__label-text">{{ item.text }}</span>
            </div>
          </template>
        </ec-checkbox>
      </li>

      <li
        v-for="(item, index) in unselectedFilters"
        :key="item.value"
        class="ec-multiple-values-selection__value-wrapper"
        data-test="ec-multiple-values-selection__value-wrapper ec-multiple-values-selection__value-wrapper--not-selected"
      >
        <ec-checkbox
          class="ec-multiple-values-selection__checkbox"
          :data-test="`ec-multiple-values-selection__checkbox-select ec-multiple-values-selection__checkbox-select-${index}`"
          :is-single-line="true"
          :label="item.text"
          @checked-value-change="onSelect(item)"
        >
          <template #label>
            <div
              class="ec-multiple-values-selection__label-wrapper"
            >
              <ec-icon
                v-if="item.icon"
                class="ec-multiple-values-selection__icon"
                :name="item.icon.name"
                :type="item.icon.type"
                :size="24"
              />
              <span class="ec-multiple-values-selection__label-text">{{ item.text }}</span>
            </div>
          </template>
        </ec-checkbox>
      </li>
    </div>
  </div>
</template>
<script>
// TODO ONL-4912 !!!don't forget to debounce search!!!
import EcCheckbox from '../ec-checkbox';
import EcIcon from '../ec-icon';
import EcInputField from '../ec-input-field';
import EcLoadingIcon from '../ec-loading-icon';

export default {
  name: 'EcMultipleValuesSelection',
  components: {
    EcCheckbox, EcIcon, EcInputField, EcLoadingIcon,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => ([]),
    },
    value: {
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
    }, // TODO with https://fxsolutions.atlassian.net/browse/ONL-4912
    isSelectAll: {
      type: Boolean,
      default: false,
    }, // TODO ONL-4911
    selectAllFiltersText: {
      type: String,
      default: '',
    }, // TODO ONL-4911
    searchFilterPlaceholder: {
      type: String,
    },
  },
  data() {
    return {
      query: '',
    };
  },
  computed: {
    selectedFilters() {
      return this.value;
    },
    unselectedFilters() {
      const itemsSet = new Set(this.selectedFilters.map(item => item.value));
      return this.items.filter(item => !itemsSet.has(item.value));
    },
    // TODO ONL-4911
    allFiltersAreSelected() {
      return this.unselectedFilters.length === 0;
    },
  },
  methods: {
    toggleAll() {
      if (this.allFiltersAreSelected) {
        this.$emit('change', []);
      } else {
        this.$emit('change', this.items);
      }
    },
    // TODO ONL-4911
    onSelect(item) {
      const newItems = [...this.selectedFilters, item];
      this.$emit('change', newItems);
    },
    onDeselect(item) {
      const newItems = this.selectedFilters.filter(selectedItem => selectedItem !== item);
      this.$emit('change', newItems);
    },
  },
};
</script>

<style>
.ec-multiple-values-selection {
  &__select-all {
    @apply tw-py-8 tw-px-16;
    @apply tw-border-solid tw-border-b-2 tw-border-gray-6;
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
    @apply tw-flex tw-items-center tw-justify-center tw-flex-col;
  }

  &__loading {
    @apply tw-mt-48;
  }

  &__error-icon,
  &__no-results-icon {
    @apply tw-my-16;
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
