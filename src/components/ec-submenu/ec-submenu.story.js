import { action } from '@storybook/addon-actions';
import { vueRouter } from 'storybook-vue3-router';
import { ref, watchEffect } from 'vue';

import EcSubmenu from './ec-submenu.vue';

export default {
  title: 'Submenu',
  component: EcSubmenu,
  decorators: [
    vueRouter([{
      path: '/',
      component: {},
    }, {
      path: '/submitted/',
      component: {},
    }]),
  ],
};

export const basic = storyArgs => ({
  components: { EcSubmenu },
  setup() {
    const model = ref(0);
    const args = ref({});

    watchEffect(() => {
      const { activeIndex, ...rest } = storyArgs;
      model.value = activeIndex;
      args.value = rest;
    });

    return {
      model,
      args,
      onChange: action('change'),
    };
  },
  template: `
    <div class="tw-m-24">
      <ec-submenu
        v-bind="args"
        v-model:active-index="model"
        v-on="{
          change: onChange,
        }"
      >
        <template #menu-item-1-content>
          <h1> One - 1 </h1>
          <p>lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, tempora esse? Fugit minus consequatur harum culpa sed laborum nulla expedita molestias, quia cupiditate commodi repudiandae labore dolore dolor. Eum sapiente repellendus tempora tenetur accusantium, molestias hic adipisci aspernatur, sed possimus explicabo culpa quas laudantium? Quidem sunt totam maxime magni minus dignissimos eos libero nobis accusantium aspernatur qui inventore odio adipisci at dolorum consectetur velit ipsa quia assumenda porro, consequatur nisi mollitia deserunt. Iusto possimus debitis assumenda harum atque libero voluptates fugit quibusdam ipsa voluptatibus eligendi ex doloremque ducimus molestias natus adipisci, earum facere repudiandae sint nobis error maiores iste. Quam.</p>
        </template>

        <template #menu-item-2-content>
          <h1> Two - 2 </h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, tempora esse? Fugit minus consequatur harum culpa sed laborum nulla expedita molestias, quia cupiditate commodi repudiandae labore dolore dolor. Eum sapiente repellendus tempora tenetur accusantium, molestias hic adipiscm.</p>
        </template>

        <template #menu-item-3-content>
          <h1> Three - 3 </h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus, tempora esse? Fugit minus consequatur harum culpa sed laborum nulla expedita molestias, quia cupiditate commodi repudiandae labore dolore dolor. Eum sapiente repellendus tempora tenetur accusantium, molestias hic adipisci aspernatur, sed possimus explicabo culpa quas laudantium? Quidem sunt totam maxime magni minus dignissimos eos libero nobis accusantium aspernatur qui inventore odio adipisci at dolorum consectetur velit ipsa quia assumenda porro, consequatur nisi mollitia deserunt. Iusto possimus debitis assumenda harum atque libero voluptates fugit quibusdam ipsa voluptatibus eligendi ex doloremque ducimus molestias natus adipisci, earum facere repudiandae sint nobis error maiores iste. Quam.</p>
        </template>
      </ec-submenu>
    </div>
  `,
});

basic.args = {
  activeIndex: 0,
  submenu: [
    {
      headerTitle: 'Submitted Requests (30)',
      slotName: 'menu-item-1-content',
    },
    {
      headerTitle: 'Repayments (30)',
      route: '/submitted',
      slotName: 'menu-item-2-content',
    },
    {
      headerTitle: 'Another Request (30)',
      route: '/submitted',
      slotName: 'menu-item-3-content',
    },
  ],
};
