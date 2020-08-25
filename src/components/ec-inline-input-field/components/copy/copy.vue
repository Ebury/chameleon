<template>
  <div
    class="ec-inline-input-field-copy"
    data-test="ec-inline-input-field-copy"
  >
    <span class="ec-inline-input-field-copy__text">
      {{ value }}
    </span>

    <button
      type="button"
      class="ec-inline-input-field-copy__action"
      data-test="ec-inline-input-field-copy__action"
      @click="copy"
    >
      <ec-icon
        class="ec-inline-input-field-copy__icon"
        name="simple-copy"
        :size="16"
      />
    </button>
  </div>
</template>

<script>
import clipboardCopy from 'clipboard-copy';
import EcIcon from '../../../ec-icon';

export default {
  name: 'EcInlineInputFieldCopy',
  components: { EcIcon },
  props: {
    value: {
      default: '',
      type: String,
    },
  },
  methods: {
    copy() {
      clipboardCopy(this.value);
    },
  },
};
</script>

<style>
.ec-inline-input-field-copy {
  @apply tw-w-full;
  @apply tw-flex tw-justify-between tw-items-center;

  &__text {
    @apply tw-truncate;
  }

  &__action {
    @apply tw-border-0;
    @apply tw-bg-transparent tw-fill-gray-4;
    @apply tw-outline-none;

    &:hover,
    &:focus {
      @apply tw-fill-key-4;
    }

    &:hover {
      @apply tw-cursor-pointer;
    }
  }

  &__icon {
    @apply tw-opacity-0;

    .ec-inline-input-field-copy:hover & {
      @apply tw-opacity-100;
    }
  }
}
</style>
