<template>
  <div data-test="ec-inline-input-field-edit">
    <label
      class="ec-inline-input-field-edit__label"
      :for="inputId"
    >{{ label }}<ec-icon
      v-if="labelTooltip"
      v-ec-tooltip="{ content: labelTooltip }"
      class="ec-inline-input-field-edit__label-tooltip"
      data-test="ec-inline-input-field-edit__label-tooltip"
      :type="IconType.INTERACTIVE"
      :name="IconName.SIMPLE_INFO"
      :size="14"
    />
    </label>
    <div class="ec-inline-input-field-edit__edit-panel">
      <ec-input-field
        :id="inputId"
        ref="input"
        v-model="inputModel"
        :type="InputFieldType.TEXT"
        :is-sensitive="isSensitive"
        data-test="ec-inline-input-field-edit__input"
        :error-message="errorMessage"
        @keydown.enter="submit"
        @keydown.esc="emit('cancel');"
      />
      <div class="ec-inline-input-field-edit__actions">
        <button
          type="button"
          class="ec-inline-input-field-edit__action"
          data-test="ec-inline-input-field-edit__submit-action"
          @click="submit"
        >
          <ec-icon
            class="ec-inline-input-field-edit__action-icon"
            :name="IconName.SIMPLE_CHECK"
            :size="16"
          />
        </button>
        <button
          type="button"
          class="ec-inline-input-field-edit__action"
          data-test="ec-inline-input-field-edit__cancel-action"
          @click="emit('cancel');"
        >
          <ec-icon
            class="ec-inline-input-field-edit__action-icon"
            :name="IconName.SIMPLE_CLOSE"
            :size="16"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';

import type { Maybe } from '../../../../../global';
import vEcTooltip from '../../../../directives/ec-tooltip';
import { getUid } from '../../../../utils/uid';
import EcIcon from '../../../ec-icon';
import { IconName } from '../../../ec-icon/icon-names';
import { IconType } from '../../../ec-icon/types';
import EcInputField from '../../../ec-input-field';
import { InputFieldType } from '../../../ec-input-field/types';
import { InlineInputEditEvent, type InlineInputEditEvents, type InlineInputEditProps } from './types';

const props = withDefaults(defineProps<InlineInputEditProps>(), {
  label: '',
  value: '',
  isSensitive: false,
  labelTooltip: '',
  errorMessage: '',
});

const inputId = `ec-inline-input-field-edit__input-${getUid()}`;
const inputModel = ref(props.value);
const input = ref<Maybe<HTMLInputElement>>(null);

const emit = defineEmits<{ (e: 'cancel'): void,
  (e: 'submit', value: InlineInputEditEvents[InlineInputEditEvent.SUBMIT]): void
}>();

onMounted(() => {
  nextTick(() => {
    if (input.value) {
      input.value.focus();
    }
  });
});

function submit() {
  emit(InlineInputEditEvent.SUBMIT, { value: inputModel.value });
}
</script>

<style>
.ec-inline-input-field-edit {
  &__label {
    @apply tw-mini-header;
    @apply tw-flex tw-flex-wrap;
    @apply tw-normal-case;
  }

  &__label-tooltip {
    @apply tw-flex-shrink-0 tw-self-center;
    @apply tw-ml-4;
  }

  &__edit-panel {
    @apply tw-w-full;
    @apply tw-flex;
  }

  &__actions {
    @apply tw-flex tw-items-center;
    @apply tw-ml-20;

    height: var(--ec-input-field-height);
  }

  &__action {
    @apply tw-border-0;
    @apply tw-p-0;
    @apply tw-bg-transparent tw-fill-key-4;
    @apply tw-outline-none;
    @apply tw-leading-reset;

    &:focus {
      @apply tw-fill-key-3;
    }

    &:not(:first-child) {
      @apply tw-ml-8;
    }
  }

  &__action-icon:hover {
    @apply tw-cursor-pointer;
    @apply tw-fill-key-3;
  }
}
</style>
