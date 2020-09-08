import { storiesOf } from '@storybook/vue';
import { text, boolean, number } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-vue-router';
import EcNavigationLink from './ec-navigation-link.vue';
import { DARK_THEME } from '../../../.storybook/backgrounds';

storiesOf('Layout/Navigation Link', module)
  .addDecorator(StoryRouter())
  .add('basic', () => ({
    components: { EcNavigationLink },
    props: {
      text: {
        default: text('text', 'Trade Finance'),
      },
      iconName: {
        default: text('icon name', 'simple-trade-finance'),
      },
      iconSize: {
        default: number('icon size', 30),
      },
      url: {
        default: text('url', '/trade-finance'),
      },
      isActive: {
        default: boolean('isActive', false),
      },
      isExact: {
        default: boolean('isExact', false),
      },
      isRouterLink: {
        default: boolean('isRouterLink', false),
      },
      isCollapsed: {
        default: boolean('isCollapsed', true),
      },
      isCompact: {
        default: boolean('isCompact', false),
      },
    },
    template: `
      <ec-navigation-link v-bind="$props" />
    `,
  }), {
    backgrounds: { default: DARK_THEME.name, values: [DARK_THEME] },
  });
