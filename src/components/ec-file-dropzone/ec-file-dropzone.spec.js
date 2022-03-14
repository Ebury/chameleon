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

  it('should render correctly when an element is being dragged over it', async () => {
    const wrapper = mountFileDropzone();
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(false);

    await wrapper.trigger('dragover');
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(true);
  });

  it('should render correctly when an element is being dragged over the page', async () => {
    const wrapper = mountFileDropzone();
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(false);

    const bodyWrapper = createWrapper(document.body);
    await bodyWrapper.trigger('dragover');
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(true);
  });

  it('should render correctly when an element is no longer dragged over it', async () => {
    const wrapper = mountFileDropzone();
    await wrapper.trigger('dragover');
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(true);

    await wrapper.trigger('dragleave');
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(false);
  });

  it('should render correctly when an element is no longer dragged over the page', async () => {
    const wrapper = mountFileDropzone();
    await wrapper.trigger('dragover');
    expect(wrapper.classes('ec-file-dropzone--dragging')).toBe(true);

    const bodyWrapper = createWrapper(document.body);
    await bodyWrapper.trigger('dragover');
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
});
