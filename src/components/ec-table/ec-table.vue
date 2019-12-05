<template>
  <div
    v-if="numberOfRecords"
    class="ec-table-scroll-container"
  >
    <table class="ec-table">
      <caption v-if="title">{{ title }}</caption>
      <ec-table-head :columns="columns" />
      <tbody>
        <tr
          v-for="(row, rowIndex) in data"
          :key="rowIndex"
        >
          <td
            v-for="(content, colIndex) in row"
            :key="colIndex"
            class="ec-table__cell"
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

.ec-table-scroll-container {
  overflow-x: auto;
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

  &__cell {
    @extend %common-cell-layout;

    padding: 8px 0 8px 16px;
    border-bottom: 1px solid $level-6-disabled-lines;

    @include body-text;
  }
}
</style>
