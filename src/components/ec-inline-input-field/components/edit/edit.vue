<template>
  <div class="tw-w-full tw-flex">
    <ec-input-field
      ref="input"
      v-model="value"
      type="text"
      :error-message="errorMessage"
      @keydown.enter="submitViaKeyboard"
      @keydown.esc="cancelViaKeyboard"
    />
    <div class="tw-flex tw-ml-20 tw-mt-12">
      <ec-icon
        class="ec-inline-input-field-edit__action-icon"
        name="simple-check"
        :size="16"
        @click="submit"
      />
      <ec-icon
        class="ec-inline-input-field-edit__action-icon tw-ml-8"
        name="simple-close"
        :size="16"
        @click="cancel"
      />
    </div>
  </div>
</template>

<script>
import { EDIT, LOADING, READ_ONLY } from '@/enums/input-status';
import EcIcon from '@/components/ec-icon';
import EcInputField from '@/components/ec-input-field';

export default {
  name: 'EcInlineInputFieldEdit',
  components: { EcIcon, EcInputField },
  props: {
    originalValue: {
      default: '',
      type: String,
    },
    errorMessage: {
      default: '',
      type: String,
    },
    status: {
      type: String,
      default: READ_ONLY,
      validator(value) {
        return [READ_ONLY, EDIT, LOADING].includes(value);
      },
    },
  },
  data() {
    return {
      value: null,
    };
  },
  watch: {
    status: {
      immediate: true,
      handler(currentStatus) {
        if (currentStatus === EDIT) {
          this.value = this.originalValue;
          this.$nextTick(() => {
            if (this.$refs.input && this.$refs.input.$el.querySelector('input')) {
              this.$refs.input.$el.querySelector('input').focus();
            }
          });
        }
      },
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel', {});
    },
    cancelViaKeyboard() {
      this.$emit('cancel', { isKeyboardEvent: true });
    },
    submit() {
      this.$emit('submit', { value: this.value });
    },
    submitViaKeyboard() {
      this.$emit('submit', { value: this.value, isKeyboardEvent: true });
    },
  },
};
</script>

<style>
.ec-inline-input-field-edit__action-icon {
  @apply tw-fill-key-4;

  &:hover {
    @apply tw-cursor-pointer;
    @apply tw-fill-key-3;
  }
}
</style>
