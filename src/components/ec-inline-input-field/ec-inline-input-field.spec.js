import { mount, createLocalVue } from '@vue/test-utils';
import clipboardCopy from 'clipboard-copy';
import EcInlineInputField from './ec-inline-input-field.vue';

jest.mock('clipboard-copy');

describe('EcInlineInputField', () => {
  const inputFieldValue = 'Input field value';
  const MockedEcTooltipDirective = {
    bind(el, { value }) {
      if (value.content) {
        el.setAttribute('mocked-tooltip-content', value.content);
        el.setAttribute('mocked-tooltip-classes', value.classes);
      }
    },
  };

  function mountInlineInputField(props, mountOpts) {
    const localVue = createLocalVue();
    localVue.directive('ec-tooltip', MockedEcTooltipDirective);

    return mount(EcInlineInputField, {
      localVue,
      directives: { 'ec-tooltip': MockedEcTooltipDirective },
      stubs: { EcPopover: true },
      propsData: {
        label: 'Label',
        isEditable: true,
        value: inputFieldValue,
        ...props,
      },
      ...mountOpts,
    });
  }

  describe('when component is non-editable', () => {
    it('should render as expected', async () => {
      const wrapper = mountInlineInputField({ isEditable: false }, {
        slots: {
          default: '<a href="#">Link</a>',
        },
      });
      await wrapper.vm.$nextTick();

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('when component is editable', () => {
    describe('when the component is in its initial state', () => {
      it('should render as expected', async () => {
        const wrapper = mountInlineInputField();
        await wrapper.vm.$nextTick();

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.findByDataTest('ec-inline-input-field-value-text').exists()).toBeTruthy();
      });

      describe('@events', () => {
        it('should emit `edit` event when the edit button is clicked', async () => {
          const wrapper = mountInlineInputField();
          await wrapper.vm.$nextTick();

          expect(wrapper.emitted('edit')).toBeUndefined();
          wrapper.findByDataTest('ec-inline-input-field-value-text__action').trigger('click');
          await wrapper.vm.$nextTick();

          expect(wrapper.emitted('edit').length).toBeTruthy();
        });
      });
    });

    describe('when the component is in editing mode', () => {
      it('should render as expected', async () => {
        const wrapper = mountInlineInputField({ isEditing: true });
        await wrapper.vm.$nextTick();

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.findByDataTest('ec-inline-input-field-edit').exists()).toBeTruthy();
      });

      it('should gain focus the input field', async () => {
        const wrapper = mountInlineInputField({ isEditing: true });
        const focusSpy = jest.spyOn(wrapper.findByDataTest('ec-inline-input-field-edit__input').element, 'focus');
        await wrapper.vm.$nextTick();

        expect(focusSpy).toHaveBeenCalledTimes(1);
        focusSpy.mockRestore();
      });

      describe('@events', () => {
        it('should emit `cancel` event when esc key is pressed in the input field', async () => {
          const wrapper = mountInlineInputField({ isEditing: true });
          const editComponentWrapper = wrapper.findByDataTest('ec-inline-input-field-edit');
          await wrapper.vm.$nextTick();

          expect(editComponentWrapper.emitted('cancel')).toBeUndefined();
          expect(wrapper.emitted('cancel')).toBeUndefined();
          wrapper.findByDataTest('ec-inline-input-field-edit__input').trigger('keydown.esc');
          await wrapper.vm.$nextTick();

          expect(editComponentWrapper.emitted('cancel')[0]).toEqual([]);
          expect(wrapper.emitted('cancel')[0]).toEqual([]);
        });

        it('should emit `cancel` event when the cancel button is clicked', async () => {
          const wrapper = mountInlineInputField({ isEditing: true });
          const editComponentWrapper = wrapper.findByDataTest('ec-inline-input-field-edit');
          await wrapper.vm.$nextTick();

          expect(editComponentWrapper.emitted('cancel')).toBeUndefined();
          expect(wrapper.emitted('cancel')).toBeUndefined();
          wrapper.findByDataTest('ec-inline-input-field-edit__cancel-action').trigger('click');
          await wrapper.vm.$nextTick();

          expect(editComponentWrapper.emitted('cancel')[0]).toEqual([]);
          expect(wrapper.emitted('cancel')[0]).toEqual([]);
        });

        it('should emit `submit` event when enter key is pressed in the input field', async () => {
          const wrapper = mountInlineInputField({ isEditing: true });
          const editComponentWrapper = wrapper.findByDataTest('ec-inline-input-field-edit');
          await wrapper.vm.$nextTick();

          expect(editComponentWrapper.emitted('sumbit')).toBeUndefined();
          expect(wrapper.emitted('sumbit')).toBeUndefined();
          wrapper.findByDataTest('ec-inline-input-field-edit__input').trigger('keydown.enter');
          await wrapper.vm.$nextTick();

          expect(editComponentWrapper.emitted('submit')[0]).toEqual([{ value: inputFieldValue }]);
          expect(wrapper.emitted('submit')[0]).toEqual([inputFieldValue]);
        });

        it('should emit `submit` event when the submit button is clicked', async () => {
          const wrapper = mountInlineInputField({ isEditing: true });
          const editComponentWrapper = wrapper.findByDataTest('ec-inline-input-field-edit');
          await wrapper.vm.$nextTick();

          expect(editComponentWrapper.emitted('submit')).toBeUndefined();
          expect(wrapper.emitted('submit')).toBeUndefined();
          wrapper.findByDataTest('ec-inline-input-field-edit__submit-action').trigger('click');
          await wrapper.vm.$nextTick();

          expect(editComponentWrapper.emitted('submit')[0]).toEqual([{ value: inputFieldValue }]);
          expect(wrapper.emitted('submit')[0]).toEqual([inputFieldValue]);
        });
      });
    });

    describe('when the component is loading', () => {
      it('should render as expected', async () => {
        const wrapper = mountInlineInputField({ isLoading: true });
        await wrapper.vm.$nextTick();

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.findByDataTest('ec-inline-input-field-loading').exists()).toBeTruthy();
      });
    });
  });

  describe('when component is copiable', () => {
    it('should render as expected', async () => {
      const wrapper = mountInlineInputField(
        {
          isEditable: false,
          isCopiable: true,
          tooltipTextSuccess: 'Copied!',
          tooltipTextError: 'Unable to copy',
        },
      );
      await wrapper.vm.$nextTick();

      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-inline-input-field-copy').exists()).toBeTruthy();
    });

    it('should trigger successfully the copy method after clicking on the copy button', async () => {
      mockClipboardCopySuccess();
      const wrapper = mountInlineInputField(
        {
          isEditable: false,
          isCopiable: true,
          tooltipTextSuccess: 'Copied!',
          tooltipTextError: 'Unable to copy',
        },
      );

      await wrapper.vm.$nextTick();
      wrapper.findByDataTest('ec-inline-input-field-copy__action').trigger('click');
      await wrapper.vm.$nextTick();
      expect(clipboardCopy).toHaveBeenCalledTimes(1);
      // await wrapper.vm.$nextTick();
      // expect(wrapper.findByDataTest('ec-inline-input-field-copy__icon').attributes('mocked-tooltip-content')).toBe('Copied!');
      // expect(wrapper.findByDataTest('ec-inline-input-field-copy__icon').attributes('mocked-tooltip-class')).toBe('ec-tooltip--bg-success');
    });
  });
});

function mockClipboardCopySuccess() {
  clipboardCopy.mockResolvedValue(true);
}
