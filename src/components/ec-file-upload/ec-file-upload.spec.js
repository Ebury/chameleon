import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

import EcFileUpload from './ec-file-upload.vue';

describe('EcFileUpload', () => {
  function mountFileUpload(props, mountOpts) {
    return mount(EcFileUpload, {
      props,
      ...mountOpts,
    });
  }

  const files = [
    { name: 'file_1.pdf', type: 'application/pdf', size: 200 },
    { name: 'file_2.pdf', type: 'application/pdf', size: 200 },
  ];

  function mountFileUploadAsTemplate(template, props, wrapperComponentsOpts, mountOpts) {
    const Component = defineComponent({
      components: { EcFileUpload },
      template,
      ...wrapperComponentsOpts,
    });

    return mount(Component, {
      props,
      ...mountOpts,
    });
  }

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

      expect(wrapper.emitted('change').length).toBe(1);
      expect(wrapper.emitted('change')[0]).toEqual([files]);
    });
  });

  describe('v-model', () => {
    it('should initialize with a value from the v-model', () => {
      const wrapper = mountFileUploadAsTemplate(
        '<ec-file-upload v-model="value" />',
        {},
        {
          data() {
            return {
              value: [...files],
            };
          },
        },
      );

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should update the v-model if we delete an item', async () => {
      const wrapper = mountFileUploadAsTemplate(
        '<ec-file-upload v-model="value" />',
        {},
        {
          data() {
            return {
              value: [...files],
            };
          },
        },
      );

      await wrapper.findByDataTest('ec-file-upload').findByDataTest('ec-file-list__delete-btn--1').trigger('click');

      const expectedFiles = [
        { name: 'file_1.pdf', type: 'application/pdf', size: 200 },
      ];

      expect(wrapper.vm.value).toEqual(expectedFiles);
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should update the file list with an extra file whilst keeping previous files', async () => {
      const wrapper = mountFileUploadAsTemplate(
        '<ec-file-upload v-model="value" />',
        {},
        {
          data() {
            return {
              value: [...files],
            };
          },
        },
      );

      const extraFile = [
        { name: 'file_3.pdf', type: 'application/pdf', size: 200 },
      ];

      await wrapper
        .findByDataTest('ec-file-upload')
        .findByDataTest('ec-file-upload__dropzone')
        .trigger('drop', { dataTransfer: { files: extraFile } });

      const expectedFiles = [
        { name: 'file_1.pdf', type: 'application/pdf', size: 200 },
        { name: 'file_2.pdf', type: 'application/pdf', size: 200 },
        { name: 'file_3.pdf', type: 'application/pdf', size: 200 },
      ];

      expect(wrapper.vm.value).toEqual(expectedFiles);
    });

    it('should update the file list when we add a file with the same name AND delete the old file', async () => {
      const wrapper = mountFileUploadAsTemplate(
        '<ec-file-upload v-model="value" />',
        {},
        {
          data() {
            return {
              value: [...files],
            };
          },
        },
      );

      const extraFile = [
        { name: 'file_2.pdf', type: 'application/jpg', size: 100 },
      ];

      await wrapper
        .findByDataTest('ec-file-upload')
        .findByDataTest('ec-file-upload__dropzone')
        .trigger('drop', { dataTransfer: { files: extraFile } });

      const expectedFiles = [
        { name: 'file_1.pdf', type: 'application/pdf', size: 200 },
        { name: 'file_2.pdf', type: 'application/jpg', size: 100 },
      ];

      expect(wrapper.vm.value).toEqual(expectedFiles);
    });

    it('should not update the v-model if we try to delete an item when disabled', async () => {
      const wrapper = mountFileUploadAsTemplate(
        '<ec-file-upload v-model="value" :is-disabled="true"/>',
        {},
        {
          data() {
            return {
              value: [...files],
            };
          },
        },
      );

      await wrapper.findByDataTest('ec-file-list__delete-btn--1').trigger('click');

      const expectedFiles = [
        { name: 'file_1.pdf', type: 'application/pdf', size: 200 },
        { name: 'file_2.pdf', type: 'application/pdf', size: 200 },
      ];

      expect(wrapper.vm.value).toEqual(expectedFiles);
      expect(wrapper.element).toMatchSnapshot();
    });
  });
});
