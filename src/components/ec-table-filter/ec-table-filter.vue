<template>
  <section
    v-bind="$attrs"
    class="ec-table-filter"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-table-filter` : 'ec-table-filter'"
  >
    <component
      :is="filter.component"
      v-for="(filter, index) in filters"
      v-bind="{
        ...filter,
        modelValue: modelValue[filter.name],
        name: null,
        component: null,
      }"
      :key="filter.name"
      :data-test="`ec-table-filter__filter-item ec-table-filter__filter-item-${index}`"
      class="ec-table-filter__filter-item"
      :class="{
        'ec-table-filter__filter-item--is-hidden': filter.isHidden,
        'ec-table-filter__filter-item--is-full-width': filter.isFullWidth,
        'ec-table-filter__filter-item--is-not-full-width': !filter.isFullWidth,
        'ec-table-filter__filter-item--is-filling-remaining-space': filter.isFillingRemainingSpace,
      }"
      @change="onChange(filter.name, $event)"
    />
    <button
      v-if="hasFilters && !isClearFiltersButtonHidden"
      type="button"
      data-test="ec-table-filter__clear-filters-button"
      class="ec-table-filter__clear-filters-button"
      @click="clearFilters()"
    >
      {{ clearFiltersButtonText }}
    </button>
  </section>
</template>

<script setup>
import { computed } from 'vue';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  filters: {
    type: Array,
    required: true,
  },
  lessFiltersButtonText: {
    type: String,
    default: 'Less filters',
  },
  moreFiltersButtonText: {
    type: String,
    default: 'More filters',
  },
  clearFiltersButtonText: {
    type: String,
    default: 'Clear filters',
  },
  isClearFiltersButtonHidden: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'change']);

const hasFilters = computed(() => !!Object.keys(props.modelValue).length);

function update(filters) {
  emit('update:modelValue', filters);
  emit('change', filters);
}

function onChange(filterName, value) {
  if (!value || value.length === 0) {
    const { [filterName]: currentValue, ...otherFilters } = props.modelValue;

    update(otherFilters);
  } else {
    update({ ...props.modelValue, [filterName]: value });
  }
}

function clearFilters() {
  update({});
}
</script>

<style>
.ec-table-filter {
  @apply tw-flex;
  @apply tw-bg-gray-7;
  @apply tw-w-full;

  @screen sm {
    @apply tw-flex tw-flex-row tw-justify-start tw-flex-wrap tw-items-center;
    @apply tw-bg-gray-8;
    @apply tw-max-w-full;
  }

  &__filter-item {
    @apply tw-flex-nowrap;

    &--is-hidden {
      @apply tw-hidden;
    }

    &--is-full-width {
      @apply tw-w-full tw-mr-0;
    }

    &--is-not-full-width {
      @apply tw-mr-8;
    }

    &--is-filling-remaining-space {
      @apply tw-grow tw-basis-1/2;
      @media (min-width: 800px) {
        @apply tw-basis-0;
      }
    }
  }

  &__less-filters-button {
    &--icon {
      @apply tw-flex-shrink-0;
      @apply tw-ml-4;
    }
  }

  &__clear-filters-button {
    @apply tw-self-start;
    @apply tw-whitespace-nowrap;
  }

  &__clear-filters-button,
  &__less-filters-button {
    @apply tw-flex tw-self-center tw-flex-nowrap;
    @apply tw-text-key-4;
    @apply tw-border-none;
    @apply tw-bg-transparent;
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
