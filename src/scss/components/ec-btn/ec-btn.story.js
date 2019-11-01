import { storiesOf } from '@storybook/vue';
import { boolean, select, text } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-vue-router';
import EcIcon from '@/components/ec-icon';

const stories = storiesOf('Button', module);


stories
  .addDecorator(StoryRouter())
  .add('basic', () => ({
    components: { EcIcon },
    props: {
      btnText: {
        default: text('Button Text', 'Click Me'),
      },
      isDisabled: {
        default: boolean('Disabled', false),
      },
      hasIcon: {
        default: boolean('Has Icon', false),
      },
      hasOnlyIcon: {
        default: boolean('Has Only Icon', false),
      },
      isRounded: {
        default: boolean('Is Rounded', false),
      },
      isOutlined: {
        default: boolean('Is Outlined', false),
      },
      size: {
        default: select('Size', ['ec-btn--sm', 'ec-btn--md'], 'ec-btn--sm'),
      },
      color: {
        default: select('Color', ['ec-btn--primary', 'ec-btn--primary-reverse', 'ec-btn--secondary', 'ec-btn--success', 'ec-btn--error'], 'ec-btn--primary'),
      },
    },
    computed: {
      classNames() {
        return [
          this.size,
          this.color,
          {
            'ec-btn--rounded': this.isRounded,
            'ec-btn--outline': this.isOutlined,
          },
        ];
      },
    },
    template: `
      <div style="margin:20px;">
        <div>
          <h3 class="ec-m--8">This is a button tag with a "ec-btn" class</h3>
          <button
            :class="classNames"
            class="ec-m--8 ec-btn"
            :disabled="isDisabled"
            >
            <ec-icon v-if="hasIcon" name="simple-check" style="margin-right:10px;" :size=20 />
            {{this.btnText}}
          </button>
        </div>

        <div>
          <h3 class="ec-m--8">This is an a tag with a "ec-btn" class</h3>
          <a
            href="https://online.ebury.com/login/?next=/"
            :class="classNames"
            class="ec-m--8 ec-btn"
            >
            <ec-icon v-if="hasIcon" name="simple-check" style="margin-right:10px;" :size=20 />
            {{this.btnText}}
          </a>
        </div>

        <div>
          <h3 class="ec-m--8">This is a router-link tag with a "ec-btn" class</h3>
          <router-link
            to="/someurl"
            :class="classNames"
            class="ec-m--8 ec-btn"
            >
            <ec-icon v-if="hasIcon" name="simple-check" style="margin-right:10px;" :size=20 />
            {{this.btnText}}
          </router-link>
        </div>

        <p class="ec-mt--24">* Please keep in mind there is no disabled attribute for links</p>
      </div>
    `,
  }))
  .add('all', () => ({
    template: `
      <div style="margin:20px;">

        <h3 class="ec-m--8">Solid Buttons</h3>
        <button class="ec-btn ec-btn--md ec-btn--primary ec-m--8">Primary</button>
        <button class="ec-btn ec-btn--md ec-btn--secondary ec-m--8">Secondary</button>
        <button class="ec-btn ec-btn--sm ec-btn--success ec-m--8">Success</button>
        <button class="ec-btn ec-btn--sm ec-btn--error ec-m--8">Error</button>
        <button class="ec-btn ec-btn--sm ec-m--8" disabled>Disabled</button>

        <h3 class="ec-m--8">Solid Rounded Buttons</h3>
        <button class="ec-btn ec-btn--md ec-btn--rounded ec-btn--primary ec-m--8">Primary</button>
        <button class="ec-btn ec-btn--md ec-btn--rounded ec-btn--secondary ec-m--8">Secondary</button>
        <button class="ec-btn ec-btn--sm ec-btn--rounded ec-btn--success ec-m--8">Success</button>
        <button class="ec-btn ec-btn--sm ec-btn--rounded ec-btn--error ec-m--8">Error</button>
        <button class="ec-btn ec-btn--sm ec-btn--rounded ec-m--8" disabled>Disabled</button>

        <h3 class="ec-m--8">Outline Buttons</h3>
        <button class="ec-btn ec-btn--md ec-btn--outline ec-btn--primary ec-m--8">Primary</button>
        <button class="ec-btn ec-btn--md ec-btn--outline ec-btn--secondary ec-m--8">Secondary</button>
        <button class="ec-btn ec-btn--sm ec-btn--outline ec-btn--success ec-m--8">Success</button>
        <button class="ec-btn ec-btn--sm ec-btn--outline ec-btn--error ec-m--8">Error</button>
        <button class="ec-btn ec-btn--sm ec-m--8 ec-btn--outline" disabled>Disabled</button>

        <h3 class="ec-m--8">Outline Rounded Buttons</h3>
        <button class="ec-btn ec-btn--md ec-btn--rounded ec-btn--outline ec-btn--primary ec-m--8">Primary</button>
        <button class="ec-btn ec-btn--md ec-btn--rounded ec-btn--outline ec-btn--secondary ec-m--8">Secondary</button>
        <button class="ec-btn ec-btn--sm ec-btn--rounded ec-btn--outline ec-btn--success ec-m--8">Success</button>
        <button class="ec-btn ec-btn--sm ec-btn--rounded ec-btn--outline ec-btn--error ec-m--8">Error</button>
        <button class="ec-btn ec-btn--sm ec-btn--rounded ec-btn--outline ec-m--8" disabled>Disabled</button>
      </div>
    `,
  }));
