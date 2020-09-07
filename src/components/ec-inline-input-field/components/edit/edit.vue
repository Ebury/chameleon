<template>
  <div data-test="ec-inline-input-field-edit">
    <label
      class="ec-inline-input-field-edit__label"
      :for="inputId"
    >{{ label }}</label>
    <div class="ec-inline-input-field-edit__edit-panel">
      <ec-input-field
        :id="inputId"
        ref="input"
        v-model="inputModel"
        type="text"
        data-test="ec-inline-input-field-edit__input"
        :error-message="errorMessage"
        @keydown.enter="submit"
        @keydown.esc="cancel"
      />
      <div class="ec-inline-input-field-edit__actions">
        <button
          type="button"
          class="ec-inline-input-field-edit__action"
          data-test="ec-inline-input-field-edit__submit-action"
          @click="submit"
        >
          <ec-icon
            class="ec-inline-input-field-edit__action-icon"
            name="simple-check"
            :size="16"
          />
        </button>
        <button
          type="button"
          class="ec-inline-input-field-edit__action"
          data-test="ec-inline-input-field-edit__cancel-action"
          @click="cancel"
        >
          <ec-icon
            class="ec-inline-input-field-edit__action-icon"
            name="simple-close"
            :size="16"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import EcIcon from '../../../ec-icon';
import EcInputField from '../../../ec-input-field';

export default {
  name: 'EcInlineInputFieldEdit',
  components: { EcIcon, EcInputField },
  model: {
    prop: 'value',
    event: 'value-change',
  },
  props: {
    label: {
      default: '',
      type: String,
    },
    value: {
      default: '',
      type: String,
    },
    errorMessage: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      inputId: `ec-inline-input-field-edit__input-${this._uid}`,
      inputModel: this.value,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.input.focus();
    });
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    submit() {
      this.$emit('submit', { value: this.inputModel });
    },
  },
};
</script>

<style>
.ec-inline-input-field-edit {
  &__label {
    @apply tw-mini-header;
  }

  &__edit-panel {
    @apply tw-w-full;
    @apply tw-flex;
  }

  &__actions {
    @apply tw-flex tw-items-center;
    @apply tw-ml-20;

    height: var(--ec-input-field-height);
  }

  &__action {
    @apply tw-border-0;
    @apply tw-p-0;
    @apply tw-bg-transparent tw-fill-key-4;
    @apply tw-outline-none;

    line-height: 0;

    &:focus {
      @apply tw-fill-key-3;
    }

    &:not(:first-child) {
      @apply tw-ml-8;
    }
  }

  &__action-icon:hover {
    @apply tw-cursor-pointer;
    @apply tw-fill-key-3;
  }
}
</style>
