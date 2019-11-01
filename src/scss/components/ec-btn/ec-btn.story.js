import { storiesOf } from '@storybook/vue';
import {
  boolean, number, select, text,
} from '@storybook/addon-knobs';
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
      hasIconOnly: {
        default: boolean('Has Icon Only'),
      },
      isRounded: {
        default: boolean('Is Rounded', false),
      },
      isOutlined: {
        default: boolean('Is Outlined', false),
      },
      isFullWidth: {
        default: boolean('is Full Width', false),
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
            'ec-btn--full-width': this.isFullWidth,
            'ec-btn--icon-only': this.hasIconOnly,
          },
        ];
      },
    },
    template: `
      <div class="ec-m--20">
        <div>
          <h3 class="ec-m--8">This is a button tag with a "ec-btn" class</h3>
          <button
            :class="classNames"
            class="ec-m--8 ec-btn"
            :disabled="isDisabled"
            >
            <ec-icon v-if="hasIcon" name="simple-check" :size="22" />
            <template v-if="!hasIconOnly" >
              <span class="ec-ml--8">{{this.btnText}}</span>
            </template>
          </button>
        </div>

        <div>
          <h3 class="ec-m--8">This is an a tag with a "ec-btn" class</h3>
          <a
            href="https://online.ebury.com/login/?next=/"
            :class="classNames"
            class="ec-m--8 ec-btn"
            >
            <ec-icon v-if="hasIcon" name="simple-check" :size="22" />
            <template v-if="!hasIconOnly" >
              <span class="ec-ml--8">{{this.btnText}}</span>
            </template>
          </a>
        </div>

        <div>
          <h3 class="ec-m--8">This is a router-link tag with a "ec-btn" class</h3>
          <router-link
            to="/someurl"
            :class="classNames"
            class="ec-m--8 ec-btn"
            >
            <ec-icon v-if="hasIcon" name="simple-check" :size="22" />
            <template v-if="!hasIconOnly" >
              <span class="ec-ml--8">{{this.btnText}}</span>
            </template>
          </router-link>
        </div>

        <p class="ec-mt--24">* Please keep in mind there is no disabled attribute for links</p>
      </div>
    `,
  }))
  .add('all', () => ({
    template: `
      <div class="ec-m--20">

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
  .add('icon buttons', () => ({
    components: { EcIcon },
    props: {
      iconName: {
        default: select('Icon name', ['simple-check', 'simple-add', 'simple-dashboard', 'simple-sign-out'], 'simple-add'),
      },
      iconSize: {
        default: number('Icon size', 20),
      },
    },
    template: `
        <div class="ec-m--20">
          <button class="ec-btn ec-btn--primary ec-btn--icon-only">
            <ec-icon :name="iconName" :size="iconSize" />
          </button>
          <button class="ec-btn ec-btn--primary-reverse ec-btn--icon-only">
            <ec-icon :name="iconName" :size="iconSize" />
          </button>
          <button class="ec-btn ec-btn--secondary ec-btn--icon-only">
            <ec-icon :name="iconName" :size="iconSize" />
          </button>
          <button class="ec-btn ec-btn--success ec-btn--icon-only">
            <ec-icon :name="iconName" :size="iconSize" />
          </button>
          <button class="ec-btn ec-btn--error ec-btn--icon-only">
            <ec-icon :name="iconName" :size="iconSize" />
          </button>
          <button class="ec-btn ec-btn--icon-only" disabled>
            <ec-icon :name="iconName" :size="iconSize" />
          </button>
        </div>
      `,
  }));
