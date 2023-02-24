import { IconName } from '../ec-icon/iconNames';
import EcOptionCard from './ec-option-card.vue';
import type { OptionCardProps } from './types';
import { OptionCardType } from './types';

export default {
  title: 'Option Card',
  component: EcOptionCard,
  argTypes: {
    iconName: {
      options: IconName,
      control: { type: 'select' },
    },
    isDisabled: {
      control: { type: 'boolean' },
    },
    title: {
      control: {
        type: 'text',
      },
    },
    caption: {
      control: {
        type: 'text',
      },
    },
    type: {
      options: OptionCardType,
    },
    to: {
      control: {
        type: 'text',
      },
    },
    href: {
      control: {
        type: 'text',
      },
    },
  },
};

const Template = (args: OptionCardProps) => ({
  components: { EcOptionCard },
  setup() {
    const baseArgs = {
      ...args,
    } as OptionCardProps;

    return {
      args: baseArgs,
    };
  },
  template: `
  <div class="tw-p-24">
    <h3 class="tw-my-8">Icon, title and caption</h3>
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <h5>Default</h5>
          <ec-option-card class="tw-container" to="internal-route" iconName="${IconName.SimpleWand}" title="Option Card default" caption="In-app route" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <h5>Accent</h5>
          <ec-option-card class="tw-container" to="internal-route" iconName="${IconName.SimpleWand}" title="Option Card accent" caption="In-app route" type="accent" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <h5>Danger</h5>
          <ec-option-card class="tw-container" href="/external-link" iconName="${IconName.SimpleWand}" title="Option Card danger" caption="External link" type="danger" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <h5>Disabled</h5>
          <ec-option-card class="tw-container" href="/external-link" :isDisabled="true" iconName="${IconName.SimpleWand}" title="Option Card accent disabled" caption="External link" type="accent" v-bind="args" />
        </div>
      </div>

      <h3 class="tw-my-8">Title and caption</h3>
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" to="internal-route" title="Option Card - no icon" caption="In-app route" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" to="internal-route" title="Option Card - no icon accent" caption="In-app route" type="accent" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" to="internal-route" title="Option Card - no icon danger" caption="In-app route" type="danger" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" to="internal-route" :isDisabled="true" title="Option Card - no icon disabled" caption="In-app route" type="danger" v-bind="args" />
        </div>

      </div>

      <h3 class="tw-my-8">Icon and Title</h3>
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" iconName="${IconName.SimpleInfo}" title="Title and icon only" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" iconName="${IconName.SimpleInfo}" title="Title and icon only accent" type="accent" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" iconName="${IconName.SimpleInfo}" title="Title and icon only danger" type="danger" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" :isDisabled="true" iconName="${IconName.SimpleInfo}" title="Title and icon disabled" v-bind="args" />
        </div>
      </div>

      <h3 class="tw-my-8">Title only</h3>
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" title="Title only default" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" title="Title only accent" type="accent" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" title="Title only danger" type="danger" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" :isDisabled="true" title="Title only disabled" type="accent" v-bind="args" />
        </div>
      </div>

      <h3 class="tw-my-8">Long title and caption</h3>
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" title="Borem ipsum dolor sit amet cons adipiscing elit" caption="Ipsum dolor sit amet, consectetur hieronr un euvps ecstnome to whuerton, Ipsum dolor sit amet, consectetur hieronr un euvps ecstnome to whuerton" v-bind="args" />
        </div>
      </div>
    </div>  
`,
});

export const basic = Template.bind({});
