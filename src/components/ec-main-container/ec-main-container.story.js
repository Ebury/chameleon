import { storiesOf } from '@storybook/vue';
import { text } from '@storybook/addon-knobs';
import EcMainContainer from './ec-main-container.vue';

const title = 'Lending';
const titleIntro = 'Here you will be able to keep track of all your requests to Ebury and of your credit line.';

const stories = storiesOf('Main Container', module);

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
  }));

export default stories;
