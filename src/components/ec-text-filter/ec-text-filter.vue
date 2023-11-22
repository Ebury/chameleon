<template>
  <div
    class="ec-text-filter"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-text-filter` : 'ec-text-filter'"
  >
    <ec-input-field
      ref="inputField"
      v-model="inputModel"
      v-bind="inputProps"
      :left-icon="IconName.SimpleSearch"
      :type="InputFieldType.TEXT"
      :icon="rightIcon"
      @icon-click="emitModelValue('')"
    />
  </div>
</template>

<script setup lang="ts">
import { useElementSize } from '@vueuse/core';
import { debounce } from 'lodash';
import { computed, ref, watch } from 'vue';

import type { Maybe } from '@ebury/chameleon-components/global';

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
  'change:width': [value: number]
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

const rightIcon = computed(() => (props.modelValue ? IconName.SimpleClose : undefined));

const inputField = ref<Maybe<HTMLInputElement>>(null);
const { width: inputWidth } = useElementSize(inputField);

watch(() => inputWidth.value, () => {
  emit('change:width', inputWidth.value);
});
</script>
