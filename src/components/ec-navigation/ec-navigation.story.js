import EcNavigation from './ec-navigation.vue';
import { fixedContainerDecorator } from '../../../.storybook/utils';

export default {
  title: 'Layout/Navigation',
  component: EcNavigation,
  decorators: [
    fixedContainerDecorator(),
  ],
};

export const basic = (args, { argTypes }) => ({
  components: { EcNavigation },
  props: Object.keys(argTypes),
  data() {
    return {
      styles: {
        placeholder: {
          backgroundColor: 'hsla(var(--ec-gray-color-level-8), .1)',
        },
      },
    };
  },
  template: `
    <ec-navigation
      v-bind="{ ...$props, showCopyright: null }"
      :is-collapsed="isCollapsable && isCollapsed"
    >
      <template #user-info>
        <div :style="styles.placeholder" class="tw-p-8 tw-text-center tw-h-full tw-break-words">User Info placeholder</div>
      </template>
      <template #call-to-action>
        <div :style="styles.placeholder" class="tw-p-8 tw-text-center tw-h-full tw-break-words">CTA placeholder</div>
      </template>
      <template #menu>
        <div :style="styles.placeholder" class="tw-p-8 tw-text-center tw-h-full tw-break-words">Menu placeholder</div>
      </template>
      <template #footer-menu>
        <div :style="styles.placeholder" class="tw-p-8 tw-text-center tw-h-full tw-break-words">Footer Menu placeholder</div>
      </template>
      <template #copyright v-if="showCopyright">
        <div :style="styles.placeholder" class="tw-p-8 tw-text-center tw-h-full tw-break-words">Copyright placeholder</div>
      </template>
    </ec-navigation>
  `,
});

basic.args = {
  branding: {
    name: 'My Branding',
    logo: '/ebury-logo-sm-inverse.png',
  },
  isCollapsable: true,
  isCollapsed: false,
  showBrandingLogo: true,
  showCopyright: true,
};
