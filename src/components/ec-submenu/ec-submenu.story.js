import { storiesOf } from '@storybook/vue';
import { array, select } from '@storybook/addon-knobs';
import StoryRouter from 'storybook-vue-router';
import EcSubmenu from './ec-submenu.vue';

const stories = storiesOf('Submenu', module);

const submenu = [
  {
    headerSlotName: 'menu-item-1',
    mainSlotName: 'menu-item-1-content',
    title: 'Submitted Requests',
    isActive: true,
  },
  {
    headerSlotName: 'menu-item-2',
    mainSlotName: 'menu-item-2-content',
    title: 'Repayments to Ebury',
    isActive: false,
  },
  {
    headerSlotName: 'menu-item-3',
    mainSlotName: 'menu-item-3-content',
    title: 'test',
    isActive: false,
  },
];

stories
  .addDecorator(StoryRouter())
  .add('basic', () => ({
    components: { EcSubmenu },
    props: {
      submenu: {
        default: array('submenu', submenu),
      },
      type: {
        default: select('type', ['submenu', 'tabs'], 'submenu'),
      },
    },
    template: `
    <div style="margin: 20px;">
      <ec-submenu :submenu="submenu" :type="type">
          <template #menu-item-1>
            <a>Submitted Requests(30)</a>
          </template>

          <template #menu-item-1-content>
            <h1> One - 1 </h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, tempora esse? Fugit minus consequatur harum culpa sed laborum nulla expedita molestias, quia cupiditate commodi repudiandae labore dolore dolor. Eum sapiente repellendus tempora tenetur accusantium, molestias hic adipisci aspernatur, sed possimus explicabo culpa quas laudantium? Quidem sunt totam maxime magni minus dignissimos eos libero nobis accusantium aspernatur qui inventore odio adipisci at dolorum consectetur velit ipsa quia assumenda porro, consequatur nisi mollitia deserunt. Iusto possimus debitis assumenda harum atque libero voluptates fugit quibusdam ipsa voluptatibus eligendi ex doloremque ducimus molestias natus adipisci, earum facere repudiandae sint nobis error maiores iste. Quam.</p>
          </template>

          <template #menu-item-2>
            <a>Repayments to Ebury(28)</a>
          </template>

          <template #menu-item-2-content>
            <h1> Two - 2 </h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, tempora esse? Fugit minus consequatur harum culpa sed laborum nulla expedita molestias, quia cupiditate commodi repudiandae labore dolore dolor. Eum sapiente repellendus tempora tenetur accusantium, molestias hic adipiscm.</p>
          </template>

          <template #menu-item-3>
            <a>Just Testing(28)</a>
          </template>

          <template #menu-item-3-content>
            <h1> Three - 3 </h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, tempora esse? Fugit minus consequatur harum culpa sed laborum nulla expedita molestias, quia cupiditate commodi repudiandae labore dolore dolor. Eum sapiente repellendus tempora tenetur accusantium, molestias hic adipisci aspernatur, sed possimus explicabo culpa quas laudantium? Quidem sunt totam maxime magni minus dignissimos eos libero nobis accusantium aspernatur qui inventore odio adipisci at dolorum consectetur velit ipsa quia assumenda porro, consequatur nisi mollitia deserunt. Iusto possimus debitis assumenda harum atque libero voluptates fugit quibusdam ipsa voluptatibus eligendi ex doloremque ducimus molestias natus adipisci, earum facere repudiandae sint nobis error maiores iste. Quam.</p>
          </template>
      </ec-submenu>
    </div>
    `,
  }));
