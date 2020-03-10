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
        :data-test="`ec-table-head__cell ec-table-head__cell--${colIndex}`"
        class="ec-table-head__cell"
        :class="{ 'ec-table-head__cell--text-center': column.type === 'icon' }"
        :colspan="column.span"
        scope="col"
      >
        <ec-table-sort
          v-if="column.sortable"
          :direction="getSortDirection(column)"
          @sort="onSort(column)"
        >{{ column.title }}</ec-table-sort>
        <template v-else>
          {{ column.title }}
        </template>
      </th>
    </tr>
  </thead>
</template>

<script>
import EcTableSort from '../ec-table-sort';

export default {
  name: 'EcTableHead',
  components: { EcTableSort },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    sorts: {
      type: Array,
      default: () => [],
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
  },
};
</script>

<style lang="scss">
@import '../../scss/tools/typography';
@import '../../scss/settings/colors/index';

.ec-table-head {
  &__cell {
    padding: 0 0 8px 16px;
    text-align: left;
    border-bottom: 1px solid $level-6-disabled-lines;

    @include mini-header;

    &:last-child {
      padding-right: 16px;
    }

    &--text-center {
      text-align: center;
    }
  }
}
</style>
