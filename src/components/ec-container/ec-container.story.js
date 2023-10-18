import { onMounted, ref } from 'vue';

import { fixedContainerDecorator } from '../../../.storybook/utils';
import EcDropdownSearch from '../ec-dropdown-search';
import EcIcon from '../ec-icon';
import EcMainContainer from '../ec-main-container';
import EcMenu from '../ec-menu';
import EcNavigation from '../ec-navigation';
import EcUserInfo from '../ec-user-info';
import EcContainer from './ec-container.vue';

import './ec-container.story.css';

export default {
  title: 'Layout/Container',
  component: EcContainer,
  decorators: [
    fixedContainerDecorator(),
  ],
};

const Template = args => ({
  components: { EcContainer },
  setup() {
    return { args };
  },
  template: `
    <ec-container v-bind="args">
      <template #navigation>
        <div class="tw-bg-key-2 tw-text-gray-8 tw-min-h-screen">Navigation panel</div>
      </template>
      <template #content>
        <div class="tw-bg-key-6 tw-text-gray-2 tw-min-h-screen">Main content panel</div>
      </template>
    </ec-container>
  `,
});

export const basic = Template.bind({});
basic.args = {
  isCollapsable: false,
};

export const withNavigation = ({
  isCollapsable,
  client,
  clientItems,
  branding,
  menuLinks,
  footerLinks,
  copyrightText,
  isCollapsed,
  ...args
}) => ({
  setup() {
    const userInfoRef = ref(null);
    const popoverBoundaryPadding = ref(24);
    const selectedClient = ref({});
    const isCollapsedFromProps = ref(isCollapsed);
    const popoverStyle = ref({});

    function updateIsCollapsed() {
      isCollapsedFromProps.value = !isCollapsedFromProps.value;
    }

    onMounted(() => {
      popoverStyle.value = {
        width: `${Math.max(userInfoRef.value.$el.offsetWidth - (2 * popoverBoundaryPadding.value), 120)}px`,
      };
    });

    return {
      isCollapsable,
      client,
      clientItems,
      branding,
      menuLinks,
      footerLinks,
      copyrightText,
      selectedClient,
      isCollapsedFromProps,
      updateIsCollapsed,
      userInfoRef,
      popoverStyle,
      popoverBoundaryPadding,
      args,
    };
  },
  components: {
    EcContainer, EcMainContainer, EcNavigation, EcMenu, EcUserInfo, EcDropdownSearch, EcIcon,
  },
  template: `
    <ec-container :is-collapsable="isCollapsable">
      <template #navigation>
        <ec-navigation
          :is-collapsed="isCollapsable && isCollapsedFromProps"
          :is-collapsable="isCollapsable"
          :branding="branding"
          :show-branding-logo="!isCollapsable"
        >

          <template #user-info>
            <ec-user-info
              ref="userInfoRef"
              :user="client"
              :is-collapsable="isCollapsable"
              :is-collapsed="isCollapsable && isCollapsedFromProps"
              @toggle="updateIsCollapsed"
            >
              <template #client-selector>
                <ec-dropdown-search
                  v-model="selectedClient"
                  :items="clientItems"
                  :popover-options="{
                    placement: 'bottom',
                    preventOverflow: true,
                    autoSize: 'min',
                    overflowPadding: popoverBoundaryPadding,
                  }"
                  :popover-style="popoverStyle"
                >
                  <a href="#" class="dropdown-search-link" @click.prevent>
                    <span>{{ selectedClient.text || client.name }}</span>
                    <ec-icon name="simple-arrow-drop-down" :size="20" fill="currentColor" />
                  </a>
                </ec-dropdown-search>
              </template>
            </ec-user-info>
          </template>

          <template #menu>
            <ec-menu :links="menuLinks" :is-collapsed="isCollapsable && isCollapsedFromProps" @click.native.stop.prevent />
          </template>

          <template #footer-menu>
            <ec-menu :links="footerLinks" :is-collapsed="isCollapsable && isCollapsedFromProps" :horizontal="!isCollapsable || (isCollapsable && !isCollapsedFromProps)" @click.native.stop.prevent />
          </template>

          <template #copyright v-if="!isCollapsable || !isCollapsedFromProps">
            <div>{{ copyrightText }}</div>
          </template>

        </ec-navigation>
      </template>
      <template #content>
        <ec-main-container>
          <p class="tw-mb-16">Lorem ipsum dolor sit amet, consectetur <a href="//google.co.uk">adipiscing</a> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse interdum consectetur libero id faucibus nisl tincidunt. Proin nibh nisl condimentum id venenatis a. Pellentesque habitant morbi tristique senectus et netus et. Sapien eget mi proin sed. Dui faucibus in ornare quam. Ut ornare lectus sit amet est. Sed enim ut sem viverra aliquet eget sit. Dui sapien eget mi proin. Nunc aliquet bibendum enim facilisis gravida.</p>
          <p>Sem integer vitae justo eget magna. Neque convallis a cras semper auctor. Velit euismod in pellentesque massa placerat duis ultricies. Tincidunt dui ut ornare lectus sit amet est. Nunc sed id semper risus in. Senectus et netus et malesuada fames ac turpis egestas maecenas. Turpis nunc eget lorem dolor sed viverra. Leo integer malesuada nunc vel risus commodo. Tellus at urna condimentum mattis pellentesque id nibh tortor id. Ullamcorper eget nulla facilisi etiam dignissim diam quis enim lobortis. Facilisi morbi tempus iaculis urna id volutpat lacus laoreet. Tempus egestas sed sed risus pretium quam vulputate dignissim.</p>
        </ec-main-container>
      </template>
    </ec-container>
  `,
});

withNavigation.argTypes = {
  client: { control: 'object' },
  clientItems: { control: 'array' },
  branding: { control: 'object' },
  menuLinks: { control: 'array' },
  footerLinks: { control: 'array' },
  copyrightText: { control: 'text' },
  isCollapsed: { control: 'boolean' },
};

withNavigation.args = {
  client: {
    name: 'Ebury Demo 2',
    profileUrl: '/profile',
    gravatar: '/empty-gravatar.png',
  },
  clientItems: [
    { text: 'Ebury Demo' },
    { text: 'Ebury Demo 2' },
  ],
  branding: {
    name: 'My Branding',
    logo: '/ebury-logo-sm-inverse.png',
  },
  menuLinks: [
    { text: 'Link 1', iconName: 'simple-trade', url: '/my-url' },
    { text: 'Link 2', iconName: 'simple-trade-finance', url: '/my-url' },
    {
      text: 'Link 3', iconName: 'simple-dashboard', url: '/my-url', isActive: true,
    },
    { text: 'Link 4', iconName: 'simple-help', url: '/my-url' },
    { text: 'Link 5', iconName: 'simple-calendar', url: '/my-url' },
  ],
  footerLinks: [
    { text: 'Link 6', iconName: 'simple-help', url: '/my-url' },
    { text: 'Link 7', iconName: 'simple-sign-out', url: '/my-url' },
  ],
  isCollapsable: false,
  copyrightText: 'Copyright text 2019',
  isCollapsed: false,
};
