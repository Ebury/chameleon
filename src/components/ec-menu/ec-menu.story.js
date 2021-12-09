import storyRouter from 'storybook-vue-router';
import EcMenu from './ec-menu.vue';

export default {
  title: 'Layout/Menu',
  component: EcMenu,
  decorators: [storyRouter()],
};

export const basic = (args, { argTypes }) => ({
  components: { EcMenu },
  props: Object.keys(argTypes),
  template: `
    <div class="tw-my-0 tw-mx-auto" :style="{ maxWidth: width + 'px' }">
      <p>Current path: {{ $route.fullPath }}</p>
      <div class="tw-bg-key-2">
        <ec-menu v-bind="{ ...$props, width: null }" />
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
