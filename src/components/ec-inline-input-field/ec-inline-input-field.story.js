import { storiesOf } from '@storybook/vue';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { EDIT, LOADING, READ_ONLY } from '@/enums/input-status';
import EcInlineInputField from './ec-inline-input-field.vue';

const stories = storiesOf('Inline input Field', module);

stories
  .add('basic', () => ({
    components: { EcInlineInputField },
    props: {
      valueFromKnob: {
        default: text('Initial value', 'Initial value'),
      },
      isEditable: {
        default: boolean('Is editable?', true),
      },
      error: {
        default: boolean('Error when saving?', false),
      },
    },
    data() {
      return {
        value: this.valueFromKnob,
        status: READ_ONLY,
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
        this.status = EDIT;
      },
      onCancel() {
        action('cancel');
        this.status = READ_ONLY;
      },
      onSubmit(value) {
        action('submit');
        this.status = LOADING;

        setTimeout(() => {
          if (!this.error) {
            this.value = value;
          }
          this.status = READ_ONLY;
        }, 1000);
      },
    },
    template: `
    <div class="tw-grid-container">
      <div class="tw-grid">
        <div class="tw-col-full md:tw-col-4">
          <ec-inline-input-field
            label="Inline input field"
            :is-editable="isEditable"
            :status="status"
            :value="value"
            @cancel="onCancel"
            @edit="onEdit"
            @submit="onSubmit"
          >
            {{ value }}
          </ec-inline-input-field>
        </div>
        <div class="tw-col-full md:tw-col-4">
          <ec-inline-input-field label="Inline input field - Uneditable">
            {{ value }}
          </ec-inline-input-field>
        </div>
        <div class="tw-col-full md:tw-col-4">
          <ec-inline-input-field label="Inline input field - Uneditable / No plain text">
            <a href="#">{{ value }}</a>
          </ec-inline-input-field>
        </div>
        <div class="tw-col-full"></div>
        <div class="tw-col-full md:tw-col-4">
          Model value text: {{ value }}
        </div>
      </div>
    </div>
    `,
  }));
