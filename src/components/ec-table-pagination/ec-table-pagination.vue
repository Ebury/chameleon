<template>
  <div
    class="ec-table-pagination"
    v-bind="{
      ...$attrs,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-table-pagination` : 'ec-table-pagination',
    }"
  >

    <div
      class="ec-table-pagination__page-size"
      data-test="ec-table-pagination__page-size"
    >
      <div class="ec-table-pagination__page-size-text">{{ itemsPerPageText }}:</div>
      <ec-dropdown-search
        v-model="pageSizeModel"
        :items="pageSizeItems"
        :is-search-enabled="false"
      >
        <button
          type="button"
          class="ec-table-pagination__action ec-table-pagination__action--page-size"
          data-test="ec-table-pagination__action--page-size"
        >
          {{ selectedPageSizeText }}
          <ec-icon
            class="ec-table-pagination__action-icon"
            name="simple-chevron-down"
            :size="24"
          />
        </button>
      </ec-dropdown-search>
    </div>

    <div
      class="ec-table-pagination__current-page"
      data-test="ec-table-pagination__current-page"
    >
      <slot
        name="pages"
        v-bind="{
          page,
          numberOfItems,
          totalPages,
          total,
        }"
      >
        <span>{{ page }}&nbsp;of&nbsp;{{ totalPages }} pages</span>
        <span>({{ total }}&nbsp;items)</span>
      </slot>
    </div>

    <div
      class="ec-table-pagination__total"
      data-test="ec-table-pagination__total"
    >
      <slot
        name="total"
        v-bind="{
          page,
          numberOfItems,
          totalPages,
          total,
        }"
      />
    </div>

    <div
      class="ec-table-pagination__actions"
      data-test="ec-table-pagination__actions"
    >
      <button
        type="button"
        class="ec-table-pagination__action ec-table-pagination__action--prev"
        data-test="ec-table-pagination__action--prev"
        :class="{ 'ec-table-pagination__action--is-disabled': !hasPrev }"
        :disabled="!hasPrev"
        @click.prevent.stop="emit('change', page - 1, numberOfItems)"
      ><ec-icon
        class="ec-table-pagination__action-icon"
        name="simple-chevron-left"
        :size="24"
      /></button>
      <button
        type="button"
        class="ec-table-pagination__action ec-table-pagination__action--next"
        data-test="ec-table-pagination__action--next"
        :class="{ 'ec-table-pagination__action--is-disabled': !hasNext }"
        :disabled="!hasNext"
        @click.prevent.stop="emit('change', page + 1, numberOfItems)"
      ><ec-icon
        class="ec-table-pagination__action-icon"
        name="simple-chevron-right"
        :size="24"
      /></button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import { DEFAULT_PAGE_SIZE, PAGE_SIZES } from '../../enums/pagination';
import EcDropdownSearch from '../ec-dropdown-search';
import EcIcon from '../ec-icon';

const props = defineProps({
  page: {
    type: Number,
    default: 1,
  },
  numberOfItems: {
    type: Number,
    default: DEFAULT_PAGE_SIZE,
    validator(value) {
      return PAGE_SIZES.includes(value);
    },
  },
  total: {
    type: Number,
    default: 0,
  },
  itemsPerPageText: {
    type: String,
    default: 'Items per page',
  },
});

const emit = defineEmits(['change']);

const hasPrev = computed(() => props.page > 1);

const hasNext = computed(() => props.page < totalPages.value);
const totalPages = computed(() => {
  if (props.total === 0) {
    return 1;
  }
  return Math.ceil(props.total / props.numberOfItems);
});
const pageSizeItems = computed(() => PAGE_SIZES.map(pageSize => ({ text: pageSize, value: pageSize })));
const pageSizeModel = computed({
  get() {
    return pageSizeItems.value.find(item => item.value === props.numberOfItems);
  },
  set(pageSizeItem) {
    emit('change', 1, pageSizeItem.value);
  },
});
const selectedPageSizeText = computed(() => pageSizeModel.value?.text);

</script>

<script>

export default {
  inheritAttrs: false,
};
</script>

<style>
.ec-table-pagination {
  @apply tw-flex;
  @apply tw--mx-16;

  width: calc(100% + theme('spacing.32'));

  &__page-size,
  &__current-page,
  &__total {
    @apply tw-py-8 tw-px-16;
  }

  &__page-size {
    @apply tw-py-0;
    @apply tw-border-r tw-border-solid tw-border-gray-6;
    @apply tw-flex;
  }

  &__page-size-text {
    @apply tw-whitespace-nowrap;
    @apply tw-py-8;
  }

  &__total {
    @apply tw-flex-grow;
  }

  &__actions {
    @apply tw-flex;
  }

  &__action {
    @apply tw-flex-shrink-0;
    @apply tw-border-0;
    @apply tw-p-8;
    @apply tw-bg-transparent tw-text-gray-3 tw-fill-gray-4;
    @apply tw-outline-none;
    @apply tw-cursor-pointer;
    @apply tw-border-l tw-border-solid tw-border-gray-6;
    @apply tw-whitespace-nowrap;

    &:hover,
    &:focus {
      @apply tw-bg-gray-6;
    }

    &--next {
      @apply tw-rounded-br;
    }

    &--page-size {
      @apply tw-body-text;
      @apply tw-border-l-0;
      @apply tw-ml-8;
    }

    &--is-disabled {
      @apply tw-cursor-default;
      @apply tw-fill-gray-6;

      &:hover,
      &:focus {
        @apply tw-bg-transparent;
      }
    }
  }

  &__action-icon {
    @apply tw-inline-block tw-align-top;

    line-height: 0;
  }
}
</style>
