<template>
  <div
    ref="scrollContainer"
    class="ec-smart-table"
    :data-test="attrs['data-test'] ? `${attrs['data-test']} ec-smart-table` : 'ec-smart-table'"
  >
    <ec-smart-table-heading
      v-bind="{
        title,
        isResponsive,
      }"
    >
      <template
        #filter
        v-if="isFilteringEnabled"
      >
        <ec-table-filter
          v-model="filterModel"
          :filters="filters"
          :clear-filters-button-text="clearFiltersButtonText"
          :is-clear-filters-button-hidden="isClearFiltersButtonHidden"
          data-test="ec-smart-table__filter"
          @change="onFilterChanged"
        />
      </template>
      <template
        #actions
        v-if="hasSlot('header-actions')"
      >
        <slot
          name="header-actions"
          v-bind="{
            loading: isFetching,
            error,
            total: totalRecords,
            items: data,
          }"
        />
      </template>
    </ec-smart-table-heading>
    <template v-if="error">
      <slot
        name="error"
        v-bind="{ errorMessage }"
      >
        {{ errorMessage }}
      </slot>
    </template>
    <template v-else-if="isEmpty && !isFetching">
      <slot
        name="empty"
        v-bind="{ emptyMessage }"
      >
        {{ emptyMessage }}
      </slot>
    </template>
    <template v-else>
      <ec-loading
        :show="!isInfiniteScrollEnabled && isFetching"
        :transparent="!isEmpty"
        :class="{ 'tw-my-48 tw-min-h-48': /* c8 ignore next */ isEmpty && isFetching }"
      >
        <ec-table
          v-bind="{
            columns,
            data,
            totalRecords,
            maxHeight,
            stickyColumn,
            sorts,
            isCustomRowShown,
          }"
          v-on="{
            sort: sortBy,
            rowClick: attrs.onRowClick,
          }"
        >
          <template #default="{ row }" v-if="canShowCustomRow">
            <slot :row="row" />
          </template>
          <template
            #footer
            v-if="isPaginationEnabled"
          >
            <ec-table-pagination
              v-bind="{
                page,
                total: totalRecords,
                numberOfItems,
                itemsPerPageText,
                isPageSizeHidden,
                isTotalHidden,
                isResponsive,
              }"
              data-test="ec-smart-table-pagination"
              @change="paginate"
            >
              <template #total>
                <slot name="footer" />
              </template>
              <template #pages="slotProps">
                <slot
                  name="pages"
                  v-bind="slotProps"
                />
              </template>
            </ec-table-pagination>
          </template>
          <template
            #footer
            v-else-if="hasSlot('footer')"
          >
            <slot name="footer" />
          </template>
          <template
            v-for="(_, name) in getEcTableSlots()"
            #[name]="slotData"
          ><slot
            :name="name"
            v-bind="slotData"
          /></template>
        </ec-table>
        <div
          ref="intersectionTarget"
          v-if="isInfiniteScrollEnabled && canLoadMore"
          class="ec-smart-table__intersection-target"
        >
          <ec-icon
            :name="IconName.SimpleLoading"
            :size="32"
            class="ec-loading__icon"
            data-test="ec-loading__icon"
          />
        </div>
      </ec-loading>
    </template>
  </div>
</template>

<script setup>
import { useIntersectionObserver } from '@vueuse/core';
import {
  computed, ref, unref, useAttrs, useSlots, watch,
} from 'vue';

import useEcPagination from '../../composables/use-ec-pagination';
import useEcSorting from '../../composables/use-ec-sorting';
import { SortDirection } from '../../enums';
import * as SortDirectionCycle from '../../enums/sort-direction-cycle';
import EcIcon from '../ec-icon';
import { IconName } from '../ec-icon/types';
import EcLoading from '../ec-loading';
import EcSmartTableHeading from '../ec-smart-table-heading';
import EcTable from '../ec-table';
import EcTableFilter from '../ec-table-filter';
import EcTablePagination from '../ec-table-pagination';

