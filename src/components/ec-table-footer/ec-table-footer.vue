<template>
  <tfoot class="ec-table-footer">
    <tr>
      <td
        class="ec-table-footer__cell"
        :colspan="colspan"
      >
        <div class="ec-table-footer__contents">
          <slot />
        </div>
      </td>
    </tr>
  </tfoot>
</template>

<script>
export default {
  props: {
    colspan: {
      type: Number,
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
    position: sticky;
    bottom: 0;
    background-color: $level-7-backgrounds;
  }

  &__contents {
    display: flex;
    justify-content: space-between;
  }
}
</style>
