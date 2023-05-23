<template>
  <div
    class="ec-inline-input-field-copy"
    data-test="ec-inline-input-field-copy"
  >
    <span :class="{ 'ec-inline-input-field-copy__text': true, [config.sensitiveClass]: isSensitive}">
      {{ value }}
    </span>

    <button
      type="button"
      class="ec-inline-input-field-copy__action"
      data-test="ec-inline-input-field-copy__action"
      @click="copy"
      @mouseleave="hideTooltip"
    >
      <ec-icon
        v-ec-tooltip="{
          placement: 'left',
          shown: !!tooltipContent,
          triggers: ['manual'],
          content: tooltipContent ,
          popperClass: tooltipClasses,
          ...tooltipOptions,
        }"
        class="ec-inline-input-field-copy__icon"
        data-test="ec-inline-input-field-copy__icon"
        name="simple-copy"
        :size="16"
      />
    </button>
  </div>
</template>

<script setup>
import clipboardCopy from 'clipboard-copy';
import { computed, ref } from 'vue';

import useConfig from '../../../../composables/use-ec-config';
import VEcTooltip from '../../../../directives/ec-tooltip';
import EcIcon from '../../../ec-icon';

const config = useConfig();
const isCopied = ref(null);

const props = defineProps({
  value: {
    default: '',
    type: String,
  },
  tooltipOptions: {
    type: Object,
    default: null,
  },
  tooltipTextSuccess: {
    type: String,
    required: true,
  },
  tooltipTextError: {
    type: String,
    required: true,
  },
  isSensitive: {
    type: Boolean,
    default: false,
  },
});

const tooltipContent = computed(() => {
  switch (isCopied.value) {
    case true:
      return props.tooltipTextSuccess;
    case false:
      return props.tooltipTextError;
    default:
      return '';
  }
});

const tooltipClasses = computed(() => {
  switch (isCopied.value) {
    case true:
      return 'ec-tooltip--bg-success';
    case false:
      return 'ec-tooltip--bg-error';
    default:
      return '';
  }
});

function hideTooltip() {
  isCopied.value = null;
}

function copy() {
  clipboardCopy(props.value)
    .then(() => {
      isCopied.value = true;
    })
    .catch(() => {
      isCopied.value = false;
    });
}
</script>

<style>
.ec-inline-input-field-copy {
  @apply tw-w-full;
  @apply tw-flex tw-justify-between tw-items-center;

  &__text {
    @apply tw-truncate;
  }

  &__action {
    @apply tw-border-0;
    @apply tw-bg-transparent tw-fill-gray-4;
    @apply tw-outline-none;

    line-height: 0;

    &:hover,
    &:focus {
      @apply tw-fill-key-4;
    }

    &:hover {
      @apply tw-cursor-pointer;
    }
  }

  &__icon {
    @apply tw-opacity-0;

    .ec-inline-input-field-copy:hover & {
      @apply tw-opacity-100;
    }
  }
}
</style>
