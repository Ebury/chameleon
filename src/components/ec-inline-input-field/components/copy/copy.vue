<template>
  <div
    class="ec-inline-input-field-copy"
    :class="(isBtnRightAligned ? 'tw-justify-between' : 'tw-justify-start')"
    data-test="ec-inline-input-field-copy"
  >
    <span :class="{ 'ec-inline-input-field-copy__text': true, [config.sensitiveClass]: isSensitive }">
      {{ value }}
    </span>

    <button
      type="button"
      class="ec-inline-input-field-copy__action"
      data-test="ec-inline-input-field-copy__action"
      @click="copy"
      @mouseleave="isTooltipShown = false"
    >
      <ec-icon
        v-ec-tooltip="{
          delay: 0,
          placement: TooltipPlacement.LEFT,
          shown: isTooltipShown,
          triggers: [TooltipTrigger.MANUAL],
          content: tooltipContent,
          popperClass: tooltipClasses,
        }"
        class="ec-inline-input-field-copy__icon"
        data-test="ec-inline-input-field-copy__icon"
        :name="IconName.SIMPLE_COPY"
        :size="16"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { computed, ref } from 'vue';

import useConfig from '../../../../composables/use-ec-config';
import vEcTooltip from '../../../../directives/ec-tooltip';
import { TooltipPlacement, TooltipPopperClass, TooltipTrigger } from '../../../../directives/ec-tooltip/types';
import EcIcon from '../../../ec-icon';
import { IconName } from '../../../ec-icon/icon-names';
import type { InlineInputProps } from '../../types';

const config = useConfig();
const isCopied = ref(false);
const isTooltipShown = ref(false);

interface InlineInputCopyProps {
  value?: InlineInputProps['value'],
  isSensitive?: InlineInputProps['isSensitive'],
  tooltipTextSuccess: InlineInputProps['tooltipTextSuccess'],
  tooltipTextError: InlineInputProps['tooltipTextError'],
  isBtnRightAligned?: InlineInputProps['isBtnRightAligned'],
}

const props = withDefaults(defineProps<InlineInputCopyProps>(), {
  value: '',
  isSensitive: false,
  errorMessage: '',
  isBtnRightAligned: false,
});

const { copy: clipboardCopy } = useClipboard({ legacy: true });

const tooltipContent = computed(() => (isCopied.value ? props.tooltipTextSuccess : props.tooltipTextError));

const tooltipClasses = computed(() => (isCopied.value ? [TooltipPopperClass.EC_TOOLTIP_BG_SUCCESS] : [TooltipPopperClass.EC_TOOLTIP_BG_ERROR]));

function copy() {
  clipboardCopy(props.value)
    .then(() => {
      isCopied.value = true;
      isTooltipShown.value = true;
    })
    .catch(() => {
      isCopied.value = false;
      isTooltipShown.value = true;
    });
}
</script>

<style>
.ec-inline-input-field-copy {
  @apply tw-w-full;
  @apply tw-flex tw-items-center;

  &__text {
    @apply tw-truncate;
  }

  &__action {
    @apply tw-border-0;
    @apply tw-bg-transparent tw-fill-gray-4;
    @apply tw-outline-none;
    @apply tw-leading-reset;

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
