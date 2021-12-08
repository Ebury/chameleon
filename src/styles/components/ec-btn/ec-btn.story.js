import EcIcon from '../../../components/ec-icon';
import EcBtn from '../../../components/ec-btn';
import { LIGHT_THEME, DARK_THEME } from '../../../../.storybook/backgrounds';

export const propsDark = generatePropsStory('Props (dark)', DARK_THEME);
export const propsLight = generatePropsStory('Props (light)', LIGHT_THEME);
export const allButtonsDark = generateAllForElement('All Buttons (dark)', 'button', DARK_THEME);
export const allButtonsLight = generateAllForElement('All Buttons (light)', 'button', LIGHT_THEME);
export const allAnchorsDark = generateAllForElement('All Anchors (dark)', 'a', DARK_THEME);
export const allAnchorsLight = generateAllForElement('All Anchors (light)', 'a', LIGHT_THEME);

function generatePropsStory(storyName, theme) {
  const PropsStoryTemplate = (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    // eslint-disable-next-line no-unused-vars
    render(h) {
      function renderSection(title, { btnText, ...props } = {}) {
        const types = ['primary', 'secondary', 'success', 'error', 'warning'];

        return (
          <div class="tw-col-full">
            <h3 class="tw-text-additional-18">{title}</h3>
            {types.map(type => (
              <EcBtn key={type} {...{ props: { ...props, category: type } }} class="tw-mr-8">{btnText}</EcBtn>
            ))}
          </div>
        );
      }

      return (
        <div class="tw-grid-container">
          <div class="tw-grid">
            {renderSection('Default', { ...this.$props })}
            {renderSection('Small', { ...this.$props, size: 'sm' })}
            {renderSection('With icon', { ...this.$props, icon: 'simple-check' })}
            {renderSection('Rounded', { ...this.$props, isRounded: true })}
            {renderSection('Full width', { ...this.$props, isFullWidth: true })}
            {renderSection('Outline', { ...this.$props, isOutline: true })}
            {renderSection('Loading', { ...this.$props, isLoading: true })}
            {renderSection('Reversed', { ...this.$props, isReverse: true })}
          </div>
        </div>
      );
    },
  });

  const storyFn = PropsStoryTemplate.bind({});
  storyFn.storyName = storyName;
  storyFn.argTypes = {
    tag: {
      options: ['button', 'a'],
      control: { type: 'select' },
    },
  };
  storyFn.args = {
    tag: 'button',
    isDisabled: false,
    btnText: 'Click me',
  };
  storyFn.parameters = {
    docs: { disable: true },
    backgrounds: { default: theme.name, values: [theme] },
    actions: { disable: true },
    visualRegressionTests: {
      controls: {
        anchors: { tag: 'a' },
        disabled: { isDisabled: true },
      },
    },
  };

  return storyFn;
}

function generateAllForElement(storyName, element, theme) {
  const storyFn = () => ({
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
  storyFn.storyName = storyName;
  storyFn.parameters = {
    backgrounds: { default: theme.name, values: [theme] },
    controls: { disable: true },
    actions: { disable: true },
    docs: { disable: true },
    visualRegressionTests: { disable: true },
  };

  return storyFn;
}
