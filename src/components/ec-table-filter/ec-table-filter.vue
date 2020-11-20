<template>
  <section
    class="ec-table-filter"
    data-test="ec-table-filter"
  >
    <component
      :is="filter.component"
      v-for="(filter, index) in filters"
      :key="index"
      :value="value[filter.name]"
      v-bind="filter"
      :label="filter.label"
      :data-test="`ec-table-filter__filter-item-${index}`"
      class="ec-table-filter__filter-item"
      @change="onChange(filter.name, $event)"
    />
    <!-- TODO ONL-4893
    <button
      type="button"
      data-test="ec-table-filter__less-filters-button"
      class="ec-table-filter__less-filters-button"
      @click="handleLessFilterClick()"
    >
      {{ setLessFiltersButtonText }}
      <ec-icon
        class="ec-table-filter__less-filters-button--icon"
        :size="16"
        :name="setLessFiltersButtonIcon"
        type="interactive"
      />
    </button>
    -->
    <button
      v-if="hasFilters"
      type="button"
      data-test="ec-table-filter__clear-filters-button"
      class="ec-table-filter__clear-filters-button"
      @click="clearFilters()"
    >
      {{ clearFiltersButtonText }}
    </button>
  </section>
</template>
<script>
import EcIcon from '../ec-icon';

export default {
  name: 'EcTableFilter',
  components: { EcIcon },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
      required: false,
    },
    filters: {
      type: Array,
      required: true,
      default: () => ([]),
    },
    lessFiltersButtonText: {
      type: Array,
      required: false,
      default: () => (['Less filters', 'More filters']),
    },
    clearFiltersButtonText: {
      type: String,
      required: false,
      default: 'Clear filters',
    },
    popoverOptions: {
      type: Object,
    },
  },
  data() {
    return {
      isLessFilterActive: true,
    };
  },
  computed: {
    hasFilters() {
      return !!Object.keys(this.value).length;
    },
    // TODO ONL-4893
    // setLessFiltersButtonIcon() {
    //   return this.isLessFilterActive ? 'simple-chevron-down' : 'simple-chevron-up';
    // },
    // setLessFiltersButtonText() {
    //   return this.isLessFilterActive ? this.lessFiltersButtonText[1] : this.lessFiltersButtonText[0];
    // },
  },
  methods: {
    // TODO ONL-4893
    // handleLessFilterClick() {
    //   this.isLessFilterActive = !this.isLessFilterActive;
    // },
    onChange(filterName, value) {
      if (!value || value.length === 0) {
        const { [filterName]: currentValue, ...otherFilters } = this.value;

        this.$emit('change', otherFilters);
      } else {
        this.$emit('change', { ...this.value, [filterName]: value });
      }
    },
    clearFilters() {
      this.$emit('change', {});
    },
  },
};

</script>

<style>
.ec-table-filter {
  @apply tw-block;
  @apply tw-bg-gray-7;

  @media screen and (min-width: theme('screens.sm')) {
    @apply tw-flex tw-flex-row tw-justify-start tw-flex-wrap tw-items-center;
    @apply tw-bg-gray-8;
    @apply tw-max-w-full;
  }

  &__filter-item {
    @apply tw-flex-no-wrap;
    @apply tw-mb-4;
  }

  &__less-filters-button {
    &--icon {
      @apply tw-flex-shrink-0;
      @apply tw-ml-4;
    }
  }

  &__clear-filters-button {
    @apply tw-self-start;

    @media screen and (min-width: theme('screens.lg')) {
      @apply tw-self-center;
    }
  }

  &__clear-filters-button,
  &__less-filters-button {
    @apply tw-flex tw-items-center tw-flex-no-wrap;
    @apply tw-text-key-4;
    @apply tw-border-none;
    @apply tw-bg-transparent;
    @apply tw-p-8;
    @apply tw-small-text;

    &:hover {
      @apply tw-cursor-pointer;
    }

    &:focus {
      @apply tw-outline-none;
    }
  }
}
</style>
