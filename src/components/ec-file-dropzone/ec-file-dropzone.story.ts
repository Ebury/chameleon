import { action } from '@storybook/addon-actions';
import type { Meta, StoryFn } from '@storybook/vue3';
import { ref } from 'vue';

import EcFileDropzone from './ec-file-dropzone.vue';

const meta: Meta = {
  title: 'File Dropzone',
  component: EcFileDropzone,
};

export default meta;

export const basic: StoryFn<typeof EcFileDropzone> = args => ({
  components: { EcFileDropzone },
  setup() {
    const fileList = ref<File[]>([]);

    function onChange(files: File[]) {
      action('change')(files);
      fileList.value = [...files];
    }

    return {
      args,
      fileList,
      onChange,
    };
  },
  template: `
    <div class="tw-p-24">
      <ec-file-dropzone
        v-bind="args"
        v-on="{
          change: onChange,
        }"
      >
        <template #title>Drag and drop</template>
        <template #subtitle>files here or <span class="tw-text-key-4">browse</span>.</template>
      </ec-file-dropzone>

      <div class="tw-mt-16">Number of selected files: {{ fileList.length }}</div>
      <ul v-if="fileList.length > 0">
        <li
          v-for="(file, index) in fileList"
          :key="index"
          class="tw-ml-16"
        >
          {{ file.name }}
        </li>
      </ul>
    </div>
  `,
});
