<template>
  <component
    :is="componentTag"
    v-bind="{
      ...attrs,
      ...componentProps,
      'data-test': attrs['data-test'] ? `${attrs['data-test']} ec-option-card` : 'ec-option-card',
    }"
    class="ec-option-card"
    :class="getOptionCardClasses()"
    @click="setClickAction()"
  >
    <span
      data-test="ec-option-card__title"
    >
      <ec-icon
        v-if="optionCardIconName && optionTitle"
        data-test="ec-option-card__title-img"
        class="ec-option-card__title-img"
        :class="getOptionIconClass()"
        :name="optionCardIconName"
        :alt="optionTitle"
        :size="15"
      />{{ optionTitle }}</span>
    <p
      v-if="optionCaption"
      class="ec-option-card__caption"
      :class="getOptionCaptionClass()"
      data-test="ec-option-card__caption"
    >{{ optionCaption }}</p>
  </component>
</template>

<script setup lang="ts">
import {
  computed,
  toRefs,
  useAttrs,
} from 'vue';

import EcIcon from '../ec-icon';
import type { IconName } from '../ec-icon/types';
import { OptionCardType } from './types';

const attrs = useAttrs();

interface OptionCardProps {
  isDisabled?: boolean,
  isSubmit?: boolean,
  optionTitle: string,
  optionCaption?: string,
  optionCardIconName?: IconName,
  optionCardType?: OptionCardType,
  to?: string,
  href?: string,
}

const props = defineProps<OptionCardProps>();

const {
  isDisabled,
  isSubmit,
  optionTitle,
  optionCaption,
  optionCardIconName,
  optionCardType,
  to,
  href,
} = toRefs(props);

const componentTag = computed(() => {
  if (to?.value) {
    return 'router-link';
  } if (href?.value) {
    return 'a';
  }
  return 'button';
});

const isOptionCardDisabled = computed(() => ({ disabled: isDisabled?.value }));

const optionCardButtonType = computed(() => (isSubmit?.value ? 'submit' : 'button'));

const optionCardNavigationType = computed(() => (to?.value ? { to: to.value } : { href: href?.value }));

const componentProps = computed(() => {
  const newProps = {
    ...isOptionCardDisabled.value,
    ...(componentTag.value === 'button' && { type: optionCardButtonType.value }),
    ...optionCardNavigationType.value,
  };

  return newProps;
});

const emit = defineEmits(['click', 'submit']);

function getOptionCardClasses() {
  return {
    'ec-option-card--disabled': Boolean(isDisabled?.value),
    'ec-option-card--accent': optionCardType?.value === OptionCardType.OPTION_CARD_ACCENT,
    'ec-option-card--danger': optionCardType?.value === OptionCardType.OPTION_CARD_DANGER,
  };
}

function getOptionIconClass() {
  return {
    'ec-option-card__title-img--disabled': Boolean(isDisabled?.value),
    'ec-option-card__title-img--accent': optionCardType?.value === OptionCardType.OPTION_CARD_ACCENT,
    'ec-option-card__title-img--danger': !isDisabled?.value && (optionCardType?.value === OptionCardType.OPTION_CARD_DANGER),

  };
}

function getOptionCaptionClass() {
  return {
    'ec-option-card__caption--disabled': Boolean(isDisabled?.value),
    'ec-option-card__caption--accent': optionCardType?.value === OptionCardType.OPTION_CARD_ACCENT,
    'ec-option-card__caption--danger': !isDisabled?.value && (optionCardType?.value === OptionCardType.OPTION_CARD_DANGER),
  };
}

function setClickAction() {
  if (componentTag.value === 'button' && !isDisabled?.value) {
    return optionCardButtonType.value === 'submit' ? emit('submit') : emit('click');
  }
  return null;
}
</script>

<style>
:root {
  --ec-option-card-width: 304px;
  --ec-option-card-max-height: 80px;
  --ec-option-card-min-height: 56px;
}

.ec-option-card {
  @apply tw-border tw-border-solid tw-rounded tw-border-gray-6;
  @apply tw-text-left tw-body-text tw-text-gray-3;
  @apply tw-p-16;
  @apply tw-flex tw-flex-col;

  width: var(--ec-option-card-width);
  max-height: var(--ec-option-card-max-height);
  min-height: var(--ec-option-card-min-height);

  &--accent {
    @apply tw-text-key-4;
  }

  &--danger {
    @apply tw-text-error;
  }

  &--disabled {
    @apply tw-pointer-events-none tw-cursor-default tw-bg-gray-7 tw-text-gray-5;
  }

  &:hover,
  &:active {
    @apply tw-no-underline;
    @apply tw-cursor-pointer;
    @apply tw-bg-gray-7;
  }

  &__title-img {
    @apply tw-mr-8 tw-fill-gray-3;

    &--accent {
      @apply tw-fill-key-4;
    }

    &--danger {
      @apply tw-fill-error;
    }

    &--disabled {
      @apply tw-fill-gray-4;
    }
  }

  &__caption {
    @apply tw-small-text tw-text-gray-5 tw-mt-4 tw-m-0;

    &--accent {
      @apply tw-text-gray-3;
    }

    &--danger {
      @apply tw-text-gray-3;
    }

    &--disabled {
      @apply tw-text-gray-5;
    }
  }
}
</style>
