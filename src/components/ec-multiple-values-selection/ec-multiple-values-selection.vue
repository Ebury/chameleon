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
        :placeholder="searchPlaceholder"
        class="ec-multiple-values-selection__search-field"
        data-test="ec-multiple-values-selection__search-field"
        @change="$emit('search', query)"
      />
    </div>

    <!-- The above will be completed with TODO with https://fxsolutions.atlassian.net/browse/ONL-4912.
    Visible only if we pass dataSource and if isSearchable is set to true.
    With static items list it won't be available-->
    <ec-loading
      :show="loading"
    >
      <div
        v-if="noResults"
        class="ec-multiple-values-selection__no-results-wrapper"
      >
        <ec-icon
          class="ec-multiple-values-selection__no-results-icon"
          data-test="ec-multiple-values-selection__no-results-icon"
          :name="emptyIcon"
          type="info"
          :size="32"
        />
        <span class="ec-multiple-values-selection__no-results-message">{{ noResults }}</span> <!-- mention in the pr that this is dynamic for erro message and empty state -->
      </div>
      <div v-else>
        <div
          v-if="canSelectAll"
          class="ec-multiple-values-selection__select-all"
        >
          <ec-checkbox
            :checked="allItemsAreSelected"
            :label="selectAllText"
            data-test="ec-multiple-values-selection__select-all"
            class="ec-multiple-values-selection__select-all--checkbox"
            @change="toggleAll()"
          />
        </div>
        <!-- TODO ONL-4911 the above is the select all checkbox option - visible only if canSelectAll is set to true-->
        <!-- double check the intermidiate state with the team -->

        <li
          v-for="item in selectedItems"
          :key="item.value"
          class="ec-multiple-values-selection__value-wrapper"
          data-test="ec-multiple-values-selection__checkbox-deselect"
        >
          <ec-checkbox
            checked
            class="ec-multiple-values-selection__checkbox"
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
          v-for="item in notSelectedItems"
          :key="item.value"
          class="ec-multiple-values-selection__value-wrapper"
          data-test="ec-multiple-values-selection__value-wrapper"
        >
          <ec-checkbox
            class="ec-multiple-values-selection__checkbox"
            data-test="ec-multiple-values-selection__checkbox-select"
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
    </ec-loading>
  </div>
</template>
<script>
// TODO ONL-4912 !!!don't forget to debounce search!!!
import EcCheckbox from '../ec-checkbox';
import EcIcon from '../ec-icon';
import EcInputField from '../ec-input-field';
import EcLoading from '../ec-loading';

export default {
  name: 'EcMultipleValuesSelection',
  components: {
    EcCheckbox, EcIcon, EcInputField, EcLoading,
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
    loading: {
      type: Boolean,
    },
    error: {
      type: Error,
      required: false,
      default: null,
    },
    emptyMessage: {
      type: String,
    },
    emptyIcon: {
      type: String,
    },
    isSearchable: {
      type: Boolean,
    }, // TODO with https://fxsolutions.atlassian.net/browse/ONL-4912
    canSelectAll: {
      type: Boolean,
    },
    selectAllText: {
      type: String,
    },
    searchPlaceholder: {
      type: String,
    },
  },
  data() {
    return {
      query: '',
    };
  },
  computed: {
    selectedItems() {
      return this.value;
    },
    notSelectedItems() {
      const itemsSet = new Set(this.selectedItems.map(item => item.value));
      return this.items.filter(item => !itemsSet.has(item.value));
    },
    // TODO ONL-4911
    allItemsAreSelected() {
      return this.notSelectedItems.length === 0;
    },
    // noResults() {
    //   let hasResults = false;
    //   if (this.error) {
    //     const { message } = this.error;
    //     hasResults = message;
    //   } else if (this.emptyMessage) {
    //     hasResults = this.emptyMessage;
    //   }
    //   return hasResults;
    // },
  }, // TODO ONL-4919
  methods: {
    toggleAll() {
      if (this.allItemsAreSelected) {
        this.$emit('change', []);
      } else {
        this.$emit('change', this.items);
      }
    },
    // TODO ONL-4911
    onSelect(item) {
      const newItems = [...this.selectedItems, item];
      this.$emit('change', newItems);
    },
    onDeselect(item) {
      const newItems = this.selectedItems.filter(selectedItem => selectedItem !== item);
      this.$emit('change', newItems);
    },
  },
};
</script>

<style>
.ec-multiple-values-selection {
  &__select-all {
    @apply tw-py-8 tw-pl-16;
    @apply tw-border-solid tw-border-b-2 tw-border-gray-6;

    &--label {
      @apply tw-flex;
      @apply tw-inline;
    }
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
  }

  &__label-text {
    @apply tw-m-0;
    @apply tw-inline;
    @apply tw-text-gray-3;
  }

  &__no-results-wrapper {
    @apply tw-flex tw-items-center tw-justify-center tw-flex-col;
  }

  &__no-results-icon {
    @apply tw-mt-16;
  }

  &__no-results-message {
    @apply tw-small-text;
  }
}
</style>
