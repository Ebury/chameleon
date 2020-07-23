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

<style>

.ec-table-footer {
  @apply tw-small-text;

  &__cell {
    @apply tw-py-0 tw-px-16;
    @apply tw-w-full;
    @apply tw-bottom-0;
    @apply tw-bg-gray-7;
    @apply tw-rounded-b;

    position: sticky;
  }

  &__contents {
    @apply tw-flex tw-justify-between;
  }
}
</style>
