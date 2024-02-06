<template>
  <div
    class="ec-inline-input-field-loading"
    data-test="ec-inline-input-field-loading"
  >
    <ec-input-field
      readonly
      :model-value="value"
      :is-sensitive="isSensitive"
      :is-loading="true"
    />
    <div class="ec-inline-input-field-loading__ghost-actions">
      <ec-icon
        :name="IconName.SIMPLE_CHECK"
        :size="16"
      />
      <ec-icon
        class="ec-inline-input-field-loading__close-action"
        :name="IconName.SIMPLE_CLOSE"
        :size="16"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import EcIcon from '../../../ec-icon';
import { IconName } from '../../../ec-icon/icon-names';
import EcInputField from '../../../ec-input-field';
import type { InlineInputLoadingProps } from './types';

withDefaults(defineProps<InlineInputLoadingProps>(), {
  value: '',
  isSensitive: false,
});
</script>

<style>
.ec-inline-input-field-loading {
  @apply tw-flex;

  &__ghost-actions {
    @apply tw-flex tw-items-center;
    @apply tw-ml-20;
    @apply tw-fill-gray-6;
  }

  &__close-action {
    @apply tw-ml-8;
  }
}
</style>
