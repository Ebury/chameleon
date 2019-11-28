import { storiesOf } from '@storybook/vue';
import { array } from '@storybook/addon-knobs';
import EcSubmenu from './ec-submenu.vue';

const stories = storiesOf('Submenu', module);

const tabs = [
  {
    headerSlotName: 'tab1',
    mainSlotName: 'tab1Content',
    title: 'Submitted Requests',
    isActive: true,
  },
  {
    headerSlotName: 'tab2',
    mainSlotName: 'tab2Content',
    title: 'Repayments to Ebury',
    isActive: false,
  },
  {
    headerSlotName: 'tab3',
    mainSlotName: 'tab3Content',
    title: 'test',
    isActive: false,
  },
];

stories.add('basic', () => ({
  components: { EcSubmenu },
  props: {
    tabs: {
      default: array('tabs', tabs),
    },
  },
  template: `
    <ec-submenu :tabs="tabs">
        <template #tab1>
          Submitted Requests(30)
        </template>

        <template #tab1Content>
          <h1> One - 1 </h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, tempora esse? Fugit minus consequatur harum culpa sed laborum nulla expedita molestias, quia cupiditate commodi repudiandae labore dolore dolor. Eum sapiente repellendus tempora tenetur accusantium, molestias hic adipisci aspernatur, sed possimus explicabo culpa quas laudantium? Quidem sunt totam maxime magni minus dignissimos eos libero nobis accusantium aspernatur qui inventore odio adipisci at dolorum consectetur velit ipsa quia assumenda porro, consequatur nisi mollitia deserunt. Iusto possimus debitis assumenda harum atque libero voluptates fugit quibusdam ipsa voluptatibus eligendi ex doloremque ducimus molestias natus adipisci, earum facere repudiandae sint nobis error maiores iste. Quam.</p>
        </template>

        <template #tab2>
          Repayments to Ebury(28)
        </template>

        <template #tab2Content>
          <h1> Two - 2 </h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, tempora esse? Fugit minus consequatur harum culpa sed laborum nulla expedita molestias, quia cupiditate commodi repudiandae labore dolore dolor. Eum sapiente repellendus tempora tenetur accusantium, molestias hic adipiscm.</p>
        </template>

        <template #tab3>
          Just Testing(28)
        </template>

        <template #tab3Content>
          <h1> Three - 3 </h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, tempora esse? Fugit minus consequatur harum culpa sed laborum nulla expedita molestias, quia cupiditate commodi repudiandae labore dolore dolor. Eum sapiente repellendus tempora tenetur accusantium, molestias hic adipisci aspernatur, sed possimus explicabo culpa quas laudantium? Quidem sunt totam maxime magni minus dignissimos eos libero nobis accusantium aspernatur qui inventore odio adipisci at dolorum consectetur velit ipsa quia assumenda porro, consequatur nisi mollitia deserunt. Iusto possimus debitis assumenda harum atque libero voluptates fugit quibusdam ipsa voluptatibus eligendi ex doloremque ducimus molestias natus adipisci, earum facere repudiandae sint nobis error maiores iste. Quam.</p>
        </template>
    </ec-submenu>
    `,
}));
