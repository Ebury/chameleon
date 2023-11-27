<template>
  <div
    ref="popperReference"
    class="ec-btn-dropdown"
    v-bind="{
      ...$attrs,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-btn-dropdown` : 'ec-btn-dropdown',
    }"
  >
    <ec-btn
      :href="href"
      :to="to"
      :is-disabled="isBtnDropdownDisabled"
      :is-submit="false"
      is-reverse
      category="primary"
      is-rounded
      class="ec-btn-dropdown__btn"
      data-test="ec-btn-dropdown__btn"
      @click="emit('click')"
    >
      {{ buttonText }}
    </ec-btn>
    <ec-dropdown-search
      :trap-focus="true"
      :items="items"
      :is-search-enabled="false"
      :max-visible-items="Infinity"
      :popover-options="popoverOptions"
      :popover-style="getPopoverStyle"
      :disabled="isBtnPopoverDisabled"
      :list-data-test="listDataTest"
      @change="(value) => emit('change', value)"
      @open="isOpen = true"
      @close="isOpen = false"
    >
      <template #item="{ item, index }">
        <span
          v-if="item.disabled"
          :data-test="`ec-btn-dropdown__item-disabled-link ec-btn-dropdown__item-link ec-btn-dropdown__item-link--${index}`"
        >
          {{ item.text }}
        </span>
        <a
          v-else-if="item.href"
          v-bind="item.attrs"
          :data-test="`ec-btn-dropdown__item-link ec-btn-dropdown__item-link--${index}`"
          class="ec-btn-dropdown__item-link"
          :href="item.href"
        >{{ item.text }}
        </a>
        <router-link
          v-else-if="item.to"
          v-bind="item.attrs"
          :data-test="`ec-btn-dropdown__item-link ec-btn-dropdown__item-link--${index}`"
          class="ec-btn-dropdown__item-link"
          :to="item.to"
        >{{ item.text }}
        </router-link>
      </template>
      <ec-btn
        :is-disabled="isBtnPopoverDisabled"
        is-reverse
        is-rounded
        category="primary"
        :class="{
          'ec-btn-dropdown__dropdown-btn': true,
          'ec-btn-dropdown__dropdown-btn--is-open': isOpen,
        }"
        data-test="ec-btn-dropdown__dropdown-btn"
        icon="simple-arrow-drop-down"
      />
    </ec-dropdown-search>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

import EcBtn from '../ec-btn';
import EcDropdownSearch from '../ec-dropdown-search';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  isBtnDropdownDisabled: {
    type: Boolean,
    default: false,
  },
  buttonText: {
    type: String,
    required: true,
  },
  listDataTest: {
    type: String,
  },
  href: {
    type: String,
  },
  to: {
    type: [String, Object],
  },
});

const emit = defineEmits(['click', 'change']);

const isOpen = ref(false);
const isBtnPopoverDisabled = computed(() => props.items.every(item => item.disabled));
const popoverOptions = {
  autoSize: 'min',
  placement: 'bottom-end',
};

const popperReference = ref(null);
function getPopoverStyle() {
  if (popperReference.value) {
    return {
      width: `${popperReference.value.offsetWidth}px`,
    };
  }

  return null;
}
</script>

<style>
.ec-btn-dropdown {
  @apply tw-inline-flex;

  max-width: 246px;

  &__dropdown-btn {
    @apply tw-rounded-l-none;
    @apply tw-border-gray-6 tw-border-l tw-border-solid;
    @apply tw-bg-gray-7;

    &--is-open {
      @apply tw-bg-key-4;
      @apply tw-border-key-4;
      @apply tw-text-gray-8;
    }

    &:hover {
      @apply tw-border-key-3;
      @apply tw-bg-key-3;
    }

    &:disabled {
      @apply tw-text-gray-5;
    }
  }

  &__btn {
    @apply tw-rounded-r-none;
    @apply tw-px-16;
    @apply tw-text-gray-3;

    &:disabled {
      @apply tw-text-gray-5;
    }
  }

  &__item-link {
    @apply tw-text-gray-3;
    @apply tw-inline-block;
    @apply tw-py-8;
    @apply tw-px-16;
    @apply tw-inset-0;
    @apply tw-w-full;
    @apply tw-h-full;
    @apply tw-absolute;

    &:focus {
      @apply tw-bg-gray-7;
    }

    &:hover {
      @apply tw-no-underline;
    }
  }
}

.ec-btn__text-link {
  @apply tw-text-gray-3;

  &:hover {
    @apply tw-no-underline;
    @apply tw-text-gray-8;
  }

  &:focus {
    @apply tw-outline-none;
  }
}
</style>
