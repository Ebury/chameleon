<template>
  <div
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-file-list` : 'ec-file-list'"
    class="ec-file-list"
  >
    <div
      v-for="(item, index) in items"
      :key="item.name"
      class="ec-file-list__item"
      :data-test="`ec-file-list__item ec-file-list__item--${index}`"
    >

      <ec-icon
        class="ec-file-list__document-icon"
        data-test="ec-file-list__document-icon"
        name="simple-document"
        type="interactive"
        :size="20"
      />

      <span
        class="ec-file-list__name"
        :title="item.name"
        :data-test="`ec-file-list__name ec-file-list__name--${index}`"
      >
        {{ item.name }}
      </span>

      <button
        type="button"
        class="ec-file-list__delete-btn"
        :data-test="`ec-file-list__delete-btn--${index}`"
        :disabled="isDeleteDisabled"
        @click="onDelete(item)"
      >
        <span class="tw-sr-only">Delete document</span>
        <ec-icon
          class="ec-file-list__delete-icon"
          :data-test="`ec-file-list__delete-icon ec-file-list__delete-icon--${index}`"
          name="simple-outline-delete"
          type="interactive"
          :size="18"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
import EcIcon from '../ec-icon';

const emit = defineEmits(['delete']);

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  isDeleteDisabled: {
    type: Boolean,
    default: false,
  },
});

function onDelete(item) {
  emit('delete', item);
}
</script>

<style>
  .ec-file-list {
    &__item {
      @apply tw-flex tw-flex-row tw-items-center;
      @apply tw-pb-8;
    }

    &__name {
      @apply tw-w-full;
      @apply tw-px-4;
      @apply tw-text-gray-3;
      @apply tw-truncate;
    }

    &__document-icon {
      @apply tw-w-24 tw-h-24;
      @apply tw-fill-gray-4;
    }

    &__delete-btn {
      @apply tw-cursor-pointer;
      @apply tw-border-none;
      @apply tw-bg-transparent;
      @apply tw-px-0;
      @apply tw-w-20 tw-h-20;
      @apply tw-text-gray-4;

      &:focus,
      &:hover {
        @apply tw-outline-none;
        @apply tw-text-key-4;
      }

      &:disabled {
        @apply tw-cursor-default;
        @apply tw-text-gray-6;

        &:focus,
        &:hover {
          @apply tw-text-gray-6;
        }
      }
    }

    &__delete-icon {
      @apply tw-ml-auto;
      @apply tw-fill-current;
    }
  }
</style>
