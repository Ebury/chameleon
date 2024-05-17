import type { Meta, StoryFn } from '@storybook/vue3';
import { computed, ref, watchEffect } from 'vue';

import EcMobileHeader from './ec-mobile-header.vue';

enum LogoName {
  EBURY = 'ebury-logo-sm',
  CHAMELEON = 'ebury-chameleon-logo',
}

interface StoryArgs {
  logo: string,
}

export default {
  title: 'Mobile Header',
  component: EcMobileHeader,
} as Meta<typeof EcMobileHeader>;

export const basic: StoryFn<StoryArgs> = storyArgs => ({
  components: { EcMobileHeader },
  setup() {
    const logo = ref('');
    watchEffect(() => {
      logo.value = storyArgs.logo;
    });
    const logoPath = computed(() => `/${logo.value}.png`);
    return {
      logoPath,
    };
  },
  template: `
        <ec-mobile-header>
            <template #logo>
              <img class="tw-h-32" :src="logoPath" />
            </template>
        </ec-mobile-header>
    `,
});

basic.args = {
  logo: LogoName.EBURY,
};

basic.argTypes = {
  logo: {
    options: Object.values(LogoName),
    control: { type: 'select' },
  },
};
