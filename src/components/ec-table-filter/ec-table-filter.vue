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
        'tw-hidden': isFilterHidden(filter.name),
        'tw-w-full tw-mr-0': haveOnlyTextFilter,
        'tw-mr-8': !haveOnlyTextFilter,
      }"
      @change="onChange(filter.name, $event)"
    />
    <button
      v-if="hasFilters && !haveOnlyTextFilter"
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
import { useMediaQuery } from '@vueuse/core';
import { computed, watch } from 'vue';

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
  areFiltersHidden: {
    type: Boolean,
    default: () => undefined,
  },
  hiddenFiltersNames: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(['update:modelValue', 'change']);
const areFiltersHiddenThreshold = useMediaQuery('(max-width: 768px)');

const alwaysShownFilters = props.filters ? props.filters.filter(filter => (!props.hiddenFiltersNames.includes(filter.name))) : [];
const hasFilters = computed(() => !!Object.keys(props.modelValue).length);
const canHideFilters = computed(() => (props.areFiltersHidden || (props.areFiltersHidden === undefined && areFiltersHiddenThreshold.value)));
// eslint-disable-next-line no-underscore-dangle
const haveOnlyTextFilter = computed(() => (props.hiddenFiltersNames.length === props.filters.length - 1) && alwaysShownFilters[0].component.__name === 'ec-text-filter');

watch(() => canHideFilters.value, () => {
  clearFilters();
});

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

function isFilterHidden(filterName) {
  return canHideFilters.value && props.hiddenFiltersNames.includes(filterName);
}
</script>

<style>
.ec-table-filter {
  @apply tw-block;
  @apply tw-bg-gray-7;

  @screen sm {
    @apply tw-flex tw-flex-row tw-justify-start tw-flex-wrap tw-items-center;
    @apply tw-bg-gray-8;
    @apply tw-max-w-full;
  }

  &__filter-item {
    @apply tw-flex-nowrap;
  }

  &__less-filters-button {
    &--icon {
      @apply tw-flex-shrink-0;
      @apply tw-ml-4;
    }
  }

  &__clear-filters-button {
    @apply tw-self-start;
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
