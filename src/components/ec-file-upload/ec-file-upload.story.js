import EcFileUpload from './ec-file-upload.vue';

export default {
  title: 'File Upload',
  component: EcFileUpload,
};

export const basic = (args, { argTypes }) => ({
  components: { EcFileUpload },
  props: Object.keys(argTypes),
  data() {
    return {
      isFileUploaderDisabled: false,
      model: [{ name: 'test', type: '.pdf' }],
    };
  },
  methods: {
    toggleDisable() {
      this.isFileUploaderDisabled = !this.isFileUploaderDisabled;
    },
  },
  template: `
    <div class="tw-p-24">
      <ec-file-upload
        v-bind="$props"
        v-model="model"
        :is-disabled="isFileUploaderDisabled"
      >
        <template #title>Drag and drop</template>
        <template #subtitle>files here or <a
          href="#"
          @click.prevent
          :class="{
            'tw-cursor-not-allowed' : isFileUploaderDisabled,
            'tw-text-gray-6' : isFileUploaderDisabled,
          }">browse</a>.</template>
        <template #help-text>Attach documentation related to this transaction (ie. invoice(s), customer order, packing list, bill of lading, etc.)</template>
      </ec-file-upload>

      <button
        class="tw-mt-48"
        @click="toggleDisable"
      >
        Toggle disable
      </button>

      <p class="tw-mt-48">Value:</p>
      <div v-for="item in model"><br>{{ item.name }}</div>
    </div>
  `,
});

basic.args = {
  label: 'Attachments',
  note: '(Max. 10mb)',
};
