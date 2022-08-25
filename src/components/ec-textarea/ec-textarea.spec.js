import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

import EcTextarea from './ec-textarea.vue';

describe('EcTextarea', () => {
  function mountTextarea(props, mountOpts) {
    return mount(EcTextarea, {
      props,
      ...mountOpts,
    });
  }

  function mountTextareaAsTemplate(template, props, wrapperComponentOpts, mountOpts) {
    const Component = defineComponent({
      components: { EcTextarea },
      template,
      ...wrapperComponentOpts,
    });

    return mount(Component, {
      props,
      ...mountOpts,
    });
  }

  it('should render as expected', () => {
    const wrapper = mountTextarea();

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render given custom attributes', () => {
    const wrapper = mountTextarea({}, {
      attrs: {
        'data-test': 'my-data-test',
        class: 'my-custom-class',
        style: 'top: 0px',
        role: 'input',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should set the v-model on the value of the textarea and change when it changes', async () => {
    const wrapper = mountTextareaAsTemplate(
      '<ec-textarea v-model="text" />',
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
    const wrapper = mountTextarea({}, { attrs: { placeholder: 'Placeholder lorem ipsum...' } });
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should render with a custom data test', () => {
    const wrapper = mountTextareaAsTemplate(
      '<ec-textarea data-test="custom data test"/>',
    );

    expect(wrapper.element).toMatchSnapshot();
  });

  it('renders as disabled', () => {
    const wrapper = mountTextarea({}, { attrs: { disabled: true } });

    expect(wrapper.element).toMatchSnapshot();
  });

  it('should give focus to the textarea element inside the component', () => {
    const elem = document.createElement('div');
    document.body.appendChild(elem);

    const wrapper = mountTextareaAsTemplate(
      '<div><button data-test="test-button" @click="$refs.textarea.focus()">Focus the textarea </button><ec-textarea ref="textarea"></ec-textarea></div>',
      {},
      {},
      {
        attachTo: elem,
      },
    );

    document.activeElement.blur();
    expect(document.activeElement).toBe(document.body);
    wrapper.findByDataTest('test-button').trigger('click');
    expect(document.activeElement).toBe(wrapper.findByDataTest('ec-textarea__textarea').element);
    wrapper.unmount();
  });

  describe(':props', () => {
    it('should render the textarea with a specific number of rows', () => {
      const wrapper = mountTextarea({
        rows: 5,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a label', () => {
      const wrapper = mountTextarea({
        label: 'Label lorem ipsum',
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a labelTooltip', () => {
      const wrapper = mountTextarea({
        label: 'Label lorem ipsum',
        labelTooltip: 'Label tooltip lorem ipsum',
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a note', () => {
      const wrapper = mountTextarea({
        note: 'Note lorem ipsum',
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a bottom note', () => {
      const wrapper = mountTextarea({
        bottomNote: 'Bottom note lorem ipsum',
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a bottom note in a warning color theme', () => {
      const wrapper = mountTextarea({
        bottomNote: 'Bottom note lorem ipsum',
        isWarning: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with an error message', () => {
      const wrapper = mountTextarea({
        errorMessage: 'Error lorem ipsum',
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render as sensitive', () => {
      const wrapper = mountTextarea({
        isSensitive: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('@events', () => {
    it('should emit the value when you type on the textarea', async () => {
      const wrapper = mountTextareaAsTemplate(
        '<ec-textarea v-model="text" />',
        {},
        {
          data() {
            return { text: '' };
          },
        },
      );

      expect(wrapper.findByDataTest('ec-textarea__textarea').element.value).toBe('');
      await wrapper.findByDataTest('ec-textarea__textarea').setValue('Value lorem ipsum');
      expect(wrapper.vm.text).toBe('Value lorem ipsum');
      expect(wrapper.findByDataTest('ec-textarea__textarea').element.value).toBe('Value lorem ipsum');
      expect(wrapper.findComponent(EcTextarea).emitted('update:modelValue').length).toBe(1);
    });
  });
});
