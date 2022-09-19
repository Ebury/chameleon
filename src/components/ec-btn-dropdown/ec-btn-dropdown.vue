<template>
  <div
    ref="popperReference"
    class="ec-btn-dropdown"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-btn-dropdown` : 'ec-btn-dropdown'"
  >
    <ec-btn
      :is-disabled="isDisabled"
      :is-submit="false"
      is-reverse
      category="primary"
      is-rounded
      class="ec-btn-dropdown__btn"
      data-test="ec-btn-dropdown__btn"
      @click="emit('click')"
    >
      <slot
        name="ctabtnlink"
        v-bind="{buttonText}"
      >
        {{ buttonText }}
      </slot>
    </ec-btn>
    <ec-dropdown-search
      :items="items"
      :is-search-enabled="false"
      :max-visible-items="Infinity"
      :popover-options="popoverOptions"
      :popover-style="getPopoverStyle"
      :disabled="isDisabled"
      :list-data-test="listDataTest"
      @change="(value) => emit('change', value)"
      @open="isOpen = true"
      @close="isOpen = false"
    >
      <template #item="{ item }">
        <a
          v-if="item.href"
          class="ec-btn-dropdown__item-link"
          :href="item.href"
          v-on="item.on || {}"
        >{{ item.text
        }}</a>
        <router-link
          v-else
          class="ec-btn-dropdown__item-link"
          :to="item.to"
          v-on="item.on || {}"
        >{{ item.text }}
        </router-link>
      </template>

      <ec-btn
        :is-disabled="isDisabled"
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
import { ref } from 'vue';

import EcBtn from '../ec-btn';
import EcDropdownSearch from '../ec-dropdown-search';

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  isDisabled: {
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
});

const emit = defineEmits(['click', 'change']);

const isOpen = ref(false);
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

<script>
export default {
  name: 'EcBtnDropdown',
  compatConfig: {
    MODE: 3,
  },
};
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

    &:hover {
      @apply tw-no-underline;
    }
  }
}

.ec-btn-dropdown__btn:hover .ec-btn__text-link {
  @apply tw-text-gray-8;
}

.ec-btn__text-link {
  @apply tw-text-gray-3;

  &:hover {
    @apply tw-no-underline;
  }

  &:focus {
    @apply tw-outline-none;
  }
}
</style>
