<template>
  <div
    class="ec-smart-table"
    :data-test="attrs['data-test'] ? `${attrs['data-test']} ec-smart-table` : 'ec-smart-table'"
  >
    <ec-smart-table-heading :title="title">
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
        :show="isFetching"
        :transparent="!isEmpty"
        :class="{ 'tw-my-48 tw-min-h-48': isEmpty && isFetching }"
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
                isCustomInfoHidden: isPaginationCustomInfoHidden,
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
      </ec-loading>
    </template>
  </div>

</template>

<script setup>
import {
  computed, ref, unref, useAttrs, useSlots, watch,
} from 'vue';

import useEcPagination from '../../composables/use-ec-pagination';
import useEcSorting from '../../composables/use-ec-sorting';
import { SortDirection } from '../../enums';
import * as SortDirectionCycle from '../../enums/sort-direction-cycle';
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
    default: () => undefined,
  },
  isPaginationCustomInfoHidden: {
    type: Boolean,
    default: () => undefined,
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

/* c8 ignore next */
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
