<template>
  <div :data-test="$attrs['data-test'] ? `${$attrs['data-test']} ec-inline-input-field` : 'ec-inline-input-field'">
    <div
      v-if="!isEditing"
      class="ec-inline-input-field__label"
    >{{ label }}<ec-icon
      v-if="labelTooltip"
      v-ec-tooltip="{ content: labelTooltip }"
      class="ec-inline-input-field__label-tooltip"
      data-test="ec-inline-input-field__label-tooltip"
      type="interactive"
      name="simple-info"
      :size="14"
    />
    </div>
    <template v-if="isEditable">
      <ec-inline-input-field-loading
        v-if="isLoading"
        :is-sensitive="isSensitive"
        :value="valueForLoading"
      />
      <ec-inline-input-field-edit
        v-else-if="isEditing"
        :value="value"
        :label="label"
        :is-sensitive="isSensitive"
        :error-message="errorMessage"
        :label-tooltip="labelTooltip"
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
import config from '../../config';
import EcTooltip from '../../directives/ec-tooltip';
import EcIcon from '../ec-icon';
import EcInlineInputFieldCopy from './components/copy';
import EcInlineInputFieldEdit from './components/edit';
import EcInlineInputFieldLoading from './components/loading';
import EcInlineInputFieldValueText from './components/value-text';

export default {
  name: 'EcInlineInputField',
  components: {
    EcInlineInputFieldCopy,
    EcInlineInputFieldEdit,
    EcInlineInputFieldLoading,
    EcInlineInputFieldValueText,
    EcIcon,
  },
  directives: { EcTooltip },
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
    labelTooltip: {
      default: '',
      type: String,
    },
    errorMessage: {
      default: '',
      type: String,
    },
  },
  emits: ['cancel', 'edit', 'submit'],
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
    @apply tw-flex tw-flex-wrap;
  }

  &__label-tooltip {
    @apply tw-flex-shrink-0 tw-self-center;
    @apply tw-ml-4;
  }

  &__content {
    @apply tw-truncate;
  }
}
</style>
