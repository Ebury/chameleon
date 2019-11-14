/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
import { storiesOf } from '@storybook/vue';
import { boolean, select, text } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-vue-router';
import EcIcon from '@/components/ec-icon';

const stories = storiesOf('Button', module);

const darkTheme = { name: 'dark', value: 'rgb(46,54,56)', default: true };
const lightTheme = { name: 'light', value: '#fff', default: true };

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
        default: boolean('Has Icon Only', false),
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
        default: select('Color', [
          'ec-btn--primary',
          'ec-btn--primary-reverse',
          'ec-btn--secondary',
          'ec-btn--secondary-reverse',
          'ec-btn--success',
          'ec-btn--success-reverse',
          'ec-btn--error',
          'ec-btn--error-reverse',
          'ec-btn--warning',
          'ec-btn--warning-reverse',
        ], 'ec-btn--primary'),
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
            <template v-if="!hasIconOnly">
              <ec-icon v-if="hasIcon" class="ec-mr--8" name="simple-check" :size="22" />
              <span>{{this.btnText}}</span>
            </template>
            <ec-icon v-else name="simple-check" :size="22" />
          </button>
        </div>

        <div>
          <h3 class="ec-m--8">This is an a tag with a "ec-btn" class</h3>
          <a
            href="https://online.ebury.com/login/?next=/"
            :class="classNames"
            class="ec-m--8 ec-btn"
            >
            <template v-if="!hasIconOnly">
              <ec-icon v-if="hasIcon" class="ec-mr--8" name="simple-check" :size="22" />
              <span>{{this.btnText}}</span>
            </template>
            <ec-icon v-else name="simple-check" :size="22" />
          </a>
        </div>

        <div>
          <h3 class="ec-m--8">This is a router-link tag with a "ec-btn" class</h3>
          <router-link
            to="/someurl"
            :class="classNames"
            class="ec-m--8 ec-btn"
            >
            <template v-if="!hasIconOnly">
              <ec-icon v-if="hasIcon" class="ec-mr--8" name="simple-check" :size="22" />
              <span>{{this.btnText}}</span>
            </template>
            <ec-icon v-else name="simple-check" :size="22" />
          </router-link>
        </div>

        <p class="ec-mt--24">* Please keep in mind there is no disabled attribute for links</p>
      </div>
    `,
  }))
  .add('all buttons (dark)', generateAllForElement('button'), {
    backgrounds: [darkTheme],
  })
  .add('all buttons (light)', generateAllForElement('button'), {
    backgrounds: [lightTheme],
  })
  .add('all anchors (dark)', generateAllForElement('a'), {
    backgrounds: [darkTheme],
  })
  .add('all anchors (light)', generateAllForElement('a'), {
    backgrounds: [lightTheme],
  });

function generateAllForElement(element) {
  return () => ({
    components: { EcIcon },
    data() {
      return {
        element,
        buttons: [
          {
            title: 'Solid Buttons',
            data: [
              { classes: '', text: 'Primary' },
            ],
          },
        ],
        types: ['primary', 'secondary', 'success', 'error', 'warning'],
        disabled: [false, true],
        rounded: [false, true],
        outline: [false, true],
        reverse: [false, true],
        hasIcon: [false, true],
        hasIconOnly: [false, true],
        fullWidth: [false, true],
        sizes: ['sm', 'md'],
      };
    },
    computed: {
      blocks() {
        function cartesian(...args) {
          const result = [];
          const max = args.length - 1;
          function helper(arr, i) {
            for (let j = 0, l = args[i].length; j < l; j++) {
              const a = arr.slice(0);
              a.push(args[i][j]);
              if (i === max) {
                result.push(a);
              } else {
                helper(a, i + 1);
              }
            }
          }
          helper([], 0);
          return result;
        }

        // generate all possible combinations of props
        let combinations;
        if (this.element !== 'a') {
          combinations = cartesian(this.rounded, this.outline, this.reverse, this.hasIcon, this.hasIconOnly, this.fullWidth, this.sizes, this.disabled);
        } else {
          combinations = cartesian(this.rounded, this.outline, this.reverse, this.hasIcon, this.hasIconOnly, this.fullWidth, this.sizes);
        }

        // each row in the story will represent one combination, and each row will show all button types.
        return combinations.map(([rounded, outline, reverse, hasIcon, hasIconOnly, fullWidth, size, disabled]) => {
          const buttons = this.types.map((type) => {
            const buttonText = type;
            const classes = {
              'ec-btn': true,
              'ec-btn--icon-only': hasIconOnly,
              'ec-btn--full-width': fullWidth,
              'ec-btn--rounded': rounded,
              'ec-btn--outline': outline,
              [`ec-btn--${type}-reverse`]: reverse,
              [`ec-btn--${type}`]: !reverse,
              [`ec-btn--${size}`]: true,
            };

            return {
              classes, text: buttonText, hasIcon, hasIconOnly, disabled,
            };
          });

          return {
            buttons,
            title: [
              `${size === 'md' ? 'Medium' : 'Small'}`,
              `${hasIconOnly ? 'icon-only' : ''}`,
              `${hasIcon ? 'icon' : ''}`,
              `${outline ? 'outline' : ''}`,
              `${reverse ? 'reverse' : ''}`,
              `${fullWidth ? 'full width' : ''}`,
              `${rounded ? 'rounded' : ''}`,
              `${disabled ? 'disabled' : ''}`,
            ].join(' '),
          };
        });
      },
    },
    template: `
      <div class="ec-m--20">
        <template v-for="(block, blockIndex) in blocks">
          <h3 :key="blockIndex" class="ec-m--8" style="color:tomato">{{block.title}}</h3>
          <component :is="element" v-for="(button, buttonIndex) in block.buttons" :key="blockIndex + '-' + buttonIndex"
           :class="button.classes"
           class="ec-m--8"
           :disabled="button.disabled"
           >
            <template v-if="button.hasIconOnly">
              <ec-icon name="simple-check" :size="24" />
            </template>
            <template v-else>
              <ec-icon v-if="button.hasIcon" class="ec-mr--8" name="simple-check" :size="24" />
              {{ button.text }}
            </template>
           </component>
        </template>
      </div>
      `,
  });
}
