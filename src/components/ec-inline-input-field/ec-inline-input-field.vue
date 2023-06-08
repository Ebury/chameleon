<template>
  <div :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-inline-input-field` : 'ec-inline-input-field'">
    <div
      v-if="!isEditing"
      class="ec-inline-input-field__label"
    >{{ label }}<ec-icon
      v-if="labelTooltip"
      v-ec-tooltip="{ content: labelTooltip }"
      class="ec-inline-input-field__label-tooltip"
      data-test="ec-inline-input-field__label-tooltip"
      type="interactive"
      name="simple-info"
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
        @edit="emit('edit');"
      />
    </template>

    <ec-inline-input-field-copy
      v-else-if="isCopiable"
      :tooltip-text-success="tooltipTextSuccess"
      :tooltip-text-error="tooltipTextError"
      :is-sensitive="isSensitive"
      :value="value"
    />

    <div
      v-else
      :class="{ 'ec-inline-input-field__content': true, [config.sensitiveClass]: isSensitive }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import useConfig from '../../composables/use-ec-config';
import VEcTooltip from '../../directives/ec-tooltip';
import EcIcon from '../ec-icon';
import EcInlineInputFieldCopy from './components/copy';
import EcInlineInputFieldEdit from './components/edit';
import EcInlineInputFieldLoading from './components/loading';
import EcInlineInputFieldValueText from './components/value-text';

const config = useConfig();

const props = defineProps({
  label: {
    default: '',
    type: String,
  },
  isEditable: {
    type: Boolean,
    default: false,
  },
  isCopiable: {
    type: Boolean,
    default: false,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isSensitive: {
    type: Boolean,
    default: false,
  },
  value: {
    default: '',
    type: String,
  },
  tooltipTextSuccess: {
    type: String,
  },
  tooltipTextError: {
    type: String,
  },
  labelTooltip: {
    default: '',
    type: String,
  },
  errorMessage: {
    default: '',
    type: String,
  },
});

const emit = defineEmits(['cancel', 'edit', 'submit']);

const editedValue = ref(props.value);

function submit(data) {
  editedValue.value = data.value;
  emit('submit', data.value);
}
</script>

<style>
.ec-inline-input-field {
  &__label {
    @apply tw-mini-header;
    @apply tw-flex tw-flex-wrap;
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
