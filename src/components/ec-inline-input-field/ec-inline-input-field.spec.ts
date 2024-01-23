import type { ComponentMountingOptions } from '@vue/test-utils';
import { mount } from '@vue/test-utils';
import { useClipboard } from '@vueuse/core';
import { vi } from 'vitest';
import { type ComputedRef, ref } from 'vue';

import EcInlineInputField from './ec-inline-input-field.vue';
import { InlineInputEvent, type InlineInputProps } from './types';

vi.mock('@vueuse/core');

describe('EcInlineInputField', () => {
  let clipboardCopySpy: ReturnType<typeof useClipboard>['copy'];

  beforeEach(() => {
    clipboardCopySpy = vi.fn();

    vi.mocked(useClipboard).mockImplementation(() => ({
      copy: clipboardCopySpy,
      isSupported: ref(true),
      // Why casting? see https://github.com/vueuse/vueuse/blob/v10.2.1/packages/core/useClipboard/index.ts#L118-L119
      text: ref('') as ComputedRef<string>,
      copied: ref(false) as ComputedRef<boolean>,
    }));
  });

  function mockClipboardCopySuccess() {
    vi.mocked(clipboardCopySpy).mockClear().mockResolvedValue();
  }

  function mockClipboardCopyError() {
    vi.mocked(clipboardCopySpy).mockClear().mockRejectedValue(false);
  }

  const inputFieldValue = 'Input field value';
  const tooltipTextSuccess = 'Copied!';
  const tooltipTextError = 'Unable to copy';

  function mountInlineInputField(props?: InlineInputProps, mountOpts?: ComponentMountingOptions<typeof EcInlineInputField>) {
    return mount(
      EcInlineInputField,
      {
        props: {
          label: 'Label',
          isEditable: true,
          value: inputFieldValue,
          tooltipTextSuccess,
          tooltipTextError,
          ...props,
        },
        ...mountOpts,
      },
    );
  }

  describe(':attributes', () => {
    it('should correctly display attributes passed', () => {
      const wrapper = mountInlineInputField({
        isSensitive: true,
      }, {
        attrs: {
          id: 'my-id',
          'data-test': 'my-data-test',
          class: 'my-class',
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('slots when non-editable', () => {
    it('should render as expected', () => {
      const wrapper = mountInlineInputField({
        isEditable: false,
      }, {
        slots: {
          default: '<a href="#">Link</a>',
        },
      });

      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render with a sensitive class when isSensitive prop is set to true', () => {
      const wrapper = mountInlineInputField({
        isEditable: false,
        isSensitive: true,
      });

      expect(wrapper.element).toMatchSnapshot();
    });
  });

  describe('when component is editable', () => {
    describe('when the component is in its initial state', () => {
      it('should render as expected', () => {
        const wrapper = mountInlineInputField();

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.findByDataTest('ec-inline-input-field-value-text').exists()).toBe(true);
      });

      it('should render with a sensitive class when isSensitive prop is set to true when isSensitive prop is set to true', () => {
        const wrapper = mountInlineInputField({
          isSensitive: true,
        });

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.findByDataTest('ec-inline-input-field-value-text').exists()).toBe(true);
      });

      it('should render with a label tooltip when labelTooltip prop is set', () => {
        const wrapper = mountInlineInputField({ labelTooltip: 'Testing the labelTooltip prop' });
        expect(wrapper.element).toMatchSnapshot();
      });

      describe('@events', () => {
        it('should emit `edit` event when the edit button is clicked', async () => {
          const wrapper = mountInlineInputField();

          expect(wrapper.emitted(InlineInputEvent.EDIT)).toBeUndefined();
          await wrapper.findByDataTest('ec-inline-input-field-value-text__action').trigger('click');

          expect(wrapper.emitted(InlineInputEvent.EDIT)?.length).toBe(1);
        });
      });
    });

    describe('when the component is in editing mode', () => {
      it('should render as expected', () => {
        const wrapper = mountInlineInputField({
          isEditing: true,
        });

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.findByDataTest('ec-inline-input-field-edit').exists()).toBe(true);
      });

      it('should gain focus the input field', async () => {
        const elem = document.createElement('div');
        document.body.appendChild(elem);

        const wrapper = mountInlineInputField({ isEditing: true }, { attachTo: elem });

        (document.activeElement as HTMLElement)?.blur();
        expect(document.activeElement).not.toBe(wrapper.findByDataTest('ec-inline-input-field-edit__input').element);

        await wrapper.vm.$nextTick();

        expect(document.activeElement).toBe(wrapper.findByDataTest('ec-inline-input-field-edit__input').element);
        wrapper.unmount();
      });

      it('should render with a label tooltip when labelTooltip prop is set', () => {
        const wrapper = mountInlineInputField({ isEditing: true, labelTooltip: 'Testing the labelTooltip prop' });
        expect(wrapper.element).toMatchSnapshot();
      });

      it('should render with a sensitive class when isSensitive prop is set to true', () => {
        const wrapper = mountInlineInputField(
          {
            isEditing: true,
            isSensitive: true,
          },
        );

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.findByDataTest('ec-inline-input-field-edit').exists()).toBe(true);
      });

      it('should render properly when the errorMessage prop is given', () => {
        const wrapper = mountInlineInputField({
          isEditing: true,
          errorMessage: 'error msg',
        });

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.findByDataTest('ec-input-field__error-text').exists()).toBe(true);
      });

      describe('@events', () => {
        it('should emit `submit` event with new value', async () => {
          const wrapper = mountInlineInputField({
            isEditing: true,
          });
          const editComponentWrapper = wrapper.findComponentByDataTest('ec-inline-input-field-edit');

          expect(editComponentWrapper.emitted(InlineInputEvent.SUBMIT)).toBeUndefined();
          expect(wrapper.emitted(InlineInputEvent.SUBMIT)).toBeUndefined();

          await wrapper.findByDataTest('ec-inline-input-field-edit__input').setValue('New value');
          await wrapper.findByDataTest('ec-inline-input-field-edit__submit-action').trigger('click');

          expect(editComponentWrapper.emitted().submit[0]).toEqual([{ value: 'New value' }]);
          expect(wrapper.emitted().submit[0]).toEqual(['New value']);
        });

        it('should emit `cancel` event when esc key is pressed in the input field', async () => {
          const wrapper = mountInlineInputField({
            isEditing: true,
          });
          const editComponentWrapper = wrapper.findComponentByDataTest('ec-inline-input-field-edit');

          expect(editComponentWrapper.emitted(InlineInputEvent.CANCEL)).toBeUndefined();
          expect(wrapper.emitted(InlineInputEvent.CANCEL)).toBeUndefined();
          await wrapper.findByDataTest('ec-inline-input-field-edit__input').trigger('keydown.esc');

          expect(editComponentWrapper.emitted().cancel[0]).toEqual([]);
          expect(wrapper.emitted().cancel[0]).toEqual([]);
        });

        it('should emit `cancel` event when the cancel button is clicked', async () => {
          const wrapper = mountInlineInputField({
            isEditing: true,
          });
          const editComponentWrapper = wrapper.findComponentByDataTest('ec-inline-input-field-edit');

          expect(editComponentWrapper.emitted(InlineInputEvent.CANCEL)).toBeUndefined();
          expect(wrapper.emitted(InlineInputEvent.CANCEL)).toBeUndefined();
          await wrapper.findByDataTest('ec-inline-input-field-edit__cancel-action').trigger('click');

          expect(editComponentWrapper.emitted().cancel[0]).toEqual([]);
          expect(wrapper.emitted().cancel[0]).toEqual([]);
        });

        it('should emit `submit` event when enter key is pressed in the input field', async () => {
          const wrapper = mountInlineInputField({
            isEditing: true,
          });
          const editComponentWrapper = wrapper.findComponentByDataTest('ec-inline-input-field-edit');

          expect(editComponentWrapper.emitted(InlineInputEvent.SUBMIT)).toBeUndefined();
          expect(wrapper.emitted(InlineInputEvent.SUBMIT)).toBeUndefined();
          await wrapper.findByDataTest('ec-inline-input-field-edit__input').trigger('keydown.enter');

          expect(editComponentWrapper.emitted().submit[0]).toEqual([{ value: inputFieldValue }]);
          expect(wrapper.emitted().submit[0]).toEqual([inputFieldValue]);
        });

        it('should emit `submit` event when the submit button is clicked', async () => {
          const wrapper = mountInlineInputField({
            isEditing: true,
          });
          const editComponentWrapper = wrapper.findComponentByDataTest('ec-inline-input-field-edit');

          expect(editComponentWrapper.emitted(InlineInputEvent.SUBMIT)).toBeUndefined();
          expect(wrapper.emitted(InlineInputEvent.SUBMIT)).toBeUndefined();
          await wrapper.findByDataTest('ec-inline-input-field-edit__submit-action').trigger('click');

          expect(editComponentWrapper.emitted().submit[0]).toEqual([{ value: inputFieldValue }]);
          expect(wrapper.emitted().submit[0]).toEqual([inputFieldValue]);
        });
      });
    });

    describe('when the component is loading', () => {
      it('should render as expected', () => {
        const wrapper = mountInlineInputField({
          isLoading: true,
        });

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.findByDataTest('ec-inline-input-field-loading').exists()).toBe(true);
      });

      it('should render with a sensitive class when isSensitive prop is set to true', () => {
        const wrapper = mountInlineInputField({ isLoading: true, isSensitive: true });

        expect(wrapper.element).toMatchSnapshot();
        expect(wrapper.findByDataTest('ec-inline-input-field-loading').exists()).toBe(true);
      });
    });
  });

  describe('when component is copiable', () => {
    it('should render with a label tooltip when labelTooltip prop is set', () => {
      const wrapper = mountInlineInputField({ labelTooltip: 'Testing the labelTooltip prop' });
      expect(wrapper.element).toMatchSnapshot();
    });

    it('should render as expected', () => {
      const wrapper = mountInlineInputField(
        {
          isEditable: false,
          isCopiable: true,
          tooltipTextSuccess,
          tooltipTextError,
        },
      );

      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-inline-input-field-copy').exists()).toBe(true);
    });

    it('should render with a sensitive class when isSensitive prop is set to true', () => {
      const wrapper = mountInlineInputField(
        {
          isEditable: false,
          isCopiable: true,
          isSensitive: true,
          tooltipTextSuccess,
          tooltipTextError,
        },
      );

      expect(wrapper.element).toMatchSnapshot();
      expect(wrapper.findByDataTest('ec-inline-input-field-copy').exists()).toBe(true);
    });

    it('should show the success tooltip after successfully triggering the copy method', async () => {
      mockClipboardCopySuccess();
      const wrapper = mountInlineInputField(
        {
          isEditable: false,
          isCopiable: true,
          tooltipTextSuccess,
          tooltipTextError,
        },
      );

      await wrapper.findByDataTest('ec-inline-input-field-copy__action').trigger('click');
      await wrapper.vm.$nextTick();

      expect(clipboardCopySpy).toHaveBeenCalledTimes(1);
      expect(wrapper.findByDataTest('ec-inline-input-field-copy__icon').attributes('data-ec-tooltip-mock-content')).toBe(tooltipTextSuccess);
      expect(wrapper.findByDataTest('ec-inline-input-field-copy__icon').attributes('data-ec-tooltip-mock-popper-class')).toBe('ec-tooltip--bg-success');
    });

    it('should show the error tooltip after unsuccessfully triggering the copy method', async () => {
      mockClipboardCopyError();
      const wrapper = mountInlineInputField(
        {
          isEditable: false,
          isCopiable: true,
          tooltipTextSuccess,
          tooltipTextError,
        },
      );

      await wrapper.findByDataTest('ec-inline-input-field-copy__action').trigger('click');
      await wrapper.vm.$nextTick();

      expect(clipboardCopySpy).toHaveBeenCalledTimes(1);
      expect(wrapper.findByDataTest('ec-inline-input-field-copy__icon').attributes('data-ec-tooltip-mock-content')).toBe(tooltipTextError);
      expect(wrapper.findByDataTest('ec-inline-input-field-copy__icon').attributes('data-ec-tooltip-mock-popper-class')).toBe('ec-tooltip--bg-error');
    });

    it('should hide the tooltip after we move the cursor away from the copy button', async () => {
      mockClipboardCopySuccess();
      const wrapper = mountInlineInputField(
        {
          isEditable: false,
          isCopiable: true,
          tooltipTextSuccess,
          tooltipTextError,
        },
      );

      await wrapper.findByDataTest('ec-inline-input-field-copy__action').trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.findByDataTest('ec-inline-input-field-copy__icon').attributes('data-ec-tooltip-mock-popper-shown')).toBe('');
      await wrapper.findByDataTest('ec-inline-input-field-copy__action').trigger('mouseleave');
      await wrapper.vm.$nextTick();
      expect(wrapper.findByDataTest('ec-inline-input-field-copy__icon').attributes('data-ec-tooltip-mock-popper-shown')).toBeUndefined();
    });
  });
});
