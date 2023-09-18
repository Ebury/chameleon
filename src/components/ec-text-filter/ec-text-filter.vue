<template>
  <div
    class="ec-text-filter"
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-text-filter` : 'ec-text-filter'"
  >
    <ec-input-field
      v-model="inputModel"
      v-bind="inputProps"
      :left-icon="IconName.SimpleSearch"
      :type="InputFieldType.TEXT"
      :icon="rightIcon"
      @icon-click="emit(TextFilterEvent.CHANGE, '')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { IconName } from '../ec-icon/icon-names';
import EcInputField from '../ec-input-field/ec-input-field.vue';
import type { InputFieldProps } from '../ec-input-field/types';
import { InputFieldType } from '../ec-input-field/types';
import type { TextFilterEvents } from './types';
import { TextFilterEvent } from './types';

interface TextFilterProps {
  modelValue?: InputFieldProps['modelValue']
  inputProps?: InputFieldProps
}

const props = defineProps<TextFilterProps>();

const emit = defineEmits<{
  'change': [value: TextFilterEvents[TextFilterEvent.CHANGE]],
}>();

const inputModel = computed<TextFilterProps['modelValue']>({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit(TextFilterEvent.CHANGE, value as unknown as TextFilterEvents[TextFilterEvent.CHANGE]);
  },
});

const rightIcon = computed(() => (props.modelValue ? IconName.SimpleClose : undefined));
</script>
