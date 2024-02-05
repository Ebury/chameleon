<template>
  <div
    class="ec-text-filter"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-text-filter` : 'ec-text-filter'"
  >
    <ec-input-field
      v-model="inputModel"
      v-bind="inputProps"
      :left-icon="IconName.SIMPLE_SEARCH"
      :type="InputFieldType.TEXT"
      :icon="rightIcon"
      @icon-click="emitModelValue('')"
    />
  </div>
</template>

<script setup lang="ts">
import { debounce } from 'lodash';
import { computed } from 'vue';

import { IconName } from '../ec-icon/icon-names';
import EcInputField from '../ec-input-field';
import type { InputFieldProps } from '../ec-input-field/types';
import { InputFieldType } from '../ec-input-field/types';
import type { TextFilterEvents } from './types';
import { TextFilterEvent } from './types';

interface TextFilterProps {
  modelValue?: InputFieldProps['modelValue']
  inputProps?: InputFieldProps
  debounceTime?: number
}

const props = withDefaults(
  defineProps<TextFilterProps>(),
  {
    debounceTime: 300,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: TextFilterEvents[TextFilterEvent.UPDATE_MODEL_VALUE]],
  'change': [value: TextFilterEvents[TextFilterEvent.CHANGE]],
}>();

const debouncedEmitModelValue = debounce(emitModelValue, props.debounceTime);

const inputModel = computed<TextFilterProps['modelValue']>({
  get() {
    return props.modelValue;
  },
  set(value) {
    debouncedEmitModelValue(value);
  },
});

function emitModelValue(value: TextFilterProps['modelValue']) {
  emit(TextFilterEvent.UPDATE_MODEL_VALUE, value);
  emit(TextFilterEvent.CHANGE, value);
}

const rightIcon = computed(() => (props.modelValue ? IconName.SIMPLE_CLOSE : undefined));
</script>
