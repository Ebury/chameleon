import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import EcInlineInputField from './ec-inline-input-field.vue';

const stories = storiesOf('Inline input Field', module);

stories
  .add('basic', () => ({
    components: { EcInlineInputField },
    props: {
      isEditable: {
        default: true,
      },
    },
    data() {
      return {
        value: 'Initial value',
        statusSuccessCase: 'read-only',
        statusErrorCase: 'read-only',
        errorMessage: null,
      };
    },
    methods: {
      onSuccessCaseEdit() {
        action('edit');
        this.statusSuccessCase = 'edit';
      },
      onSuccessCaseCancel() {
        action('cancel');
        this.statusSuccessCase = 'read-only';
      },
      onSuccessCaseAccept(value) {
        action('accept');
        this.statusSuccessCase = 'loading';

        setTimeout(() => {
          this.value = value;
          this.statusSuccessCase = 'read-only';
        }, 1000);
      },
      onErrorCaseEdit() {
        action('edit');
        this.statusErrorCase = 'edit';
      },
      onErrorCaseCancel() {
        action('cancel');
        this.statusErrorCase = 'read-only';
      },
      onErrorCaseAccept() {
        action('accept');
        this.statusErrorCase = 'loading';

        setTimeout(() => {
          this.statusErrorCase = 'edit';
          this.errorMessage = 'Input field with error';
        }, 1000);
      },
    },
    template: `
    <div class="tw-grid-container">
      <div class="tw-grid">
        <div class="tw-col-full md:tw-col-4">
          <ec-inline-input-field
            label="Inline input field - Success case"
            :is-editable="isEditable"
            :status="statusSuccessCase"
            @cancel="onSuccessCaseCancel"
            @edit="onSuccessCaseEdit"
            @submit="onSuccessCaseAccept"
          >
            {{ value }}
          </ec-inline-input-field>
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-inline-input-field
            label="Inline input field - Error case"
            :is-editable="true"
            :status="statusErrorCase"
            :error-message="errorMessage"
            @cancel="onErrorCaseCancel"
            @edit="onErrorCaseEdit"
            @submit="onErrorCaseAccept"
          >
            {{ value }}
          </ec-inline-input-field>
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-inline-input-field label="Inline input field - Uneditable case">{{ value }}</ec-inline-input-field>
        </div>

        <div class="tw-col-full"></div>

        <div class="tw-col-full md:tw-col-4">
          Model value text: {{ value }}
        </div>
      </div>
    </div>
    `,
  }));
