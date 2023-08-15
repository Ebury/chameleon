<template>
  <div
    v-bind="{
      ...$attrs,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-inline-input-field` : 'ec-inline-input-field',
    }"
  >
    <div
      v-if="!isEditing"
      class="ec-inline-input-field__label"
    >{{ label }}<ec-icon
      v-if="labelTooltip"
      v-ec-tooltip="{ content: labelTooltip }"
      class="ec-inline-input-field__label-tooltip"
      data-test="ec-inline-input-field__label-tooltip"
      :type="IconType.INTERACTIVE"
      :name="IconName.SimpleInfo"
      :size="14"
    />
    </div>
    <template v-if="isEditable">
      <ec-inline-input-field-loading
        v-if="isLoading"
        :is-sensitive="isSensitive"
        :value="editedValue"
      />
      <ec-inline-input-field-edit
        v-else-if="isEditing"
        :value="value"
        :label="label"
        :is-sensitive="isSensitive"
        :error-message="errorMessage"
        :label-tooltip="labelTooltip"
        @cancel="emit('cancel')"
        @submit="submit"
      />
      <ec-inline-input-field-value-text
        ref="valueText"
        v-else
        :value="value"
        :is-sensitive="isSensitive"
        :is-btn-right-aligned="isBtnRightAligned"
        @edit="emit('edit');"
      />
    </template>

    <ec-inline-input-field-copy
      v-else-if="isCopiable"
      :tooltip-text-success="tooltipTextSuccess"
      :tooltip-text-error="tooltipTextError"
      :is-sensitive="isSensitive"
      :value="value"
      :is-btn-right-aligned="isBtnRightAligned"
    />

    <div
      v-else
      :class="{ 'ec-inline-input-field__content': true, [config.sensitiveClass]: isSensitive }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import useConfig from '../../composables/use-ec-config';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vEcTooltip from '../../directives/ec-tooltip';
import EcIcon from '../ec-icon';
import { IconName } from '../ec-icon/icon-names';
import { IconType } from '../ec-icon/types';
import EcInlineInputFieldCopy from './components/copy';
import EcInlineInputFieldEdit from './components/edit';
import type { InlineInputEditEvent, InlineInputEditEvents } from './components/edit/types';
import EcInlineInputFieldLoading from './components/loading';
import EcInlineInputFieldValueText from './components/value-text';
import type { InlineInputEvent, InlineInputEvents } from './types';

defineOptions({
  inheritAttrs: false,
});

const config = useConfig();

interface InlineInputProps {
  label?: string,
  value?: string,
  isEditable?: boolean,
  isCopiable?: boolean,
  isEditing?: boolean,
  isLoading?: boolean,
  isSensitive?: boolean,
  isBtnRightAligned?: boolean,
  tooltipTextSuccess?: string,
  tooltipTextError?: string,
  labelTooltip?: string,
  errorMessage?: string,
}

const props = withDefaults(defineProps<InlineInputProps>(), {
  label: '',
  value: '',
  isEditable: false,
  isCopiable: false,
  isEditing: false,
  isLoading: false,
  isSensitive: false,
  isBtnRightAligned: true,
  labelTooltip: '',
  errorMessage: '',
  tooltipTextSuccess: '',
  tooltipTextError: '',
});

const emit = defineEmits<{ (e: 'cancel'): void,
  (e: 'edit'): void,
  (e: 'submit', value: InlineInputEvents[InlineInputEvent.SUBMIT]): void
}>();

const editedValue = ref(props.value);

function submit(data: InlineInputEditEvents[InlineInputEditEvent.SUBMIT]) {
  if (data.value) {
    editedValue.value = data.value;
    emit('submit', data.value);
  }
}
</script>

<style>
.ec-inline-input-field {
  &__label {
    @apply tw-mini-header;
    @apply tw-flex tw-flex-wrap;
    @apply tw-normal-case;
  }

  &__label-tooltip {
    @apply tw-flex-shrink-0 tw-self-center;
    @apply tw-ml-4;
  }

  &__content {
    @apply tw-truncate;
  }
}
</style>
