import { storiesOf } from '@storybook/vue';
import { boolean, text } from '@storybook/addon-knobs';
import EcCheckbox from './ec-checkbox.vue';

const stories = storiesOf('Checkbox', module);

stories
  .add('basic', () => ({
    components: { EcCheckbox },
    props: {
      valueFromPropsChecked1: {
        default: boolean('Checkbox 1'),
      },
      valueFromPropsChecked2: {
        default: boolean('Checkbox 2'),
      },
      valueFromPropsLabelMessage: {
        default: text('Label Message', 'I accept the terms and conditions'),
      },
      valueFromPropsErrorMessage: {
        default: text('Error Message', 'An error has occured'),
      },
      valueFromPropsLarge: {
        default: boolean('Is Large', false),
      },
      valueFromPropsHasError: {
        default: boolean('Has Error', false),
      },
      valueFromPropsDisabled: {
        default: boolean('Is Disabled', false),
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
      };
    },
    template: `
      <div class="ec-m--24">
        <h3> Label and Error messages coming from props</h3>
        <ec-checkbox
          v-if="!valueFromPropsHasError"
          class="ec-mb--24"
          v-model="checkbox1"
          :disabled="valueFromPropsDisabled"
          :labelMessage="valueFromPropsLabelMessage"
          :large="valueFromPropsLarge">
        </ec-checkbox>

        <ec-checkbox
          v-else="valueFromPropsHasError"
          class="ec-mb--24"
          :disabled="valueFromPropsDisabled"
          :labelMessage="valueFromPropsLabelMessage"
          :errorMessage="valueFromPropsErrorMessage"
          :large="valueFromPropsLarge">
        </ec-checkbox>

        <h3> Label and Error messages coming from template</h3>

        <ec-checkbox
          v-if="!valueFromPropsHasError"
          v-model="checkbox2"
          :disabled="valueFromPropsDisabled"
          :large="valueFromPropsLarge">
          <template #label-message>
            I accept the <a href="#" @click.stop.prevent="$emit('OpenTerms')"> terms and conditions </a>
          </template>
        </ec-checkbox>

        <ec-checkbox
          v-else="valueFromPropsHasError"
          :disabled="valueFromPropsDisabled"
          :large="valueFromPropsLarge">
          <template #label-message>
            I accept the <a href="#" @click.stop.prevent="$emit('OpenTerms')"> terms and conditions </a>
          </template>
          <template #error-message>
            An error has occured
          </template>
        </ec-checkbox>
      </div>
    `,
  }))
  .add('all', () => ({
    components: { EcCheckbox },
    data() {
      return {
        errorMessage: 'An error has occured',
        errorMessageMultiline: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eos consequatur quas reiciendis aliquid ipsam ea pariatur dolorem, molestias maiores.',
      };
    },
    template: `
      <div class="ec-m--24">
        <div class="ec-grid">
          <h3>Not checked</h3>
          <div class="ec-grid__row">
            <ec-checkbox class="ec-mb--24 ec-col-6">
              <template #label-message>
                I accept the <a href="#" @click.stop.prevent="$emit('OpenTerms')"> terms and conditions </a>
              </template>
            </ec-checkbox>

            <ec-checkbox
              class="ec-mb--24 ec-col-6"
              large>
              <template #label-message>
                I accept the <a href="#" @click.stop.prevent="$emit('OpenTerms')"> terms and conditions </a>
              </template>
            </ec-checkbox>
          </div>

          <h3>Not checked - with multiline label text</h3>
          <div class="ec-grid__row">
            <ec-checkbox class="ec-mb--24 ec-col-6">
              <template #label-message>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eos consequatur quas reiciendis aliquid ipsam ea pariatur dolorem, molestias maiores.
              </template>
            </ec-checkbox>

            <ec-checkbox class="ec-mb--24 ec-col-6" large>
              <template #label-message>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eos consequatur quas reiciendis aliquid ipsam ea pariatur dolorem, molestias maiores.
              </template>
            </ec-checkbox>
          </div>

          <h3>Checked</h3>
          <div class="ec-grid__row">
            <ec-checkbox
              checked
              class="ec-mb--24 ec-col-6">
              <template #label-message>
                I accept the <a href="#" @click.stop.prevent="$emit('OpenTerms')"> terms and conditions </a>
              </template>
            </ec-checkbox>

            <ec-checkbox
              class="ec-mb--24 ec-col-6"
              checked
              large>
              <template #label-message>
                I accept the <a href="#" @click.stop.prevent="$emit('OpenTerms')"> terms and conditions </a>
              </template>
            </ec-checkbox>
          </div>

          <h3>Error</h3>
          <div class="ec-grid__row">
            <ec-checkbox class="ec-mb--24 ec-col-6"
              :errorMessage="errorMessage">
              <template #label-message>
                I accept the <a href="#" @click.stop.prevent="$emit('OpenTerms')"> terms and conditions </a>
              </template>
            </ec-checkbox>
            <ec-checkbox
              class="ec-mb--24 ec-col-6"
              :errorMessage="errorMessage"
              large>
              <template #label-message>
                I accept the <a href="#" @click.stop.prevent="$emit('OpenTerms')"> terms and conditions </a>
              </template>
            </ec-checkbox>
          </div>

          <h3>Error - with multiline label text</h3>
          <div class="ec-grid__row">
            <ec-checkbox
              :errorMessage="errorMessageMultiline"
              class="ec-mb--24 ec-col-6">
              <template #label-message>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eos consequatur quas reiciendis aliquid ipsam ea pariatur dolorem, molestias maiores.
              </template>
            </ec-checkbox>

            <ec-checkbox
              :errorMessage="errorMessageMultiline"
              class="ec-mb--24 ec-col-6"
              large>
              <template #label-message>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident eos consequatur quas reiciendis aliquid ipsam ea pariatur dolorem, molestias maiores.
              </template>
            </ec-checkbox>
          </div>

          <h3>Disabled</h3>
          <div class="ec-grid__row">
            <ec-checkbox class="ec-mb--24 ec-col-6"
              disabled>
              <template #label-message>
                I accept the <a href="#" @click.stop.prevent="$emit('OpenTerms')"> terms and conditions </a>
              </template>
            </ec-checkbox>
            <ec-checkbox
              class="ec-mb--24 ec-col-6"
              disabled
              large>
              <template #label-message>
                I accept the <a href="#" @click.stop.prevent="$emit('OpenTerms')"> terms and conditions </a>
              </template>
            </ec-checkbox>
          </div>

          <h3>Disabled - checked</h3>
          <div class="ec-grid__row">
            <ec-checkbox class="ec-mb--24 ec-col-6"
              checked
              disabled>
              <template #label-message>
                I accept the <a href="#" @click.stop.prevent="$emit('OpenTerms')"> terms and conditions </a>
              </template>
            </ec-checkbox>
            <ec-checkbox
              class="ec-mb--24 ec-col-6"
              checked
              disabled
              large>
              <template #label-message>
                I accept the <a href="#" @click.stop.prevent="$emit('OpenTerms')"> terms and conditions </a>
              </template>
            </ec-checkbox>
          </div>
        <div>
      </div>
    `,
  }));
