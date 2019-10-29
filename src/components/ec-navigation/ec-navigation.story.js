import { storiesOf } from '@storybook/vue';
import { object, boolean } from '@storybook/addon-knobs';
import EcNavigation from './ec-navigation.vue';

const stories = storiesOf('Navigation', module);

stories
  .add('basic', () => ({
    components: { EcNavigation },
    props: {
      branding: {
        default: object('branding', {
          name: 'My Branding',
          logo: 'http://ebo.localhost/static/img/branding/EBP/logo-sm-inverse.png',
        }),
      },
      canBeCollapsed: {
        default: boolean('canBeCollapsed', true),
      },
      isExpanded: {
        default: boolean('isExpanded', true),
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
        :can-be-collapsed="canBeCollapsed"
        :branding="branding"
        :is-expanded="isExpanded"
        :show-branding-logo="showBrandingLogo">
        <template #user-info>
          <div :style="styles.placeholder">User Info placeholder</div>
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
