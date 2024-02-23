import { type ComponentMountingOptions, mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

import EcFileUpload from './ec-file-upload.vue';
import type { FileUploadProps } from './types';

describe('EcFileUpload', () => {
  function mountFileUpload(props?: FileUploadProps, mountOpts?: ComponentMountingOptions<typeof EcFileUpload>) {
    return mount(EcFileUpload, {
      props,
      ...mountOpts,
    });
  }

  function generateFile(name: string, type: string, size: number): File {
    return new File(new Array(size).fill('a'), name, { type });
  }

  const files = [
    generateFile('file_1.pdf', 'application/pdf', 200),
    generateFile('file_2.pdf', 'application/pdf', 200),
  ];

  describe('$attrs', () => {
    it('should render with custom attributes', () => {
      const wrapper = mountFileUpload({}, {
        attrs: {
          'data-test': 'my-data-test',
          class: 'my-class',
          id: 'test-id',
        },
      });
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe(':props', () => {
    it(':label - should render with a label', () => {
      const wrapper = mountFileUpload({
        label: 'Attachments',
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':note - should render with a note', () => {
      const wrapper = mountFileUpload({
        note: 'max 10mb',
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it(':isDisabled - should render in disabled state', () => {
      const wrapper = mountFileUpload({
        isDisabled: true,
      });

      expect(wrapper.findByDataTest('ec-file-dropzone__input').attributes('disabled')).toBe('');
      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('#slots', () => {
    it('#title - should render the title', () => {
      const wrapper = mountFileUpload(
        {},
        {
          slots: {
            title: 'Title',
          },
        },
      );

      expect(wrapper.element).toMatchSnapshot();
    });

    it('#subtitle - should render the subtitle', () => {
      const wrapper = mountFileUpload(
        {},
        {
          slots: {
            subtitle: 'Subtitle',
          },
        },
      );

      expect(wrapper.element).toMatchSnapshot();
    });

    it('#help-text - should render the help text', () => {
      const wrapper = mountFileUpload(
        {},
        {
          slots: {
            'help-text': 'Help text',
          },
        },
      );

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@events', () => {
    it('@change - should be emitted when items are added in the dropzone', async () => {
      const wrapper = mountFileUpload();

      await wrapper
        .findByDataTest('ec-file-upload')
        .findByDataTest('ec-file-upload__dropzone')
        .trigger('drop', { dataTransfer: { files } });

      expect(wrapper.emitted('change')?.length).toBe(1);
      expect(wrapper.emitted('change')?.[0]).toEqual([files]);
    });
  });

  describe('v-model', () => {
    it('should initialize with a value from the v-model', () => {
      const Component = defineComponent({
        components: { EcFileUpload },
        data() {
          return {
            value: [...files],
          };
        },
        template: '<ec-file-upload v-model="value" />',
      });

      const wrapper = mount(Component);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should update the v-model if we delete an item', async () => {
      const Component = defineComponent({
        components: { EcFileUpload },
        data() {
          return {
            value: [...files],
          };
        },
        template: '<ec-file-upload v-model="value" />',
      });

      const wrapper = mount(Component);
      await wrapper.findByDataTest('ec-file-upload').findByDataTest('ec-file-list__delete-btn--1').trigger('click');

      const expectedFiles = [
        files[0],
      ];

      expect(wrapper.vm.value).toEqual(expectedFiles);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should update the file list with an extra file whilst keeping previous files', async () => {
      const Component = defineComponent({
        components: { EcFileUpload },
        data() {
          return {
            value: [...files],
          };
        },
        template: '<ec-file-upload v-model="value" />',
      });

      const wrapper = mount(Component);

      const extraFile = [
        generateFile('file_3.pdf', 'image/jpeg', 200),
      ];

      await wrapper
        .findByDataTest('ec-file-upload')
        .findByDataTest('ec-file-upload__dropzone')
        .trigger('drop', { dataTransfer: { files: extraFile } });

      const expectedFiles = [
        ...files,
        ...extraFile,
      ];

      expect(wrapper.vm.value).toEqual(expectedFiles);
    });

    it('should update the file list when we add a file with the same name AND delete the old file', async () => {
      const Component = defineComponent({
        components: { EcFileUpload },
        data() {
          return {
            value: [...files],
          };
        },
        template: '<ec-file-upload v-model="value" />',
      });

      const wrapper = mount(Component);
      const extraFile = [
        generateFile('file_2.pdf', 'image/jpeg', 100),
      ];

      await wrapper
        .findByDataTest('ec-file-upload')
        .findByDataTest('ec-file-upload__dropzone')
        .trigger('drop', { dataTransfer: { files: extraFile } });

      const expectedFiles = [
        files[0],
        extraFile[0],
      ];

      expect(wrapper.vm.value).toEqual(expectedFiles);
    });

    it('should not update the v-model if we try to delete an item when disabled', async () => {
      const Component = defineComponent({
        components: { EcFileUpload },
        data() {
          return {
            value: [...files],
          };
        },
        template: '<ec-file-upload v-model="value" :is-disabled="true"/>',
      });

      const wrapper = mount(Component);
      await wrapper.findByDataTest('ec-file-list__delete-btn--1').trigger('click');

      const expectedFiles = [...files];

      expect(wrapper.vm.value).toEqual(expectedFiles);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
