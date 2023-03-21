// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';

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
      onClick: action('click'),
    };
  },
  template: `
  <div class="tw-p-24">
    <h3 class="tw-my-8">Icon, title and caption</h3>
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <h5>Default</h5>
          <ec-option-card class="tw-container" href="/external-link" iconName="${IconName.SimpleWand}" title="Option Card default (href)" caption="External link" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <h5>Accent</h5>
          <ec-option-card class="tw-container" href="/external-link" iconName="${IconName.SimpleWand}" title="Option Card accent (href)" caption="External link" type="accent" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <h5>Danger</h5>
          <ec-option-card class="tw-container" href="/external-link" iconName="${IconName.SimpleWand}" title="Option Card danger (href)" caption="External link" type="danger" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <h5>Disabled</h5>
          <ec-option-card class="tw-container" href="/external-link" :isDisabled="true" iconName="${IconName.SimpleWand}" title="Option Card accent disabled (href)" caption="External link" type="accent" v-bind="args" />
        </div>
      </div>

      <h3 class="tw-my-8">Title and caption</h3>
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" to="internal-route" title="Option Card - no icon (router-link)" caption="In-app route" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" to="internal-route" title="Option Card - no icon accent (router-link)" caption="In-app route" type="accent" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" to="internal-route" title="Option Card - no icon danger (router-link)" caption="In-app route" type="danger" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" to="internal-route" :isDisabled="true" title="Option Card - no icon disabled (router-link)" caption="In-app route" type="danger" v-bind="args" />
        </div>

      </div>

      <h3 class="tw-my-8">Icon and Title</h3>
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" iconName="${IconName.SimpleInfo}" title="Title and icon only (button)" v-on="{click: onClick}" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" iconName="${IconName.SimpleInfo}" title="Title and icon only accent (button)" type="accent" v-on="{click: onClick}" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" iconName="${IconName.SimpleInfo}" title="Title and icon only danger (button)" type="danger" v-on="{click: onClick}" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" :isDisabled="true" iconName="${IconName.SimpleInfo}" title="Title and icon disabled (button)" v-on="{click: onClick}" v-bind="args" />
        </div>
      </div>

      <h3 class="tw-my-8">Title only</h3>
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" title="Title only default (button)" v-on="{click: onClick}" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" title="Title only accent (button)" type="accent" v-on="{click: onClick}" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" title="Title only danger (button)" type="danger" v-on="{click: onClick}" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" :isDisabled="true" title="Title only disabled (button)" type="accent" v-on="{click: onClick}" v-bind="args" />
        </div>
      </div>

      <h3 class="tw-my-8">Long title and caption</h3>
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-my-8 tw-mr-8" style="width: 304px;">
          <ec-option-card class="tw-container" title="Borem ipsum dolor sit amet cons adipiscing elit" caption="Ipsum dolor sit amet, consectetur hieronr un euvps ecstnome to whuerton, Ipsum dolor sit amet, consectetur hieronr un euvps ecstnome to whuerton" v-on="{click: onClick}" v-bind="args" />
        </div>
      </div>
    </div>
`,
});

export const basic = Template.bind({});
