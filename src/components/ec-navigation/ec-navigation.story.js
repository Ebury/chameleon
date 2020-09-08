import { storiesOf } from '@storybook/vue';
import { object, boolean } from '@storybook/addon-knobs';
import EcNavigation from './ec-navigation.vue';

const stories = storiesOf('Layout/Navigation', module);

stories
  .add('basic', () => ({
    components: { EcNavigation },
    props: {
      branding: {
        default: object('branding', {
          name: 'My Branding',
          logo: '/ebury-logo-sm-inverse.png',
        }),
      },
      isCollapsable: {
        default: boolean('isCollapsable', true),
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
            backgroundColor: 'hsla(var(--ec-gray-color-level-8), .1)',
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
          <div :style="styles.placeholder" class="tw-p-8 tw-text-center tw-h-full tw-break-words">User Info placeholder</div>
        </template>
        <template #call-to-action>
          <div :style="styles.placeholder" class="tw-p-8 tw-text-center tw-h-full tw-break-words">CTA placeholder</div>
        </template>
        <template #menu>
          <div :style="styles.placeholder" class="tw-p-8 tw-text-center tw-h-full tw-break-words">Menu placeholder</div>
        </template>
        <template #footer-menu>
          <div :style="styles.placeholder" class="tw-p-8 tw-text-center tw-h-full tw-break-words">Footer Menu placeholder</div>
        </template>
        <template #copyright v-if="showCopyright">
          <div :style="styles.placeholder" class="tw-p-8 tw-text-center tw-h-full tw-break-words">Copyright placeholder</div>
        </template>
      </ec-navigation>`,
  }));
