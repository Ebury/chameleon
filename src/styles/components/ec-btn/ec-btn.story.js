import { computed, defineComponent, ref } from 'vue';

import { DARK_THEME, LIGHT_THEME } from '../../../../.storybook/backgrounds';
import EcBtn from '../../../components/ec-btn';
import EcIcon from '../../../components/ec-icon';

export default {
  title: 'ButtonStyles',
  excludeStories: /.*$/,
};

export const propsDark = generatePropsStory('Props (dark)', DARK_THEME);
export const propsLight = generatePropsStory('Props (light)', LIGHT_THEME);
export const allButtonsDark = generateAllForElement('All Buttons (dark)', 'button', DARK_THEME);
export const allButtonsLight = generateAllForElement('All Buttons (light)', 'button', LIGHT_THEME);
export const allAnchorsDark = generateAllForElement('All Anchors (dark)', 'a', DARK_THEME);
export const allAnchorsLight = generateAllForElement('All Anchors (light)', 'a', LIGHT_THEME);

function generatePropsStory(storyName, theme) {
  const RenderButtonsComponent = defineComponent({
    components: {
      EcBtn,
    },
    setup() {
      const types = ['primary', 'secondary', 'success', 'error', 'warning'];

      return {
        types,
      };
    },
    template: `

      <div class="tw-col-full">
      <h3 class="tw-text-additional-18">{{$attrs.title}}</h3>
      <EcBtn
        v-for="type in types"
        :key="type"
        v-bind="{...{ ...$attrs, category: type }}"
        class="tw-mr-8"
      >
        {{$attrs.btnText}}
      </EcBtn>
      </div>
    `,
  });

  const PropsStoryTemplate = args => ({
    components: {
      RenderButtonsComponent,
    },
    setup() {
      const types = ['primary', 'secondary', 'success', 'error', 'warning'];

      return {
        types,
        args,
      };
    },
    template: `
      <div class="tw-grid-container">
      <div class="tw-grid">
        <RenderButtonsComponent title="Default" v-bind="{ ...args }"/>
        <RenderButtonsComponent title="Small" v-bind="{ ...args, size: 'sm' }"/>
        <RenderButtonsComponent title="With icon" v-bind="{ ...args, icon: 'simple-check' }"/>
        <RenderButtonsComponent title="Rounded" v-bind="{ ...args, isRounded: true }"/>
        <RenderButtonsComponent title="Full width" v-bind="{ ...args, isFullWidth: true }"/>
        <RenderButtonsComponent title="Outline" v-bind="{ ...args, isOutline: true }"/>
        <RenderButtonsComponent title="Loading" v-bind="{ ...args, isLoading: true }"/>
        <RenderButtonsComponent title="Reversed" v-bind="{ ...args, isReverse: true }"/>
        <RenderButtonsComponent title="Disabled" v-bind="{ ...args, isDisabled: true }"/>
        <RenderButtonsComponent title="Disabled Outline" v-bind="{ ...args, isDisabled: true, isOutline: true }"/>
      </div>
      </div>
    `,
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
    backgrounds: {
      default: theme.name,
      values: [theme],
    },
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

function generateAllForElement(storyName, elementName, theme) {
  const storyFn = () => ({
    components: { EcIcon },
    setup() {
      const element = ref(elementName);
      const types = ['primary', 'secondary', 'success', 'error', 'warning'];
      const disabled = [false, true];
      const rounded = [false, true];
      const outline = [false, true];
      const reverse = [false, true];
      const hasIcon = [false, true];
      const hasIconOnly = [false, true];
      const fullWidth = [false, true];
      const sizes = ['sm', 'md'];

      const blocks = computed(() => {
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
        if (element.value !== 'a') {
          combinations = cartesian(rounded, outline, reverse, hasIcon, hasIconOnly, fullWidth, sizes, disabled);
        } else {
          combinations = cartesian(rounded, outline, reverse, hasIcon, hasIconOnly, fullWidth, sizes);
        }

        // each row in the story will represent one combination, and each row will show all button types.
        // eslint-disable-next-line no-shadow
        return combinations.map(([rounded, outline, reverse, hasIcon, hasIconOnly, fullWidth, size, disabled]) => {
          const buttons = types.map((type) => {
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
              classes,
              text: buttonText,
              hasIcon,
              hasIconOnly,
              disabled,
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
      });

      return {
        element,
        blocks,
      };
    },
    template: `
      <div class="tw-m-20">
      <template v-for="(block, blockIndex) in blocks" :key="blockIndex">
        <h3 class="tw-m-8 tw-text-additional-18">{{ block.title }}</h3>
        <component :is="element"
                   v-for="(button, buttonIndex) in block.buttons"
                   :key="blockIndex + '-' + buttonIndex"
                   :class="button.classes"
                   class="tw-m-8"
                   :disabled="button.disabled"
        >
          <template v-if="button.hasIconOnly">
            <ec-icon name="simple-check" :size="24"/>
          </template>
          <template v-else>
            <ec-icon v-if="button.hasIcon" class="tw-mr-8" name="simple-check" :size="24"/>
            {{ button.text }}
          </template>
        </component>
      </template>
      </div>
    `,
  });
  storyFn.storyName = storyName;
  storyFn.parameters = {
    backgrounds: {
      default: theme.name,
      values: [theme],
    },
    controls: { disable: true },
    actions: { disable: true },
    docs: { disable: true },
    visualRegressionTests: { disable: true },
  };

  return storyFn;
}
