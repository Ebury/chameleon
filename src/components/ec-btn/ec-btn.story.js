import { storiesOf } from '@storybook/vue';
import { boolean, text, select } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-vue-router';
import EcBtn from './ec-btn.vue';

const stories = storiesOf('Button component', module).addDecorator(StoryRouter());

stories
  .add('basic', () => ({
    components: { EcBtn },
    props: {
      roundedFromProps: {
        default: boolean('rounded', false),
      },
      outlineFromProps: {
        default: boolean('outline', false),
      },
      fullWidthFromProps: {
        default: boolean('full width', false),
      },
      reverseFromProps: {
        default: boolean('reverse ***', false),
      },
      disabledFromProps: {
        default: boolean('disabled *', false),
      },
      loadingFromProps: {
        default: boolean('loading *', false),
      },
      submitFromProps: {
        default: boolean('submit', false),
      },
      sizeFromProps: {
        default: select('Size', ['sm', 'md'], 'md'),
      },
      typeFromProps: {
        default: select('type', ['primary', 'secondary', 'success', 'error', 'warning'], 'primary'),
      },
      textFromProps: {
        default: text('text', 'Click Me'),
      },
      iconFromProps: {
        default: text('icon', 'simple-check'),
      },
      customLoaderTextFromProps: {
        default: text('customer loader text **', ''),
      },
      toFromProps: {
        default: text('to', ''),
      },
      hrefFromProps: {
        default: text('href', ''),
      },
    },
    template: `
      <div class="ec-m--20">
        <h3>button tag *</h3>

        <ec-btn
          :disabled="disabledFromProps"
          :full-width="fullWidthFromProps"
          :icon="iconFromProps"
          :loading="loadingFromProps"
          :outline="outlineFromProps"
          :reverse="reverseFromProps"
          :rounded="roundedFromProps"
          :size="sizeFromProps"
          :submit="submitFromProps"
          :type="typeFromProps"
          class="ec-mt--20"
          >
            <template v-if="customLoaderTextFromProps.length > 0" #text-loader>
              {{customLoaderTextFromProps}}
            </template>
            {{textFromProps}}
        </ec-btn>

        <ec-btn
          v-if="iconFromProps.length > 0"
          :disabled="disabledFromProps"
          :full-width="fullWidthFromProps"
          :icon="iconFromProps"
          :loading="loadingFromProps"
          :outline="outlineFromProps"
          :reverse="reverseFromProps"
          :rounded="roundedFromProps"
          :size="sizeFromProps"
          :submit="submitFromProps"
          :type="typeFromProps"
          class="ec-ml--20 ec-mt--20"
        />

        <h3 class="ec-mt--20">router-link</h3>
        <ec-btn
          :disabled="disabledFromProps"
          :full-width="fullWidthFromProps"
          :href="hrefFromProps"
          :icon="iconFromProps"
          :outline="outlineFromProps"
          :reverse="reverseFromProps"
          :rounded="roundedFromProps"
          :size="sizeFromProps"
          :text="textFromProps"
          :type="typeFromProps"
          class="ec-mt--20"
          to="tradeFinance"
          >
            {{textFromProps}}
        </ec-btn>

        <ec-btn
          v-if="iconFromProps.length > 0"
          :disabled="disabledFromProps"
          :full-width="fullWidthFromProps"
          :href="hrefFromProps"
          :icon="iconFromProps"
          :outline="outlineFromProps"
          :reverse="reverseFromProps"
          :size="sizeFromProps"
          :type="typeFromProps"
          class="ec-ml--20 ec-mt--20"
          to="tradeFinance"
        />

        <h3 class="ec-mt--20">normal link - a tag</h3>

        <ec-btn
          :disabled="disabledFromProps"
          :full-width="fullWidthFromProps"
          :icon="iconFromProps"
          :outline="outlineFromProps"
          :reverse="reverseFromProps"
          :rounded="roundedFromProps"
          :size="sizeFromProps"
          :text="textFromProps"
          :type="typeFromProps"
          class="ec-mt--20"
          href="http://www.ebury.com"
          >
            {{textFromProps}}
        </ec-btn>

        <ec-btn
          v-if="iconFromProps.length > 0"
          :disabled="disabledFromProps"
          :full-width="fullWidthFromProps"
          :icon="iconFromProps"
          :outline="outlineFromProps"
          :reverse="reverseFromProps"
          :size="sizeFromProps"
          :type="typeFromProps"
          class="ec-ml--20 ec-mt--20"
            href="http://www.ebury.com"
        />

        <p class="ec-mt--40"> * Disabled and loading states apply only to buttons.</p>
        <p> ** Custom loader text will replace the spinner loader if set.</p>
        <p> *** We have only one category for reverse and cannot be combined with outline.</p>
      </div>
  `,
  }));

export default stories;
