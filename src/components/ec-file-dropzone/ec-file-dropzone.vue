<template>
  <div
    v-bind="{
      ...$attrs,
      'data-test': $attrs['data-test'] ? `${$attrs['data-test']} ec-file-dropzone` : 'ec-file-dropzone',
    }"
    class="ec-file-dropzone"
    :class="{
      'ec-file-dropzone--dragging': isDragging && !isDisabled,
      'ec-file-dropzone--is-disabled': isDisabled,
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

    <ec-upload-cloud
      class="ec-file-dropzone__img"
      :class="{ 'ec-file-dropzone__img--is-disabled': isDisabled }"
    />

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
      :class="{ 'ec-file-dropzone__subtitle--is-disabled': isDisabled }"
      @click="/* c8 ignore next */ fileInput.click()"
    >
      <slot name="subtitle" />
    </div>
  </div>
</template>

<script setup>
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue';

import EcUploadCloud from '../../images/ec-upload-cloud.vue';

defineOptions({
  inheritAttrs: false,
});

const emit = defineEmits(['change']);

const props = defineProps({
  isDisabled: {
    type: Boolean,
    default: false,
  },
});

const dragEnterLeaveEventCounter = ref(0);
const isNotFolder = file => !!file.type && !!file.size;
const fileInput = ref(null);

const isDragging = computed(() => dragEnterLeaveEventCounter.value > 0);

onMounted(() => {
  document.addEventListener('dragenter', onDragenter);
  document.addEventListener('dragover', onDragover);
  document.addEventListener('dragleave', onDragleave);
  document.addEventListener('drop', onDrop);
});

onBeforeUnmount(() => {
  document.removeEventListener('dragenter', onDragenter);
  document.removeEventListener('dragover', onDragover);
  document.removeEventListener('dragleave', onDragleave);
  document.removeEventListener('drop', onDrop);
});

function onFileInputChange() {
  const files = [...fileInput.value.files].filter(isNotFolder);
  if (files.length) {
    emit('change', files);
    fileInput.value.value = '';
  }
}

function onComponentDrop(dragEvent) {
  if (!props.isDisabled) {
    const files = [...dragEvent.dataTransfer.files].filter(isNotFolder);
    if (files.length) {
      emit('change', files);
    }
  }
  disableDragging();
}

function onDrop(dragEvent) {
  dragEvent.preventDefault();
  disableDragging();
}

function onDragenter() {
  dragEnterLeaveEventCounter.value++;
}

function onDragover(dragEvent) {
  // Necessary for the drop listener to work:
  // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#define_a_drop_zone
  dragEvent.preventDefault();
}

function onDragleave() {
  dragEnterLeaveEventCounter.value--;
}

function disableDragging() {
  dragEnterLeaveEventCounter.value = 0;
}
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
    @apply tw-mb-8;

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
