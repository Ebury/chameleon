import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { boolean, text, select } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-vue-router';
import EcBtn from './ec-btn.vue';

const stories = storiesOf('Button', module).addDecorator(StoryRouter());

stories
  .addParameters({
    visualRegressionTests: { enabled: false },
  })
  .add('basic', () => ({
    components: { EcBtn },
    props: {
      isRounded: {
        default: boolean('rounded', false),
      },
      isOutline: {
        default: boolean('outline', false),
      },
      isFullWidth: {
        default: boolean('full width', false),
      },
      isReverse: {
        default: boolean('reverse ***', false),
      },
      isDisabled: {
        default: boolean('disabled *', false),
      },
      isLoading: {
        default: boolean('loading *', false),
      },
      isSubmit: {
        default: boolean('submit', false),
      },
      size: {
        default: select('size', ['sm', 'md'], 'md'),
      },
      category: {
        default: select('type', ['primary', 'secondary', 'success', 'error', 'warning'], 'primary'),
      },
      text: {
        default: text('text', 'Click Me'),
      },
      icon: {
        default: select('icon', ['', 'simple-check', 'simple-download'], 'simple-check'),
      },
      loadingText: {
        default: text('loading text **', ''),
      },
      to: {
        default: text('to', ''),
      },
      href: {
        default: text('href', ''),
      },
    },
    methods: {
      onClick: action('clicked'),
    },
    template: `
      <div class="ec-m--20">
        <h3>Button tag *</h3>

        <ec-btn
          v-bind="$props"
          class="ec-mt--20"
          @click="onClick()"
          >
            <template v-if="loadingText" #loading-text>
              {{loadingText}}
            </template>
            {{text}}
        </ec-btn>

        <ec-btn
          v-if="icon"
          v-bind="$props"
          class="ec-ml--20 ec-mt--20"
          @click="onClick()"
        />

        <h3 class="ec-mt--20">Router link</h3>
        <ec-btn
          v-bind="{ ...$props, to: '/my/url/' }"
          class="ec-mt--20"
          @click.native="onClick()"
          >
            {{text}}
        </ec-btn>

        <ec-btn
          v-if="icon"
          v-bind="{ ...$props, to: '/my/url/' }"
          class="ec-ml--20 ec-mt--20"
          @click.native="onClick()"
        />

        <h3 class="ec-mt--20">Anchor link - a tag</h3>

        <ec-btn
          v-bind="{ ...$props, href: 'http://www.ebury.com' }"
          class="ec-mt--20"
          @click.prevent.stop="onClick()"
          >{{text}}</ec-btn>

        <ec-btn
          v-if="icon"
          v-bind="{ ...$props, href: 'http://www.ebury.com' }"
          class="ec-ml--20 ec-mt--20"
          @click.prevent.stop="onClick()"
        />

        <p class="ec-mt--40"> * Disabled and loading states apply only to buttons.</p>
        <p> ** Custom loader text will replace the spinner loader if set.</p>
        <p> *** Reverse cannot be combined with outline.</p>
      </div>
  `,
  }));
