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
    <div class="tw-flex tw-flex-wrap">
      <div class="tw-p-24">
        <ec-option-card to="internal-route" optionCardIconName="${IconName.SimpleWand}" optionTitle="Option Card default" optionCaption="In-app route" v-bind="args" />
      </div>

      <div class="tw-p-24">
        <ec-option-card to="internal-route" optionCardIconName="${IconName.SimpleWand}" optionTitle="Option Card accent" optionCaption="In-app route" optionCardType="accent" v-bind="args" />
      </div>

      <div class="tw-p-24">
        <ec-option-card href="/external-link" optionCardIconName="${IconName.SimpleWand}" optionTitle="Option Card danger" optionCaption="External link" optionCardType="danger" v-bind="args" />
      </div>

      <div class="tw-p-24">
        <ec-option-card href="/external-link" :isDisabled="true" optionCardIconName="${IconName.SimpleWand}" optionTitle="Option Card accent disabled" optionCaption="External link" optionCardType="accent" v-bind="args" />
      </div>
    </div>

    <div class="tw-flex tw-flex-wrap">
      <div class="tw-p-24">
        <ec-option-card to="internal-route" optionTitle="Option Card - no icon" optionCaption="In-app route" v-bind="args" />
      </div>

      <div class="tw-p-24">
        <ec-option-card to="internal-route" optionTitle="Option Card - no icon accent" optionCaption="In-app route" optionCardType="accent" v-bind="args" />
      </div>

      <div class="tw-p-24">
        <ec-option-card to="internal-route" :isDisabled="true" optionTitle="Option Card - no icon danger" optionCaption="In-app route" optionCardType="danger" v-bind="args" />
      </div>

      <div class="tw-p-24">
        <ec-option-card to="internal-route" optionTitle="Option Card - no icon danger" optionCaption="In-app route" optionCardType="danger" v-bind="args" />
      </div>
    </div>

    <div class="tw-flex tw-flex-wrap">
      <div class="tw-p-24">
        <ec-option-card optionCardIconName="${IconName.SimpleInfo}" optionTitle="Title and icon only" v-bind="args" />
      </div>

      <div class="tw-p-24">
        <ec-option-card optionCardIconName="${IconName.SimpleInfo}" optionTitle="Title and icon only accent" optionCardType="accent" v-bind="args" />
      </div>

      <div class="tw-p-24">
        <ec-option-card optionCardIconName="${IconName.SimpleInfo}" optionTitle="Title and icon only danger" optionCardType="danger" v-bind="args" />
      </div>

      <div class="tw-p-24">
        <ec-option-card ::isDisabled="true" optionTitle="Title only" v-bind="args" />
      </div>
    </div>

    <div class="tw-flex tw-flex-wrap">
      <div class="tw-p-24">
        <ec-option-card optionTitle="Title only default" v-bind="args" />
      </div>

      <div class="tw-p-24">
        <ec-option-card optionTitle="Title only accent" optionCardType="accent" v-bind="args" />
      </div>

      <div class="tw-p-24">
        <ec-option-card optionTitle="Title only danger" optionCardType="danger" v-bind="args" />
      </div>

      <div class="tw-p-24">
        <ec-option-card :isDisabled="true" optionTitle="Title only disabled" optionCardType="accent" v-bind="args" />
      </div>
    </div>
    
    <div class="tw-flex tw-p-24">
      <ec-option-card :isLoading="true" optionTitle="Title only - loading" optionCardType="accent" v-bind="args" />
    </div>
  `,
});

export const basic = Template.bind({});
