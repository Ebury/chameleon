<template>
  <div v-if="numberOfRecords">
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
      >
        <ec-table-head
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
            :class="{ 'ec-table__row--is-clickable': !!$listeners['row-click'] }"
            @click="$emit('row-click', { data: row, rowIndex })"
          >
            <td
              v-for="(content, colIndex) in row"
              :key="colIndex"
              :style="getColumnWidth(columns[colIndex])"
              :data-test="`ec-table__cell ec-table__cell--${colIndex}`"
              class="ec-table__cell"
              :class="[
                getStickyColumnClass(colIndex, columns),
                {
                  'ec-table__cell--is-type-icon': columns[colIndex] && columns[colIndex].type === 'icon',
                  'ec-table__cell--is-type-currency': columns[colIndex] && columns[colIndex].type === 'currency',
                  'ec-table__cell--has-max-width': columns[colIndex] && columns[colIndex].maxWidth,
                }]"
            >
              <slot
                :name="getSlotName(colIndex)"
                :content="content"
                :row="row"
              >{{ content }}</slot>
            </td>
          </tr>
        </tbody>
        <ec-table-footer
          v-if="hasFooterSlot()"
          :colspan="numberOfColumns"
        >
          <slot name="footer" />
        </ec-table-footer>
      </table>

    </div>
  </div>
</template>

<script>
import EcTableHead from '../ec-table-head';
import EcTableFooter from '../ec-table-footer';

export default {
  name: 'EcTable',
  components: {
    EcTableHead,
    EcTableFooter,
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    sorts: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    totalRecords: {
      type: Number,
    },
    maxHeight: String,
    stickyColumn: {
      type: String,
      validator(value) {
        return ['left', 'right'].includes(value);
      },
    },
    title: String,
  },
  computed: {
    numberOfColumns() {
      return (
        this.columns.length || (this.data[0] && this.data[0].length) || null
      );
    },
    numberOfRecords() {
      return this.data.length;
    },
    maxHeightStyle() {
      return this.maxHeight ? { maxHeight: `${this.maxHeight}` } : null;
    },
  },
  methods: {
    getSlotName(index) {
      return `col${index + 1}`;
    },
    onSort(columnName) {
      this.$emit('sort', columnName);
    },
    getColumnWidth(column) {
      if (column && (column.maxWidth || column.minWidth)) {
        return { maxWidth: column.maxWidth, minWidth: column.minWidth };
      }
      return null;
    },
    getStickyColumnClass(colIndex, columns) {
      if (this.stickyColumn === 'left' && colIndex === 0) {
        return 'ec-table__cell--sticky-left';
      } if (this.stickyColumn === 'right' && colIndex === columns.length - 1) {
        return 'ec-table__cell--sticky-right';
      }
      return null;
    },
    hasFooterSlot() {
      return !!this.$scopedSlots.footer;
    },
  },
};
</script>

<style>
@import '../../styles/tools/scrollbars';

.common-cell-layout {
  &:last-of-type {
    padding-right: 16px;
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

  border-spacing: 0;
  z-index: 0; /* We need to reset the z-index so the sticky columns and header will not compete with the outer world */

  &__title {
    @apply tw-h3;
    @apply tw-pb-16;
  }

  &__row--is-clickable:hover {
    @apply tw-bg-gray-7;
    @apply tw-cursor-pointer;
  }

  &__cell {
    @apply .common-cell-layout;
    @apply tw-pt-16 tw-pr-0 tw-pb-16 tw-pl-16;
    @apply tw-border-b tw-border-solid tw-border-gray-6;
    @apply tw-align-middle;
    @apply tw-body-text;

    min-width: 100px;

    &--is-type-icon {
      @apply tw-text-center;
    }

    &--is-type-currency {
      @apply tw-text-right;
    }

    &--sticky-left {
      @apply tw-left-0;
      @apply tw-bg-gray-7;

      position: sticky;

      .ec-table__row--is-clickable:hover & {
        @apply tw-bg-key-6;
      }
    }

    &--sticky-right {
      @apply tw-right-0;
      @apply tw-bg-gray-7;

      position: sticky;

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
