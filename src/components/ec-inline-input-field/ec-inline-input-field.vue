<template>
  <div data-test="ec-inline-input-field">
    <div class="ec-inline-input-field__label">{{ label }}</div>
    <div v-if="isEditable">
      <ec-inline-input-field-read-only
        v-if="isReadOnly"
        :value="value"
        @edit="edit"
      />
      <ec-inline-input-field-edit
        v-else-if="isEditing"
        :error-message="errorMessage"
        :original-value="value"
        :status="status"
        @cancel="cancel"
        @submit="submit"
      />
      <ec-inline-input-field-loading
        v-else
        :value="value"
      />
    </div>
    <slot v-else />
  </div>
</template>

<script>
import { EDIT, LOADING, READ_ONLY } from '@/enums/input-status';
import EcInlineInputFieldEdit from './components/edit';
import EcInlineInputFieldLoading from './components/loading';
import EcInlineInputFieldReadOnly from './components/read-only';

export default {
  name: 'EcInlineInputField',
  components: {
    EcInlineInputFieldEdit,
    EcInlineInputFieldLoading,
    EcInlineInputFieldReadOnly,
  },
  props: {
    label: {
      default: '',
      type: String,
    },
    errorMessage: {
      default: '',
      type: String,
    },
    isEditable: {
      type: Boolean,
      default: false,
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
  computed: {
    isEditing() {
      return this.isEditable && this.status === EDIT;
    },
    isReadOnly() {
      return this.isEditable && this.status === READ_ONLY;
    },
  },
  watch: {
    status: {
      immediate: true,
      handler(currentStatus) {
        if (currentStatus === READ_ONLY) {
          if (this.$slots.default) {
            this.value = this.$slots.default[0].text.trim();
          }
        }
      },
    },
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    edit() {
      this.$emit('edit');
    },
    submit(newValue) {
      this.$emit('submit', newValue);
    },
  },
};
</script>

<style>
.ec-inline-input-field {
  &__label {
    @apply tw-mini-header;
  }
}
</style>
