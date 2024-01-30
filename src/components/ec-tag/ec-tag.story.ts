import type { Meta, StoryFn } from '@storybook/vue3';

import { IconName } from '../ec-icon/icon-names';
import { IconType } from '../ec-icon/types';
import EcTag from './ec-tag.vue';

export default {
  title: 'Tag',
  component: EcTag,
  argTypes: {
    iconName: {
      options: Object.values(IconName),
      control: { type: 'select' },
    },
    iconType: {
      options: Object.values(IconType),
      control: { type: 'select' },
    },
  },
} as Meta<typeof EcTag>;

type EcTagStory = StoryFn<typeof EcTag>;

const Template: EcTagStory = args => ({
  components: { EcTag },
  setup() {
    return {
      args,
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-tag v-bind="args" />
    </div>
  `,
});

export const basic = Template.bind({});

basic.args = {
  text: 'Trusted',
  isIconRounded: false,
  iconName: IconName.ROUNDED_CHECK,
  iconType: IconType.SUCCESS,
};

const TruncatedTextTemplate: EcTagStory = args => ({
  components: { EcTag },
  setup() {
    return {
      args,
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-tag v-bind="args" style="width: 100px;" />
    </div>
  `,
});

export const truncatedText: EcTagStory = TruncatedTextTemplate.bind({});

truncatedText.args = {
  text: 'Trusted Beneficiary',
  isIconRounded: false,
  iconName: IconName.ROUNDED_CHECK,
  iconType: IconType.SUCCESS,
};
