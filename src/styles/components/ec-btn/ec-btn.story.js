import { storiesOf } from '@storybook/vue';
import { boolean, select, text } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-vue-router';
import EcIcon from '../../../components/ec-icon';
import EcBtn from '../../../components/ec-btn';
import { LIGHT_THEME, DARK_THEME } from '../../../../.storybook/backgrounds';

const stories = storiesOf('Button', module);

stories
  .addDecorator(StoryRouter())
  .add('props (dark)', ...generatePropsStory(DARK_THEME), {
    visualRegressionTests: { enabled: false },
  })
  .add('props (light)', ...generatePropsStory(LIGHT_THEME), {
    visualRegressionTests: { enabled: false },
  })
  .add('all buttons (dark)', generateAllForElement('button'), {
    backgrounds: { default: DARK_THEME.name, values: [DARK_THEME] },
    visualRegressionTests: { enabled: false },
  })
  .add('all buttons (light)', generateAllForElement('button'), {
    backgrounds: { default: LIGHT_THEME.name, values: [LIGHT_THEME] },
    visualRegressionTests: { enabled: false },
  })
  .add('all anchors (dark)', generateAllForElement('a'), {
    backgrounds: { default: DARK_THEME.name, values: [DARK_THEME] },
    visualRegressionTests: { enabled: false },
  })
  .add('all anchors (light)', generateAllForElement('a'), {
    backgrounds: { default: LIGHT_THEME.name, values: [LIGHT_THEME] },
    visualRegressionTests: { enabled: false },
  });

function generatePropsStory(theme) {
  return [
    () => ({
      props: {
        tag: {
          default: select('tag', ['button', 'a'], 'button'),
        },
        isDisabled: {
          default: boolean('isDisabled', false),
        },
        btnText: {
          default: text('btnText', 'Click me'),
        },
      },
      // eslint-disable-next-line no-unused-vars
      render(h) {
        function renderSection(title, { btnText, ...props } = {}) {
          const types = ['primary', 'secondary', 'success', 'error', 'warning'];
          const icon = !btnText ? 'simple-check' : undefined;

          return (
            <div class="tw-col-full">
              <h3 class="tw-text-additional-18">{title}</h3>
              {types.map(type => (
                <EcBtn category={type} key={type} {...{ props: { icon, ...props } }} class="tw-mr-8">{btnText}</EcBtn>
              ))}
            </div>
          );
        }

        const icon = 'simple-check';

        return (
          <div class="tw-grid-container">
            <div class="tw-grid">
              {renderSection('Default', { ...this.$props })}
              {renderSection('Small', { size: 'sm', ...this.$props })}
              {renderSection('With icon', { icon, ...this.$props })}
              {renderSection('Rounded', { isRounded: true, ...this.$props })}
              {renderSection('Full width', { isFullWidth: true, ...this.$props })}
              {renderSection('Outline', { isOutline: true, ...this.$props })}
              {renderSection('Loading', { isLoading: true, ...this.$props })}
              {renderSection('Reversed', { isReverse: true, ...this.$props })}
            </div>
          </div>
        );
      },
    }), {
      backgrounds: { default: theme.name, values: [theme] },
      visualRegressionTests: {
        enabled: true,
        knobs: {
          anchors: { tag: 'a' },
          disabled: { isDisabled: true },
          'icon-only': { btnText: '' },
        },
      },
    },
  ];
}

function generateAllForElement(element) {
  return () => ({
    components: { EcIcon },
    data() {
      return {
        element,
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
      <div class="tw-m-20">
        <template v-for="(block, blockIndex) in blocks">
          <h3 :key="blockIndex" class="tw-m-8 tw-text-additional-18">{{block.title}}</h3>
          <component :is="element" v-for="(button, buttonIndex) in block.buttons" :key="blockIndex + '-' + buttonIndex"
           :class="button.classes"
           class="tw-m-8"
           :disabled="button.disabled"
           >
            <template v-if="button.hasIconOnly">
              <ec-icon name="simple-check" :size="24" />
            </template>
            <template v-else>
              <ec-icon v-if="button.hasIcon" class="tw-mr-8" name="simple-check" :size="24" />
              {{ button.text }}
            </template>
           </component>
        </template>
      </div>
      `,
  });
}
