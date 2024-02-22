<template>
  <section
    v-bind="$attrs"
    class="ec-table-filter"
    :class="{
      'ec-table-filter--has-full-width-filter': hasFullWidthFilter,
      'ec-table-filter--has-stretch-filter': hasStretchFilter,
    }"
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
        isHidden: null,
        isFullWidth: null,
        stretch: null,
      }"
      :key="filter.name"
      :data-test="`ec-table-filter__filter-item ec-table-filter__filter-item-${index}`"
      class="ec-table-filter__filter-item"
      :class="{
        'ec-table-filter__filter-item--is-hidden': filter.isHidden,
        'ec-table-filter__filter-item--is-full-width': filter.isFullWidth,
        'ec-table-filter__filter-item--is-not-full-width': !filter.isFullWidth,
        'ec-table-filter__filter-item--is-stretched': filter.stretch,
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

<script setup lang="ts">
import { computed } from 'vue';

import type { TableFilterProps } from './types';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<TableFilterProps>(), {
  modelValue: () => ({}),
  filters: () => [],
  lessFiltersButtonText: 'Less filters',
  moreFiltersButtonText: 'More filters',
  clearFiltersButtonText: 'Clear filters',
});

const emit = defineEmits<{
  'update:modelValue': [filter: Record<string, unknown>],
  'change': [filter: Record<string, unknown>],
}>();

const hasFilters = computed(() => !!Object.keys(props.modelValue).length);

const hasFullWidthFilter = computed(() => Object.values(props.filters).some(filter => filter.isFullWidth));
const stretchLayoutColumns = computed(() => (props.filters ? `repeat(${Object.values(props.filters).length - 1}, auto) 1fr auto` : ''));

function update(filters: Record<string, unknown>) {
  emit('update:modelValue', filters);
  emit('change', filters);
}

function onChange(filterName: string, value: unknown) {
  if (!value || (Array.isArray(value) && value.length === 0)) {
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
  @apply tw-grid;
  @apply tw-bg-gray-7;
  @apply tw-w-full;

  @screen sm {
    @apply tw-grid-rows-1 tw-grid-flow-col tw-auto-cols-max tw-items-center;
    @apply tw-bg-gray-8;
    @apply tw-max-w-full;
  }

  &--has-full-width-filter {
    @apply tw-auto-cols-auto;
  }

  &--has-stretch-filter {
    @apply tw-grid-flow-row;

    /* stylelint-disable */
    grid-template-columns: v-bind(stretchLayoutColumns);
    /* stylelint-enable */

    @screen md {
      @apply tw-grid-rows-2;
      @apply tw-gap-y-16;
    }

    @media (min-width: 850px) {
      @apply tw-grid-rows-1;
    }
  }

  &__filter-item {
    &--is-hidden {
      @apply tw-hidden;
    }

    &--is-full-width {
      @apply tw-w-full tw-mr-0;
    }

    &--is-not-full-width {
      @apply tw-mr-8;
    }

    &--is-stretched {
      @apply tw-col-start-1 tw-col-end-[-2];

      @media (min-width: 850px) {
        @apply tw-col-auto;
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
      @apply tw-text-key-3;
    }
  }
}
</style>