const attrs = useAttrs();

const emit = defineEmits(['update:filter', 'fetch']);

const props = defineProps({
  ...EcTable.props,
  errorMessage: {
    type: String,
    default: 'Unexpected error while fetching data',
  },
  emptyMessage: {
    type: String,
    default: 'No items found',
  },
  clearFiltersButtonText: String,
  itemsPerPageText: String,
  pagination: Object,
  isPaginationEnabled: Boolean,
  filters: {
    type: Array,
    default: () => [],
  },
  filter: Object,
  isMultiSort: Boolean,
  sortCycle: {
    type: Array,
    default: () => SortDirectionCycle.LOWEST_FIRST,
    validator(directions) {
      return directions.every(direction => direction === SortDirection.ASC || direction === SortDirection.DESC);
    },
  },
  additionalPayload: Object,
  isFetching: Boolean,
  error: [Error, Object, String],
  isCustomRowShown: {
    type: Boolean,
    default: () => undefined,
  },
  isClearFiltersButtonHidden: {
    type: Boolean,
    default: false,
  },
  isPageSizeHidden: {
    type: Boolean,
    default: false,
  },
  isTotalHidden: {
    type: Boolean,
    default: false,
  },
  isResponsive: {
    type: Boolean,
    default: true,
  },
  isInfiniteScrollEnabled: {
    type: Boolean,
    default: false,
  },
});

// sorting
const { sorts, sortBy } = useEcSorting({
  initialSorts: props.sorts, isMultiSort: props.isMultiSort, sortCycle: props.sortCycle,
});

watch(() => props.sorts, () => {
  sorts.value = props.sorts;
});

// pagination
const { page, numberOfItems, paginate } = useEcPagination({
  initialPage: props.pagination?.page, initialNumberOfItems: props.pagination?.numberOfItems,
});

watch(() => props.pagination, () => paginate(props.pagination?.page, props.pagination?.numberOfItems));

// filtering
const isFilteringEnabled = computed(() => props.filters?.length > 0);
const filterModel = ref(unref(props.filter) ?? {});

watch(() => props.filter, () => {
  filterModel.value = unref(props.filter);
});

function onFilterChanged(filters) {
  paginate(1);
  emit('update:filter', filters);
}

// infinite scroll
const intersectionTarget = ref(null);

const canLoadMore = computed(() => props.data.length < props.totalRecords);

const { stop: stopIntersectionObserver } = useIntersectionObserver(
  intersectionTarget,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      onLoadMore();
    }
  },
);

watch(() => canLoadMore.value, () => {
  if (!canLoadMore.value) {
    stopIntersectionObserver();
  }
});

function onLoadMore() {
  console.log('fetch');
  emit('fetch', {
    page: props.pagination.page + 1,
    numberOfItems: props.pagination.numberOfItems,
    sorts: props.pagination.sorts,
  });
}

// fetching
const payload = computed(() => ({
  page: unref(page),
  numberOfItems: unref(numberOfItems),
  sorts: unref(sorts),
  filter: unref(filterModel),
  ...unref(props.additionalPayload),
}));

watch(payload, () => {
  emit('fetch', payload.value);
}, {
  immediate: true,
});

const isEmpty = computed(() => (props.data ?? []).length === 0);

// slots
const slots = useSlots();

const canShowCustomRow = computed(() => (props.isCustomRowShown || hasSlot('default')));

function hasSlot(slotName) {
  return slotName in slots;
}

function getEcTableSlots() {
  const tableSlots = { ...slots };
  delete tableSlots.footer;
  delete tableSlots.error;
  delete tableSlots.empty;
  delete tableSlots.actions;
  delete tableSlots.filter;
  delete tableSlots.pages;
  return tableSlots;
}
</script>

<style>
.ec-smart-table {
  &__intersection-target {
    @apply tw-flex tw-justify-center;
    @apply tw-mt-40;
  }
}
</style>
