import { storiesOf } from '@storybook/vue';
import { text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import EcInputField from './ec-input-field.vue';

const stories = storiesOf('Input Field', module);

const GROUPS = {
  NUMBER: 'Number input props',
  TEXT: 'Text input props',
  DATE: 'Date input props',
  TOOLTIP: 'Tooltip Text',
};

stories
  .add('basic', () => ({
    components: { EcInputField },
    props: {
      valueFromPropsNumber: {
        default: text('value', '', GROUPS.NUMBER),
      },
      labelNumber: {
        default: text('label', 'Number input', GROUPS.NUMBER),
      },
      noteNumber: {
        default: text('note', 'Max 80 chars', GROUPS.NUMBER),
      },
      errorMessageNumber: {
        default: text('error message', '', GROUPS.NUMBER),
      },
      iconNumber: {
        default: text('icon', '', GROUPS.NUMBER),
      },
      isSensitive: {
        default: boolean('is sensitive', false),
      },
      valueFromPropsText: {
        default: text('value', '', GROUPS.TEXT),
      },
      labelText: {
        default: text('label', 'Text input', GROUPS.TEXT),
      },
      noteText: {
        default: text('note', 'Max 80 chars', GROUPS.TEXT),
      },
      bottomNoteText: {
        default: text('bottom note', 'Random bottom note text', GROUPS.TEXT),
      },
      errorMessageText: {
        default: text('error message', '', GROUPS.TEXT),
      },
      iconText: {
        default: text('icon', '', GROUPS.TEXT),
      },
      valueFromPropsDate: {
        default: text('value', '', GROUPS.DATE),
      },
      labelDate: {
        default: text('label', 'Date input', GROUPS.DATE),
      },
      labelTooltip: {
        default: text('tooltip label text', 'Tooltip text', GROUPS.TOOLTIP),
      },
      noteDate: {
        default: text('note', 'Max 80 chars', GROUPS.DATE),
      },
      errorMessageDate: {
        default: text('error message', '', GROUPS.DATE),
      },
      iconDate: {
        default: text('icon', '', GROUPS.DATE),
      },
      isInGroup: {
        default: select('is in group', ['', 'left', 'right'], ''),
      },
      isWarning: {
        default: boolean('is warning', false, GROUPS.TEXT),
      },
    },
    watch: {
      valueFromPropsNumber: {
        immediate: true,
        handler(newValue) {
          this.valueNumber = newValue;
        },
      },
      valueFromPropsText: {
        immediate: true,
        handler(newValue) {
          this.valueText = newValue;
        },
      },
      valueFromPropsDate: {
        immediate: true,
        handler(newValue) {
          this.valueDate = newValue;
        },
      },
    },
    data() {
      return {
        valueNumber: null,
        valueText: '',
        valueDate: null,
      };
    },
    methods: {
      onChange: action('change'),
      onInput: action('input'),
    },
    template: `
    <div class="tw-grid-container">
      <div class="tw-grid">
        <div class="tw-col-full md:tw-col-4">
          <ec-input-field type="number" min="5" max="10" v-model.number="valueNumber" :note="noteNumber" :label="labelNumber" :error-message="errorMessageNumber" :icon="iconNumber"  :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field type="text" placeholder="My input" v-model="valueText" :note="noteText" :label="labelText" :error-message="errorMessageText" :icon="iconText" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field type="date" placeholder="My input" v-model="valueDate" :note="noteDate" :label="labelDate" :error-message="errorMessageDate" :icon="iconDate" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field disabled placeholder="My disabled input" v-model="valueText" label="Disabled input" :icon="iconText" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field disabled placeholder="My disabled input" v-model="valueText" label="Disabled input" error-message="Disabled with error" :icon="iconText" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field placeholder="My input" icon="simple-info" v-model="valueText" label="Input with icon" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field readonly placeholder="My input" value="Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eos consequatur quas reiciendis aliquid ipsam ea pariatur dolorem, molestias maiores." label="Read only input with long text" :icon="iconText" :is-in-group="isInGroup" :is-sensitive="isSensitive" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field placeholder="An other input" v-model="valueText" label="Input tooltip on the label" :is-in-group="isInGroup" :is-sensitive="isSensitive" :label-tooltip="labelTooltip" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field placeholder="My input" icon="simple-info" v-model="valueText" label="Short Label" :is-in-group="isInGroup" :is-sensitive="isSensitive" :label-tooltip="labelTooltip" :note="noteText" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field placeholder="My input" icon="simple-info" v-model="valueText" label="Input with bottom note" :is-in-group="isInGroup" :is-sensitive="isSensitive" :bottom-note="bottomNoteText" :is-warning="isWarning" @change="onChange" @input="onInput" />
        </div>

        <div class="tw-col-full md:tw-col-4">
          <ec-input-field readonly placeholder="My input" :value="valueText" label="Input with loading icon" :is-in-group="isInGroup" :is-sensitive="isSensitive" :is-loading="true" />
        </div>

        <div class="tw-col-full"></div>

        <div class="tw-col-full md:tw-col-4">
          Model value number: {{ valueNumber }}
        </div>

        <div class="tw-col-full md:tw-col-4">
          Model value text: {{ valueText }}
        </div>

        <div class="tw-col-full md:tw-col-4">
          Model value date: {{ valueDate }}
        </div>
      </div>
    </div>
    `,
  }));
