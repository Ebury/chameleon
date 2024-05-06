import type { Meta, StoryFn } from '@storybook/vue3';

import EcLetterIcon from './ec-letter-icon.vue';

export default {
  title: 'Letter Icon',
  component: EcLetterIcon,
} as Meta<typeof EcLetterIcon>;

type EcLetterIconStory = StoryFn<typeof EcLetterIcon>;

const Template: EcLetterIconStory = args => ({
  components: { EcLetterIcon },
  setup() {
    return {
      args,
    };
  },
  template: `
      <div class="tw-p-24">
        <ec-letter-icon
          v-bind="args"
        />
      </div>
    `,
});

export const basic = Template.bind({});

basic.args = {
  text: 'Letter Icon',
};
