import { reactive, ref, toRefs } from 'vue';

import { fixedContainerDecorator } from '../../../.storybook/utils';
import EcNavigation from './ec-navigation.vue';

export default {
  title: 'Layout/Navigation',
  component: EcNavigation,
  decorators: [
    fixedContainerDecorator(),
  ],
};

export const basic = storyArgs => ({
  components: { EcNavigation },
  setup() {
    const {
      showCopyright,
      isCollapsable,
      isCollapsed,
      ...rest
    } = toRefs(storyArgs);
    const args = reactive(rest);

    return {
      showCopyright,
      isCollapsable,
      isCollapsed,
      args,
      styles: ref({
        placeholder: {
          backgroundColor: 'hsla(var(--ec-gray-color-level-8), .1)',
        },
      }),
    };
  },
  template: `
    <ec-navigation
      v-bind="args"
      :is-collapsable="isCollapsable"
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
