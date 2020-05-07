import { storiesOf } from '@storybook/vue';
import { boolean, object, text } from '@storybook/addon-knobs';
import EcContainer from './ec-container.vue';
import EcMainContainer from '../ec-main-container';
import EcNavigation from '../ec-navigation';
import EcMenu from '../ec-menu';
import EcUserInfo from '../ec-user-info';
import EcDropdownSearch from '../ec-dropdown-search';
import EcIcon from '../ec-icon';
import './ec-container.story.scss';

const stories = storiesOf('Layout/Container', module);

const client = {
  name: 'Ebury Demo 2',
  profileUrl: '/profile',
  gravatar: 'https://www.gravatar.com/avatar/e07fd6efc70ccc63bbc3a3e27b81b29e?d=mm&s=200',
};

stories
  .add('basic', () => ({
    components: { EcContainer },
    template: `
    <ec-container :is-collapsable="false">
      <template #navigation>
        <div style="background-color: rgb(0, 80, 102); color: #fff; min-height: 100vh;">Navigation panel</div>
      </template>
      <template #content>
      <div style="background-color: rgb(194, 242, 255); color: #333; min-height: 100vh;">Main content panel</div>
      </template>
    </ec-container>`,
  }));

stories
  .add('with navigation', () => ({
    data() {
      return {
        selectedClient: {},
        isCollapsed: null,
        dropdownSearchWidth: {
          enabled: true,
          order: 845,
          fn: (data) => {
            // calculate precise position for the dropdown. Displaying dropdown using bottom placement is not
            // enough because the position of the trigger can change and it's never precisely centered in the
            // user info container
            if (this.$refs.userInfo && this.$refs.userInfo.$el) {
              const boundaryPadding = 24;
              const width = this.$refs.userInfo.$el.offsetWidth - (2 * boundaryPadding);
              const left = this.$refs.userInfo.$el.offsetLeft + boundaryPadding;
              data.styles.width = width;
              data.offsets.popper.width = width;
              data.offsets.popper.left = left;
              data.offsets.popper.right = left + width + boundaryPadding;
            }

            return data;
          },
        },
      };
    },
    watch: {
      isCollapsedFromProps: {
        immediate: true,
        handler(newValue) {
          this.isCollapsed = newValue;
        },
      },
    },
    components: {
      EcContainer, EcMainContainer, EcNavigation, EcMenu, EcUserInfo, EcDropdownSearch, EcIcon,
    },
    methods: {
      updateIsCollapsed() {
        this.isCollapsed = !this.isCollapsed;
      },
    },
    props: {
      client: {
        default: object('user', client),
      },
      clientItems: {
        default: object('clientItems', [
          { text: 'Ebury Demo' },
          { text: 'Ebury Demo 2' },
        ]),
      },
      branding: {
        default: object('branding', {
          name: 'My Branding',
          logo: '/ebury-logo-sm-inverse.png',
        }),
      },
      menuLinks: {
        default: object('menuLinks', [
          { text: 'Link 1', iconName: 'simple-trade', url: '/my-url' },
          { text: 'Link 2', iconName: 'simple-trade-finance', url: '/my-url' },
          {
            text: 'Link 3', iconName: 'simple-dashboard', url: '/my-url', isActive: true,
          },
          { text: 'Link 4', iconName: 'simple-help', url: '/my-url' },
          { text: 'Link 5', iconName: 'simple-calendar', url: '/my-url' },
        ]),
      },
      footerLinks: {
        default: object('footerLinks', [
          { text: 'Link 6', iconName: 'simple-help', url: '/my-url' },
          { text: 'Link 7', iconName: 'simple-sign-out', url: '/my-url' },
        ]),
      },
      isCollapsable: {
        default: boolean('isCollapsable', false),
      },
      copyrightText: {
        default: text('copyrightText', 'Copyright text 2019'),
      },
      isCollapsedFromProps: {
        default: boolean('isCollapsed', false),
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

          <template #user-info>
            <ec-user-info
              ref="userInfo"
              :user="client"
              :is-collapsable="isCollapsable"
              :is-collapsed="isCollapsable && isCollapsed"
              @toggle="updateIsCollapsed"
            >
              <template #client-selector>
                <ec-dropdown-search
                  :items="clientItems"
                  :popper-modifiers="{ dropdownSearchWidth }"
                  v-model="selectedClient">
                  <a href="#" class="dropdown-search-link" @click.prevent>
                    <span>{{ selectedClient.text || client.name }}</span>
                    <ec-icon name="simple-arrow-drop-down" :size="20" fill="currentColor" />
                  </a>
                </ec-dropdown-search>
              </template>
            </ec-user-info>
          </template>

          <template #menu>
            <ec-menu :links="menuLinks" :is-collapsed="isCollapsable && isCollapsed" @click.native.stop.prevent />
          </template>

          <template #footer-menu>
            <ec-menu :links="footerLinks" :is-collapsed="isCollapsable && isCollapsed" :horizontal="!isCollapsable || (isCollapsable && !isCollapsed)" @click.native.stop.prevent />
          </template>

          <template #copyright v-if="!isCollapsable || !isCollapsed">
            <div>{{ copyrightText }}</div>
          </template>

          </ec-navigation>
      </template>
      <template #content>
        <ec-main-container>
          <p style="margin-bottom: 16px;">Lorem ipsum dolor sit amet, consectetur <a href="//google.co.uk">adipiscing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse interdum consectetur libero id faucibus nisl tincidunt. Proin nibh nisl condimentum id venenatis a. Pellentesque habitant morbi tristique senectus et netus et. Sapien eget mi proin sed. Dui faucibus in ornare quam. Ut ornare lectus sit amet est. Sed enim ut sem viverra aliquet eget sit. Dui sapien eget mi proin. Nunc aliquet bibendum enim facilisis gravida.</p>
          <p>Sem integer vitae justo eget magna. Neque convallis a cras semper auctor. Velit euismod in pellentesque massa placerat duis ultricies. Tincidunt dui ut ornare lectus sit amet est. Nunc sed id semper risus in. Senectus et netus et malesuada fames ac turpis egestas maecenas. Turpis nunc eget lorem dolor sed viverra. Leo integer malesuada nunc vel risus commodo. Tellus at urna condimentum mattis pellentesque id nibh tortor id. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Tempus egestas sed sed risus pretium quam vulputate dignissim.</p>
        </ec-main-container>
      </template>
    </ec-container>
    `,
  }));

export default stories;
