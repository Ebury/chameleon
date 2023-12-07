// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';

import EcInlineInputField from './ec-inline-input-field.vue';

export default {
  title: 'Inline Input Field',
  component: EcInlineInputField,
} as Meta<typeof EcInlineInputField>;

type EcInlineInputFieldStory = StoryFn<typeof EcInlineInputField>;

const Template: EcInlineInputFieldStory = args => ({
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
  isBtnRightAligned: true,
  tooltipTextSuccess: 'Copied!',
  tooltipTextError: 'Unable to copy',
};
basic.parameters = {
  visualRegressionTests: { disable: true },
};

export const all: EcInlineInputFieldStory = args => ({
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
    function onSubmit(value: string) {
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
    <div class="tw-flex-grid-container">
      <div class="tw-flex-grid">
        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-inline-input-field
            v-bind="args"
            label="Inline Input Field"
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

        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-inline-input-field
            label="Inline Input Field - Basic Slot usage"
            tooltip-text-success=""
            tooltip-text-error=""
          >
            {{ args.value }}
          </ec-inline-input-field>
        </div>

        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-inline-input-field
            label="Inline Input Field - HTML Slot usage"
            tooltip-text-success=""
            tooltip-text-error=""
          >
            <a href="#">{{ args.value }}</a>
          </ec-inline-input-field>
        </div>

        <div class="tw-flex-col-full" />
        <div class="tw-flex-col-full md:tw-flex-col-4">
          Value: {{ args.value }}
        </div>
        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-inline-input-field
            v-bind="args"
            label="Inline Input Field - Copiable"
            :is-copiable="true"
            :is-editable="false"
          />
        </div>
        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-inline-input-field
            v-bind="args"
            label="Inline Input Field - Left aligned button"
            :is-editable="true"
            :is-btn-right-aligned="false"
            tooltip-text-success=""
            tooltip-text-error=""
          />
        </div>
        <div class="tw-flex-col-full md:tw-flex-col-4">
          <ec-inline-input-field
            :is-editable="true"
            :is-editing="true"
            label="Inline Input Field - With Error"
            error-message="This field has an error"
            tooltip-text-success=""
            tooltip-text-error=""
          />
        </div>
      </div>
    </div>
  `,
});

all.args = {
  ...basic.args,
  labelTooltip: 'Label tooltip text',
};
