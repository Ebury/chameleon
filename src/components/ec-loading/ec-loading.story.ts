// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';
import { ref, watchEffect } from 'vue';

import { DARK_THEME } from '../../../.storybook/backgrounds';
import { fixedContainerDecorator } from '../../../.storybook/utils';
import EcPanel from '../ec-panel';
import EcLoading from './ec-loading.vue';
import type { LoadingProps } from './types';

export default {
  title: 'Loading',
  component: EcLoading,
} as Meta<typeof EcLoading>;

type EcLoadingStory = StoryFn<typeof EcLoading>;

export const basic: EcLoadingStory = args => ({
  components: { EcLoading },
  setup() {
    return {
      args,
      onClick: action('click'),
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-loading v-bind="args">
        <button class="ec-btn ec-btn--primary ec-btn--sm ec-btn--rounded" @click="onClick">Test action</button>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ullam architecto obcaecati, facere corrupti,
        repellat veniam quam odit esse eum soluta sequi ea minus itaque exercitationem dignissimos rerum dicta earum iste,
        magni necessitatibus. Quisquam beatae alias fugiat cumque omnis accusamus asperiores vel doloremque repudiandae quas,
        molestias consequatur ducimus modi reiciendis, voluptatum, veritatis deleniti commodi numquam dolores? Repudiandae,
        dicta laboriosam sed voluptatibus obcaecati vel laudantium et perspiciatis. Adipisci repellendus id mollitia autem?
        Animi odio, fuga quasi dolorem sed adipisci ipsam, ad ut fugiat officia quaerat placeat commodi ducimus! Aut beatae sequi
        a reiciendis harum inventore consectetur ullam rerum, adipisci mollitia nam?
      </ec-loading>
    </div>
  `,
});

basic.args = {
  show: true,
  size: 48,
  transparent: false,
};

basic.parameters = {
  visualRegressionTests: {
    controls: {
      transparent: { transparent: true },
    },
  },
};

type EcLoadingWithPanelStory = StoryFn<LoadingProps & {
  siblingIsLoading: boolean,
  panelIsLoading: boolean,
}>;

export const withPanel: EcLoadingWithPanelStory = storyArgs => ({
  components: { EcLoading, EcPanel },
  setup() {
    const siblingIsLoading = ref(false);
    const panelIsLoading = ref(false);
    const args = ref({});

    watchEffect(() => {
      const {
        siblingIsLoading: siblingIsLoadingFromArgs,
        panelIsLoading: panelIsLoadingFromArgs,
        ...rest
      } = storyArgs;
      siblingIsLoading.value = siblingIsLoadingFromArgs;
      panelIsLoading.value = panelIsLoadingFromArgs;
      args.value = rest;
    });

    return {
      args,
      siblingIsLoading,
      panelIsLoading,
    };
  },
  template: `
    <div class="tw-h-screen">
      <ec-loading v-bind="args" :show="siblingIsLoading">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ullam architecto obcaecati, facere corrupti,
          repellat veniam quam odit esse eum soluta sequi ea minus itaque exercitationem dignissimos rerum dicta earum iste,
          magni necessitatibus. Quisquam beatae alias fugiat cumque omnis accusamus asperiores vel doloremque repudiandae quas,
          molestias consequatur ducimus modi reiciendis, voluptatum, veritatis deleniti commodi numquam dolores? Repudiandae,
          dicta laboriosam sed voluptatibus obcaecati vel laudantium et perspiciatis. Adipisci repellendus id mollitia autem?
          Animi odio, fuga quasi dolorem sed adipisci ipsam, ad ut fugiat officia quaerat placeat commodi ducimus! Aut beatae sequi
          a reiciendis harum inventore consectetur ullam rerum, adipisci mollitia nam?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ullam architecto obcaecati, facere corrupti,
          repellat veniam quam odit esse eum soluta sequi ea minus itaque exercitationem dignissimos rerum dicta earum iste,
          magni necessitatibus. Quisquam beatae alias fugiat cumque omnis accusamus asperiores vel doloremque repudiandae quas,
          molestias consequatur ducimus modi reiciendis, voluptatum, veritatis deleniti commodi numquam dolores? Repudiandae,
          dicta laboriosam sed voluptatibus obcaecati vel laudantium et perspiciatis. Adipisci repellendus id mollitia autem?
          Animi odio, fuga quasi dolorem sed adipisci ipsam, ad ut fugiat officia quaerat placeat commodi ducimus! Aut beatae sequi
          a reiciendis harum inventore consectetur ullam rerum, adipisci mollitia nam?
        </p>
      </ec-loading>
      <ec-panel :show="true">
        <template #header>
          <h3 class="tw-mb-24">Header</h3>

          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
        </template>
        <template #main>
          <h3>Main</h3>

          <ec-loading v-bind="args" :show="panelIsLoading">
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ullam architecto obcaecati, facere corrupti,
              repellat veniam quam odit esse eum soluta sequi ea minus itaque exercitationem dignissimos rerum dicta earum iste,
              magni necessitatibus. Quisquam beatae alias fugiat cumque omnis accusamus asperiores vel doloremque repudiandae quas,
              molestias consequatur ducimus modi reiciendis, voluptatum, veritatis deleniti commodi numquam dolores? Repudiandae,
              dicta laboriosam sed voluptatibus obcaecati vel laudantium et perspiciatis. Adipisci repellendus id mollitia autem?
              Animi odio, fuga quasi dolorem sed adipisci ipsam, ad ut fugiat officia quaerat placeat commodi ducimus! Aut beatae sequi
              a reiciendis harum inventore consectetur ullam rerum, adipisci mollitia nam?
            </div>
          </ec-loading>
        </template>
      </ec-panel>
    </div>
  `,
});

withPanel.argTypes = {
  show: {
    table: { disable: true },
  },
};

withPanel.args = {
  siblingIsLoading: true,
  panelIsLoading: true,
  transparent: true,
  size: 48,
};

withPanel.decorators = [fixedContainerDecorator()];

export const withDarkBackground: EcLoadingStory = args => ({
  components: { EcLoading },
  setup() {
    return { args };
  },
  template: `
    <div class="tw-h-screen">
      <ec-loading v-bind="args">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat ullam architecto obcaecati, facere corrupti,
          repellat veniam quam odit esse eum soluta sequi ea minus itaque exercitationem dignissimos rerum dicta earum iste,
          magni necessitatibus. Quisquam beatae alias fugiat cumque omnis accusamus asperiores vel doloremque repudiandae quas,
          molestias consequatur ducimus modi reiciendis, voluptatum, veritatis deleniti commodi numquam dolores? Repudiandae,
          dicta laboriosam sed voluptatibus obcaecati vel laudantium et perspiciatis. Adipisci repellendus id mollitia autem?
          Animi odio, fuga quasi dolorem sed adipisci ipsam, ad ut fugiat officia quaerat placeat commodi ducimus! Aut beatae sequi
          a reiciendis harum inventore consectetur ullam rerum, adipisci mollitia nam?
        </div>
      </ec-loading>
    </div>
  `,
});

withDarkBackground.parameters = {
  backgrounds: { default: DARK_THEME.name, values: [DARK_THEME] },
};

withDarkBackground.args = {
  show: true,
};
