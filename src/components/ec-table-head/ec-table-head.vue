<template>
  <thead
    v-if="columns.length > 0"
    class="ec-table-head"
    data-test="ec-table-head"
  >
    <tr>
      <th
        v-for="(column, colIndex) in columns"
        :key="column.name || column.title"
        :style="getWidthStyle(column)"
        :data-test="`ec-table-head__cell ec-table-head__cell--${colIndex}`"
        class="ec-table-head__cell"
        :class="getStickyColumnClass(colIndex, columns)"
        :colspan="column.span"
        scope="col"
      >
        <span
          class="ec-table-head__cell-wrapper"
          :class="{
            'ec-table-head__cell-wrapper--is-type-icon': column.type === 'icon',
            'ec-table-head__cell-wrapper--is-type-currency': column.type === 'currency',
          }"
        >
          <span
            class="ec-table-head__cell-text"
            :class="{ 'ec-table-head__cell-text--has-max-width': column.maxWidth }"
          >
            {{ column.title }}
          </span>
          <ec-icon
            v-if="!!column.tooltip"
            v-ec-tooltip="{ content: column.tooltip }"
            class="ec-table-head__icon"
            data-test="ec-table-head__tooltip-icon"
            :type="IconType.INTERACTIVE"
            :name="IconName.SimpleInfo"
            :size="16"
          />
          <ec-table-sort
            v-if="column.sortable"
            class="ec-table-head__icon"
            :direction="getSortDirection(column)"
            @sort="onSort(column)"
          />
        </span>
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
import type { StyleValue } from 'vue';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vEcTooltip from '../../directives/ec-tooltip';
import type { SortDirection } from '../../enums';
import EcIcon from '../ec-icon';
import { IconName, IconType } from '../ec-icon/types';
import EcTableSort from '../ec-table-sort';
import type {
  StickyColumnPosition, TableHeadColumn, TableHeadEvent, TableHeadEvents, TableHeadSort,
} from './types';

const emit = defineEmits<{
  'sort': [value: TableHeadEvents[TableHeadEvent.SORT]],
}>();

interface TableHeadProps {
  columns?: TableHeadColumn[],
  sorts?: TableHeadSort[],
  stickyColumn?: StickyColumnPosition,
}

const props = withDefaults(defineProps<TableHeadProps>(), {
  columns: () => [],
  sorts: () => [],
});

function getSortDirection(column: TableHeadColumn): SortDirection | undefined {
  const existingSort = props.sorts.find(sort => sort.column === column.name);
  return existingSort && existingSort.direction;
}

function onSort(column: TableHeadColumn): void {
  emit('sort', column);
}

function getWidthStyle(column: TableHeadColumn): StyleValue {
  if (column && (column.maxWidth || column.minWidth)) {
    return { maxWidth: column.maxWidth, minWidth: column.minWidth };
  }
  return null as unknown as StyleValue;
}

function getStickyColumnClass(colIndex: number, columns: TableHeadColumn[]): string | null {
  if (props.stickyColumn === 'left' && colIndex === 0) {
    return 'ec-table-head__cell--sticky-left';
  }
  if (props.stickyColumn === 'right' && colIndex === columns.length - 1) {
    return 'ec-table-head__cell--sticky-right';
  }
  return null;
}
</script>

<style>
.ec-table-head {
  &__cell-wrapper {
    @apply tw-flex tw-items-center;

    &--is-type-icon {
      @apply tw-justify-center;
    }

    &--is-type-currency {
      @apply tw-justify-end;
    }
  }

  &__icon {
    @apply tw-flex-shrink-0;
    @apply tw-ml-4;
  }

  &__cell {
    @apply tw-pt-16 tw-pr-0 tw-pb-16 tw-pl-16;
    @apply tw-text-left;
    @apply tw-top-0;
    @apply tw-bg-gray-8;
    @apply tw-z-level-1;
    @apply tw-table-header;
    @apply tw-min-w-104;
    @apply tw-text-gray-3;

    box-shadow:
      inset 0 1px 0 theme('colors.gray.6'),
      inset 0 -1px 0 theme('colors.gray.6');
    border-collapse: separate;
    @apply tw-sticky;

    &--sticky-left {
      @apply tw-left-0;
      @apply tw-z-level-2;
    }

    &--sticky-right {
      @apply tw-right-0;
      @apply tw-z-level-2;
    }

    &:last-child {
      @apply tw-pr-16;
    }
  }

  &__cell-text {
    @apply tw-whitespace-nowrap;

    &--has-max-width {
      @apply tw-truncate;
    }
  }
}
</style>
