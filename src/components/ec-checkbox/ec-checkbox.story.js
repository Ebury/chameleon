import { storiesOf } from '@storybook/vue';
import { boolean, text } from '@storybook/addon-knobs';
import EcCheckbox from './ec-checkbox.vue';

const stories = storiesOf('Checkbox', module);

stories
  .add('all', () => ({
    components: { EcCheckbox },
    props: {
      valueFromPropsChecked1: {
        default: boolean('"Label and Error messages coming from props" Checkbox'),
      },
      valueFromPropsChecked2: {
        default: boolean('"Label and Error messages coming from template" Checkbox'),
      },
      valueFromPropsLabel: {
        default: text('"Label and Error messages coming from props" Checkbox Label', 'I accept the terms and conditions'),
      },
      valueFromPropsErrorMessage: {
        default: text('"Label and Error messages coming from props" Error Message', 'An error has occurred'),
      },
      valueFromPropsHasError: {
        default: boolean('"Label and Error messages coming from props" Has Error', false),
      },
      valueFromPropsDisabled: {
        default: boolean('Both "Label and Error" Checkboxes Are Disabled', false),
      },
    },
    watch: {
      valueFromPropsChecked1: {
        immediate: true,
        handler(newValue) {
          this.checkbox1 = newValue;
        },
      },
      valueFromPropsChecked2: {
        immediate: true,
        handler(newValue) {
          this.checkbox2 = newValue;
        },
      },
    },
    data() {
      return {
        checkbox1: null,
        checkbox2: null,
        errorMessage: 'An error has occurred',
        errorMessageMultiline: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eos consequatur quas reiciendis aliquid ipsam ea pariatur dolorem, molestias maiores.',
      };
    },
    template: `
      <div class="tw-m-24" style="max-width:500px;">
        <h3>Not checked</h3>
        <ec-checkbox class="tw-mb-24 tw-col-12">
          <template #label>
            I accept the <a href="#" @click.stop.prevent="$emit('OpenTerms')"> terms and conditions </a>
          </template>
        </ec-checkbox>

        <h3>Not checked - with multiline label text</h3>
        <ec-checkbox class="tw-mb-24 tw-col-12">
          <template #label>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eos consequatur quas reiciendis aliquid ipsam ea pariatur dolorem, molestias maiores.
          </template>
        </ec-checkbox>

        <h3>Checked</h3>
        <ec-checkbox
          checked
          class="tw-mb-24 tw-col-12">
          <template #label>
            I accept the <a href="#" @click.stop.prevent="$emit('OpenTerms')"> terms and conditions </a>
          </template>
        </ec-checkbox>

        <h3>Error</h3>
        <ec-checkbox class="tw-mb-24 tw-col-12"
          :error-message="errorMessage">
          <template #label>
            I accept the <a href="#" @click.stop.prevent="$emit('OpenTerms')"> terms and conditions </a>
          </template>
        </ec-checkbox>

        <h3>Error - with multiline label text</h3>
        <ec-checkbox
          :error-message="errorMessageMultiline"
          class="tw-mb-24 tw-col-12">
          <template #label>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eos consequatur quas reiciendis aliquid ipsam ea pariatur dolorem, molestias maiores.
          </template>
        </ec-checkbox>

        <h3>Disabled</h3>
        <ec-checkbox class="tw-mb-24 tw-col-12"
          disabled>
          <template #label>
            I accept the <a href="#" @click.stop.prevent="$emit('OpenTerms')"> terms and conditions </a>
          </template>
        </ec-checkbox>

        <h3>Disabled - checked</h3>
        <ec-checkbox class="tw-mb-24 tw-col-12"
          checked
          disabled>
          <template #label>
            I accept the <a href="#" @click.stop.prevent="$emit('OpenTerms')"> terms and conditions </a>
          </template>
        </ec-checkbox>

        <h3> Label and Error messages coming from props</h3>
        <ec-checkbox
          v-if="!valueFromPropsHasError"
          class="tw-mb-24"
          v-model="checkbox1"
          :disabled="valueFromPropsDisabled"
          :label="valueFromPropsLabel">
        </ec-checkbox>
        <ec-checkbox
          v-else="valueFromPropsHasError"
          class="tw-mb-24"
          v-model="checkbox1"
          :disabled="valueFromPropsDisabled"
          :label="valueFromPropsLabel"
          :error-message="valueFromPropsErrorMessage">
        </ec-checkbox>

        <h3> Label and Error messages coming from template</h3>
        <ec-checkbox
          v-if="!valueFromPropsHasError"
          v-model="checkbox2"
          :disabled="valueFromPropsDisabled">
          <template #label>
            I accept the <a href="#" @click.stop.prevent="$emit('OpenTerms')"> terms and conditions </a>
          </template>
        </ec-checkbox>
        <ec-checkbox
          v-else="valueFromPropsHasError"
          v-model="checkbox2"
          :disabled="valueFromPropsDisabled">
          <template #label>
            I accept the <a href="#" @click.stop.prevent="$emit('OpenTerms')"> terms and conditions </a>
          </template>
          <template #error-message>
            An error has occurred
          </template>
        </ec-checkbox>
      </div>
    `,
  }), {
    visualRegressionTests: {
      knobs: {
        'change-by-props': {
          '"Label and Error messages coming from props" Checkbox': true,
          '"Label and Error messages coming from props" Has Error': true,
        },
      },
    },
  });
