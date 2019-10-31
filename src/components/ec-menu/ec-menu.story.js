import { storiesOf } from '@storybook/vue';
import { object, boolean, number } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-vue-router';
import EcMenu from './ec-menu.vue';

const links = [
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
];

const stories = storiesOf('Menu', module);

stories
  .addDecorator(StoryRouter())
  .add('basic', () => ({
    components: { EcMenu },
    props: {
      horizontal: {
        default: boolean('horizontal', false),
      },
      isCollapsed: {
        default: boolean('isCollapsed', false),
      },
      links: {
        default: object('links', links),
      },
      width: {
        default: number('menu width', 600, { min: 72, max: 600, range: true }),
      },
    },
    template: `
      <div style="margin: 0 auto;" :style="{ maxWidth: width + 'px' }">
        <p>Current path: {{ $route.fullPath }}</p>
        <div style="background-color: rgb(0, 80, 102);">
          <EcMenu
            :horizontal="horizontal"
            :is-collapsed="isCollapsed"
            :links="links"
          />
        </div>
      </div>
    `,
  }));
