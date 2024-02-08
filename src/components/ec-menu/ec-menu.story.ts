import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';
import { vueRouter } from 'storybook-vue3-router';
import { ref, watchEffect } from 'vue';

import { IconName } from '../ec-icon/icon-names';
import EcMenu from './ec-menu.vue';
import type { MenuProps } from './types';

export default {
  title: 'Layout/Menu',
  component: EcMenu,
  decorators: [vueRouter([
    {
      path: '/',
      name: 'root',
      component: { template: '<div></div>' },
    },
    {
      path: '/foo',
      name: 'foo',
      component: { template: '<div></div>' },
      beforeEnter: action('route changed'),
    },
    {
      path: '/bar',
      name: 'bar',
      component: { template: '<div></div>' },
      beforeEnter: action('route changed'),
    },
  ], {
    initialRoute: '/',
  })],
} as Meta<typeof EcMenu>;

export const basic: StoryFn<MenuProps & {
  width: number
}> = storyArgs => ({
  components: { EcMenu },
  setup() {
    const width = ref(0);
    const args = ref<MenuProps>();

    watchEffect(() => {
      const { width: widthFromArgs, ...rest } = storyArgs;
      width.value = widthFromArgs;
      args.value = rest;
    });

    return { args, width };
  },
  template: `
    <div class="tw-my-0 tw-mx-auto" :style="{ maxWidth: width + 'px' }">
      <p>Current path: {{ $route.fullPath }}</p>
      <div class="tw-bg-key-2">
        <ec-menu v-bind="args" />
      </div>
    </div>
  `,
});

basic.argTypes = {
  width: {
    control: { type: 'range', min: 72, max: 600 },
  },
};

basic.args = {
  horizontal: false,
  isCollapsed: false,
  width: 600,
  links: [
    {
      text: 'Foo',
      url: '/foo',
      iconName: IconName.SIMPLE_TRADE_FINANCE,
      isRouterLink: true,
    },
    {
      text: 'Bar',
      url: '/bar',
      iconName: IconName.SIMPLE_DASHBOARD,
      isRouterLink: true,
    },
  ],
};
