import { action } from '@storybook/addon-actions';
import { fixedContainerDecorator } from '../../../.storybook/utils';
import EcToaster from './ec-toaster.vue';

export default {
  title: 'Toaster',
  component: EcToaster,
  decorators: [
    fixedContainerDecorator(),
  ],
};

export const basic = (args, { argTypes }) => ({
  components: { EcToaster },
  props: Object.keys(argTypes),
  data() {
    return {
      messagesFromProps: [],
    };
  },
  watch: {
    messages: {
      immediate: true,
      handler(newValue) {
        this.messagesFromProps = newValue;
      },
    },
  },
  methods: {
    removeMessage(message) {
      action('remove')(message);
      this.messagesFromProps = this.messagesFromProps.filter(m => m !== message);
    },
    addMessage() {
      this.messagesFromProps.push({
        id: +new Date(),
        type: this.type,
        title: this.title,
        subtitle: this.subtitle,
      });
    },
    bodyHandler: action('bodyClick'),
  },
  // eslint-disable-next-line no-unused-vars
  render(h) {
    return (
      <div class="tw-flex tw-items-center tw-justify-center tw-h-screen">
        <div class="tw-fixed tw-right-0 tw-top-0 tw-w-full" style={{
          maxWidth: '400px',
        }}>
          <EcToaster messages={this.messagesFromProps} onRemove={message => this.removeMessage(message)} />
        </div>
        <button
          class="ec-btn ec-btn--md ec-btn--rounded ec-btn--primary"
          onClick={this.addMessage}>Add another message</button>
      </div>
    );
  },
  mounted() {
    document.addEventListener('click', this.bodyHandler);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.bodyHandler);
  },
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
