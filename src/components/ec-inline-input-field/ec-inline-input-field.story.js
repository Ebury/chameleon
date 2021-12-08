import { action } from '@storybook/addon-actions';
import EcInlineInputField from './ec-inline-input-field.vue';

export default {
  title: 'Inline Input Field',
  component: EcInlineInputField,
};

const Template = (args, { argTypes }) => ({
  components: { EcInlineInputField },
  props: Object.keys(argTypes),
  data() {
    return {
      model: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) { this.model = newValue; },
    },
  },
  methods: {
    onCancel: action('cancel'),
    onEdit: action('edit'),
    onSubmit: action('submit'),
  },
  template: `
    <div class="tw-p-24" style="width: 300px;">
      <ec-inline-input-field
        v-bind="$props"
        v-model="model"
        v-on="{
          cancel: onCancel,
          edit: onEdit,
          submit: onSubmit,
        }" />
    </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  label: 'Inline Input Field',
  value: 'Initial value',
  isEditable: true,
  isEditing: false,
  isCopiable: true,
  isSensitive: false,
};

basic.parameters = {
  visualRegressionTests: { disable: true },
};

export const all = (args, { argTypes }) => ({
  components: { EcInlineInputField },
  props: Object.keys(argTypes).filter(prop => prop !== 'isEditing' && prop !== 'isLoading'),
  data() {
    return {
      model: null,
      isEditing: false,
      isLoading: false,
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(newValue) { this.model = newValue; },
    },
  },
  methods: {
    onEdit() {
      action('edit')();
      this.isEditing = true;
    },
    onCancel() {
      action('cancel')();
      this.isEditing = false;
    },
    onSubmit(value) {
      action('submit')();
      this.isEditing = false;
      this.isLoading = true;

      setTimeout(() => {
        if (!this.errorMessage) {
          this.model = value;
        }
        this.isLoading = false;
      }, 1000);
    },
  },
  template: `
    <div class="tw-grid-container">
      <div class="tw-grid">
        <div class="tw-col-full md:tw-col-4">
          <ec-inline-input-field
            label="Inline Input Field"
            :is-copiable="isCopiable"
            :is-editable="isEditable"
            :is-editing="isEditing"
            :is-loading="isLoading"
            :tooltip-text-success="tooltipTextSuccess"
            :tooltip-text-error="tooltipTextError"
            :label-tooltip="labelTooltip"
            :is-sensitive="isSensitive"
            :error-message="errorMessage"
            v-model="model"
            v-on="{
              cancel: onCancel,
              edit: onEdit,
              submit: onSubmit,
            }"
          >
            {{ model }}
          </ec-inline-input-field>
        </div>
        <div class="tw-col-full md:tw-col-4">
          <ec-inline-input-field label="Inline Input Field - Uneditable">
            {{ model }}
          </ec-inline-input-field>
        </div>
        <div class="tw-col-full md:tw-col-4">
          <ec-inline-input-field label="Inline Input Field - Uneditable / No Plain Text">
            <a href="#">{{ model }}</a>
          </ec-inline-input-field>
        </div>
        <div class="tw-col-full"></div>
        <div class="tw-col-full md:tw-col-4">
          Value: {{ model }}
        </div>
        <div class="tw-col-full md:tw-col-4">
          <ec-inline-input-field
            label="Inline Input Field - Copiable"
            :is-copiable="true"
            :label-tooltip="labelTooltip"
            :tooltip-text-success="tooltipTextSuccess"
            :tooltip-text-error="tooltipTextError"
            :is-sensitive="isSensitive"
            v-model="model"
          />
        </div>
        <div class="tw-col-full md:tw-col-4">
          <ec-inline-input-field
            :is-editable="true"
            :is-editing="true"
            label="Inline Input Field - With Error"
            errorMessage="This field has an error"
            v-model="model"
          />
        </div>
      </div>
    </div>
  `,
});

all.args = {
  ...basic.args,
  tooltipTextSuccess: 'Copied!',
  tooltipTextError: 'Unable to copy',
  labelTooltip: 'Label tooltip text',
};
