<template>
  <div
    class="tw-truncate"
    data-test="ec-inline-input-field"
  >
    <div class="tw-mini-header">{{ label }}</div>
    <div v-if="isEditable">
      <ec-inline-input-field-read-only
        v-if="isReadOnly"
        :value="value"
        :gain-focus="gainFocus"
        @edit="edit"
      />
      <ec-inline-input-field-edit
        v-else-if="isEditing"
        :original-value="value"
        :status="status"
        @cancel="cancel"
        @submit="submit"
      />
      <ec-inline-input-field-loading
        v-else
        :value="innerValue"
      />
    </div>
    <slot v-else />
  </div>
</template>

<script>
import { EDITING, LOADING, READ_ONLY } from '@/enums/input-status';
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
    isEditable: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: READ_ONLY,
      validator(value) {
        return [READ_ONLY, EDITING, LOADING].includes(value);
      },
    },
    value: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      innerValue: null,
      gainFocus: false,
    };
  },
  computed: {
    isEditing() {
      return this.isEditable && this.status === EDITING;
    },
    isReadOnly() {
      return this.isEditable && this.status === READ_ONLY;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        this.innerValue = newValue;
      },
    },
  },
  methods: {
    cancel(data) {
      this.$emit('cancel');
      this.gainFocus = data.isKeyboardEvent;
    },
    edit() {
      this.$emit('edit');
    },
    submit(data) {
      this.innerValue = data.value;
      this.$emit('submit', data.value);
      this.gainFocus = data.isKeyboardEvent;
    },
  },
};
</script>
