import { type ComponentMountingOptions, DOMWrapper, mount } from '@vue/test-utils';
import { vi } from 'vitest';

import EcFileDropzone from './ec-file-dropzone.vue';
import type { FileDropzoneProps } from './types';

describe('EcFileDropzone', () => {
  function mountFileDropzone(props?: FileDropzoneProps, mountOpts?: ComponentMountingOptions<typeof EcFileDropzone>) {
    return mount(EcFileDropzone, {
      props,
      ...mountOpts,
    });
  }

  it('should render correctly', () => {
    const wrapper = mountFileDropzone({}, {
      slots: {
        title: 'Drag and drop',
        subtitle: 'files here or <span class="tw-text-key-4">browse</span>.',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with custom attributes', () => {
    const wrapper = mountFileDropzone({}, {
      attrs: {
        'data-test': 'my-data-test',
        class: 'my-class',
        id: 'test-id',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should display the dragging status when an element is being dragged over the page', async () => {
    const wrapper = mountFileDropzone();
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(false);

    const bodyWrapper = new DOMWrapper(document.body);
    await bodyWrapper.trigger('dragenter');
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(true);
  });

  it('should not display the dragging status when an element is no longer dragged over the page', async () => {
    const wrapper = mountFileDropzone();
    const bodyWrapper = new DOMWrapper(document.body);

    await bodyWrapper.trigger('dragenter');
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(true);

    await bodyWrapper.trigger('dragleave');
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(false);
  });

  it('should not change the dragging status when a dragover event is trigger over the page', async () => {
    const wrapper = mountFileDropzone();
    const bodyWrapper = new DOMWrapper(document.body);

    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(false);

    await bodyWrapper.trigger('dragover');
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(false);

    await bodyWrapper.trigger('dragenter');
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(true);

    await bodyWrapper.trigger('dragover');
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(true);

    await bodyWrapper.trigger('dragleave');
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(false);

    await bodyWrapper.trigger('dragover');
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(false);
  });

  it('should not display the dragging status when an element is dropped over the page', async () => {
    const wrapper = mountFileDropzone();
    const bodyWrapper = new DOMWrapper(document.body);

    await bodyWrapper.trigger('dragenter');
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(true);

    await bodyWrapper.trigger('drop');
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(false);
  });

  it('should display the dragging status when a dragleave event occurs but we still remain on the page (it is triggered by switching between elements on the page)', async () => {
    const wrapper = mountFileDropzone();
    const bodyWrapper = new DOMWrapper(document.body);

    await bodyWrapper.trigger('dragenter');
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(true);

    await bodyWrapper.trigger('dragenter');
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(true);

    await bodyWrapper.trigger('dragleave', { clientX: 100, clientY: 100 });
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(true);
  });

  it('should start listening to drag and drop events at document level after being mounted', () => {
    const spy = vi.spyOn(document, 'addEventListener');
    mountFileDropzone();
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it('should stop listening to drag and drop events at document level after being destroyed', () => {
    const wrapper = mountFileDropzone();
    const spy = vi.spyOn(document, 'removeEventListener');
    wrapper.unmount();
    expect(spy).toHaveBeenCalledTimes(4);
  });

  describe(':props', () => {
    it(':isDisabled - should render as disabled', () => {
      const wrapper = mountFileDropzone({ isDisabled: true });

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@events', () => {
    function generateFile(name: string, type: string, size: number): File {
      return new File(new Array(size).fill('a'), name, { type });
    }

    function createFileList(files: File[]): FileList {
      // the proper way would be creating a DataTransfer, add items to it and return the files list but DataTransfer is not implemented in JSDOM,
      // see https://github.com/jsdom/jsdom/issues/1568
      return files as unknown as FileList;
    }

    const files: File[] = [
      generateFile('file_1.pdf', 'application/pdf', 200),
      generateFile('file_2.jpg', 'image/jpeg', 50),
    ];
    const folders: File[] = [
      generateFile('folder_1', '', 200),
      generateFile('folder_2', 'folder', 0),
    ];
    const filesAndFolders: File[] = [
      ...files,
      ...folders,
    ];

    it('@change - should be emitted when items are dropped over it', async () => {
      const wrapper = mountFileDropzone();
      await wrapper.trigger('drop', { dataTransfer: { files: filesAndFolders } });
      expect(wrapper.emitted('change')?.length).toBe(1);
      expect(wrapper.emitted('change')?.[0]).toEqual([files]);
    });

    it('@change - should not be emitted when a folder is dropped over it', async () => {
      const wrapper = mountFileDropzone();
      await wrapper.trigger('drop', { dataTransfer: { files: folders } });
      expect(wrapper.emitted('change')).toBeUndefined();
    });

    it('@change - should be emitted when a change event is emitted by its file input field', async () => {
      const wrapper = mountFileDropzone();
      const filesSpy = vi.spyOn(wrapper.findByDataTest<HTMLInputElement>('ec-file-dropzone__input').element, 'files', 'get').mockImplementation(() => createFileList(filesAndFolders));

      await wrapper.findByDataTest('ec-file-dropzone__input').trigger('change');
      expect(wrapper.emitted('change')?.length).toBe(1);
      expect(wrapper.emitted('change')?.[0]).toEqual([files]);

      filesSpy.mockRestore();
    });

    it('@change - should not be emitted when only folders are selected via its file input field', async () => {
      const wrapper = mountFileDropzone();
      const filesSpy = vi.spyOn(wrapper.findByDataTest<HTMLInputElement>('ec-file-dropzone__input').element, 'files', 'get').mockImplementation(() => createFileList(folders));

      await wrapper.findByDataTest('ec-file-dropzone__input').trigger('change');
      expect(wrapper.emitted('change')).toBeUndefined();

      filesSpy.mockRestore();
    });

    it('@change - should not be emitted when is disabled', async () => {
      const wrapper = mountFileDropzone({ isDisabled: true });

      await wrapper.trigger('drop', { dataTransfer: { files: filesAndFolders } });
      expect(wrapper.emitted('change')).toBeUndefined();
    });

    it('@change - should be emitted when is not disabled', async () => {
      const wrapper = mountFileDropzone({ isDisabled: false });

      await wrapper.trigger('drop', { dataTransfer: { files: filesAndFolders } });

      expect(wrapper.emitted('change')?.length).toBe(1);
      expect(wrapper.emitted('change')?.[0]).toEqual([files]);
    });
  });
});
