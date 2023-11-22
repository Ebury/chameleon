<template>
  <section
    v-bind="$attrs"
    class="ec-table-filter"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-table-filter` : 'ec-table-filter'"
  >
    <component
      :is="filter.component"
      v-for="(filter, index) in filters"
      :ref="filter.isFillingRemainingSpace ? 'fullWidthFilter' : ''"
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
        'tw-hidden': filter.isHidden,
        'tw-w-full tw-mr-0': filter.isFullWidth,
        'tw-mr-8': !filter.isFullWidth,
        'tw-grow': filter.isFillingRemainingSpace,
        'tw-min-w-full': filter.isFillingRemainingSpace && isSearchBelowFilters,
      }"
      @change="onChange(filter.name, $event)"
      @change:width="onWidthChange"
    />
    <button
      ref="clearFiltersButton"
      v-if="!isComponentMounted || (hasFilters && !isClearFiltersButtonHidden)"
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
import { computed, onMounted, ref } from 'vue';

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

// In order to get the button width we need to render the button, so we are
// going to use this flag to render it while the component is not mounted.
// By doing that users won't be able to notice it
const isComponentMounted = ref(false);

const clearFiltersButton = ref(null);
const clearFiltersButtonWidth = ref(0);
const searchAndClearFiltersButtonMinWidth = computed(() => 200 + clearFiltersButtonWidth.value);
const isSearchBelowFilters = ref(false);
const searchMaxSizeWhenBelowFilters = ref(0);

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

function onWidthChange(width) {

  if (!searchMaxSizeWhenBelowFilters.value) {
    if (width < searchAndClearFiltersButtonMinWidth.value) {
      isSearchBelowFilters.value = true;
      searchMaxSizeWhenBelowFilters.value = width;
    } else {
      isSearchBelowFilters.value = false;
    }
  }
}

function clearFilters() {
  update({});
}

onMounted(() => {
  clearFiltersButtonWidth.value = clearFiltersButton.value.clientWidth;
  isComponentMounted.value = true;
});
</script>

<style>
.ec-table-filter {
  @apply tw-flex;
  @apply tw-bg-gray-7;
  @apply tw-w-full;

  @screen sm {
    @apply tw-flex tw-flex-row tw-justify-start tw-flex-nowrap tw-items-center;
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
