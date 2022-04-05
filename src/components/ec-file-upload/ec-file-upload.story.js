import EcFileUpload from './ec-file-upload.vue';
import './ec-file-upload.story.css';

export default {
  title: 'File Upload',
  component: EcFileUpload,
};

export const basic = (args, { argTypes }) => ({
  components: { EcFileUpload },
  props: Object.keys(argTypes),
  data() {
    return {
      model: [{ name: 'test' }],
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-file-upload
        v-bind="$props"
        v-model="model"
      >
        <template #title>Drag and drop</template>
        <template #subtitle>files here or <button class="file-upload-button" :disabled="isDisabled">browse</button>.</template>
        <template #help-text>Attach documentation related to this transaction (ie. invoice(s), customer order, packing list, bill of lading, etc.)</template>
      </ec-file-upload>

      <p class="tw-mt-48">Value:</p>
      <div v-for="item in model" class="tw-mt-4">{{ item.name }}</div>
    </div>
  `,
});

basic.args = {
  label: 'Attachments',
  note: '(Max. 10mb)',
};
