import type { Meta, StoryFn } from '@storybook/vue3';

import EcIcon from '../ec-icon';
import EcMainContainer from './ec-main-container.vue';

const title = 'Trade Finance';
const titleIntro = 'Here you will be able to keep track of all your requests to Ebury and your credit line.';

export default {
  title: 'Layout/Main Container',
  component: EcMainContainer,
} as Meta<typeof EcMainContainer>;

type EcMainContainerStory = StoryFn<typeof EcMainContainer>;

const Template: EcMainContainerStory = args => ({
  components: { EcMainContainer },
  setup() {
    return { args };
  },
  template: '<ec-main-container v-bind="args" />',
});

export const basic = Template.bind({});
basic.args = {
  title,
  titleIntro,
};

export const withSlots: EcMainContainerStory = args => ({
  components: { EcMainContainer, EcIcon },
  setup() {
    return { args };
  },
  template: `
    <ec-main-container v-bind="args">
      <template #breadcrumbs>
        <a
          href="#"
          class="tw-flex tw-items-center"
          @click.stop.prevent
        >
          <ec-icon
            name="simple-arrow-left"
            :size="24"
            class="tw-fill-gray-4 tw-mr-12"
          />
        </a>
      </template>

      <template #cta>
        <div>
          <button class="ec-btn ec-btn--rounded ec-btn--primary ec-btn--md">
            Test CTA
          </button>
        </div>
      </template>
    </ec-main-container>
  `,
});

withSlots.args = {
  title,
  titleIntro,
};

export const with2Buttons: EcMainContainerStory = args => ({
  components: { EcMainContainer, EcIcon },
  setup() {
    return { args };
  },
  template: `
    <ec-main-container v-bind="args">
      <template #breadcrumbs>
        <a
          href="#"
          class="tw-flex tw-items-center"
          @click.stop.prevent
        >
          <ec-icon
            name="simple-arrow-left"
            :size="24"
            class="tw-fill-gray-4 tw-mr-12"
          />
        </a>
      </template>

      <template #cta>
        <div>
          <button class="ec-btn ec-btn--rounded ec-btn--secondary ec-btn--outline ec-btn--md tw-mr-24">
            Test CTA
          </button>
          <button class="ec-btn ec-btn--rounded ec-btn--primary ec-btn--md">
            Test longer CTA
          </button>
        </div>
      </template>
    </ec-main-container>
  `,
});

with2Buttons.args = {
  title,
  titleIntro,
};

export const withoutBreadcrumbs: EcMainContainerStory = args => ({
  components: { EcMainContainer, EcIcon },
  setup() {
    return { args };
  },
  template: `
    <ec-main-container v-bind="args">
      <template #cta>
        <div>
          <button class="ec-btn ec-btn--rounded ec-btn--primary ec-btn--md">
            Test longer CTA
          </button>
        </div>
      </template>
    </ec-main-container>
  `,
});

withoutBreadcrumbs.args = {
  title,
  titleIntro,
};

export const breadcrumbsOnly: EcMainContainerStory = args => ({
  components: { EcMainContainer, EcIcon },
  setup() {
    return { args };
  },
  template: `
    <ec-main-container>
      <template #breadcrumbs>
        <a
          href="#"
          class="tw-flex tw-items-center"
          @click.stop.prevent
        >
          <ec-icon
            name="simple-arrow-left"
            :size="24"
            class="tw-fill-gray-4 tw-mr-12"
          />
        </a>
      </template>
    </ec-main-container>
  `,
});

