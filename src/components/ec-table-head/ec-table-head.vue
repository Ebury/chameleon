<template>
  <thead
    v-if="numberOfColumns"
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
            :class="{'ec-table-head__cell-text--has-max-width': column.maxWidth}"
          >
            {{ column.title }}
          </span>
          <ec-icon
            v-if="!!column.tooltip"
            v-ec-tooltip="{ content: column.tooltip }"
            class="ec-table-head__icon"
            data-test="ec-table-head__tooltip-icon"
            type="interactive"
            name="simple-info"
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

<script>
import EcTooltip from '../../directives/ec-tooltip';
import EcIcon from '../ec-icon';
import EcTableSort from '../ec-table-sort';

export default {
  name: 'EcTableHead',
  components: { EcTableSort, EcIcon },
  directives: { EcTooltip },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    sorts: {
      type: Array,
      default: () => [],
    },
    stickyColumn: {
      type: String,
      validator(value) {
        return ['left', 'right'].includes(value);
      },
    },
  },
  emits: ['sort'],
  computed: {
    numberOfColumns() {
      return this.columns.length;
    },
  },
  methods: {
    getSortDirection(column) {
      const existingSort = this.sorts.find(sort => sort.column === column.name);
      return existingSort && existingSort.direction;
    },
    onSort(column) {
      this.$emit('sort', column);
    },
    getWidthStyle(column) {
      if (column && (column.maxWidth || column.minWidth)) {
        return { maxWidth: column.maxWidth, minWidth: column.minWidth };
      }
      return null;
    },
    getStickyColumnClass(colIndex, columns) {
      if (this.stickyColumn === 'left' && colIndex === 0) {
        return 'ec-table-head__cell--sticky-left';
      } if (this.stickyColumn === 'right' && colIndex === columns.length - 1) {
        return 'ec-table-head__cell--sticky-right';
      }
      return null;
    },
  },
};
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

    box-shadow:
      inset 0 1px 0 theme('colors.gray.6'),
      inset 0 -1px 0 theme('colors.gray.6');
    position: sticky;
    border-collapse: separate;

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
