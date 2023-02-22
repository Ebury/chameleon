import { IconName } from '../ec-icon/iconNames';
import EcOptionCard from './ec-option-card.vue';
import type { OptionCardProps } from './types';

export default {
  title: 'Option Card',
  component: EcOptionCard,
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
        <div class="tw-my-8 tw-mr-8">
          <h5>Default</h5>
          <ec-option-card to="internal-route" optionCardIconName="${IconName.SimpleWand}" optionTitle="Option Card default" optionCaption="In-app route" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8">
          <h5>Accent</h5>
          <ec-option-card to="internal-route" optionCardIconName="${IconName.SimpleWand}" optionTitle="Option Card accent" optionCaption="In-app route" optionCardType="accent" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8">
          <h5>Danger</h5>
          <ec-option-card href="/external-link" optionCardIconName="${IconName.SimpleWand}" optionTitle="Option Card danger" optionCaption="External link" optionCardType="danger" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8">
          <h5>Disabled</h5>
          <ec-option-card href="/external-link" :isDisabled="true" optionCardIconName="${IconName.SimpleWand}" optionTitle="Option Card accent disabled" optionCaption="External link" optionCardType="accent" v-bind="args" />
        </div>
      </div>

      <h3 class="tw-my-8">Title and caption</h3>
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-my-8 tw-mr-8">
          <ec-option-card to="internal-route" optionTitle="Option Card - no icon" optionCaption="In-app route" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8">
          <ec-option-card to="internal-route" optionTitle="Option Card - no icon accent" optionCaption="In-app route" optionCardType="accent" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8">
          <ec-option-card to="internal-route" optionTitle="Option Card - no icon danger" optionCaption="In-app route" optionCardType="danger" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8">
          <ec-option-card to="internal-route" :isDisabled="true" optionTitle="Option Card - no icon disabled" optionCaption="In-app route" optionCardType="danger" v-bind="args" />
        </div>

      </div>

      <h3 class="tw-my-8">Icon and Title</h3>
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-my-8 tw-mr-8">
          <ec-option-card optionCardIconName="${IconName.SimpleInfo}" optionTitle="Title and icon only" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8">
          <ec-option-card optionCardIconName="${IconName.SimpleInfo}" optionTitle="Title and icon only accent" optionCardType="accent" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8">
          <ec-option-card optionCardIconName="${IconName.SimpleInfo}" optionTitle="Title and icon only danger" optionCardType="danger" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8">
          <ec-option-card :isDisabled="true" optionCardIconName="${IconName.SimpleInfo}" optionTitle="Title and icon disabled" v-bind="args" />
        </div>
      </div>

      <h3 class="tw-my-8">Title only</h3>
      <div class="tw-flex tw-flex-wrap">
        <div class="tw-my-8 tw-mr-8">
          <ec-option-card optionTitle="Title only default" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8">
          <ec-option-card optionTitle="Title only accent" optionCardType="accent" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8">
          <ec-option-card optionTitle="Title only danger" optionCardType="danger" v-bind="args" />
        </div>

        <div class="tw-my-8 tw-mr-8">
          <ec-option-card :isDisabled="true" optionTitle="Title only disabled" optionCardType="accent" v-bind="args" />
        </div>
      </div>
    </div>  
`,
});

export const basic = Template.bind({});
