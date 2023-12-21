<template>
  <div
    ref="filterPopover"
    class="ec-filter-popover"
    data-test="ec-filter-popover"
  >
    <ec-popover
      v-bind="popoverOptions"
      placement="bottom-start"
      :prevent-overflow="false"
      :distance="8"
      @update:shown="onOpen"
      @apply-show="emit('after-open')"
    >
      <button
        type="button"
        class="ec-filter-popover__trigger"
        :class="{ 'ec-filter-popover__trigger--focused': isFilterOpen }"
        data-test="ec-filter-popover__trigger"
      >
        <span
          class="ec-filter-popover__label"
          data-test="ec-filter-popover__label"
          :title="label"
        >{{ label }}</span>
        <ec-badge
          v-if="numberOfSelectedFilters > 0"
          class="ec-filter-popover__badge"
          :value="numberOfSelectedFilters"
        />
        <ec-icon
          class="ec-filter-popover__icon"
          :size="16"
          name="simple-chevron-down"
          type="interactive"
        />
      </button>

      <template #popper>
        <div
          :class="{
            'ec-filter-popover__filter-content': true,
            'ec-filter-popover__filter-content--is-full-height': isFullHeight,
          }"
        >
          <slot name="filter" />
        </div>
      </template>
    </ec-popover>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import EcBadge from '../ec-badge';
import EcIcon from '../ec-icon';
import EcPopover from '../ec-popover';

defineProps({
  label: {
    type: String,
    required: true,
    default: '',
  },
  numberOfSelectedFilters: {
    type: Number,
    required: true,
    default: 0,
  },
  isFullHeight: {
    type: Boolean,
    default: false,
  },
  popoverOptions: {
    type: Object,
  },
});

const emit = defineEmits(['after-open']);

const isFilterOpen = ref(false);

function onOpen(isOpen) {
  isFilterOpen.value = isOpen;
}
</script>

<style>
:root,
:host {
  --ec-filter-popover-width: 304px;
  --ec-filter-popover-height: 368px;
  --ec-filter-label-width: 120px;
}

.ec-filter-popover {
  &__trigger {
    @apply tw-flex tw-flex-row tw-items-center;
    @apply tw-p-8;
    @apply tw-transition-all tw-duration-200 tw-ease-in-out;

    @apply tw-border-none;
    @apply tw-bg-transparent;
    @apply tw-outline-none;

    &:focus,
    &--focused {
      @apply tw-bg-key-7;
      @apply tw-rounded;
      @apply tw-outline-none;
    }

    &:hover {
      @apply tw-bg-key-6;
      @apply tw-cursor-pointer;
      @apply tw-rounded;
    }
  }

  &__label {
    @apply tw-text-gray-3;
    @apply tw-inline-block;
    @apply tw-truncate;
    @apply tw-text-left;

    max-width: var(--ec-filter-label-width);
  }

  &__badge {
    @apply tw-ml-4;
  }

  &__icon {
    @apply tw-flex-shrink-0;
    @apply tw-self-center;
    @apply tw-ml-4;
  }

  &__filter-content {
    @apply tw-bg-gray-8;
    @apply tw-border-gray-6 tw-border-solid tw-border tw-rounded;
    @apply tw-flex tw-flex-col;

    width: var(--ec-filter-popover-width);
    max-height: var(--ec-filter-popover-height);

    &--is-full-height {
      height: var(--ec-filter-popover-height);
    }
  }
}
</style>
