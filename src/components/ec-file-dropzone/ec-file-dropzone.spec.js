import { createWrapper, mount } from '@vue/test-utils';
import EcFileDropzone from './ec-file-dropzone.vue';

describe('EcFileDropzone', () => {
  function mountFileDropzone(props, mountOpts) {
    return mount(EcFileDropzone, {
      propsData: {
        ...props,
      },
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

  it('should display the dragging status when an element is being dragged over the page', async () => {
    const wrapper = mountFileDropzone();
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(false);

    const bodyWrapper = createWrapper(document.body);
    await bodyWrapper.trigger('dragover');
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(true);
  });

  it('should not display the dragging status when an element is no longer dragged over the page', async () => {
    const wrapper = mountFileDropzone();
    const bodyWrapper = createWrapper(document.body);

    await bodyWrapper.trigger('dragover');
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(true);

    await bodyWrapper.trigger('dragleave', { clientX: 0, clientY: 0 });
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(false);
  });

  it('should display the dragging status when a dragleave event occurs but we still remain on the page (it is triggered by switching between elements on the page)', async () => {
    const wrapper = mountFileDropzone();
    const bodyWrapper = createWrapper(document.body);

    await bodyWrapper.trigger('dragover');
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(true);

    await bodyWrapper.trigger('dragleave', { clientX: 100, clientY: 100 });
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(true);
  });

  it('should start listening to drag and drop events at document level after being mounted', () => {
    const spy = jest.spyOn(document, 'addEventListener');
    mountFileDropzone();
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('should stop listening to drag and drop events at document level after being destroyed', () => {
    const wrapper = mountFileDropzone();
    const spy = jest.spyOn(document, 'removeEventListener');
    wrapper.destroy();
    expect(spy).toHaveBeenCalledTimes(3);
  });

  describe('@events', () => {
    it('@change - should be emitted when an item is dropped over it', async () => {
      const wrapper = mountFileDropzone();
      await wrapper.trigger('drop', { dataTransfer: { files: [{ name: 'file_1.png' }, { name: 'file_2.png' }] } });
      expect(wrapper.emitted('change').length).toBe(1);
    });

    it('@change - should be emitted when a change event is emitted by its file input field', async () => {
      const wrapper = mountFileDropzone();
      await wrapper.findByDataTest('ec-file-dropzone__input').trigger('change');
      expect(wrapper.emitted('change').length).toBe(1);
    });
  });
});
