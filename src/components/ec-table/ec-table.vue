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
            @click="$emit('row-click', { data: row, rowIndex })"
          >
            <td
              v-for="(content, colIndex) in row"
              :key="colIndex"
              :style="witdhStyleCells(columns[colIndex])"
              :data-test="`ec-table__cell ec-table__cell--${colIndex}`"
              class="ec-table__cell"
              :class="{
                'ec-table__cell--text-center': columns[colIndex] && columns[colIndex].type === 'icon',
                'ec-table__cell--sticky-left': stickyColumn === 'left' && colIndex === 0,
                'ec-table__cell--sticky-right': stickyColumn === 'right' && colIndex === columns.length - 1,
              }"
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
    maxHeight: Number,
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
      return this.maxHeight ? { maxHeight: `${this.maxHeight}px` } : null;
    },
  },
  methods: {
    getSlotName(index) {
      return `col${index + 1}`;
    },
    onSort(columnName) {
      this.$emit('sort', columnName);
    },
    witdhStyleCells(column) {
      return column && column.minWidth ? { minWidth: column.minWidth } : null;
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

  %common-cell-layout {
    &:last-of-type {
      padding-right: 16px;
    }
  }

  &__title {
    @include h3;

    padding-bottom: 16px;
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

    &--sticky-left {
      position: sticky;
      left: 0;
      background: $level-7-backgrounds;
    }

    &--sticky-right {
      position: sticky;
      right: 0;
      background: $level-7-backgrounds;
    }
  }
}
</style>
