<template>
  <div
    class="ec-textarea"
    data-test="ec-textarea"
  >
    <label
      v-if="label || note"
      class="ec-textarea__label"
      data-test="ec-textarea__label"
      :for="textareaId"
    >
      <span
        v-if="label"
        class="ec-textarea__label-text"
        data-test="ec-textarea__label-text"
      >{{ label }}<ec-icon
        v-if="labelTooltip"
        v-ec-tooltip="{ content: labelTooltip }"
        class="ec-textarea__tooltip"
        data-test="ec-textarea__tooltip"
        type="interactive"
        name="simple-info"
        :size="14"
      />
      </span>

      <span
        v-if="note"
        class="ec-textarea__note"
        data-test="ec-textarea__note"
      >{{ note }}</span>
    </label>

    <textarea
      :id="textareaId"
      ref="textarea"
      v-model="textareaModel"
      v-bind="$attrs"
      :rows="rows"
      :class="textareaClasses"
      :aria-describedby="errorMessageId"
      :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-textarea__textarea` : 'ec-textarea__textarea'"
      v-on="$listeners"
    />

    <div
      :id="errorMessageId"
      v-if="isInvalid"
      class="ec-textarea__error-text"
      data-test="ec-textarea__error-text"
    >{{ errorMessage }}</div>

    <div
      v-else-if="bottomNote"
      data-test="ec-textarea__bottom-note"
      class="ec-textarea__bottom-note"
      :class="{ 'ec-textarea__bottom-note--is-warning': isWarning }"
    >{{ bottomNote }}</div>
  </div>
</template>

<script>
import EcIcon from '../ec-icon';
import EcTooltip from '../../directives/ec-tooltip';
import config from '../../config';
import { getUid } from '../../utils/uid';

export default {
  name: 'EcTextarea',
  components: { EcIcon },
  directives: { EcTooltip },
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'value-change',
  },
  props: {
    value: {
      type: String,
    },
    rows: {
      type: Number,
      default: 4,
    },
    label: {
      default: '',
      type: String,
    },
    labelTooltip: {
      default: '',
      type: String,
    },
    note: {
      default: '',
      type: String,
    },
    bottomNote: {
      default: '',
      type: String,
    },
    errorMessage: {
      default: '',
      type: String,
    },
    id: {
      type: String,
    },
    errorId: {
      type: String,
    },
    isSensitive: {
      type: Boolean,
      default: false,
    },
    isWarning: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      uid: getUid(),
    };
  },
  computed: {
    textareaClasses() {
      const classes = ['ec-textarea__textarea'];

      if (this.isInvalid) {
        classes.push('ec-textarea__textarea--has-error');
      }
      if (this.isSensitive) {
        classes.push(config.sensitiveClass);
      }

      return classes;
    },
    textareaId() {
      return this.id || `ec-textarea-${this.uid}`;
    },
    errorMessageId() {
      return this.isInvalid ? (this.errorId || `ec-textarea-error-${this.uid}`) : null;
    },
    isInvalid() {
      return !!this.errorMessage;
    },
    textareaModel: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('value-change', value);
      },
    },
  },
};
</script>

<style>
.ec-textarea {
  @apply tw-w-full;

  &__textarea {
    @apply tw-body-text tw-text-gray-3;
    @apply tw-rounded;
    @apply tw-py-8 tw-px-12;
    @apply tw-border tw-border-solid tw-border-gray-6;
    @apply tw-max-w-full;

    width: inherit;

    &--has-error {
      @apply tw-border tw-border-solid tw-border-error;

      &:hover,
      &:focus {
        @apply tw-border tw-border-solid tw-border-error;
      }
    }

    &:focus {
      @apply tw-border tw-border-solid tw-border-key-4;
      @apply tw-outline-none;
    }

    &:disabled {
      @apply tw-bg-gray-7;
    }

    &:read-only,
    &[readonly] {
      /* :read-only is not supported by IE https://developer.mozilla.org/en-US/docs/Web/CSS/:read-only */
      @apply tw-truncate;
    }
  }

  &__label {
    @apply tw-flex tw-flex-wrap;
  }

  &__label-text {
    @apply tw-flex tw-flex-grow;
    @apply tw-input-label;
    @apply tw-mr-8;
  }

  &__tooltip {
    @apply tw-flex-shrink-0 tw-self-center;
    @apply tw-ml-4;
  }

  &__note {
    @apply tw-caption-text;
  }

  &__bottom-note {
    @apply tw-help-text;
    @apply tw-mt-4;

    &--is-warning {
      @apply tw-text-warning-dark;
    }
  }

  &__error-text {
    @apply tw-help-text tw-text-error;
    @apply tw-mt-4;
  }
}
</style>
