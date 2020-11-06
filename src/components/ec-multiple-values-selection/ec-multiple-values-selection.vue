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
        :size="21"
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
          :size="28"
        />
        <p class="ec-multiple-values-selection__no-results-message">{{ noResults }}</p> <!-- mention in the pr that this is dynamic for erro message and empty state -->
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
            @change="toggleAll"
          />
        </div>
        <!-- TODO ONL-4911 the above is the select all checkbox option - visible only if canSelectAll is set to true-->
        <!-- double check the intermidiate state with the team -->

        <li
          v-for="item in selectedItems"
          :key="item.value"
          class="ec-multiple-values-selection__checkbox-wrapper"
        >
          <ec-checkbox
            checked
            class="ec-multiple-values-selection__checkbox"
            @checked-value-change="onDeselect(item)"
          >
            <template #label>
              <div
                class="ec-multiple-values-selection__checkbox--label-wrapper"
              >
                <ec-icon
                  v-if="item.icon"
                  class="ec-multiple-values-selection__checkbox--icon"
                  :name="item.icon.name"
                  :type="item.icon.type"
                  :size="21"
                />
                <p class="ec-multiple-values-selection__checkbox--label-text">{{ item.text }}</p>
              </div>
            </template>
          </ec-checkbox>
        </li>

        <li
          v-for="item in notSelectedItems"
          :key="item.value"
          class="ec-multiple-values-selection__checkbox-wrapper"
        >
          <ec-checkbox
            class="ec-multiple-values-selection__checkbox"
            @checked-value-change="onSelect(item)"
          >
            <template #label>
              <div
                class="ec-multiple-values-selection__checkbox--label-wrapper"
              >
                <ec-icon
                  v-if="item.icon"
                  class="ec-multiple-values-selection__checkbox--icon"
                  :name="item.icon.name"
                  :type="item.icon.type"
                  :size="21"
                />
                <p class="ec-multiple-values-selection__checkbox--label-text">{{ item.text }}</p>
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
      requied: true,
      default: () => ([]),
    },
    value: {
      type: Array,
      requied: false,
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
    allItemsAreSelected() {
      return this.notSelectedItems.length === 0;
    },
    noResults() {
      let hasResults = false;
      if (this.error) {
        const { message } = this.error;
        hasResults = message;
      } else if (this.emptyMessage) {
        hasResults = this.emptyMessage;
      }
      return hasResults;
    },
  },
  methods: {
    toggleAll() {
      if (this.allItemsAreSelected) {
        this.$emit('change', []);
      } else {
        this.$emit('change', this.items);
      }
    },
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
/* TODO Maroua il mouse hover for each option */
.ec-multiple-values-selection {
  &__select-all {
    @apply tw-py-8 tw-pl-16;
    @apply tw-border-solid tw-border-b-2 tw-border-gray-6;

    &--label {
      @apply tw-flex;
      @apply tw-inline;
    }
  }

  &__checkbox-wrapper {
    @apply tw-list-none;

    :hover {
      @apply tw-bg-gray-7;
      @apply tw-cursor-pointer;
    }
  }

  &__checkbox {
    @apply tw-py-8 tw-px-16;
    @apply tw-transition-colors tw-duration-150 tw-ease-out;

    &--label-wrapper {
      @apply tw-flex;
      @apply tw-items-center;
    }

    &--icon {
      @apply tw-mr-8;
    }

    &--label-text {
      @apply tw-m-0;
      @apply tw-inline;
      @apply tw-text-gray-3;
    }
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
