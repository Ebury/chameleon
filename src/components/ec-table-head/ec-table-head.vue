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
        :style="widthStyleCells(column)"
        :data-test="`ec-table-head__cell ec-table-head__cell--${colIndex}`"
        class="ec-table-head__cell"
        :class="{
          'ec-table-head__cell--text-center': column.type === 'icon',
          'ec-table-head__cell--sticky-left': stickyColumn === 'left' && colIndex === 0,
          'ec-table-head__cell--sticky-right': stickyColumn === 'right' && colIndex === columns.length - 1,
        }"
        :colspan="column.span"
        scope="col"
      >
        <span class="ec-table-head__cell-wrapper"> <!-- flex  -->
          <span>
            {{ column.title }}
          </span>
          <ec-icon
            v-if="!!column.tooltip"
            v-ec-tooltip="column.tooltip"
            class="ec-table-head__info-icon ec-table-head__icon"
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
import EcTableSort from '../ec-table-sort';
import EcIcon from '../ec-icon';
import EcTooltip from '../../directives/ec-tooltip';

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
      this.$emit('sort', column.name);
    },
    widthStyleCells(column) {
      return column && column.minWidth ? { minWidth: column.minWidth } : null;
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/tools/typography';
@import '../../scss/settings/index';

.ec-table-head {
  &__info-icon {
    vertical-align: middle;
  }

  &__cell-wrapper {
    display: flex;
    align-items: center;
  }

  &__icon {
    flex-shrink: 0;
    margin-left: 4px;
  }

  &__cell {
    padding: 16px 0 16px 16px;
    text-align: left;
    box-shadow:
      inset 0 1px 0 $level-6-disabled-lines,
      inset 0 -1px 0 $level-6-disabled-lines;
    min-width: 100px;
    position: sticky;
    border-collapse: separate;
    top: 0;
    background: white;
    z-index: $z-index-level-1;

    @include table-headers;

    &--sticky-left {
      left: 0;
      z-index: $z-index-level-2;
    }

    &--sticky-right {
      right: 0;
      z-index: $z-index-level-2;
    }

    &:last-child {
      padding-right: 16px;
    }

    &--text-center {
      text-align: center;
    }
  }
}
</style>
