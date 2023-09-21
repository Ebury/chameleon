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
        'ec-table-sort__icon--desc': isDesc,
      }"
      data-test="ec-table-sort__icon"
    />
    <span
      v-if="direction"
      class="ec-table-sort__text"
    >{{ direction }}</span>
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { SortDirection } from '../../enums/sort-direction';
import EcIcon from '../ec-icon';
import { IconName } from '../ec-icon/types';
import type { TableSortEvent, TableSortEvents, TableSortProps } from './types';

const emit = defineEmits<{
  'sort': [value: TableSortEvents[TableSortEvent.SORT]],
}>();

const props = defineProps<TableSortProps>();

const isAsc = computed(() => props.direction === SortDirection.ASC);
const isDesc = computed(() => props.direction === SortDirection.DESC);

const icon = computed(() => {
  if (isAsc.value || isDesc.value) {
    return IconName.SimpleArrowDropDown;
  }
  return IconName.SimpleArrowUpDown;
});

const directionTitle = computed(() => {
  if (isAsc.value) {
    return 'Sorted ascending';
  }
  if (isDesc.value) {
    return 'Sorted descending';
  }
  return 'Not sorted';
});

function onSort(): void {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  emit('sort', props.direction!);
}
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
      @apply tw-transform tw-rotate-180;
    }
  }

  &__text {
    @apply tw-sr-only;
  }
}
</style>
