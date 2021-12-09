import EcMainContainer from './ec-main-container.vue';
import EcIcon from '../ec-icon';

const title = 'Trade Finance';
const titleIntro = 'Here you will be able to keep track of all your requests to Ebury and of your credit line.';

export default {
  title: 'Layout/Main Container',
  component: EcMainContainer,
};

const Template = (args, { argTypes }) => ({
  components: { EcMainContainer },
  props: Object.keys(argTypes),
  template: '<ec-main-container v-bind="$props" />',
});

export const basic = Template.bind({});
basic.args = {
  title,
  titleIntro,
};

export const withSlots = (args, { argTypes }) => ({
  components: { EcMainContainer, EcIcon },
  props: Object.keys(argTypes),
  template: `
    <ec-main-container v-bind="$props">
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
            Test Cta
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
