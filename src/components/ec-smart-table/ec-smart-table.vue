<template>
  <div
    class="ec-smart-table"
    :data-test="attrs['data-test'] ? `${attrs['data-test']} ec-smart-table` : 'ec-smart-table'"
  >
    <ec-smart-table-heading
      v-bind="{
        title,
        isResponsive,
        hasStretchFilter,
      }"
    >
      <template
        #filter
        v-if="isFilteringEnabled"
      >
        <ec-table-filter
          v-model="filterModel"
          v-bind="{
            filters,
            clearFiltersButtonText,
            isClearFiltersButtonHidden,
            hasStretchFilter,
          }"
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
        :show="!isInfiniteScrollEnabled && !!isFetching"
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
            isMultiSelectEnabled,
            selectedItems,
            allItemsSelected,
            isSelectableCheck,
          }"
          v-on="{
            sort: sortBy,
            rowClick: attrs.onRowClick,
            selectItem: attrs.onSelectItem,
            selectAllItems: attrs.onSelectAllItems,
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
          <!-- pass colX slots to ec-table and bind their types -->
          <!-- in order to make TS and Vue happy we can't for-loop $slots. We also need to statically cast the content prop so they are type safe. we cannot do TRow[colIndex] because TS can't tell what is the value of colIndex at compile time -->
          <template #col1="{ content, row }" v-if="hasSlot('col1')"><slot name="col1" v-bind="{ content: (content as TRow[0]), row }" /></template>
          <template #col2="{ content, row }" v-if="hasSlot('col2')"><slot name="col2" v-bind="{ content: (content as TRow[1]), row }" /></template>
          <template #col3="{ content, row }" v-if="hasSlot('col3')"><slot name="col3" v-bind="{ content: (content as TRow[2]), row }" /></template>
          <template #col4="{ content, row }" v-if="hasSlot('col4')"><slot name="col4" v-bind="{ content: (content as TRow[3]), row }" /></template>
          <template #col5="{ content, row }" v-if="hasSlot('col5')"><slot name="col5" v-bind="{ content: (content as TRow[4]), row }" /></template>
          <template #col6="{ content, row }" v-if="hasSlot('col6')"><slot name="col6" v-bind="{ content: (content as TRow[5]), row }" /></template>
          <template #col7="{ content, row }" v-if="hasSlot('col7')"><slot name="col7" v-bind="{ content: (content as TRow[6]), row }" /></template>
          <template #col8="{ content, row }" v-if="hasSlot('col8')"><slot name="col8" v-bind="{ content: (content as TRow[7]), row }" /></template>
          <template #col9="{ content, row }" v-if="hasSlot('col9')"><slot name="col9" v-bind="{ content: (content as TRow[8]), row }" /></template>
          <template #col10="{ content, row }" v-if="hasSlot('col10')"><slot name="col10" v-bind="{ content: (content as TRow[9]), row }" /></template>
          <template #col11="{ content, row }" v-if="hasSlot('col11')"><slot name="col11" v-bind="{ content: (content as TRow[10]), row }" /></template>
          <template #col12="{ content, row }" v-if="hasSlot('col12')"><slot name="col12" v-bind="{ content: (content as TRow[11]), row }" /></template>
        </ec-table>
        <div
          ref="tableEndDetector"
          v-if="isInfiniteScrollEnabled && canLoadMore"
          class="ec-smart-table__table-end-detector"
          data-test="ec-smart-table__table-end-detector"
        >
          <!--  TODO: why does this component reuse styles of a different component?!?! -->
          <ec-icon
            :name="IconName.SIMPLE_LOADING"
            :size="32"
            class="ec-loading__icon"
            data-test="ec-loading__icon"
          />
        </div>
      </ec-loading>
    </template>
  </div>
</template>

<script setup lang="ts" generic="TRow extends ReadonlyArray<unknown>, TAdditionalPayload">
import { useIntersectionObserver } from '@vueuse/core';
import {
  computed, onMounted, ref, unref, useAttrs, useSlots, watch,
} from 'vue';

import useEcPagination from '../../composables/use-ec-pagination';
import useEcSorting from '../../composables/use-ec-sorting';
import { SortDirectionCycle } from '../../enums';
import EcIcon from '../ec-icon';
import { IconName } from '../ec-icon/types';
import EcLoading from '../ec-loading';
import EcSmartTableHeading from '../ec-smart-table-heading';
import EcTable from '../ec-table';
import EcTableFilter from '../ec-table-filter';
import EcTablePagination from '../ec-table-pagination';
import type { SmartTableFetchPayload, SmartTableProps } from './types';

const attrs = useAttrs();

const emit = defineEmits<{
  'update:filter': [filters: object],
  'fetch': [payload: SmartTableFetchPayload & TAdditionalPayload],
}>();

const props = withDefaults(defineProps<SmartTableProps<TRow, TAdditionalPayload>>(), {
  columns: () => [],
  sorts: () => [],
  data: () => [],
  filters: () => [],
  isCustomRowShown: undefined,
  isTableHeaderHidden: undefined,
  errorMessage: 'Unexpected error while fetching data',
  emptyMessage: 'No items found',
  sortCycle: SortDirectionCycle.LOWEST_FIRST,
  isResponsive: true,
});

const hasStretchFilter = computed(() => (Object.values(props.filters).some(filter => filter.stretch)));

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
  filterModel.value = props.filter ??/* c8 ignore next */ {};
});

function onFilterChanged(filters: object) {
  paginate(1);
  emit('update:filter', filters);
}

// fetching
const payload = computed(() => ({
  page: unref(page),
  numberOfItems: unref(numberOfItems),
  sorts: unref(sorts),
  filter: unref(filterModel),
  ...(props.additionalPayload ?? ({} as TAdditionalPayload)),
}));

watch(payload, () => {
  emit('fetch', payload.value);
}, {
  immediate: !props.isInfiniteScrollEnabled,
});

const isEmpty = computed(() => props.data.length === 0);

// slots
const slots = useSlots();

const canShowCustomRow = computed(() => (props.isCustomRowShown || hasSlot('default')));

function hasSlot(slotName: string): boolean {
  return slotName in slots;
}

// infinite scroll

const tableEndDetector = ref<HTMLDivElement>();

const canLoadMore = computed(() => props.data && props.data.length < (props.totalRecords ?? 0));

onMounted(() => {
  const {
    pause: pauseIntersectionObserver,
    resume: resumeIntersectionObserver,
  } = useIntersectionObserver(
    tableEndDetector,
    /* c8 ignore start */
    ([{ isIntersecting }]) => {
      if (isIntersecting && !props.isFetching) {
        page.value += 1;
      }
    },
    /* c8 ignore stop */
  );

  watch(() => canLoadMore.value, () => {
    /* c8 ignore start */
    if (canLoadMore.value) {
      resumeIntersectionObserver();
    /* c8 ignore stop */
    } else {
      pauseIntersectionObserver();
    }
  });
});
</script>

<style>
.ec-smart-table {
  &__table-end-detector {
    @apply tw-flex tw-justify-center;
    @apply tw-mt-40;
  }
}
</style>
