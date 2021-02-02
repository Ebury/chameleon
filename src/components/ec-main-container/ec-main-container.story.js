import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs';
import EcMainContainer from './ec-main-container.vue';
import EcIcon from '../ec-icon';

const title = 'Trade Finance';
const titleIntro = 'Here you will be able to keep track of all your requests to Ebury and of your credit line.';

const stories = storiesOf('Layout/Main Container', module);

stories
  .add('basic', () => ({
    components: { EcMainContainer },
    props: {
      title: {
        default: text('Title', title),
      },
      titleIntro: {
        default: text('Title intro', titleIntro),
      },
    },
    template: '<ec-main-container :title="title" :title-intro="titleIntro" />',
  }))
  .add('with slots', () => ({
    components: { EcMainContainer, EcIcon },
    props: {
      title: {
        default: text('Title', title),
      },
      titleIntro: {
        default: text('Title intro', titleIntro),
      },
    },
    template: `
    <ec-main-container :title="title" :title-intro="titleIntro">
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
  }));
