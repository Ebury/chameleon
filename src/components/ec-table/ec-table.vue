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
                  'ec-table__cell--text-center': columns[colIndex] && columns[colIndex].type === 'icon',
                  'ec-table__cell--text-right': columns[colIndex] && columns[colIndex].type === 'currency',
                  'ec-table__cell--ellipsis': columns[colIndex] && columns[colIndex].maxWidth,
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
          v-if="showFooter"
          :items-in-view="numberOfRecords"
          :total-items="totalRecords"
          :colspan="numberOfColumns"
          :tooltip-config="tooltipConfig"
        />
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
    showFooter: {
      type: Boolean,
      default: false,
    },
    maxHeight: String,
    stickyColumn: {
      type: String,
      validator(value) {
        return ['left', 'right'].includes(value);
      },
    },
    tooltipConfig: Object,
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
      let widthStyle = {};
      if (column && column.minWidth) {
        widthStyle = {
          ...widthStyle,
          minWidth: column.minWidth,
        };
      }
      if (column && column.maxWidth) {
        widthStyle = {
          ...widthStyle,
          maxWidth: column.maxWidth,
        };
      }
      return Object.keys(widthStyle).length ? widthStyle : null;
    },
    getStickyColumnClass(colIndex, columns) {
      if (this.stickyColumn === 'left' && colIndex === 0) {
        return 'ec-table__cell--sticky-left';
      } if (this.stickyColumn === 'right' && colIndex === columns.length - 1) {
        return 'ec-table__cell--sticky-right';
      }
      return null;
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/colors/index';
@import '../../scss/tools/index';

.ec-table-scroll-container {
  overflow: auto;

  @include small-scrollbar;
}

.ec-table {
  border-spacing: 0;
  border: none;
  padding-top: 16px;
  width: 100%;
  position: relative; // We need to reset the z-index so the sticky columns and header will not compete with the outer world
  z-index: 0;

  %common-cell-layout {
    &:last-of-type {
      padding-right: 16px;
    }
  }

  &__title {
    @include h3;

    padding-bottom: 16px;
  }

  &__row--is-clickable:hover {
    background-color: $level-7;
    cursor: pointer;
  }

  &__cell {
    @extend %common-cell-layout;

    min-width: 100px;
    padding: 16px 0 16px 16px;
    border-bottom: 1px solid $level-6-disabled-lines;
    vertical-align: middle;

    @include body-text;

    &--text-center {
      text-align: center;
    }

    &--text-right {
      text-align: right;
    }

    &--sticky-left {
      position: sticky;
      left: 0;
      background: $level-7-backgrounds;

      .ec-table__row--is-clickable:hover & {
        background: $level-6;
      }
    }

    &--sticky-right {
      position: sticky;
      right: 0;
      background: $level-7-backgrounds;

      .ec-table__row--is-clickable:hover & {
        background: $level-6;
      }
    }

    &--ellipsis {
      @include ellipsis;
    }
  }
}
</style>
