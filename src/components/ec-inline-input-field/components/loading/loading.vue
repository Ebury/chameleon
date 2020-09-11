<template>
  <div
    class="ec-inline-input-field-loading"
    data-test="ec-inline-input-field-loading"
  >
    <ec-input-field
      readonly
      :value="value"
      :is-sensitive="isSensitive"
      :is-loading="true"
    />
    <div class="ec-inline-input-field-loading__ghost-actions">
      <ec-icon
        name="simple-check"
        :size="16"
      />
      <ec-icon
        class="ec-inline-input-field-loading__close-action"
        name="simple-close"
        :size="16"
      />
    </div>
  </div>
</template>

<script>
import EcIcon from '../../../ec-icon';
import EcInputField from '../../../ec-input-field';

export default {
  name: 'EcInlineInputFieldLoading',
  components: { EcIcon, EcInputField },
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
};
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
