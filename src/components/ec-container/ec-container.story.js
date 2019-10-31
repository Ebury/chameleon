import { storiesOf } from '@storybook/vue';
import { boolean, object, text } from '@storybook/addon-knobs';
import EcContainer from './ec-container.vue';
import EcMainContainer from '../ec-main-container';
import EcNavigation from '../ec-navigation';
import EcMenu from '../ec-menu';

const stories = storiesOf('Container', module);

stories
  .add('basic', () => ({
    components: { EcContainer },
    template: `
    <ec-container :is-collapsable="false">
      <template #navigation>
        <div style="background-color: rgb(0, 80, 102); color: #fff; min-height: 100%;">Navigation panel</div>
      </template>
      <template #content>
      <div style="background-color: rgb(194, 242, 255); color: #333; min-height: 100%;">Main content panel</div>
      </template>
    </ec-container>`,
  }));

stories
  .add('with navigation', () => ({
    components: {
      EcContainer, EcMainContainer, EcNavigation, EcMenu,
    },
    props: {
      branding: {
        default: object('branding', {
          name: 'My Branding',
          logo: 'http://ebo.localhost/static/img/branding/EBP/logo-sm-inverse.png',
        }),
      },
      menuLinks: {
        default: object('menuLinks', [
          { text: 'Link 1', iconName: 'simple-trade', url: '/my-url' },
          { text: 'Link 2', iconName: 'simple-lending', url: '/my-url' },
          { text: 'Link 3', iconName: 'simple-dashboard', url: '/my-url' },
        ]),
      },
      footerLinks: {
        default: object('footerLinks', [
          { text: 'Link 1', iconName: 'simple-help', url: '/my-url' },
          { text: 'Link 2', iconName: 'simple-sign-out', url: '/my-url' },
        ]),
      },
      isCollapsable: {
        default: boolean('isCollapsable', false),
      },
      isCollapsed: {
        default: boolean('isCollapsed', false),
      },
      copyrightText: {
        default: text('copyrightText', 'Copyright text 2019'),
      },
    },
    template: `
    <ec-container :is-collapsable="isCollapsable">
      <template #navigation>
        <ec-navigation
          :is-collapsed="isCollapsable && isCollapsed"
          :is-collapsable="isCollapsable"
          :branding="branding"
          :show-branding-logo="!isCollapsable">
          <template #menu>
            <ec-menu :links="menuLinks" :is-collapsed="isCollapsable && isCollapsed" />
          </template>
          <template #footer-menu>
            <ec-menu :links="footerLinks" :is-collapsed="isCollapsable && isCollapsed" :horizontal="!isCollapsable || (isCollapsable && !isCollapsed)" />
          </template>
          <template #copyright v-if="!isCollapsable">
            <div>{{ copyrightText }}</div>
          </template>
        </ec-navigation>
      </template>
      <template #content>
        <ec-main-container style="min-height: 100%;">
          <p style="margin-bottom: 16px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse interdum consectetur libero id faucibus nisl tincidunt. Proin nibh nisl condimentum id venenatis a. Pellentesque habitant morbi tristique senectus et netus et. Sapien eget mi proin sed. Dui faucibus in ornare quam. Ut ornare lectus sit amet est. Sed enim ut sem viverra aliquet eget sit. Dui sapien eget mi proin. Nunc aliquet bibendum enim facilisis gravida.</p>
          <p>Sem integer vitae justo eget magna. Neque convallis a cras semper auctor. Velit euismod in pellentesque massa placerat duis ultricies. Tincidunt dui ut ornare lectus sit amet est. Nunc sed id semper risus in. Senectus et netus et malesuada fames ac turpis egestas maecenas. Turpis nunc eget lorem dolor sed viverra. Leo integer malesuada nunc vel risus commodo. Tellus at urna condimentum mattis pellentesque id nibh tortor id. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Tempus egestas sed sed risus pretium quam vulputate dignissim.</p>
        </ec-main-container>
      </template>
    </ec-container>
    `,
  }));

export default stories;
