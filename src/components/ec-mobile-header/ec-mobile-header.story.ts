import type { Meta, StoryFn } from '@storybook/vue3';

import EcMobileHeader from './ec-mobile-header.vue';

export default {
  title: 'Mobile Header',
  component: EcMobileHeader,
} as Meta<typeof EcMobileHeader>;

export const basic: StoryFn = () => ({
  components: { EcMobileHeader },
  template: `
        <ec-mobile-header>
            <template #logo>
                <img
                    class="tw-h-32"
                    src="/ebury-logo-sm.png"
                >
            </template>
        </ec-mobile-header>
    `,
});
