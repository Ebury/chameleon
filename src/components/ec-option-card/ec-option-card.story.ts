
import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';

import { IconName } from '../ec-icon/icon-names';
import EcOptionCard from './ec-option-card.vue';
import { OptionCardType } from './types';

export default {
  title: 'Option Card',
  component: EcOptionCard,
  argTypes: {
    iconName: {
      options: Object.values(IconName),
      control: { type: 'select' },
    },
    type: {
      options: Object.values(OptionCardType),
      control: { type: 'select' },
    },
  },
} as Meta<typeof EcOptionCard>;

type EcOptionCardStory = StoryFn<typeof EcOptionCard>;

const Template: EcOptionCardStory = args => ({
  components: { EcOptionCard },
  setup() {
    return {
      args,
      onClick: action('click'),
    };
  },
  template: `
    <div class="tw-p-24">
      <h3 class="tw-my-8">Icon, title and caption</h3>
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <h5>Default</h5>
          <ec-option-card class="tw-container" icon-name="${IconName.SimpleWand}" title="Option Card default" caption="Caption text" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <h5>Accent</h5>
          <ec-option-card class="tw-container" icon-name="${IconName.SimpleWand}" title="Option Card accent" caption="Caption text" type="accent" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <h5>Danger</h5>
          <ec-option-card class="tw-container" icon-name="${IconName.SimpleWand}" title="Option Card danger" caption="Caption text" type="danger" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <h5>Disabled</h5>
          <ec-option-card class="tw-container" :is-disabled="true" icon-name="${IconName.SimpleWand}" title="Option Card accent disabled" caption="Caption text" type="accent" v-bind="args" />
        </div>
      </div>

      <h3 class="tw-my-8">Title and caption</h3>
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" title="Option Card - no icon" caption="Caption text" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" title="Option Card - no icon accent" caption="Caption text" type="accent" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" title="Option Card - no icon danger" caption="Caption text" type="danger" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" :is-disabled="true" title="Option Card - no icon disabled" caption="Caption text" type="danger" v-bind="args" />
        </div>

      </div>

      <h3 class="tw-my-8">Icon and Title</h3>
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" icon-name="${IconName.SimpleInfo}" title="Title and icon only" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" icon-name="${IconName.SimpleInfo}" title="Title and icon only accent" type="accent" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" icon-name="${IconName.SimpleInfo}" title="Title and icon only danger" type="danger" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" :is-disabled="true" icon-name="${IconName.SimpleInfo}" title="Title and icon disabled" v-bind="args" />
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
          <ec-option-card class="tw-container" :is-disabled="true" title="Title only disabled" type="accent" v-bind="args" />
        </div>
      </div>

      <h3 class="tw-my-8">Long title and caption</h3>
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" title="Borem ipsum dolor sit amet cons adipiscing elit" caption="Ipsum dolor sit amet, consectetur hieronr un euvps ecstnome to whuerton, Ipsum dolor sit amet, consectetur hieronr un euvps ecstnome to whuerton" v-bind="args" />
        </div>
      </div>

      <h3 class="tw-my-8">With slot</h3>
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" v-bind="args">Some content here</ec-option-card>
        </div>
        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" :is-disabled="true" v-bind="args">Some disabled content here</ec-option-card>
        </div>
      </div>
    </div>
  `,
});

export const basic = Template.bind({});
