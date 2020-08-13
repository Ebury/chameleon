<template>
  <div class="tw-w-full tw-flex tw-justify-between tw-items-center">
    <span class="tw-truncate">{{ value }}</span>
    <button
      class="ec-inline-input-field-read-only__action"
      @click.enter="edit"
    >
      <ec-icon
        class="ec-inline-input-field-read-only__edit-icon"
        name="simple-edit"
        :size="16"
        type="interactive"
      />
    </button>
  </div>
</template>

<script>
import EcIcon from '@/components/ec-icon';

export default {
  name: 'EcInlineInputFieldReadOnly',
  components: { EcIcon },
  props: {
    value: {
      default: '',
      type: String,
    },
  },
  methods: {
    edit() {
      this.$emit('edit');
    },
  },
};
</script>

<style>
.ec-inline-input-field-read-only {
  &__action {
    @apply tw-border-0;
    @apply tw-bg-transparent;
    @apply tw-outline-none;
  }

  &__action:focus &__edit-icon {
    @apply tw-fill-key-4;
  }

  &__edit-icon:hover {
    @apply tw-fill-key-4;
    @apply tw-cursor-pointer;
  }
}
</style>
