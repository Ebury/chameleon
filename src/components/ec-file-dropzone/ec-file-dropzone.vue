<template>
  <div
    data-test="ec-file-dropzone"
    class="ec-file-dropzone"
    :class="{ 'ec-file-dropzone--dragging': isDragging }"
    @drop.prevent.stop="onComponentDrop"
  >
    <input
      :id="id"
      ref="fileInput"
      data-test="ec-file-dropzone__input"
      type="file"
      class="ec-file-dropzone__input"
      multiple
      @change="onFileInputChange"
    >

    <svg
      height="40"
      width="50"
      class="ec-file-dropzone__img"
    >
      <use href="../../assets/img/upload-cloud.svg#ec-upload-cloud" />
    </svg>

    <h3 data-test="ec-file-dropzone__title">
      <slot name="title" />
    </h3>

    <label
      :for="id"
      class="ec-file-dropzone__subtitle"
      data-test="ec-file-dropzone__subtitle"
    >
      <slot name="subtitle" />
    </label>
  </div>
</template>

<script>
import { getUid } from '../../utils/uid';

const isNotFolder = file => !!file.type && !!file.size;

export default {
  name: 'EcFileDropzone',
  data() {
    return {
      uid: getUid(),
      dragEnterLeaveEventCounter: 0,
    };
  },
  computed: {
    id() {
      return `ec-file-dropzone-${this.uid}`;
    },
    isDragging() {
      return this.dragEnterLeaveEventCounter > 0;
    },
  },
  mounted() {
    document.addEventListener('dragenter', this.onDragenter);
    document.addEventListener('dragover', this.onDragover);
    document.addEventListener('dragleave', this.onDragleave);
    document.addEventListener('drop', this.onDrop);
  },
  beforeDestroy() {
    document.removeEventListener('dragenter', this.onDragenter);
    document.removeEventListener('dragover', this.onDragover);
    document.removeEventListener('dragleave', this.onDragleave);
    document.removeEventListener('drop', this.onDrop);
  },
  methods: {
    onFileInputChange() {
      const files = [...this.$refs.fileInput.files].filter(isNotFolder);
      if (files.length) {
        this.$emit('change', files);
      }
    },
    onComponentDrop(dragEvent) {
      const files = [...dragEvent.dataTransfer.files].filter(isNotFolder);
      if (files.length) {
        this.$emit('change', files);
      }
      this.disableDragging();
    },
    onDrop(dragEvent) {
      dragEvent.preventDefault();
      this.disableDragging();
    },
    onDragenter() {
      this.dragEnterLeaveEventCounter++;
    },
    onDragover(dragEvent) {
      // Necessary for the drop listener to work:
      // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#define_a_drop_zone
      dragEvent.preventDefault();
    },
    onDragleave() {
      this.dragEnterLeaveEventCounter--;
    },
    disableDragging() {
      this.dragEnterLeaveEventCounter = 0;
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

  &__input {
    @apply tw-hidden;
  }

  &__img {
    @apply tw-fill-key-4 tw-mb-8;
  }

  &__subtitle {
    @apply tw-small-text tw-cursor-pointer;
  }

  &--dragging {
    @apply tw-border-key-4;
  }
}
</style>
