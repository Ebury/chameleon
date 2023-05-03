import EcIcon from '../ec-icon';
import EcMainContainer from './ec-main-container.vue';
import type { MainContainerProps } from './types';

const title = 'Trade Finance';
const titleIntro = 'Here you will be able to keep track of all your requests to Ebury and your credit line.';

export default {
  title: 'Layout/Main Container',
  component: EcMainContainer,
};

const Template = (args: MainContainerProps) => ({
  components: { EcMainContainer },
  setup() {
    return { args };
  },
  template: '<ec-main-container v-bind="args" />',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const basic = Template.bind({}) as any;
basic.args = {
  title,
  titleIntro,
};

export const withSlots = (args: MainContainerProps) => ({
  components: { EcMainContainer, EcIcon },
  setup() {
    return { args };
  },
  template: `
    <ec-main-container v-bind="args">
      <template #breadcrumbs>
        <a href="#"
          @click.stop.prevent
          class="tw-flex tw-items-center">
          <ec-icon
            name="simple-arrow-left"
            :size="24"
            class="tw-fill-current tw-mr-12"
          />

          <span>Back to Dashboard</span>
        </a>
      </template>

      <template #cta>
        <div class="tw-text-center">
          <button class="ec-btn ec-btn--rounded ec-btn--primary ec-btn--md ec-btn--full-width">
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
