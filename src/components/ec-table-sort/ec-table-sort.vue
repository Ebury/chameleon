<template>
  <a
    class="ec-table-sort"
    data-test="ec-table-sort"
    href="#"
    :title="directionTitle"
    @click.prevent.stop="onSort"
  >
    <ec-icon
      :size="16"
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
</template>

<script>
import * as SortDirection from '../../enums/sort-direction';
import EcIcon from '../ec-icon';

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
  emits: ['sort'],
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

<style>
.ec-table-sort {
  @apply tw-select-none;
  @apply tw-cursor-pointer;

  line-height: 0;
  color: inherit;

  &:hover,
  &:focus,
  &:active {
    @apply tw-text-key-3;
    @apply tw-outline-none;
  }

  &__icon {
    @apply tw-fill-current;

    &--asc {
      transform: rotateX(180deg);
    }
  }

  &__text {
    @apply tw-sr-only;
  }
}
</style>
