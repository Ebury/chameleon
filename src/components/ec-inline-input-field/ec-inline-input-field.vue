<template>
  <div data-test="ec-inline-input-field">
    <div
      v-if="!isEditing"
      class="ec-inline-input-field__label"
    >{{ label }}</div>
    <template v-if="isEditable">
      <ec-inline-input-field-loading
        v-if="isLoading"
        :value="valueForLoading"
      />
      <ec-inline-input-field-edit
        v-else-if="isEditing"
        v-model="value"
        :label="label"
        @cancel="cancel"
        @submit="submit"
      />
      <ec-inline-input-field-value-text
        ref="valueText"
        v-else
        :value="value"
        @edit="edit"
      />
    </template>
    <div
      v-else
      class="ec-inline-input-field__slot"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import EcInlineInputFieldEdit from './components/edit';
import EcInlineInputFieldLoading from './components/loading';
import EcInlineInputFieldValueText from './components/value-text';

export default {
  name: 'EcInlineInputField',
  components: {
    EcInlineInputFieldEdit,
    EcInlineInputFieldLoading,
    EcInlineInputFieldValueText,
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
    isEditing: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    value: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      valueForLoading: this.value,
    };
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    edit() {
      this.$emit('edit');
    },
    submit(data) {
      this.valueForLoading = data.value;
      this.$emit('submit', data.value);
    },
  },
};
</script>

<style>
.ec-inline-input-field {
  &__label {
    @apply tw-mini-header;
    @apply tw-inline-block;
  }

  &__slot {
    @apply tw-truncate;
  }
}
</style>
