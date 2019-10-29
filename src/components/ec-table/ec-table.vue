<template>
  <div
    v-if="numberOfRecords"
    class="ec-table"
  >
    <table
      class="ec-table__table"
    >
      <ec-table-head
        :columns="columns"
        :class="'ec-table__table-head'"
      />
      <tbody>
        <tr
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
          class="ec-table__table-row"
        >
          <td
            v-for="(content, colIndex) in row"
            :key="colIndex"
            class="ec-table__table-cell"
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
      >
        <template
          v-if="hasTooltip"
          v-slot:tooltip
        >
          <slot
            name="tableTooltip"
          />
        </template>
      </ec-table-footer>
    </table>
  </div>
</template>

<script>
import EcTableHead from '@/components/ec-table-head/ec-table-head.vue';
import EcTableFooter from '@/components/ec-table-footer/ec-table-footer.vue';

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
  },
  computed: {
    numberOfColumns() {
      return this.columns.length
        || (this.data[0] && this.data[0].length)
        || null;
    },
    numberOfRecords() {
      return this.data.length;
    },
    hasTooltip() {
      return this.$scopedSlots.tableTooltip;
    },
  },
  methods: {
    getSlotName(index) {
      return `col${index + 1}`;
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/tools/typography';
@import '../../scss/settings/colors/index';

.ec-table {
  &__table {
    border-spacing: 0;
    border: none;
    padding-top: 16px;
  }

  %common-cell-layout {
    &:first-of-type {
      padding-left: 16px;
    }

    &:last-of-type {
      padding-right: 16px;
    }
  }

  &__table-cell {
    @extend %common-cell-layout;

    padding: 8px;
    border-bottom: 1px solid $level-6-disabled-lines;

    @include body-text;
  }

  &__footer-cell {
    @extend %common-cell-layout;

    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>
