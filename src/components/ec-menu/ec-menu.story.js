import { action } from '@storybook/addon-actions';
import { vueRouter } from 'storybook-vue3-router';

import EcMenu from './ec-menu.vue';

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
};

export const basic = ({ width, ...args }) => ({
  components: { EcMenu },
  setup() {
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
      iconName: 'simple-trade-finance',
      isRouterLink: true,
    },
    {
      text: 'Bar',
      url: '/bar',
      iconName: 'simple-dashboard',
      isRouterLink: true,
    },
  ],
};
