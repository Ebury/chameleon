<template>
  <div
    data-test="ec-file-list"
    class="ec-file-list"
  >
    <div
      v-for="(item, index) in items"
      :key="item.name"
      ref="items"
      class="ec-file-list__item"
      :data-test="`ec-file-list__item ec-file-list__item--${index}`"
    >

      <ec-icon
        class="ec-file-list__doc-icon"
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

      <ec-icon
        class="ec-file-list__delete-icon"
        :class=" { 'ec-file-list__delete-icon--is-disabled': isDeleteDisabled }"
        :data-test="`ec-file-list__delete-icon ec-file-list__delete-icon----${index}`"
        name="simple-outline-delete"
        type="interactive"
        :size="20"
        @click="onDelete(item)"
      />

    </div>
  </div>
</template>

<script>
import EcIcon from '../ec-icon';

export default {
  name: 'EcFileList',
  components: {
    EcIcon,
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
  data() {
    return {
      name: 'test',
    };
  },
  methods: {
    onDelete(item) {
      /* istanbul ignore else */
      if (!this.isDeleteDisabled) this.$emit('delete', item);
    },
  },
};
</script>

<style>
  .ec-file-list {
    &__item {
      @apply tw-flex tw-flex-row;
      @apply tw-pb-8;
      @apply tw-items-center;
    }

    &__name {
      @apply tw-w-5/5;
      @apply tw-px-4;
      @apply tw-text-gray-3;
      @apply tw-overflow-hidden tw-overflow-ellipsis;
      @apply tw-whitespace-nowrap;
    }

    &__doc-icon {
      @apply tw-w-24 tw-h-24;
      @apply tw-fill-gray-4;
    }

    &__delete-icon {
      @apply tw-cursor-pointer;
      @apply tw-ml-auto;
      @apply tw-fill-gray-4;
      @apply tw-w-20 tw-h-20;

      &:focus,
      &:hover {
        @apply tw-fill-key-4;
      }

      &--is-disabled {
        @apply tw-fill-gray-6;
        @apply tw-cursor-default;

        &:focus,
        &:hover {
          @apply tw-fill-gray-6;
        }
      }
    }
  }
</style>
