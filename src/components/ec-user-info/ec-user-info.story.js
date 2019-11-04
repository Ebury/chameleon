import { storiesOf } from '@storybook/vue';
import { object, boolean } from '@storybook/addon-knobs';
import EcUserInfo from './ec-user-info.vue';
import EcNavigation from '@/components/ec-navigation/ec-navigation.vue';

const client = {
  name: 'Ebury Demo 2',
  profileUrl: '/profile',
  gravatar: 'https://www.gravatar.com/avatar/e07fd6efc70ccc63bbc3a3e27b81b29e?d=mm&s=200',
};

const stories = storiesOf('User Info', module);

stories.add('basic', () => ({
  components: {
    EcUserInfo,
  },
  props: {
    client: {
      default: object('user', client),
    },
    isCollapsable: {
      default: boolean('isCollapsable', false),
    },
    isCollapsed: {
      default: boolean('isCollapsed', false),
    },
  },
  template: `
    <div style="background-color: #005166;width:280px;height:100vh;">
      <ec-user-info
      :user="client"
      :is-collapsable="isCollapsable"
      :is-collapsed="isCollapsable && isCollapsed"
      @toggle="isCollapsed = !isCollapsed">
      <template v-slot:dropdown-search>
        <select name="pets" id="pet-select">
          <option value="ebury">Ebury</option>
          <option value="eburydemo2">EburyDemo2</option>
        </select>
      </template>
    </ ec-user-info>
    </div>
  `,
}))
  .add('with navigation', () => ({
    components: {
      EcNavigation,
      EcUserInfo,
    },
    props: {
      client: {
        default: object('user', client),
      },
      branding: {
        default: object('branding', {
          name: 'My Branding',
          logo: 'http://ebo.localhost/static/img/branding/EBP/logo-sm-inverse.png',
        }),
      },
      isCollapsable: {
        default: boolean('isCollapsable', false),
      },
      isCollapsed: {
        default: boolean('isCollapsed', false),
      },
      showBrandingLogo: {
        default: boolean('showBrandingLogo', true),
      },
      showCopyright: {
        default: boolean('showCopyright', true),
      },
    },
    data() {
      return {
        styles: {
          placeholder: {
            backgroundColor: 'rgba(255, 255, 255, .1)',
            padding: '8px',
            textAlign: 'center',
            height: '100%',
            wordBreak: 'break-word',
          },
        },
      };
    },
    template: `
    <ec-navigation
      :branding="branding"
      :show-branding-logo="showBrandingLogo"
      :is-collapsable="isCollapsable"
      :is-collapsed="isCollapsable && isCollapsed">
      <template #user-info>
      <ec-user-info
        :user="client"
        :is-collapsable="isCollapsable"
        :is-collapsed="isCollapsable && isCollapsed"
        @toggle="isCollapsed = !isCollapsed">
        <template v-slot:dropdown-search>
          <select name="pets" id="pet-select">
            <option value="ebury">Ebury</option>
            <option value="eburydemo2">EburyDemo2</option>
          </select>
        </template>
      </ ec-user-info>
      </template>
      <template #call-to-action>
        <div :style="styles.placeholder">CTA placeholder</div>
      </template>
      <template #menu>
        <div :style="styles.placeholder">Menu placeholder</div>
      </template>
      <template #footer-menu>
        <div :style="styles.placeholder">Footer Menu placeholder</div>
      </template>
      <template #copyright v-if="showCopyright">
        <div :style="styles.placeholder">Copyright placeholder</div>
      </template>
    </ec-navigation>`,
  }));


export default stories;
