import { storiesOf } from '@storybook/vue';
import { withKnobs, text } from '@storybook/addon-knobs';
import EcContainer from './ec-container.vue';

const title = 'Lending';
const titleIntro = 'Here you will be able to keep track of all your requests to Ebury and of your credit line.';

const stories = storiesOf('Container', module);
stories.addDecorator(withKnobs);

stories
  .add('basic', () => ({
    components: { EcContainer },
    props: {
      title: {
        default: text('Title', title),
      },
      titleIntro: {
        default: text('Title intro', titleIntro),
      },
    },
    template: `<ec-container :title="title" :title-intro="titleIntro">
    </ec-container>`,
  }));

export default stories;
