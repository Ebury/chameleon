<template>
  <tfoot
    class="ec-table-footer"
  >
    <tr
      class="ec-table-footer__row"
    >
      <td
        class="ec-table-footer__cell"
        :colspan="colspan"
      >
        <div
          class="ec-table-footer__contents"
        >
          <div
            class="ec-table-footer__details"
          >{{ viewSummaryText }}</div>
          <div
            v-if="hasTooltip"
            class="ec-table-footer__tooltip"
          >
            <i>i</i>
            <article
              class="ec-table-footer__tooltip-content"
            >
              <slot
                name="tooltip"
              />
            </article>
          </div>
        </div>
      </td>
    </tr>
  </tfoot>
</template>

<script>
export default {
  props: {
    itemsInView: {
      type: Number,
    },
    totalItems: {
      type: Number,
    },
    colspan: {
      type: Number,
    },
  },
  computed: {
    itemsOutOfTotalText() {
      const singularOrPluralItems = `item${this.totalItems > 1 ? 's' : ''}.`;

      return `Viewing ${this.itemsInView} of ${this.totalItems} ${singularOrPluralItems}`;
    },
    itemsInViewText() {
      const singularOrPluralItems = `item${this.itemsInView > 1 ? 's' : ''}.`;

      return `${this.itemsInView} ${singularOrPluralItems}`;
    },
    hasTooltip() {
      return Boolean(this.$scopedSlots.tooltip);
    },
    viewSummaryText() {
      return (
        this.itemsInView && this.totalItems && (this.totalItems > this.itemsInView)
          && this.itemsOutOfTotalText
      )
        || (
          this.itemsInView
          && this.itemsInViewText
        )
        || '';
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/tools/typography';
@import '../../scss/settings/colors/index';

.ec-table-footer {
  @include small-text;

  &__cell {
    padding: 0 16px;
    width: 100%;
    border-radius: 0 0 5px 5px;
    background-color: $level-7-backgrounds;

    &--tooltip-cell {
      position: relative;
      padding: 12px 16px 12px 24px;

      &:hover {
        .ec-table-footer__tooltip {
          display: block;
        }
      }
    }
  }

  &__contents {
    display: flex;
    justify-content: space-between;
  }

  &__details {
    padding: 10px 0;
    display: flex;
    align-items: center;
  }

  &__tooltip {
    position: relative;
    padding: 12px 0 12px 24px;

    &:hover {
      .ec-table-footer__tooltip-content {
        display: block;
      }
    }
  }

  &__tooltip-content {
    // TODO: replace implementation with tooltip component
    position: absolute;
    right: 50%;
    bottom: calc(-100% - 12px);
    background: #fff;
    border-radius: 5px;
    padding: 12px;
    display: none;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
}
</style>
