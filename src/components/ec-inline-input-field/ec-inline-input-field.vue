<template>
  <div :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-inline-input-field` : 'ec-inline-input-field'">
    <div
      v-if="!isEditing"
      class="ec-inline-input-field__label"
    >{{ label }}</div>
    <template v-if="isEditable">
      <ec-inline-input-field-loading
        v-if="isLoading"
        :is-sensitive="isSensitive"
        :value="valueForLoading"
      />
      <ec-inline-input-field-edit
        v-else-if="isEditing"
        v-model="value"
        :label="label"
        :is-sensitive="isSensitive"
        @cancel="cancel"
        @submit="submit"
      />
      <ec-inline-input-field-value-text
        ref="valueText"
        v-else
        :value="value"
        :is-sensitive="isSensitive"
        @edit="edit"
      />
    </template>

    <ec-inline-input-field-copy
      v-else-if="isCopiable"
      :tooltip-text-success="tooltipTextSuccess"
      :tooltip-text-error="tooltipTextError"
      :is-sensitive="isSensitive"
      :value="value"
    />

    <div
      v-else
      :class="textClasses"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import EcInlineInputFieldCopy from './components/copy';
import EcInlineInputFieldEdit from './components/edit';
import EcInlineInputFieldLoading from './components/loading';
import EcInlineInputFieldValueText from './components/value-text';
import config from '../../config';

export default {
  name: 'EcInlineInputField',
  components: {
    EcInlineInputFieldCopy,
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
    isCopiable: {
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
    isSensitive: {
      type: Boolean,
      default: false,
    },
    value: {
      default: '',
      type: String,
    },
    tooltipTextSuccess: {
      type: String,
    },
    tooltipTextError: {
      type: String,
    },
  },
  data() {
    return {
      valueForLoading: this.value,
    };
  },
  computed: {
    textClasses() {
      const classes = ['ec-inline-input-field__content'];

      if (this.isSensitive) {
        classes.push(config.sensitiveClass);
      }

      return classes;
    },
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

  &__content {
    @apply tw-truncate;
  }
}
</style>
