<template>
  <div
    data-test="ec-file-list"
    class="ec-file-list"
  >
    <div
      v-for="(item, index) in items"
      :key="index"
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

      <ec-btn
        :is-disabled="isDeleteDisabled"
        :is-submit="false"
        :icon="'simple-outline-delete'"
        class="ec-file-list__delete-btn"
        :data-test="`ec-file-list__delete-btn--${index}`"
        @click="onDelete(item)"
      >
        <span class="tw-sr-only">Delete document</span>
      </ec-btn>
    </div>
  </div>
</template>

<script>
import EcBtn from '../ec-btn';
import EcIcon from '../ec-icon';

export default {
  name: 'EcFileList',
  components: {
    EcIcon,
    EcBtn,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    isDeleteDisabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onDelete(item) {
      this.$emit('delete', item);
    },
  },
};
</script>

<style>
  .ec-file-list {
    &__item {
      @apply tw-flex tw-flex-row tw-items-center;
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
      @apply tw-border-none;
      @apply tw-bg-transparent tw-fill-gray-4;
      @apply tw-pr-0;

      @media screen and (max-width: 480px) {
        @apply tw-px-0;
      }

      &:disabled {
        @apply tw-pointer-events-none;
        @apply tw-bg-transparent;
        @apply tw-fill-gray-6;
      }

      &:hover,
      &:focus {
        @apply tw-cursor-pointer;
        @apply tw-fill-key-4;
      }
    }
  }
</style>
