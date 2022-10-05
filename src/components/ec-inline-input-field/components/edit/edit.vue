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
      type="interactive"
      name="simple-info"
      :size="14"
    />
    </label>
    <div class="ec-inline-input-field-edit__edit-panel">
      <ec-input-field
        :id="inputId"
        ref="input"
        v-model="inputModel"
        type="text"
        :is-sensitive="isSensitive"
        data-test="ec-inline-input-field-edit__input"
        :error-message="errorMessage"
        @keydown.enter="submit"
        @keydown.esc="cancel"
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
            name="simple-check"
            :size="16"
          />
        </button>
        <button
          type="button"
          class="ec-inline-input-field-edit__action"
          data-test="ec-inline-input-field-edit__cancel-action"
          @click="cancel"
        >
          <ec-icon
            class="ec-inline-input-field-edit__action-icon"
            name="simple-close"
            :size="16"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  computed, nextTick, onMounted, ref,
} from 'vue';

import VEcTooltip from '../../../../directives/ec-tooltip';
import { getUid } from '../../../../utils/uid';
import EcIcon from '../../../ec-icon';
import EcInputField from '../../../ec-input-field';

const inputId = computed(() => `ec-inline-input-field-edit__input-${getUid()}`);

const props = defineProps({
  label: {
    default: '',
    type: String,
  },
  value: {
    default: '',
    type: String,
  },
  isSensitive: {
    type: Boolean,
    default: false,
  },
  errorMessage: {
    default: '',
    type: String,
  },
  labelTooltip: {
    default: '',
    type: String,
  },
});

const emit = defineEmits(['cancel', 'submit', 'update:value']);

const inputModel = computed({
  get() {
    return props.value;
  },
  set(value) {
    emit('update:value', value);
  },
});

const input = ref(null);

onMounted(() => {
  nextTick(() => {
    input.value.focus();
  });
});

function cancel() {
  emit('cancel');
}

function submit() {
  emit('submit', { value: inputModel.value });
}
</script>

<style>
.ec-inline-input-field-edit {
  &__label {
    @apply tw-mini-header;
    @apply tw-flex tw-flex-wrap;
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

    line-height: 0;

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
