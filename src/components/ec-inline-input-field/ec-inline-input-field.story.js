import { action } from '@storybook/addon-actions';
import { ref } from 'vue';

import EcInlineInputField from './ec-inline-input-field.vue';

export default {
  title: 'Inline Input Field',
  component: EcInlineInputField,
};

const Template = args => ({
  components: { EcInlineInputField },
  setup() {
    return {
      args,
      onCancel: action('cancel'),
      onEdit: action('edit'),
      onSubmit: action('submit'),
    };
  },
  template: `
    <div class="tw-p-24" style="width: 300px;">
      <ec-inline-input-field
        v-bind="args"
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

export const all = args => ({
  components: { EcInlineInputField },
  setup() {
    const isEditing = ref(false);
    const isLoading = ref(false);

    function onEdit() {
      action('edit')();
      isEditing.value = true;
    }
    function onCancel() {
      action('cancel')();
      isEditing.value = false;
    }
    function onSubmit(value) {
      action('submit')();
      isEditing.value = false;
      isLoading.value = true;

      setTimeout(() => {
        if (!args.errorMessage) {
          args.value = value;
        }
        isLoading.value = false;
      }, 1000);
    }

    return {
      args,
      isEditing,
      isLoading,
      onEdit,
      onCancel,
      onSubmit,
    };
  },
  template: `
    <div class="tw-grid-container">
      <div class="tw-grid">
        <div class="tw-col-full md:tw-col-4">
          <ec-inline-input-field
            label="Inline Input Field"
            v-bind="args"
            :is-editing="isEditing"
            :is-loading="isLoading"
            v-on="{
              cancel: onCancel,
              edit: onEdit,
              submit: onSubmit,
            }"
          >
            {{ args.value }}
          </ec-inline-input-field>
        </div>
        <div class="tw-col-full md:tw-col-4">
          <ec-inline-input-field label="Inline Input Field - Uneditable">
            {{ args.value }}
          </ec-inline-input-field>
        </div>
        <div class="tw-col-full md:tw-col-4">
          <ec-inline-input-field label="Inline Input Field - Uneditable / No Plain Text">
            <a href="#">{{ args.value }}</a>
          </ec-inline-input-field>
        </div>
        <div class="tw-col-full"></div>
        <div class="tw-col-full md:tw-col-4">
          Value: {{ args.value }}
        </div>
        <div class="tw-col-full md:tw-col-4">
          <ec-inline-input-field
            v-bind="args"
            label="Inline Input Field - Copiable"
            :is-copiable="true"
          />
        </div>
        <div class="tw-col-full md:tw-col-4">
          <ec-inline-input-field
            :is-editable="true"
            :is-editing="true"
            label="Inline Input Field - With Error"
            errorMessage="This field has an error"
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
