<template>
  <div
    :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-file-dropzone` : 'ec-file-dropzone'"
    class="ec-file-dropzone"
    :class="{
      'ec-file-dropzone--dragging': isDragging && !isDisabled,
      'ec-file-dropzone--is-disabled': isDisabled
    }"
    @drop.prevent.stop="onComponentDrop"
  >
    <input
      ref="fileInput"
      data-test="ec-file-dropzone__input"
      type="file"
      class="ec-file-dropzone__input"
      multiple
      :disabled="isDisabled"
      @change="onFileInputChange"
    >

    <svg
      height="40"
      width="50"
      class="ec-file-dropzone__img"
      :class="{'ec-file-dropzone__img--is-disabled': isDisabled}"
    >
      <use href="../../assets/img/upload-cloud.svg#ec-upload-cloud" />
    </svg>

    <div
      data-test="ec-file-dropzone__title"
      class="ec-file-dropzone__title"
      :class="{ 'ec-file-dropzone__title--is-disabled': isDisabled }"
    >
      <slot name="title" />
    </div>

    <div
      data-test="ec-file-dropzone__subtitle"
      class="ec-file-dropzone__subtitle"
      :class="{'ec-file-dropzone__subtitle--is-disabled': isDisabled}"
      @click="$refs.fileInput.click()"
    >
      <slot name="subtitle" />
    </div>
  </div>
</template>

<script>

const isNotFolder = file => !!file.type && !!file.size;

export default {
  name: 'EcFileDropzone',
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dragEnterLeaveEventCounter: 0,
    };
  },
  computed: {
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
        this.$refs.fileInput.value = '';
      }
    },
    onComponentDrop(dragEvent) {
      if (!this.isDisabled) {
        const files = [...dragEvent.dataTransfer.files].filter(isNotFolder);
        if (files.length) {
          this.$emit('change', files);
        }
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

    &--is-disabled {
      @apply tw-fill-gray-6;
    }
  }

  &__title {
    @apply tw-h3;
    @apply tw-m-0;

    &--is-disabled {
      @apply tw-text-gray-5;
    }
  }

  &__subtitle {
    @apply tw-small-text;

    &--is-disabled {
      @apply tw-text-gray-6;
    }
  }

  &--dragging {
    @apply tw-border-key-4;
  }

  &--is-disabled {
    @apply tw-cursor-not-allowed;
    @apply tw-bg-gray-7;
  }
}
</style>
