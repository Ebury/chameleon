import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';
import {
  onBeforeUnmount, onMounted, ref, toRefs,
} from 'vue';

import { fixedContainerDecorator } from '../../../.storybook/utils';
import EcToaster from './ec-toaster.vue';
import { type ToasterMessage, ToasterMessageType, type ToasterProps } from './types';

const meta: Meta = {
  title: 'Toaster',
  component: EcToaster,
  decorators: [
    fixedContainerDecorator(),
  ],
};

export default meta;

type EcToasterStory = StoryFn<ToasterProps & {
  type: ToasterMessageType,
  title: ToasterMessage['title'],
  subtitle: ToasterMessage['subtitle'],
}>;

export const basic: EcToasterStory = storyArgs => ({
  components: { EcToaster },
  setup() {
    const {
      messages,
      type,
      title,
      subtitle,
    } = toRefs(storyArgs);

    function useBodyHandler({ actionName }: { actionName: string }) {
      const bodyHandler = action(actionName);

      onMounted(() => {
        document.addEventListener('click', bodyHandler);
      });

      onBeforeUnmount(() => {
        document.removeEventListener('click', bodyHandler);
      });
    }

    function useMessageStorage(initialMessages: ToasterMessage[]) {
      const model = ref(initialMessages);

      function removeMessage(message: ToasterMessage) {
        action('remove')(message);
        model.value = model.value.filter(m => m !== message);
      }

      function addMessage() {
        model.value.push({
          id: +new Date(),
          type: type.value,
          title: title.value,
          subtitle: subtitle.value,
        });
      }
      return {
        model,
        removeMessage,
        addMessage,
      };
    }

    useBodyHandler({ actionName: 'bodyClick' });
    const { removeMessage, addMessage, model } = useMessageStorage(messages?.value ?? []);

    return {
      model,
      removeMessage,
      addMessage,
    };
  },
  template: `
    <div class="tw-flex tw-items-center tw-justify-center tw-h-screen">
      <div class="tw-fixed tw-right-0 tw-top-0 tw-w-full" style="max-width: 400px;">
        <ec-toaster :messages="model" @remove="removeMessage" />
      </div>
      <button
        class="ec-btn ec-btn--md ec-btn--rounded ec-btn--primary"
        @click="addMessage"
      >Add another message</button>
    </div>
  `,
});

basic.argTypes = {
  type: {
    options: Object.values(ToasterMessageType),
    control: { type: 'select' },
  },
};

basic.args = {
  type: ToasterMessageType.ERROR,
  title: 'A new title',
  subtitle: 'A new subtitle',
  messages: [
    {
      id: 1,
      type: ToasterMessageType.SUCCESS,
      title: 'This is the title',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 2,
      type: ToasterMessageType.ERROR,
      title: 'This is the title',
      subtitle: 'This is the subtitle',
    },
    {
      id: 3,
      type: ToasterMessageType.WARNING,
      title: 'This is the title',
      subtitle: 'This is the subtitle',
    },
    {
      id: 4,
      type: ToasterMessageType.INFO,
      title: 'This is the title',
      subtitle: 'This is the subtitle',
    },
    {
      id: 5,
      type: ToasterMessageType.ERROR,
      title: 'This is the title',
      subtitle: 'This is the subtitle',
    },
  ],
};
