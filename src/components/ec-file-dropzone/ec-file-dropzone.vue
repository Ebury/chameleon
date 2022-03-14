<template>
  <div
    data-test="ec-file-dropzone"
    class="ec-file-dropzone"
    :class="{ 'ec-file-dropzone--dragging': isDragging }"
    @drop="onDrop"
    @dragover="enableDragging"
    @dragleave="disableDragging"
  >
    <input
      id="ec-file-dropzone__input"
      ref="fileInput"
      data-test="ec-file-dropzone__input"
      type="file"
      class="tw-hidden"
      multiple
      @change="onFileInputChange"
    >

    <svg
      height="40"
      width="50"
      class="tw-fill-key-4 tw-mb-8"
    >
      <use href="../../assets/img/upload-cloud.svg#ec-upload-cloud" />
    </svg>

    <h3 data-test="ec-file-dropzone__title">
      <slot name="title" />
    </h3>

    <label
      for="ec-file-dropzone__input"
      class="tw-small-text tw-cursor-pointer"
      data-test="ec-file-dropzone__subtitle"
    >
      <slot name="subtitle" />
    </label>
  </div>
</template>

<script>
export default {
  name: 'EcFileDropzone',
  data() {
    return {
      fileList: [],
      isDragging: false,
    };
  },
  watch: {
    fileList(fileList) {
      this.$emit('change', fileList);
    },
  },
  mounted() {
    document.addEventListener('dragover', this.enableDragging);
    document.addEventListener('dragleave', this.disableDragging);
    document.addEventListener('drop', this.disableDragging);
  },
  beforeDestroy() {
    document.removeEventListener('dragover', this.enableDragging);
    document.removeEventListener('dragleave', this.disableDragging);
    document.removeEventListener('drop', this.disableDragging);
  },
  methods: {
    onFileInputChange() {
      this.fileList = [...this.$refs.fileInput.files];
    },
    onDrop(dragEvent) {
      this.disableDragging(dragEvent);
      this.fileList = [...dragEvent.dataTransfer.files];
    },
    enableDragging(evt) {
      evt.preventDefault();
      this.isDragging = true;
    },
    disableDragging(evt) {
      evt.preventDefault();
      this.isDragging = false;
    },
  },
};
</script>

<style>
.ec-file-dropzone {
  @apply tw-flex tw-flex-col tw-items-center;
  @apply tw-p-32;
  @apply tw-border tw-border-dashed tw-border-gray-6;
  @apply tw-rounded;

  &--dragging {
    @apply tw-border-key-4;
  }
}
</style>
