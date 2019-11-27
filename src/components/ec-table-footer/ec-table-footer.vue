<template>
  <tfoot class="ec-table-footer">
    <tr>
      <td
        class="ec-table-footer__cell"
        :colspan="colspan"
      >
        <div class="ec-table-footer__contents">
          <div class="ec-table-footer__details">{{ viewSummaryText }}</div>
          <div
            v-if="tooltipConfig"
            class="ec-table-footer__tooltip"
          >
            <ec-icon
              v-ec-tooltip="tooltipConfig"
              :size="16"
              name="simple-info"
              class="ec-table-footer__tooltip-icon"
            />
          </div>
        </div>
      </td>
    </tr>
  </tfoot>
</template>

<script>
import EcIcon from '../ec-icon';
import EcTooltip from '../../directives/ec-tooltip';

export default {
  components: { EcIcon },
  directives: { EcTooltip },
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
    tooltipConfig: Object,
  },
  computed: {
    itemsOutOfTotalText() {
      /* istanbul ignore next: It's impossible to trigger this computed property from a test with any combination of itemsInView & totalItems being less than 1 */
      const singularOrPluralItems = `item${this.totalItems > 1 ? 's' : ''}.`;

      return `Viewing ${this.itemsInView} of ${this.totalItems} ${singularOrPluralItems}`;
    },
    itemsInViewText() {
      const singularOrPluralItems = `item${this.itemsInView > 1 ? 's' : ''}.`;

      return `${this.itemsInView} ${singularOrPluralItems}`;
    },
    viewSummaryText() {
      return (
        (this.itemsInView
          && this.totalItems
          && this.totalItems > this.itemsInView
          && this.itemsOutOfTotalText)
        || (this.itemsInView && this.itemsInViewText)
        || ''
      );
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
    border-radius: 5px;
    background-color: $level-7-backgrounds;
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
    display: flex;
    align-items: center;
    line-height: 16px;
  }

  &__tooltip-icon {
    // flex-shrink: 0;
    fill: #556468;
    display: inline-block;
    vertical-align: top;
  }
}
</style>
