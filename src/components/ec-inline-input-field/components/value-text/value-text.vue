<template>
  <div
    class="ec-inline-input-field-value-text"
    data-test="ec-inline-input-field-value-text"
  >
    <span
      :class="textClasses"
    >
      {{ value }}
    </span>
    <button
      type="button"
      class="ec-inline-input-field-value-text__action"
      data-test="ec-inline-input-field-value-text__action"
      @click="edit"
    >
      <ec-icon
        class="ec-inline-input-field-value-text__edit-icon"
        name="simple-edit"
        :size="16"
      />
    </button>
  </div>
</template>

<script>
import EcIcon from '../../../ec-icon';
import config from '../../../../config';

export default {
  name: 'EcInlineInputFieldValueText',
  components: { EcIcon },
  props: {
    value: {
      default: '',
      type: String,
    },
    isSensitive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    textClasses() {
      const classes = ['ec-inline-input-field-value-text__text'];

      if (this.isSensitive) {
        classes.push(config.sensitiveClass);
      }

      return classes;
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
.ec-inline-input-field-value-text {
  @apply tw-w-full;
  @apply tw-flex tw-justify-between tw-items-center;

  &__text {
    @apply tw-truncate;
  }

  &__action {
    @apply tw-border-0;
    @apply tw-bg-transparent tw-fill-gray-4;
    @apply tw-outline-none;

    &:focus {
      @apply tw-fill-key-4;
    }
  }

  &__edit-icon:hover {
    @apply tw-fill-key-4;
    @apply tw-cursor-pointer;
  }
}
</style>
