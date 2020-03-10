<template>
  <div
    class="ec-table-sort"
    data-test="ec-table-sort"
  >
    <div class="ec-table-sort__title">
      <slot />
    </div>
    <a
      class="ec-table-sort__icon-wrapper"
      data-test="ec-table-sort__icon-wrapper"
      href="#"
      :title="directionTitle"
      @click.prevent.stop="onSort"
    >
      <ec-icon
        :size="20"
        :name="icon"
        :class="{
          'ec-table-sort__icon': true,
          'ec-table-sort__icon--asc': isAsc,
          'ec-table-sort__icon--desc': isDesc
        }"
        data-test="ec-table-sort__icon"
      />
      <span
        v-if="direction"
        class="ec-table-sort__text"
      >{{ direction }}</span>
    </a>
  </div>
</template>

<script>
import EcIcon from '../ec-icon';
import * as SortDirection from '../../enums/sort-direction';

export default {
  name: 'EcTableSort',
  components: { EcIcon },
  props: {
    direction: {
      type: String,
      default: null,
      validator(value) {
        return value === null || value === '' || [SortDirection.ASC, SortDirection.DESC].includes(value);
      },
    },
  },
  computed: {
    icon() {
      if (this.isAsc || this.isDesc) {
        return 'simple-arrow-drop-down';
      }
      return 'simple-arrow-up-down';
    },
    isAsc() {
      return this.direction === SortDirection.ASC;
    },
    isDesc() {
      return this.direction === SortDirection.DESC;
    },
    directionTitle() {
      if (this.isAsc) {
        return 'Sorted ascending';
      }
      if (this.isDesc) {
        return 'Sorted descending';
      }
      return 'Not sorted';
    },
  },
  methods: {
    onSort() {
      this.$emit('sort', this.direction);
    },
  },
};
</script>

<style lang="scss">
@import '../../scss/settings/colors/index';
@import '../../scss/tools/accessibility';

.ec-table-sort {
  display: flex;
  align-items: center;

  &__title {
    flex-grow: 0;
    min-width: 0;
    margin-right: 4px;
  }

  &__icon-wrapper {
    flex-shrink: 0;
    line-height: 0;
    user-select: none;
    cursor: pointer;
    color: inherit;

    &:hover,
    &:focus,
    &:active {
      color: $level-3-hover;
      outline: 0;
    }
  }

  &__icon {
    fill: currentColor;

    &--asc {
      transform: rotateX(180deg);
    }
  }

  &__text {
    @include ec-screen-reader-only;
  }
}
</style>
