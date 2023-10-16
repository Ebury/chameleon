import { action } from '@storybook/addon-actions';
import {
  onBeforeUnmount, onMounted, reactive, ref, toRefs,
} from 'vue';

import { fixedContainerDecorator } from '../../../.storybook/utils';
import EcToaster from './ec-toaster.vue';

export default {
  title: 'Toaster',
  component: EcToaster,
  decorators: [
    fixedContainerDecorator(),
  ],
};

export const basic = storyArgs => ({
  components: { EcToaster },
  setup() {
    const {
      messages,
      type,
      title,
      subtitle,
      ...rest
    } = toRefs(storyArgs);
    const args = reactive(rest);

    function useBodyHandler({ actionName }) {
      const bodyHandler = action(actionName);

      onMounted(() => {
        document.addEventListener('click', bodyHandler);
      });

      onBeforeUnmount(() => {
        document.removeEventListener('click', bodyHandler);
      });
    }

    function useMessageStorage(initialMessages, newMessageDefaults) {
      const model = ref(initialMessages);

      function removeMessage(message) {
        action('remove')(message);
        model.value = model.value.filter(m => m !== message);
      }

      function addMessage() {
        model.value.push({
          id: +new Date(),
          ...newMessageDefaults,
          type,
          title,
          subtitle,
        });
      }
      return {
        model,
        removeMessage,
        addMessage,
      };
    }

    useBodyHandler({ actionName: 'bodyClick' });
    const { removeMessage, addMessage, model } = useMessageStorage(messages, { type, title, subtitle });

    return {
      model,
      args,
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
    options: ['error', 'success', 'warning', 'info'],
    control: { type: 'select' },
  },
};

basic.args = {
  type: 'error',
  title: 'A new title',
  subtitle: 'A new subtitle',
  messages: [
    {
      id: 1,
      type: 'success',
      title: 'This is the title',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: 2,
      type: 'error',
      title: 'This is the title',
      subtitle: 'This is the subtitle',
    },
    {
      id: 3,
      type: 'warning',
      title: 'This is the title',
      subtitle: 'This is the subtitle',
    },
    {
      id: 4,
      type: 'info',
      title: 'This is the title',
      subtitle: 'This is the subtitle',
    },
    {
      id: 5,
      type: 'error',
      title: 'This is the title',
      subtitle: 'This is the subtitle',
    },
  ],
};
