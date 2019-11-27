<template>
  <thead
    v-if="numberOfColumns"
    class="ec-table-head"
  >
    <tr>
      <th
        v-for="column in columns"
        :key="column.name"
        class="ec-table-head__cell"
        :colspan="column.span"
        scope="col"
      >{{ column.name }}</th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: 'EcTableHead',
  props: {
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    numberOfColumns() {
      return this.columns.length;
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
  }
}
</style>
