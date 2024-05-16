import type { Meta, StoryFn } from '@storybook/vue3';
import { ref, watchEffect } from 'vue';

import EcMobileHeader from './ec-mobile-header.vue';
import type { MobileHeaderProps } from './types';

export default {
  title: 'Layout/Mobile Header',
  component: EcMobileHeader,
} as Meta<typeof EcMobileHeader>;

export const basic: StoryFn<MobileHeaderProps> = storyArgs => ({
  components: { EcMobileHeader },
  setup() {
    const isResponsive = ref(false);
    watchEffect(() => {
      const {
        isResponsive: isResponsiveFromArgs,
      } = storyArgs;
      isResponsive.value = isResponsiveFromArgs!;
    });
    return {
      isResponsive,
    };
  },
  template: `
        <ec-mobile-header :is-responsive="isResponsive">
            <template #logo>
                <img
                    class="tw-h-32"
                    src="/ebury-logo-sm.png"
                >
            </template>
        </ec-mobile-header>
    `,
});

basic.args = {
  isResponsive: true,
};
