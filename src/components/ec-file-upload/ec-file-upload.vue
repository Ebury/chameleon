<template>
  <div :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-file-upload` : 'ec-file-upload'">
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
      <slot
        name="title"
        slot="title"
      />

      <slot
        name="subtitle"
        slot="subtitle"
      />
    </ec-file-dropzone>

    <div
      data-test="ec-file-upload__help-text"
      class="ec-file-upload__help-text"
      :class="{ 'ec-file-upload__help-text--is-disabled': isDisabled }"
    >
      <slot name="help-text" />
    </div>

    <ec-file-list
      data-test="ec-file-upload__list"
      :items="value"
      :is-delete-disabled="isDisabled"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import EcFileDropzone from '../ec-file-dropzone';
import EcFileList from '../ec-file-list';

export default {
  name: 'EcFileUpload',
  components: {
    EcFileDropzone,
    EcFileList,
  },
  model: {
    prop: 'value',
    event: 'change',
  },
  props: {
    value: {
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
  },
  methods: {
    onChange(newFiles) {
      let updatedFileList = [...this.value];

      for (const newFile of newFiles) {
        if (!this.value.some(prevFile => prevFile.name === newFile.name)) {
          updatedFileList.push(newFile);
        } else {
          updatedFileList = updatedFileList.filter(prevFile => prevFile.name !== newFile.name);
          updatedFileList.push(newFile);
        }
      }

      this.$emit('change', updatedFileList);
    },
    onDelete(fileToDelete) {
      this.$emit('change', this.value.filter(fileItem => fileItem !== fileToDelete));
    },
  },
};
</script>

<style>
.ec-file-upload {
  &__help-text {
    @apply tw-help-text;
    @apply tw-text-gray-5;
    @apply tw-mt-4 tw-mb-16;

    &--disabled {
      @apply tw-cursor-not-allowed;
      @apply tw-bg-gray-7;
    }
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
