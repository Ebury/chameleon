import { IconName } from '../ec-icon/icon-names';
import { IconType } from '../ec-icon/types';
import EcTag from './ec-tag.vue';
import type { TagProps } from './types';

export default {
  title: 'Tag',
  component: EcTag,
  argTypes: {
    iconName: {
      options: IconName,
      control: { type: 'select' },
    },
    iconType: {
      options: IconType,
      control: { type: 'select' },
    },
  },
};

const Template = (args: Partial<TagProps>) => ({
  components: { EcTag },
  setup() {
    return {
      args,
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-tag v-bind="args"/>
    </div>
  `,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const basic = Template.bind({}) as any;

basic.args = {
  text: 'Trusted',
  iconName: IconName.RoundedCheck,
  iconType: IconType.SUCCESS,
};

const TruncatedText = (args: Partial<TagProps>) => ({
  components: { EcTag },
  setup() {
    return {
      args,
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-tag v-bind="args" style="width:100px;"/>
    </div>
  `,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const truncatedText = TruncatedText.bind({}) as any;

truncatedText.args = {
  text: 'Trusted Beneficiary',
  iconName: IconName.RoundedCheck,
  iconType: IconType.SUCCESS,
};
