<template>
  <transition name="ec-modal__fade">
    <div
      v-if="show"
      class="ec-modal"
      :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-modal` : 'ec-modal'"
      :style="zIndexStyle"
      @click.self="closeModal()"
    >
      <div
        ref="focusTrapTarget"
        class="ec-modal__content"
        data-test="ec-modal__content"
        :class="{ 'ec-modal--lg': large }"
      >
        <header
          class="ec-modal__header"
          data-test="ec-modal__header"
        >
          <slot name="header" />
          <a
            v-if="isClosable"
            class="ec-modal__close"
            data-test="ec-modal__close"
            href="#"
            @click.stop.prevent="closeModal()"
          >
            <ec-icon
              class="ec-modal__close-icon"
              data-test="ec-modal__close-icon"
              name="simple-close"
              :size="24"
            />
          </a>
        </header>

        <main
          class="ec-modal__main"
          data-test="ec-modal__main"
        >
          <slot name="main" />
        </main>

        <footer
          v-if="hasFooter()"
          class="ec-modal__footer"
          data-test="ec-modal__footer"
        >
          <div
            v-if="hasFooterLeftContent()"
            class="ec-modal__footer-left-content"
            data-test="ec-modal__footer-left-content"
          >
            <slot name="footerLeftContent" />
          </div>

          <ec-loading
            v-if="hasNegativeButton()"
            class="ec-modal__btn-loading ec-modal__btn-loading--right"
            :show="isLoadingNegativeButton"
            :transparent="!isLoadingNegativeButton"
          >
            <ec-btn
              ref="negativeButton"
              :is-disabled="isNegativeButtonDisabled"
              is-rounded
              :is-submit="false"
              :category="negativeButtonCategory"
              class="ec-modal__negative-btn"
              data-test="ec-modal__negative-btn"
              @click="emit('negative');"
            >
              <slot name="negative" />
            </ec-btn>
          </ec-loading>

          <ec-loading
            v-if="hasPositiveButton()"
            class="ec-modal__btn-loading"
            :show="isLoadingPositiveButton"
            :transparent="!isLoadingPositiveButton"
          >
            <ec-btn
              ref="positiveButton"
              :category="positiveButtonCategory"
              :is-disabled="isPositiveButtonDisabled"
              is-rounded
              :is-submit="false"
              :class="{'ec-modal__positive-btn--right': !hasNegativeButton()}"
              class="ec-modal__positive-btn"
              data-test="ec-modal__positive-btn"
              @click="emit('positive')"
            >
              <slot name="positive" />
            </ec-btn>
          </ec-loading>
        </footer>
      </div>

    </div>
  </transition>
</template>

<script setup>
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import {
  computed, onBeforeUnmount, ref, useSlots, watch, watchEffect,
} from 'vue';

import * as KeyCode from '../../enums/key-code';
import EcBtn from '../ec-btn';
import EcIcon from '../ec-icon';
import EcLoading from '../ec-loading';

const slots = useSlots();

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  isClosable: {
    type: Boolean,
    default: true,
  },
  large: {
    type: Boolean,
    default: false,
  },
  // isLoading - DEPRECATED
  // TODO: remove the prop below and use it as part
  // of the positiveButtonProps/negativeButtonProps
  isLoading: {
    type: Object,
    default: () => ({}),
  },
  zIndex: {
    type: Number,
    validator(value) {
      return value > 200 && value < 250;
    },
  },
  // category - DEPRECATED
  // TODO: remove the prop below and use it as part
  // of the positiveButtonProps/negativeButtonProps
  category: {
    type: Object,
    default: () => ({}),
  },
  positiveButtonProps: {
    type: Object,
    default: () => ({}),
  },
  negativeButtonProps: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(['update:show', 'negative', 'positive', 'close']);

// buttons
const positiveButton = ref(null);
const negativeButton = ref(null);
const isLoadingPositiveButton = computed(() => !!props.isLoading.positive);
const isLoadingNegativeButton = computed(() => !!props.isLoading.negative);
const positiveButtonCategory = computed(() => props.category.positive || 'primary');
const negativeButtonCategory = computed(() => props.category.negative || 'secondary');
const isPositiveButtonDisabled = computed(() => props.positiveButtonProps.isDisabled || false);
const isNegativeButtonDisabled = computed(() => props.negativeButtonProps.isDisabled || false);
function hasPositiveButton() {
  return !!slots.positive;
}
function hasNegativeButton() {
  return !!slots.negative;
}

// zIndex
const zIndexStyle = computed(() => (props.zIndex ? { zIndex: props.zIndex } : null));

// focus trap
const focusTrapTarget = ref(null);

function getFocusTrapOptions() {
  const options = {
    immediate: true,
    escapeDeactivates: props.isClosable,
    clickOutsideDeactivates: props.isClosable,
  };

  if (hasPositiveButton()) {
    options.initialFocus = /* c8 ignore next */ () => positiveButton.value.$el;
  } else if (hasNegativeButton()) {
    options.initialFocus = /* c8 ignore next */ () => negativeButton.value.$el;
  }

  return options;
}

const { deactivate } = useFocusTrap(focusTrapTarget, getFocusTrapOptions());
watch(() => focusTrapTarget.value, (targetEl) => {
  if (!targetEl) {
    deactivate();
  }
});

// close modal
function closeModal() {
  if (props.isClosable) {
    emit('update:show', false);
    emit('close', false);
  }
}

// keyup event listener
watchEffect(() => {
  const value = props.show;
  if (value) {
    document.addEventListener('keyup', onKeyUp);
  } else {
    document.removeEventListener('keyup', onKeyUp);
  }
});
function onKeyUp(e) {
  if (e.keyCode === KeyCode.ESC) {
    closeModal();
  }
}
onBeforeUnmount(() => {
  document.removeEventListener('keyup', onKeyUp);
});

// modal footer
function hasFooterLeftContent() {
  return !!slots.footerLeftContent;
}
function hasFooter() {
  return hasFooterLeftContent() || hasPositiveButton() || hasNegativeButton();
}
</script>

<style>
@import '../../styles/tools/scrollbars.css';
@import '../../styles/tools/transitions.css';

:root,
:host {
  --ec-modal-lg-max-width: 1100px;
  --ec-modal-sm-max-width: 680px;
}

.ec-modal {
  background: hsla(var(--ec-gray-color-level-2), 0.2);

  @apply tw-w-screen;
  @apply tw-h-screen;
  @apply tw-fixed;
  @apply tw-inset-0;
  @apply tw-text-gray-3;
  @apply tw-z-modal;

  &__content {
    width: calc(100% - theme('spacing.24'));
    max-width: var(--ec-modal-sm-max-width);
    max-height: calc(100% - theme('spacing.24'));
    transform: translate(-50%, -50%);

    @apply tw-relative;
    @apply tw-inset-1/2;
    @apply tw-bg-gray-8;
    @apply tw-overflow-y-auto;
    @apply tw-shadow-level-2;
    @apply tw-rounded;

    @mixin md-scrollbar;

    @media screen and (min-height: theme('screens.sm')) {
      @apply tw-flex tw-flex-col;
    }

    @screen lg {
      width: 60vw;
      max-height: 80vh;
    }

    @screen xl {
      width: 50vw;
    }
  }

  &__header {
    @apply tw-flex tw-flex-grow;
    @apply tw-p-24;
    @apply tw-items-center;

    .ec-modal--lg & {
      @apply tw-mb-24;

      @screen lg {
        @apply tw-border-b tw-border-solid tw-border-gray-7;
      }
    }
  }

  &__main {
    @apply tw-mt-0 tw-mb-24 tw-mx-24;

    @media screen and (min-height: theme('screens.sm')) {
      @mixin md-scrollbar;

      @apply tw-overflow-y-auto tw-overflow-x-hidden;
      @apply tw-flex tw-flex-col;
    }
  }

  &__footer {
    @apply tw-py-16 tw-px-12;
    @apply tw-bg-gray-7;
    @apply tw-flex tw-flex-col-reverse tw-items-center;

    @screen lg {
      @apply tw-flex-row;
    }
  }

  &__btn-loading {
    @apply tw-m-12;

    @screen lg {
      @apply tw-w-auto;

      &--right {
        @apply tw-ml-auto;
      }
    }
  }

  &__positive-btn,
  &__negative-btn {
    @apply tw-w-full;
  }

  &__close {
    @mixin ec-text-color-transition;

    @apply tw-ml-auto;
    @apply tw-text-gray-4;
    @apply tw-cursor-pointer;

    &:hover {
      @apply tw-text-key-4;
    }
  }

  &__close-icon {
    @apply tw-fill-current;
    @apply tw-inline-block;
    @apply tw-align-top;
  }

  &__footer-left-content {
    @apply tw-m-12;
  }

  &__fade {
    @mixin ec-fade-transition;
  }

  &--lg {
    @apply tw-max-w-full;

    @screen lg {
      width: 80vw;
      max-width: var(--ec-modal-lg-max-width);
      max-height: 80vh;
    }
  }
}
</style>
