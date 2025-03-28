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
          :is-multi-select-enabled="isMultiSelectEnabled"
          :all-items-selected="allItemsSelected"
          :has-any-selectable-rows="isMultiSelectEnabled && data.some((row, _) => canItemBeSelected(row[0] as string))"
          @sort="onSort"
          v-on="{
            selectAllItems: attrs.onSelectAllItems,
          }"
        />
        <tbody>
          <tr
            v-for="(row, rowIndex) in data"
            :key="rowIndex"
            tabindex="0"
            :data-test="`ec-table__row ec-table__row--${rowIndex}`"
            :class="{ 'ec-table__row--is-clickable': !!attrs.onRowClick, 'ec-table__row ': true }"
            @click="(ev) => onRowClick(ev, { data: row, rowIndex })"
            @keydown.enter="(ev) => onRowClick(ev, { data: row, rowIndex })"
            @keydown.space="(ev) => onRowClick(ev, { data: row, rowIndex })"
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
                  'ec-table__cell--is-select': isCheckboxContent(colIndex),
                }]"
            >
              <ec-checkbox
                v-if="isCheckboxContent(colIndex) && canItemBeSelected(content as string)"
                :data-test="`ec-table__select ec-table__select--${colIndex}`"
                :model-value="selectedItems.has(content as string)"
                @update:model-value="onSelectItem(content as string)"
              />
              <div v-else-if="isCheckboxContent(colIndex)" />
              <slot
                v-else
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

<script setup lang="ts" generic="TRow extends ReadonlyArray<unknown>">
import { useMediaQuery } from '@vueuse/core';
import type { StyleValue } from 'vue';
import { computed, useAttrs, useSlots } from 'vue';

import EcCheckbox from '../ec-checkbox';
import EcTableFooter from '../ec-table-footer';
import EcTableHead from '../ec-table-head';
import type { TableHeadColumn } from '../ec-table-head/types';
import type { TableProps } from './types';

const isInCustomRowThreshold = useMediaQuery('(max-width: 767px)');
const slots = useSlots();
const attrs = useAttrs();

const emit = defineEmits<{
  'sort': [value: TableHeadColumn],
  'update:modelValue': [items: string[] | number[]],
}>();

const props = withDefaults(defineProps<TableProps<TRow>>(), {
  columns: () => [],
  sorts: () => [],
  data: () => [],
  isCustomRowShown: undefined,
  isTableHeaderHidden: undefined,
});

const numberOfColumns = computed(() => (props.columns.length || props.data?.[0]?.length || undefined));
const maxHeightStyle = computed(() => (props.maxHeight ? { maxHeight: `${props.maxHeight}` } : undefined));
const canShowCustomRow = computed(() => (props.isCustomRowShown || (props.isCustomRowShown === undefined && hasSlot('default') && isInCustomRowThreshold.value)));
const canShowTableHeader = computed(() => (props.isTableHeaderHidden === false || (props.isTableHeaderHidden === undefined && !canShowCustomRow.value)));
const canShowMultiSelect = computed(() => props.isMultiSelectEnabled);
const selectedItems = computed(() => new Set(props.selectedItems));

function onSort(column: TableHeadColumn) {
  emit('sort', column);
}

function onRowClick(event: Event, rowData: { data: TRow, rowIndex: number }) {
  if (canShowMultiSelect.value) {
    const closestTd = (event.target as HTMLElement).closest('td');
    if (!closestTd || closestTd.classList.contains('ec-table__cell--is-select')) {
      return;
    }
  }
  if (attrs.onRowClick && typeof attrs.onRowClick === 'function') {
    attrs.onRowClick(rowData);
  }
}

function getColumnWidth(column: TableHeadColumn): StyleValue | undefined {
  if (column && (column.maxWidth || column.minWidth)) {
    return { maxWidth: column.maxWidth, minWidth: column.minWidth };
  }
  return undefined;
}

function getStickyColumnClass(colIndex: number): string | undefined {
  if (props.stickyColumn === 'left' && colIndex === 0) {
    return 'ec-table__cell--sticky-left';
  }
  if (props.stickyColumn === 'right' && colIndex === props.columns.length - 1) {
    return 'ec-table__cell--sticky-right';
  }
  return undefined;
}

function hasSlot(slotName: string): boolean {
  return slotName in slots;
}

function isCheckboxContent(colIdx: number): boolean {
  return canShowMultiSelect.value && colIdx === 0;
}

function canItemBeSelected(selected: string): boolean {
  return !props.isSelectableCheck || (props.isSelectableCheck && props.isSelectableCheck(selected));
}

function onSelectItem(selected: string) {
  if (attrs.onSelectItem && typeof attrs.onSelectItem === 'function') {
    attrs.onSelectItem(selected);
  }
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

  &__row {
    @apply tw-outline-0;
  }

  &__title {
    @apply tw-h3;
    @apply tw-pb-16;
  }

  &__row--is-clickable:hover,
  &__row--is-clickable:focus {
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
