import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import EcInlineInputField from './ec-inline-input-field.vue';

const stories = storiesOf('Inline Input Field', module);

stories
  .add('basic', () => ({
    components: { EcInlineInputField },
    props: {
      valueFromKnob: {
        default: text('Initial value', 'Initial value'),
      },
      isCopiable: {
        default: boolean('Is copiable (available only when non editable)', false),
      },
      isEditable: {
        default: boolean('Is editable', true),
      },
      error: {
        default: boolean('Show error when saving', false),
      },
    },
    data() {
      return {
        value: this.valueFromKnob,
        isEditing: false,
        isLoading: false,
      };
    },
    watch: {
      valueFromKnob(value) {
        this.value = value;
      },
    },
    methods: {
      onEdit() {
        action('edit');
        this.isEditing = true;
      },
      onCancel() {
        action('cancel');
        this.isEditing = false;
      },
      onSubmit(value) {
        action('submit');
        this.isEditing = false;
        this.isLoading = true;

        setTimeout(() => {
          if (!this.error) {
            this.value = value;
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
            v-model="value"
            @cancel="onCancel"
            @edit="onEdit"
            @submit="onSubmit"
          >
            {{ value }}
          </ec-inline-input-field>
        </div>
        <div class="tw-col-full md:tw-col-4">
          <ec-inline-input-field label="Inline Input Field - Uneditable">
            {{ value }}
          </ec-inline-input-field>
        </div>
        <div class="tw-col-full md:tw-col-4">
          <ec-inline-input-field label="Inline Input Field - Uneditable / No Plain Text">
            <a href="#">{{ value }}</a>
          </ec-inline-input-field>
        </div>
        <div class="tw-col-full"></div>
        <div class="tw-col-full md:tw-col-4">
          Value: {{ value }}
        </div>
      </div>
    </div>
    `,
  }));
