<template>
  <div
    v-bind="{
      ...$attrs,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-file-upload` : 'ec-file-upload',
    }"
  >
    <label
      v-if="label || note"
      class="ec-file-upload__label"
    >
      <span
        v-if="label"
        data-test="ec-file-upload__label-text"
        class="ec-file-upload__label-text"
      >{{ label }}</span>

      <span
        v-if="note"
        data-test="ec-file-upload__label-note"
        class="ec-file-upload__label-note"
      >{{ note }}</span>
    </label>

    <ec-file-dropzone
      data-test="ec-file-upload__dropzone"
      :is-disabled="isDisabled"
      @change="onChange"
    >
      <template #title><slot name="title" /></template>
      <template #subtitle><slot name="subtitle" /></template>
    </ec-file-dropzone>

    <div
      data-test="ec-file-upload__help-text"
      class="ec-file-upload__help-text"
    >
      <slot name="help-text" />
    </div>

    <ec-file-list
      data-test="ec-file-upload__list"
      :items="modelValue"
      :is-delete-disabled="isDisabled"
      @delete="onDelete"
    />
  </div>
</template>

<script setup>
import EcFileDropzone from '../ec-file-dropzone';
import EcFileList from '../ec-file-list';

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits(['update:modelValue', 'change']);

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => ([]),
  },
  label: {
    type: String,
  },
  note: {
    type: String,
  },
  isDisabled: {
    type: Boolean,
  },
});

function onChange(newFiles) {
  const newFilesNames = new Set(newFiles.map(file => file.name));
  const updatedFileList = props.modelValue.filter(prevFile => !newFilesNames.has(prevFile.name));
  update([...updatedFileList, ...newFiles]);
}

function onDelete(fileToDelete) {
  update(props.modelValue.filter(fileItem => fileItem !== fileToDelete));
}

function update(items) {
  emit('update:modelValue', items);
  emit('change', items);
}
</script>

<style>
.ec-file-upload {
  &__help-text {
    @apply tw-help-text;
    @apply tw-text-gray-5;
    @apply tw-mt-4 tw-mb-16;
  }

  &__label {
    @apply tw-flex tw-flex-wrap;
  }

  &__label-text {
    @apply tw-input-label;
    @apply tw-flex-grow;
    @apply tw-mr-8;
  }

  &__label-note {
    @apply tw-caption-text;
  }
}
</style>
