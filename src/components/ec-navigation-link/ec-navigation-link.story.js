import { storiesOf } from '@storybook/vue';
import { text, boolean, number } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-vue-router';
import EcNavigationLink from './ec-navigation-link.vue';

storiesOf('Navigation Link', module)
  .addDecorator(StoryRouter())
  .add('basic', () => ({
    components: { EcNavigationLink },
    props: {
      text: {
        default: text('text', 'Lending'),
      },
      iconName: {
        default: text('icon name', 'simple-lending'),
      },
      iconSize: {
        default: number('icon size', 30),
      },
      url: {
        default: text('url', '/lending'),
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
      isExpanded: {
        default: boolean('isExpanded', false),
      },
    },
    template: `
      <ec-navigation-link v-bind="$props" />
    `,
  }));
