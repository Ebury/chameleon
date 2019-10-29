<template>
  <td
    class="ec-table-cell"
  >
    <slot />
  </td>
</template>

<script>
export default {
  name: 'EcTableCell',
};
</script>

<style lang="scss">
@import '../../scss/tools/typography';

.ec-table-cell {
  padding: 0 8px;

  &:first-of-type {
    padding-left: 16px;
  }

  &:last-of-type {
    padding-right: 16px;
  }

  @include body-text;
}
</style>
