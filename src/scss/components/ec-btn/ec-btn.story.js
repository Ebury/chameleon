import { storiesOf } from '@storybook/vue';
import { boolean } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-vue-router';
import EcIcon from '@/components/ec-icon';

const stories = storiesOf('Button', module);


stories
  .addDecorator(StoryRouter())
  .add('basic', () => ({
    components: { EcIcon },
    props: {
      isDisabled: {
        default: boolean('Disabled', false),
      },
      hasIcon: {
        default: boolean('Has Icon', false),
      },
      isSmall: {
        default: boolean('ec-btn--sm', true),
      },
      isMedium: {
        default: boolean('ec-btn--md', false),
      },
      isRounded: {
        default: boolean('ec-btn--rounded', false),
      },
      isNegative: {
        default: boolean('ec-btn--negative', false),
      },
      isPrimary: {
        default: boolean('ec-btn--primary', false),
      },
      isSecondary: {
        default: boolean('ec-btn--secondary', false),
      },
      isSuccess: {
        default: boolean('ec-btn--success', false),
      },
      isError: {
        default: boolean('ec-btn--error', false),
      },
    },
    computed: {
      classNames() {
        return {
          'ec-btn--primary': this.isPrimary,
          'ec-btn--secondary': this.isSecondary,
          'ec-btn--success': this.isSuccess,
          'ec-btn--error': this.isError,
          'ec-btn--rounded': this.isRounded,
          'ec-btn--negative': this.isNegative,
          'ec-btn--sm': this.isSmall,
          'ec-btn--md': this.isMedium,
        };
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
            Click Me
          </button>
        </div>

        <div>
          <h3 class="ec-m--8">This is an a tag with a "ec-btn" class</h3>
          <a
            href="https://online.ebury.com/login/?next=/"
            :class="classNames"
            class="ec-m--8 ec-btn"
            :disabled="isDisabled"
            >
            <ec-icon v-if="hasIcon" name="simple-check" style="margin-right:10px;" :size=20 />
            Click Me
          </a>
        </div>

        <div>
          <h3 class="ec-m--8">This is a router-link tag with a "ec-btn" class</h3>
          <router-link
            to="/someurl"
            :class="classNames"
            class="ec-m--8 ec-btn"
            :disabled="isDisabled"
            >
            <ec-icon v-if="hasIcon" name="simple-check" style="margin-right:10px;" :size=20 />
            Click Me
          </router-link>
        </div>
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
  }))
  .add('ghost', () => ({
    template: `
      <div style="padding:20px; background:#005166;width:100vw;height:100vh;">
        <h3 class="ec-m--8" style="color:white;" >Ghost Buttons</h3>
        <button class="ec-btn ec-btn--negative ec-m--8">Primary</button>
        <button class="ec-btn ec-btn--negative ec-btn--primary ec-btn--rounded ec-m--8">Primary</button>
        
        <h3 class="ec-m--8" style="color:white;" >Disabled Ghost Buttons</h3>
        <button class="ec-btn ec-btn--negative ec-m--8" disabled>Disabled</button>
        <button class="ec-btn ec-btn--negative ec-btn--rounded ec-m--8" disabled>Disabled</button>
      </div>
    `,
  }));
