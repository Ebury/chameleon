import { action } from '@storybook/addon-actions';
import storyRouter from 'storybook-vue3-router';

import EcMenu from './ec-menu.vue';

export default {
  title: 'Layout/Menu',
  component: EcMenu,
  decorators: [storyRouter([
    {
      path: '/foo',
      component: { template: '<div></div>' },
    },
    {
      path: '/bar',
      component: { template: '<div></div>' },
    },
  ], {
    beforeEach(to, from, next) {
      action('route changed')(to, from);
      next();
    },
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
