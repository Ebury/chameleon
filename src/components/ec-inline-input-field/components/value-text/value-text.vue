<template>
  <div
    class="ec-inline-input-field-value-text"
    :class="(isBtnRightAligned ? 'tw-justify-between' : 'tw-justify-start')"
    data-test="ec-inline-input-field-value-text"
  >
    <span
      :class="{ 'ec-inline-input-field-value-text__text': true, [config.sensitiveClass]: isSensitive }"
      :title="value"
    >
      {{ value }}
    </span>
    <button
      type="button"
      class="ec-inline-input-field-value-text__action"
      data-test="ec-inline-input-field-value-text__action"
      @click="emit('edit');"
    >
      <ec-icon
        class="ec-inline-input-field-value-text__edit-icon"
        :name="IconName.SimpleEdit"
        :size="16"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import useConfig from '../../../../composables/use-ec-config';
import EcIcon from '../../../ec-icon';
import { IconName } from '../../../ec-icon/icon-names';
import type { InlineInputProps } from '../../types';

const config = useConfig();

interface InlineInputValueTextProps {
  value?: InlineInputProps['value'],
  isSensitive?: InlineInputProps['isSensitive'],
  isBtnRightAligned?: InlineInputProps['isBtnRightAligned'],
}

withDefaults(defineProps<InlineInputValueTextProps>(), {
  value: '',
  isSensitive: false,
  isBtnRightAligned: true,
});

const emit = defineEmits<{ (e: 'edit'): void }>();

</script>

<style>
.ec-inline-input-field-value-text {
  @apply tw-w-full;
  @apply tw-flex tw-items-center;

  &__text {
    @apply tw-truncate;
  }

  &__action {
    @apply tw-border-0;
    @apply tw-bg-transparent tw-fill-gray-4;
    @apply tw-outline-none;

    line-height: 0;

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
