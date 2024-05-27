import type { Meta, StoryFn } from '@storybook/vue3';
import { useMediaQuery } from '@vueuse/core';
import { ref, watchEffect } from 'vue';

import { fixedContainerDecorator } from '../../../.storybook/utils';
import EcNavigation from './ec-navigation.vue';
import type { NavigationProps } from './types';

export default {
  title: 'Layout/Navigation',
  component: EcNavigation,
  decorators: [
    fixedContainerDecorator(),
  ],
} as Meta<typeof EcNavigation>;

export const basic: StoryFn<NavigationProps & {
  showCopyright: boolean,
}> = storyArgs => ({
  components: { EcNavigation },
  setup() {
    const showCopyright = ref(false);
    const isCollapsable = ref(false);
    const isCollapsed = ref(false);
    const args = ref({});

    watchEffect(() => {
      const {
        showCopyright: showCopyrightFromArgs,
        isCollapsable: isCollapsableFromArgs,
        isCollapsed: isCollapsedFromArgs,
        ...rest
      } = storyArgs;
      showCopyright.value = showCopyrightFromArgs;
      isCollapsable.value = isCollapsableFromArgs;
      isCollapsed.value = isCollapsedFromArgs;
      args.value = rest;
    });

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

export const lightMode: StoryFn<NavigationProps & {
  showCopyright: boolean,
}> = storyArgs => ({
  components: { EcNavigation },
  setup() {
    const showCopyright = ref(false);
    const isCollapsable = ref(false);
    const isCollapsed = ref(false);
    const isInLightMode = ref(false);
    const args = ref({});

    watchEffect(() => {
      const {
        showCopyright: showCopyrightFromArgs,
        isCollapsable: isCollapsableFromArgs,
        isCollapsed: isCollapsedFromArgs,
        isInLightMode: isInLightModeFromArgs,
        ...rest
      } = storyArgs;
      showCopyright.value = showCopyrightFromArgs;
      isCollapsable.value = isCollapsableFromArgs;
      isCollapsed.value = isCollapsedFromArgs;
      isInLightMode.value = isInLightModeFromArgs!;
      args.value = rest;
    });

    return {
      showCopyright,
      isCollapsable,
      isCollapsed,
      isInLightMode,
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
      :is-in-light-mode="isInLightMode"
    >
      <template #user-info>
        <div :style="styles.placeholder" class="tw-h-full tw-break-words">User Info placeholder</div>
      </template>
      <template #menu>
        <div :style="styles.placeholder" class="tw-h-full tw-break-words">Menu placeholder</div>
      </template>
      <template #footer-menu>
        <div :style="styles.placeholder" class="tw-h-full tw-break-words">Footer Menu placeholder</div>
      </template>
    </ec-navigation>
  `,
});

lightMode.args = {
  branding: {
    name: 'My Branding',
    logo: '/ebury-logo-sm.png',
  },
  isCollapsable: false,
  isCollapsed: false,
  showBrandingLogo: true,
  showCopyright: false,
  isInLightMode: true,
};

export const responsive: StoryFn<NavigationProps & {
  showCopyright: boolean,
}> = storyArgs => ({
  components: { EcNavigation },
  setup() {
    const showCopyright = ref(false);
    const isCollapsable = ref(false);
    const isCollapsed = ref(false);
    const isResponsive = ref(false);
    const args = ref({});

    watchEffect(() => {
      const {
        showCopyright: showCopyrightFromArgs,
        isCollapsable: isCollapsableFromArgs,
        isCollapsed: isCollapsedFromArgs,
        isResponsive: isResponsiveFromArgs,
        ...rest
      } = storyArgs;
      showCopyright.value = showCopyrightFromArgs;
      isCollapsable.value = isCollapsableFromArgs;
      isCollapsed.value = isCollapsedFromArgs;
      isResponsive.value = isResponsiveFromArgs || useMediaQuery('(max-width: 1279px)').value;
      args.value = rest;
    });

    return {
      showCopyright,
      isCollapsable,
      isCollapsed,
      isResponsive,
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
      :is-responsive="isResponsive"
    >
      <template #user-info>
        <div :style="styles.placeholder" class="tw-h-full tw-break-words">User Info placeholder</div>
      </template>
      <template #menu>
        <div :style="styles.placeholder" class="tw-h-full tw-break-words">Menu placeholder</div>
      </template>
      <template #footer-menu>
        <div :style="styles.placeholder" class="tw-h-full tw-break-words">Footer Menu placeholder</div>
      </template>
    </ec-navigation>
  `,
});

responsive.args = {
  branding: {
    name: 'My Branding',
    logo: '/ebury-logo-sm.png',
  },
  isCollapsable: false,
  isCollapsed: false,
  showBrandingLogo: true,
  showCopyright: false,
  isInLightMode: true,
};
