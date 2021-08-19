import { mount, createLocalVue } from '@vue/test-utils';

import EcTextarea from './ec-textarea.vue';

describe('EcTextarea', () => {
  function mountTextarea(props, mountOpts) {
    return mount(EcTextarea, {
      propsData: {
        ...props,
      },
      ...mountOpts,
    });
  }

  function mountTextareaAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
    const localVue = createLocalVue();

    const Component = localVue.extend({
      components: { EcTextarea },
      template,
      ...wrapperComponentOpts,
    });

    return mount(Component, {
      localVue,
      propsData: { ...props },
      ...mountOpts,
    });
  }

  const defaultWrapper = mountTextarea();

  it('should render as expected', () => {
    expect(defaultWrapper.element).toMatchSnapshot();
  });

  it('should set the v-model on the value of the textarea and change when it changes', async () => {
    const wrapper = mountTextareaAsTemplate(
      '<ec-textarea v-model="text" type="text" />',
      {},
      {
        data() {
          return { text: '' };
        },
      },
    );

    expect(wrapper.findByDataTest('ec-textarea__textarea').element.value).toBe('');
    await wrapper.setData({ text: 'Value Lorem ipsum' });
    expect(wrapper.findByDataTest('ec-textarea__textarea').element.value).toBe('Value Lorem ipsum');
  });

  it('renders with a placeholder', () => {
    const wrapper = mountTextarea({}, { attrs: { placeholder: 'dfdffdfdfdf' } });
    expect(defaultWrapper.element).toMatchDiffSnapshot(wrapper.element);
  });

  it('should render with a custom data test', () => {
    const wrapper = mountTextareaAsTemplate(
      '<ec-textarea data-test="custom data test"/>',
    );

    expect(defaultWrapper.element).toMatchDiffSnapshot(wrapper.element);
  });

  it('renders as disabled', () => {
    const wrapper = mountTextarea({}, { attrs: { disabled: true } });

    expect(defaultWrapper.element).toMatchDiffSnapshot(wrapper.element);
  });

  describe(':props', () => {
    it('should render the textarea with a specific number of rows', () => {
      const wrapper = mountTextarea({
        rows: 5,
      });

      expect(defaultWrapper.element).toMatchDiffSnapshot(wrapper.element);
    });

    it('should render with a label', () => {
      const wrapper = mountTextarea({
        label: 'Label lorem ipsum',
      });

      expect(defaultWrapper.element).toMatchDiffSnapshot(wrapper.element);
    });

    it('should render with a labelTooltip', () => {
      const wrapper = mountTextarea({
        label: 'Label lorem ipsum',
        labelTooltip: 'Label tooltip lorem ipsum',
      });

      expect(defaultWrapper.element).toMatchDiffSnapshot(wrapper.element);
    });

    it('should render with a note', () => {
      const wrapper = mountTextarea({
        note: 'Note lorem ipsum',
      });

      expect(defaultWrapper.element).toMatchDiffSnapshot(wrapper.element);
    });

    it('should render with a bottom note', () => {
      const wrapper = mountTextarea({
        bottomNote: 'Bottom note lorem ipsum',
      });

      expect(defaultWrapper.element).toMatchDiffSnapshot(wrapper.element);
    });

    it('should render with a bottom note in a warning color theme', () => {
      const wrapper = mountTextarea({
        bottomNote: 'Bottom note lorem ipsum',
        isWarning: true,
      });

      expect(defaultWrapper.element).toMatchDiffSnapshot(wrapper.element);
    });

    it('should render with an error message', () => {
      const wrapper = mountTextarea({
        errorMessage: 'Error lorem ipsum',
      });

      expect(defaultWrapper.element).toMatchDiffSnapshot(wrapper.element);
    });

    it('should render as sensitive', () => {
      const wrapper = mountTextarea({
        isSensitive: true,
      });

      expect(defaultWrapper.element).toMatchDiffSnapshot(wrapper.element);
    });
  });

  describe('@events', () => {
    it('should emit the value when you type on the textarea', () => {
      const wrapper = mountTextareaAsTemplate(
        '<ec-textarea v-model="text" type="text" />',
        {},
        {
          data() {
            return { text: '' };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-textarea__textarea').element.value).toBe('');
      wrapper.findByDataTest('ec-textarea__textarea').setValue('Value lorem ipsum');
      expect(wrapper.vm.text).toBe('Value lorem ipsum');
      expect(wrapper.findByDataTest('ec-textarea__textarea').element.value).toBe('Value lorem ipsum');
    });
  });
});
