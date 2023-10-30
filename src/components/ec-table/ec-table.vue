<template>
  <div v-if="data.length > 0">
    <div
      v-if="title"
      class="ec-table__title"
    >{{ title }}</div>
    <div
      data-test="ec-table-scroll-container"
      class="ec-table-scroll-container"
      :style="maxHeightStyle"
    >
      <table
        :aria-label="title"
        class="ec-table"
        :class="{ 'tw-table-fixed': canShowCustomRow }"
      >
        <ec-table-head
          v-if="canShowTableHeader"
          :columns="columns"
          :sorts="sorts"
          :sticky-column="stickyColumn"
          @sort="onSort"
        />
        <tbody>
          <tr
            v-for="(row, rowIndex) in data"
            :key="rowIndex"
            :data-test="`ec-table__row ec-table__row--${rowIndex}`"
            :class="{ 'ec-table__row--is-clickable': !!attrs.onRowClick }"
            @click="onRowClick({ data: row, rowIndex })"
          >
            <td
              v-if="canShowCustomRow"
              :colspan="numberOfColumns"
            >
              <slot
                :row="row"
              />
            </td>
            <td
              v-for="(content, colIndex) in row"
              :key="colIndex"
              v-else
              :style="getColumnWidth(columns[colIndex])"
              :data-test="`ec-table__cell ec-table__cell--${colIndex}`"
              class="ec-table__cell"
              :class="[
                getStickyColumnClass(colIndex),
                {
                  'ec-table__cell--is-type-icon': columns[colIndex]?.type === 'icon',
                  'ec-table__cell--is-type-currency': columns[colIndex]?.type === 'currency',
                  'ec-table__cell--has-max-width': !!columns[colIndex]?.maxWidth,
                }]"
            >
              <slot
                :name="`col${colIndex + 1}`"
                :content="content"
                :row="row"
              >{{ content }}</slot>
            </td>
          </tr>
        </tbody>
        <ec-table-footer
          v-if="hasSlot('footer')"
          :colspan="numberOfColumns"
        >
          <slot name="footer" />
        </ec-table-footer>
      </table>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core';
import { computed, useAttrs, useSlots } from 'vue';

import EcTableFooter from '../ec-table-footer';
import EcTableHead from '../ec-table-head';
import type { StickyColumnPosition, TableHeadColumn, TableHeadSort } from '../ec-table-head/types';
import type { TableEvent, TableEvents } from './types';

const isInCustomRowThreshold = useMediaQuery('(max-width: 768px)');
const slots = useSlots();
const attrs = useAttrs();

const emit = defineEmits<{
  'sort': [value: TableEvents[TableEvent.SORT]],
}>();

interface TableProps {
  columns?: TableHeadColumn[],
  sorts?: TableHeadSort[],
  data?: unknown[],
  totalRecords?: number,
  maxHeight?: string,
  stickyColumn?: StickyColumnPosition,
  title?: string,
  isCustomRowShown?: boolean,
  isTableHeaderHidden?: boolean
}

const props = withDefaults(defineProps<TableProps>(), {
  columns: () => [],
  sorts: () => [],
  data: () => [],
  isCustomRowShown: undefined,
  isTableHeaderHidden: undefined,
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const numberOfColumns = computed(() => (props.columns.length || (props.data[0] && props.data[0].length) || null));
const maxHeightStyle = computed(() => (props.maxHeight ? { maxHeight: `${props.maxHeight}` } : undefined));
const canShowCustomRow = computed(() => (props.isCustomRowShown || (props.isCustomRowShown === undefined && hasSlot('default') && isInCustomRowThreshold.value)));
const canShowTableHeader = computed(() => (props.isTableHeaderHidden === false || (props.isTableHeaderHidden === undefined && !canShowCustomRow.value)));

function onSort(column: TableEvents[TableEvent.SORT]) {
  emit('sort', column);
}

function onRowClick(rowData: { data: unknown, rowIndex: number }) {
  if (attrs.onRowClick && typeof attrs.onRowClick === 'function') {
    attrs.onRowClick(rowData);
  }
}

function getColumnWidth(column: TableHeadColumn) {
  if (column && (column.maxWidth || column.minWidth)) {
    return { maxWidth: column.maxWidth, minWidth: column.minWidth };
  }
  return undefined;
}

function getStickyColumnClass(colIndex: number) {
  if (props.stickyColumn === 'left' && colIndex === 0) {
    return 'ec-table__cell--sticky-left';
  }
  if (props.stickyColumn === 'right' && colIndex === props.columns.length - 1) {
    return 'ec-table__cell--sticky-right';
  }
  return null;
}

function hasSlot(slotName: string) {
  return slotName in slots;
}
</script>

<style>
@import '../../styles/tools/scrollbars';

.common-cell-layout {
  &:last-of-type {
    @apply tw-pr-16;
  }
}

.ec-table-scroll-container {
  @apply tw-overflow-auto;

  @mixin small-scrollbar;
}

.ec-table {
  @apply tw-border-none;
  @apply tw-pt-16;
  @apply tw-w-full;
  @apply tw-relative;
  @apply tw-z-0; /* We need to reset the z-index so the sticky columns and header will not compete with the outer world */

  border-spacing: 0;

  &__title {
    @apply tw-h3;
    @apply tw-pb-16;
  }

  &__row--is-clickable:hover {
    @apply tw-bg-gray-7;
    @apply tw-cursor-pointer;
  }

  &__cell {
    @apply common-cell-layout;
    @apply tw-pt-16 tw-pr-0 tw-pb-16 tw-pl-16;
    @apply tw-border-b tw-border-solid tw-border-gray-6;
    @apply tw-align-middle;
    @apply tw-body-text;
    @apply tw-min-w-104;

    &--is-type-icon {
      @apply tw-text-center;
    }

    &--is-type-currency {
      @apply tw-text-right;
    }

    &--sticky-left {
      @apply tw-sticky;
      @apply tw-left-0;
      @apply tw-bg-gray-7;

      .ec-table__row--is-clickable:hover & {
        @apply tw-bg-key-6;
      }
    }

    &--sticky-right {
      @apply tw-sticky;
      @apply tw-right-0;
      @apply tw-bg-gray-7;

      .ec-table__row--is-clickable:hover & {
        @apply tw-bg-key-6;
      }
    }

    &--has-max-width {
      @apply tw-truncate;
    }
  }
}
</style>
